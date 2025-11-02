import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, Zap, Globe, TrendingUp, BarChart3, Shield, Star, CheckCircle2, Brain, Palette, Video } from 'lucide-react';
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
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 min-h-[100vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-pulse delay-75 blob" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] animate-pulse delay-150" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge className="inline-flex items-center gap-2 px-6 py-3 text-base glass-card standard-border">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">AI-Powered Marketing Revolution</span>
              </Badge>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1]">
                Revolutionizing the<br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Future of Data Tracking
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
                Discover what drives results and what doesn't to boost your search traffic
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={scrollToUpload}
                className="bg-gradient-primary hover:opacity-90 text-white text-lg px-12 py-7 h-auto gap-3 font-semibold rounded-full shadow-medium"
              >
                Get Started
                <ArrowRight className="h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="glass standard-border text-white hover:bg-white/10 text-lg px-12 py-7 h-auto gap-3 font-semibold rounded-full"
                onClick={() => window.location.href = '/demo'}
              >
                <Play className="h-6 w-6" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-20 relative"
            >
              <div className="glass-card rounded-3xl p-1 shadow-large relative">
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border/50">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-bold text-white">CANVAS</h3>
                      <p className="text-foreground/60">Pages / Dashboard</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                      <div className="h-4 w-4 rounded-full bg-secondary" />
                      <div className="h-4 w-4 rounded-full bg-accent" />
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Active Users", value: "43.2K", change: "+12.5%", icon: <Globe className="h-6 w-6" />, color: "primary" },
                      { label: "Engagement", value: "87%", change: "+23.1%", icon: <TrendingUp className="h-6 w-6" />, color: "secondary" },
                      { label: "Revenue", value: "$45K", change: "+18.3%", icon: <BarChart3 className="h-6 w-6" />, color: "accent" },
                      { label: "Sessions", value: "9.3K", change: "+31.2%", icon: <Zap className="h-6 w-6" />, color: "primary" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="glass-card standard-border rounded-2xl p-6 space-y-3 card-hover"
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl bg-${stat.color}/20 text-${stat.color}`}>
                            {stat.icon}
                          </div>
                          <span className="text-xs font-bold text-green-400 px-2 py-1 bg-green-400/10 rounded-full">{stat.change}</span>
                        </div>
                        <div className="text-4xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-foreground/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Chart Preview */}
                  <div className="glass-card rounded-2xl p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xl font-bold">Performance Overview</span>
                        <div className="flex gap-6 text-sm">
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-primary" />
                            Instagram
                          </span>
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-secondary" />
                            Facebook
                          </span>
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-accent" />
                            Twitter
                          </span>
                        </div>
                      </div>
                      <div className="h-64 flex items-end gap-3">
                        {[40, 65, 45, 80, 55, 90, 75, 60, 85, 70, 95, 80, 88, 92].map((height, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                            className="flex-1 bg-gradient-primary rounded-t-xl"
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

      {/* Capabilities Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="inline-flex items-center gap-2 px-6 py-3 text-base glass-card standard-border mb-6">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-medium">Capabilities AI Tools</span>
              </Badge>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Building <span className="bg-gradient-primary bg-clip-text text-transparent">AI solution</span>
              </h2>
              <p className="text-xl text-foreground/60 mt-8">
                Our AI-powered plan of solutions empowers your craft business with data-driven insights
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "AI Dubbing",
                description: "Transform your content into multiple languages instantly with AI-powered voice dubbing",
                icon: <Video className="h-8 w-8" />,
                gradient: "from-primary/30 to-secondary/30"
              },
              {
                title: "Gen Subtitles", 
                description: "Automatically generate accurate subtitles and captions for all your video content",
                icon: <Brain className="h-8 w-8" />,
                gradient: "from-secondary/30 to-accent/30"
              },
              {
                title: "Text To Speech",
                description: "Convert written content into natural-sounding speech with advanced AI voices",
                icon: <Palette className="h-8 w-8" />,
                gradient: "from-accent/30 to-primary/30"
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
                <div className="relative glass-card standard-border rounded-3xl p-8 text-center space-y-6 card-hover h-full">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-primary">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t('hero.upload_title')}
              </h2>
              <p className="text-xl text-white/70 mt-6">
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

      {/* Features Grid Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: 3D Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative glass-card standard-border rounded-3xl p-12 text-center space-y-8 shadow-large">
                <div className="text-8xl mb-8">🎨</div>
                <h3 className="text-4xl font-bold text-white">Intelligent Automation Solutions</h3>
                <p className="text-xl text-foreground/70">Transform your artistry into powerful marketing content</p>
                <div className="grid grid-cols-2 gap-4 pt-8">
                  {[
                    { value: "99%", label: "Accuracy" },
                    { value: "10x", label: "Faster" },
                    { value: "24/7", label: "Available" },
                    { value: "50+", label: "Languages" }
                  ].map((stat, i) => (
                    <div key={i} className="glass-card rounded-2xl p-4">
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-foreground/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Feature List */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {[
                {
                  title: "Smart Story Generation",
                  description: "AI creates compelling narratives about your craft's history and cultural significance",
                  icon: <Brain className="h-6 w-6" />
                },
                {
                  title: "Platform-Optimized Content",
                  description: "Tailored content for Instagram, Facebook, and Twitter with trending hashtags",
                  icon: <Globe className="h-6 w-6" />
                },
                {
                  title: "Real-time Analytics",
                  description: "Track performance metrics and optimize your content strategy on the fly",
                  icon: <BarChart3 className="h-6 w-6" />
                },
                {
                  title: "Secure & Reliable",
                  description: "Enterprise-grade security ensures your content and data remain protected",
                  icon: <Shield className="h-6 w-6" />
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card standard-border rounded-2xl p-6 card-hover"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-primary">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-foreground">{feature.title}</h4>
                      <p className="text-foreground/70">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-foreground">Trusted by Artisans Worldwide</h2>
              <p className="text-xl text-foreground/60 mt-4">Join thousands who've transformed their craft business</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card standard-border card-hover h-full">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-foreground/80 text-lg leading-relaxed">
                      "This AI tool completely transformed how I market my handcrafted items. Sales increased by 300% in just 2 months!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary" />
                      <div>
                        <p className="font-bold text-foreground">Artisan Name</p>
                        <p className="text-sm text-foreground/60">Traditional Craftsperson</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[150px] blob" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12 max-w-5xl mx-auto"
          >
            <div className="space-y-8">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ready to Transform Your<br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">Craft Business?</span>
              </h2>
              <p className="text-2xl text-white/70 max-w-3xl mx-auto">
                Join thousands of Indian artisans who are already using AI to grow their business and reach global audiences
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-7 h-auto gap-3 font-bold rounded-full shadow-large"
                onClick={() => window.location.href = '/auth'}
              >
                <Sparkles className="h-6 w-6" />
                Get Started Free
                <ArrowRight className="h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="glass standard-border text-white hover:bg-white/10 text-xl px-12 py-7 h-auto gap-3 font-bold rounded-full"
                onClick={scrollToUpload}
              >
                <Play className="h-6 w-6" />
                Try Demo
              </Button>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-white/70"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-primary border-2 border-background" />
                  ))}
                </div>
                <span className="text-lg font-medium">5,000+ Artisans</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-medium">4.9/5 Rating</span>
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
