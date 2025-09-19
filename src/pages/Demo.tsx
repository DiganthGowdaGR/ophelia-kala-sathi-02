import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Demo = () => {
  const { t } = useTranslation();

  const demoSteps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: t('demo.step1_title'),
      description: t('demo.step1_desc'),
      color: 'bg-blue-500',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('demo.step2_title'),
      description: t('demo.step2_desc'),
      color: 'bg-primary',
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: t('demo.step3_title'),
      description: t('demo.step3_desc'),
      color: 'bg-green-500',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('demo.step4_title'),
      description: t('demo.step4_desc'),
      color: 'bg-purple-500',
    },
  ];

  // Sample artisan data for demo
  const sampleArtisan = {
    name: "Priya Sharma",
    craft: "Traditional Pottery",
    location: "Rajasthan, India",
    image: "/api/placeholder/400/300",
    originalContent: "Beautiful handmade clay pot with traditional Rajasthani patterns",
  };

  const generatedContent = {
    story: "This exquisite terracotta creation embodies centuries of Rajasthani pottery tradition. Each swirl and pattern tells the story of skilled hands that have perfected this art through generations, creating not just a vessel, but a piece of cultural heritage that connects us to our roots.",
    instagramCaption: "🏺✨ Handcrafted with love in the heart of Rajasthan! Each piece carries the soul of our ancient pottery traditions. From earth to art - witness the magic of traditional craftsmanship! 🇮🇳 #RajasthaniPottery #HandmadeInIndia #TraditionalCraft #ArtisanMade #CulturalHeritage",
    hashtags: ["#HandmadeInIndia", "#RajasthaniPottery", "#TraditionalCraft", "#ArtisanMade"],
    suggestedPrice: "₹1,200 - ₹2,500"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                {t('demo.title')}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mt-6 max-w-3xl mx-auto">
                {t('demo.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full glass-card hover:shadow-medium transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-white mx-auto mb-4`}>
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Step {index + 1}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 lg:py-32 bg-gradient-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                See It in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch how Ophelia AI transforms a simple craft photo into compelling marketing content
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Input Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Original Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        🏺
                      </div>
                      <p className="font-medium">Traditional Pottery</p>
                      <p className="text-sm text-muted-foreground">Handcrafted clay pot</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">Artisan: {sampleArtisan.name}</p>
                      <p className="text-sm text-muted-foreground">{sampleArtisan.location}</p>
                    </div>
                    <p className="text-sm bg-muted p-3 rounded-lg">
                      "{sampleArtisan.originalContent}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Output Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Generated Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Brand Story */}
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Brand Story</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg leading-relaxed">
                      {generatedContent.story}
                    </p>
                  </div>

                  {/* Social Media Caption */}
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Instagram Caption</h4>
                    <p className="text-sm bg-muted p-3 rounded-lg">
                      {generatedContent.instagramCaption}
                    </p>
                  </div>

                  {/* Tags & Pricing */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Trending Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Suggested Pricing</h4>
                      <p className="text-lg font-bold text-primary">
                        {generatedContent.suggestedPrice}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Try It Yourself?
            </h2>
            <p className="text-lg text-white/90">
              Start generating AI-powered marketing content for your crafts today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 gap-2"
                onClick={() => window.location.href = '/'}
              >
                Try Live Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 gap-2"
                onClick={() => window.location.href = '/signup'}
              >
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Demo;