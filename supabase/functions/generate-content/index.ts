import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { artisanName, craftDescription } = await req.json();

    console.log('Generating content for:', artisanName);

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a marketing expert for artisans. Generate compelling marketing content for an artisan.

Artisan Name: ${artisanName}
Craft Description: ${craftDescription}

Please provide:
1. Brand Story (2-3 paragraphs, emotional and engaging)
2. Instagram Caption (engaging, with emojis, 150 chars max)
3. Facebook Caption (informative, 200 chars max)
4. Twitter Caption (catchy, with hashtags, 280 chars max)
5. Reel Script (30-second video script)
6. Suggested Price Range (in USD)
7. 5 relevant hashtags

Format your response as JSON with these exact keys:
{
  "brandStory": "...",
  "instagramCaption": "...",
  "facebookCaption": "...",
  "twitterCaption": "...",
  "reelScript": "...",
  "suggestedPrice": 150,
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from markdown code blocks if present
    let jsonText = generatedText;
    if (generatedText.includes('```json')) {
      jsonText = generatedText.split('```json')[1].split('```')[0].trim();
    } else if (generatedText.includes('```')) {
      jsonText = generatedText.split('```')[1].split('```')[0].trim();
    }
    
    const content = JSON.parse(jsonText);

    // Save to database
    const { error: insertError } = await supabase
      .from('artisan_content')
      .insert({
        user_id: user.id,
        artisan_name: artisanName,
        craft_description: craftDescription,
        brand_story: content.brandStory,
        instagram_caption: content.instagramCaption,
        facebook_caption: content.facebookCaption,
        twitter_caption: content.twitterCaption,
        reel_script: content.reelScript,
        suggested_price: content.suggestedPrice,
        tags: content.tags
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw insertError;
    }

    console.log('Content generated and saved successfully');

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});