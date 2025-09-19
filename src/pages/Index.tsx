import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import UploadBox from '../components/UploadBox';
import ReviewModal from '../components/ReviewModal';

const Index = () => {
  const { t } = useTranslation();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const handleUploadComplete = (result: any) => {
    setGeneratedContent(result);
    setShowReviewModal(true);
  };

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={scrollToUpload}
                className="bg-white text-primary hover:bg-white/90 shadow-large text-lg px-8 py-4 h-auto gap-2"
              >
                <Play className="h-5 w-5" />
                {t('hero.cta_demo')}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 h-auto gap-2"
                onClick={() => window.location.href = '/signup'}
              >
                <Sparkles className="h-5 w-5" />
                {t('hero.cta_signup')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-pulse" />
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {t('hero.upload_title')}
              </h2>
              <p className="text-lg text-muted-foreground mt-4">
                {t('hero.upload_subtitle')}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <UploadBox onUploadComplete={handleUploadComplete} />
          </motion.div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-20 lg:py-32 bg-gradient-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Powered by Advanced AI
              </h2>
              <p className="text-lg text-muted-foreground mt-4">
                Watch your craft transform into compelling marketing content in seconds
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Story Generation",
                description: "AI creates compelling narratives about your craft's history and cultural significance",
                icon: "📖"
              },
              {
                title: "Platform-Optimized Captions", 
                description: "Tailored content for Instagram, Facebook, and Twitter with trending hashtags",
                icon: "📱"
              },
              {
                title: "Video Script Creation",
                description: "Professional reel scripts that showcase your artistry and engage viewers",
                icon: "🎬"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center space-y-4 hover:shadow-medium transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ready to Transform Your Craft Business?
            </h2>
            <p className="text-lg text-white/90">
              Join thousands of Indian artisans who are already using AI to grow their business
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto gap-2"
              onClick={() => window.location.href = '/signup'}
            >
              <Sparkles className="h-5 w-5" />
              {t('hero.cta_signup')}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Review Modal */}
      <ReviewModal
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
        content={generatedContent}
        mediaPreview={uploadPreview}
      />
    </div>
  );
};

export default Index;