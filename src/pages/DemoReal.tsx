import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, Loader2, LogOut, Copy, Download, History, User } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DemoReal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [artisanName, setArtisanName] = useState('');
  const [craftDescription, setCraftDescription] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [generateImage, setGenerateImage] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadUserRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setUserRole(data?.role || 'user');
    } catch (error) {
      console.error('Error loading role:', error);
      setUserRole('user');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'Content copied to clipboard',
    });
  };

  const downloadContent = () => {
    if (!generatedContent) return;

    const content = `
Artisan: ${artisanName}
Craft: ${craftDescription}

BRAND STORY
${generatedContent.brandStory}

INSTAGRAM
${generatedContent.instagramCaption}

FACEBOOK
${generatedContent.facebookCaption}

TWITTER
${generatedContent.twitterCaption}

REEL SCRIPT
${generatedContent.reelScript}

PRICING: $${generatedContent.suggestedPrice}

HASHTAGS: ${generatedContent.tags?.join(', ')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artisanName.replace(/\s+/g, '_')}_content.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
          generateImage,
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
              Welcome, {user?.email} {userRole && `(${userRole.charAt(0).toUpperCase() + userRole.slice(1)})`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/history')} size="sm">
              <History className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile')} size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {userRole === 'seller' && (
          <Card className="glass-card mb-8 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm">Seller Account</Badge>
                <p className="text-sm text-muted-foreground">
                  You have access to advanced features for managing multiple artisan profiles
                </p>
              </div>
            </CardContent>
          </Card>
        )}
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="generate-image"
                    checked={generateImage}
                    onCheckedChange={(checked) => setGenerateImage(checked as boolean)}
                    disabled={isGenerating}
                  />
                  <Label
                    htmlFor="generate-image"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Generate product image (uses AI credits)
                  </Label>
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
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Generated Marketing Content
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(JSON.stringify(generatedContent, null, 2))}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadContent}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Generated Image */}
                  {generatedContent.imageUrl && (
                    <div>
                      <h4 className="font-semibold mb-2 text-lg">Product Image</h4>
                      <img
                        src={generatedContent.imageUrl}
                        alt={artisanName}
                        className="rounded-lg max-w-full md:max-w-md"
                      />
                    </div>
                  )}
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