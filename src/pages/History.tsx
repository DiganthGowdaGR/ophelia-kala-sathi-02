import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Trash2, Download, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadHistory();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  };

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('artisan_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading history',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('artisan_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContent(content.filter(item => item.id !== id));
      toast({
        title: 'Deleted',
        description: 'Content deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const downloadContent = (item: any) => {
    const content = `
Artisan: ${item.artisan_name}
Craft: ${item.craft_description}

BRAND STORY
${item.brand_story}

INSTAGRAM
${item.instagram_caption}

FACEBOOK
${item.facebook_caption}

TWITTER
${item.twitter_caption}

REEL SCRIPT
${item.reel_script}

PRICING: $${item.suggested_price}

HASHTAGS: ${item.tags?.join(', ')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.artisan_name.replace(/\s+/g, '_')}_content.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-card py-4 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => navigate('/demo')} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Generator
          </Button>
          <h1 className="text-2xl font-bold">Content History</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {content.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No content generated yet</p>
              <Button onClick={() => navigate('/demo')} className="mt-4">
                Generate Content
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {content.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{item.artisan_name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadContent(item)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteContent(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-1">Craft</p>
                      <p className="text-sm text-muted-foreground">{item.craft_description}</p>
                    </div>

                    {item.image_url && (
                      <div>
                        <p className="text-sm font-semibold mb-2">Generated Image</p>
                        <img
                          src={item.image_url}
                          alt={item.artisan_name}
                          className="rounded-lg max-w-md"
                        />
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-semibold mb-1">Brand Story</p>
                      <p className="text-sm text-muted-foreground">{item.brand_story}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-semibold mb-1">Instagram</p>
                        <p className="text-xs text-muted-foreground">{item.instagram_caption}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">Facebook</p>
                        <p className="text-xs text-muted-foreground">{item.facebook_caption}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">Twitter</p>
                        <p className="text-xs text-muted-foreground">{item.twitter_caption}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-semibold">Price</p>
                        <p className="text-lg font-bold text-primary">${item.suggested_price}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.map((tag: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;