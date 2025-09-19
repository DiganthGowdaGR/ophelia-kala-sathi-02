import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Share, Save, Sparkles, Instagram, Facebook, Twitter, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

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
}

const ReviewModal = ({ open, onOpenChange, content, mediaPreview }: ReviewModalProps) => {
  const { t } = useTranslation();
  const [isPosting, setIsPosting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

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

  if (!content) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            {t('review.title')}
          </DialogTitle>
        </DialogHeader>

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
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Brand Story
                    </CardTitle>
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
                        <CardTitle className="flex items-center gap-2 text-base">
                          {platform === 'instagram' && <Instagram className="h-4 w-4" />}
                          {platform === 'facebook' && <Facebook className="h-4 w-4" />}
                          {platform === 'twitter' && <Twitter className="h-4 w-4" />}
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </CardTitle>
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
                    <CardTitle>Reel/Video Script</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <p className="text-sm leading-relaxed">{content.reelScript}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
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
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;