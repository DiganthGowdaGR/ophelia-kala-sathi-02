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
      <section className="relative overflow-hidden bg-gradient-hero py-32 lg:py-48 min-h-[90vh] flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-75" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Marketing for Artisans</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
                <span className="text-glow">{t('hero.title')}</span>
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={scrollToUpload}
                className="bg-gradient-primary hover:opacity-90 text-white glow text-lg px-10 py-6 h-auto gap-3 font-semibold"
              >
                <Play className="h-6 w-6" />
                {t('hero.cta_demo')}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 hover:border-white/50 text-lg px-10 py-6 h-auto gap-3 font-semibold"
                onClick={() => window.location.href = '/signup'}
              >
                <Sparkles className="h-6 w-6" />
                {t('hero.cta_signup')}
                <ArrowRight className="h-6 w-6" />
              </Button>
            </motion.div>

            {/* Dashboard Preview Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-16"
            >
              <div className="glass-card rounded-3xl p-8 shadow-large glow">
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white">Analytics Dashboard</h3>
                      <p className="text-white/60">Real-time insights for your craft business</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                      <div className="h-3 w-3 rounded-full bg-secondary animate-pulse delay-75" />
                      <div className="h-3 w-3 rounded-full bg-accent animate-pulse delay-150" />
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Impressions", value: "45.2K", change: "+12.5%", icon: "👁️" },
                      { label: "Engagement", value: "8.9K", change: "+23.1%", icon: "❤️" },
                      { label: "Conversions", value: "342", change: "+18.3%", icon: "🎯" },
                      { label: "Revenue", value: "₹1.2L", change: "+31.2%", icon: "💰" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="glass rounded-xl p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{stat.icon}</span>
                          <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-white/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="glass rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">Performance Metrics</span>
                      <div className="flex gap-4 text-sm">
                        <span className="flex items-center gap-2 text-primary">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          Instagram
                        </span>
                        <span className="flex items-center gap-2 text-secondary">
                          <div className="w-3 h-3 rounded-full bg-secondary" />
                          Facebook
                        </span>
                        <span className="flex items-center gap-2 text-accent">
                          <div className="w-3 h-3 rounded-full bg-accent" />
                          X
                        </span>
                      </div>
                    </div>
                    <div className="h-48 flex items-end gap-2">
                      {[40, 65, 45, 80, 55, 90, 75, 60, 85, 70, 95, 80].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                          className="flex-1 bg-gradient-primary rounded-t-lg opacity-80"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Powered by Advanced AI</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Your Craft into<br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">Compelling Content</span>
              </h2>
              <p className="text-xl text-muted-foreground mt-6">
                Watch your artistry become engaging marketing content in seconds
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Story Generation",
                description: "AI creates compelling narratives about your craft's history and cultural significance",
                icon: "📖",
                gradient: "from-primary/20 to-secondary/20"
              },
              {
                title: "Platform-Optimized Captions", 
                description: "Tailored content for Instagram, Facebook, and Twitter with trending hashtags",
                icon: "📱",
                gradient: "from-secondary/20 to-accent/20"
              },
              {
                title: "Video Script Creation",
                description: "Professional reel scripts that showcase your artistry and engage viewers",
                icon: "🎬",
                gradient: "from-accent/20 to-primary/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                <div className="relative glass-card rounded-3xl p-8 text-center space-y-4 hover:scale-[1.02] transition-all duration-300">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10 max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Ready to Transform Your<br />
                <span className="text-glow">Craft Business?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Join thousands of Indian artisans who are already using AI to grow their business and reach global audiences
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 glow text-lg px-10 py-6 h-auto gap-3 font-semibold"
                onClick={() => window.location.href = '/signup'}
              >
                <Sparkles className="h-6 w-6" />
                {t('hero.cta_signup')}
                <ArrowRight className="h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 hover:border-white/50 text-lg px-10 py-6 h-auto gap-3 font-semibold"
                onClick={scrollToUpload}
              >
                <Play className="h-6 w-6" />
                Try Demo First
              </Button>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-8 pt-8 text-white/70 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-white/20" />
                  ))}
                </div>
                <span>2,500+ Artisans</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9/5 Rating</span>
              </div>
            </motion.div>
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