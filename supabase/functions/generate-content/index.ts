import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { artisanName, craftDescription, generateImage } = await req.json();
    
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Generate content with AI
    const contentPrompt = `You are a marketing expert for artisan crafts. Generate compelling marketing content for the following artisan and their craft:

Artisan Name: ${artisanName}
Craft Description: ${craftDescription}

Please generate:
1. A brand story (2-3 paragraphs)
2. Instagram caption (with emojis, max 150 characters)
3. Facebook post (engaging, max 200 characters)
4. Twitter/X post (concise, max 280 characters)
5. A 30-second reel script
6. Suggested pricing in USD (just the number)
7. 5 trending hashtags (without #)

Format your response as JSON with these keys: brandStory, instagramCaption, facebookCaption, twitterCaption, reelScript, suggestedPrice, tags`;

    const contentResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'user', content: contentPrompt }
        ],
      }),
    });

    if (!contentResponse.ok) {
      const errorText = await contentResponse.text();
      console.error('AI API error:', contentResponse.status, errorText);
      throw new Error(`AI API error: ${contentResponse.status}`);
    }

    const contentData = await contentResponse.json();
    const generatedText = contentData.choices[0].message.content;
    
    // Extract JSON from markdown code blocks if present
    let contentJson;
    try {
      const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) || 
                       generatedText.match(/```\n([\s\S]*?)\n```/);
      contentJson = JSON.parse(jsonMatch ? jsonMatch[1] : generatedText);
    } catch (e) {
      console.error('Failed to parse JSON:', generatedText);
      throw new Error('Failed to parse AI response');
    }

    let imageUrl = null;

    // Generate image if requested
    if (generateImage) {
      const imagePrompt = `Create a beautiful, professional product photo of ${craftDescription}. High quality, well-lit, artistic composition, suitable for e-commerce and social media marketing.`;
      
      const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image',
          messages: [
            { role: 'user', content: imagePrompt }
          ],
          modalities: ['image', 'text']
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url || null;
      } else {
        console.error('Image generation failed:', await imageResponse.text());
      }
    }

    // Save to database
    const { error: dbError } = await supabaseClient
      .from('artisan_content')
      .insert({
        user_id: user.id,
        artisan_name: artisanName,
        craft_description: craftDescription,
        brand_story: contentJson.brandStory,
        instagram_caption: contentJson.instagramCaption,
        facebook_caption: contentJson.facebookCaption,
        twitter_caption: contentJson.twitterCaption,
        reel_script: contentJson.reelScript,
        suggested_price: parseFloat(contentJson.suggestedPrice),
        tags: contentJson.tags,
        image_url: imageUrl,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save content');
    }

    return new Response(JSON.stringify({
      ...contentJson,
      imageUrl,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
