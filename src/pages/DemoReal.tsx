import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, Loader2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DemoReal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [artisanName, setArtisanName] = useState('');
  const [craftDescription, setCraftDescription] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const handleGenerate = async () => {
    if (!artisanName.trim() || !craftDescription.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both artisan name and craft description.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          artisanName: artisanName.trim(),
          craftDescription: craftDescription.trim(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (error) throw error;

      setGeneratedContent(data);
      toast({
        title: 'Content generated!',
        description: 'Your marketing content is ready.',
      });
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: 'Generation failed',
        description: error.message || 'Failed to generate content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with logout */}
      <div className="bg-gradient-card py-4 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AI Content Generator</h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Artisan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="artisan-name">Artisan Name *</Label>
                  <Input
                    id="artisan-name"
                    placeholder="e.g., Priya Sharma"
                    value={artisanName}
                    onChange={(e) => setArtisanName(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="craft-description">Craft Description *</Label>
                  <Textarea
                    id="craft-description"
                    placeholder="Describe the craft, materials, techniques, and what makes it special..."
                    value={craftDescription}
                    onChange={(e) => setCraftDescription(e.target.value)}
                    rows={5}
                    disabled={isGenerating}
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  className="w-full gap-2"
                  disabled={isGenerating || !artisanName.trim() || !craftDescription.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generated Content */}
          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Generated Marketing Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Brand Story */}
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Brand Story</h4>
                    <p className="text-muted-foreground bg-muted p-4 rounded-lg leading-relaxed">
                      {generatedContent.brandStory}
                    </p>
                  </div>

                  {/* Social Media Captions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-pink-600">📷</span> Instagram
                      </h4>
                      <p className="text-sm bg-muted p-3 rounded-lg">
                        {generatedContent.instagramCaption}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-blue-600">📘</span> Facebook
                      </h4>
                      <p className="text-sm bg-muted p-3 rounded-lg">
                        {generatedContent.facebookCaption}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-cyan-500">🐦</span> Twitter
                      </h4>
                      <p className="text-sm bg-muted p-3 rounded-lg">
                        {generatedContent.twitterCaption}
                      </p>
                    </div>
                  </div>

                  {/* Reel Script */}
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Reel Script</h4>
                    <p className="text-muted-foreground bg-muted p-4 rounded-lg whitespace-pre-line">
                      {generatedContent.reelScript}
                    </p>
                  </div>

                  {/* Pricing & Tags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Suggested Pricing</h4>
                      <p className="text-2xl font-bold text-primary">
                        ${generatedContent.suggestedPrice}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Trending Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.tags?.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoReal;