import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Share, Save, Sparkles, Instagram, Facebook, Twitter, RefreshCw, Copy, Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: {
    story: string;
    captions: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
    reelScript: string;
    suggestedPrice: string;
    tags: string[];
  } | null;
  mediaPreview?: string;
  uploadedFile?: File | null;
  onContentGenerated?: (content: any) => void;
}

const ReviewModal = ({ open, onOpenChange, content, mediaPreview, uploadedFile, onContentGenerated }: ReviewModalProps) => {
  const { t } = useTranslation();
  const { toast: shadToast } = useToast();
  const [isPosting, setIsPosting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(!content);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    shadToast({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
    });
  };

  const downloadContent = () => {
    if (!content) return;
    
    const textContent = `
BRAND STORY
${content.story}

INSTAGRAM CAPTION
${content.captions.instagram}

FACEBOOK CAPTION
${content.captions.facebook}

TWITTER CAPTION
${content.captions.twitter}

REEL SCRIPT
${content.reelScript}

SUGGESTED PRICE
${content.suggestedPrice}

TAGS
${content.tags.map(tag => `#${tag}`).join(' ')}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artisan_content.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    shadToast({
      title: 'Downloaded',
      description: 'Content saved to file',
    });
  };

  const handlePostNow = async () => {
    setIsPosting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPosting(false);
    toast.success(t('review.post_success'));
    onOpenChange(false);
  };

  const handleDontPost = async () => {
    // Simulate save draft API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success(t('review.save_success'));
    onOpenChange(false);
  };

  const handleImprove = async () => {
    setIsImproving(true);
    
    // Simulate improvement API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsImproving(false);
    toast.success('Content improved! Check the updated version.');
  };

  const handleCreateAccountAndGenerate = async () => {
    if (!email || !uploadedFile) {
      toast.error('Please enter your email');
      return;
    }

    setIsGenerating(true);

    try {
      // Auto-create account with email
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8) + 'Aa1!', // Random password
        options: {
          data: {
            full_name: email.split('@')[0]
          }
        }
      });

      if (authError) throw authError;

      // Create user role
      if (authData.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: 'user'
          });

        if (roleError) console.error('Role creation error:', roleError);
      }

      // Convert file to base64 for AI analysis
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        // Call generate-content edge function
        const { data, error } = await supabase.functions.invoke('generate-content', {
          body: {
            imageBase64: base64,
            generateImage: false
          }
        });

        if (error) throw error;

        onContentGenerated?.(data);
        setShowEmailInput(false);
        toast.success('Account created and content generated!');
      };
      
      reader.readAsDataURL(uploadedFile);

    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            {showEmailInput ? 'Create Account & Generate Content' : t('review.title')}
          </DialogTitle>
        </DialogHeader>

        {showEmailInput ? (
          <div className="py-8 space-y-6">
            <div className="text-center space-y-4">
              {mediaPreview && (
                <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden">
                  <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-muted-foreground">
                Enter your email to create an account and generate AI content for your craft
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateAccountAndGenerate()}
                />
              </div>

              <Button
                onClick={handleCreateAccountAndGenerate}
                disabled={isGenerating || !email}
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Account & Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Create Account & Generate Content
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : content && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Media Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Media Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {mediaPreview ? (
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={mediaPreview} 
                      alt="Upload preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">No preview available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing & Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('review.price')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-4">
                  {content.suggestedPrice}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Suggested Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Content */}
          <div className="space-y-4">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="story">{t('review.story')}</TabsTrigger>
                <TabsTrigger value="captions">{t('review.captions')}</TabsTrigger>
                <TabsTrigger value="reel">{t('review.reel_script')}</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Brand Story
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(content.story, 'Brand Story')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <p className="text-sm leading-relaxed">{content.story}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="captions" className="space-y-4">
                <div className="space-y-4">
                  {Object.entries(content.captions).map(([platform, caption]) => (
                    <Card key={platform}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-base">
                            {platform === 'instagram' && <Instagram className="h-4 w-4" />}
                            {platform === 'facebook' && <Facebook className="h-4 w-4" />}
                            {platform === 'twitter' && <Twitter className="h-4 w-4" />}
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </CardTitle>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(caption, `${platform} caption`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{caption}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reel" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Reel/Video Script</CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(content.reelScript, 'Reel Script')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{content.reelScript}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
            </div>

            <Separator className="my-6" />

            {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            variant="outline"
            onClick={downloadContent}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download All
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleImprove}
              disabled={isImproving}
              className="gap-2"
            >
              {isImproving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {t('review.improve')}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDontPost}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {t('review.dont_post')}
            </Button>
            
            <Button
              onClick={handlePostNow}
              disabled={isPosting}
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white gap-2"
            >
              {isPosting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Share className="h-4 w-4" />
              )}
              {t('review.post_now')}
            </Button>
          </div>
        </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;