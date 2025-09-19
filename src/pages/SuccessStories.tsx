import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Quote, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const SuccessStories = () => {
  const { t } = useTranslation();

  const successStories = [
    {
      id: 1,
      name: 'Kavya Reddy',
      region: 'Karnataka',
      craft: 'Channapatna Toys',
      image: '🪆',
      quote: 'Ophelia AI helped me reach customers worldwide. My monthly income increased by 300% in just 3 months!',
      beforeIncome: '₹8,000',
      afterIncome: '₹32,000',
      followers: '15K+',
      platforms: ['Instagram', 'Facebook'],
    },
    {
      id: 2,
      name: 'Rajesh Meena',
      region: 'Rajasthan',
      craft: 'Blue Pottery',
      image: '🏺',
      quote: 'The AI-generated stories about my pottery heritage touched so many hearts. Orders are pouring in from across India!',
      beforeIncome: '₹12,000',
      afterIncome: '₹48,000',
      followers: '22K+',
      platforms: ['Instagram', 'Etsy'],
    },
    {
      id: 3,
      name: 'Meera Sharma',
      region: 'Gujarat',
      craft: 'Bandhani Textiles',
      image: '🧶',
      quote: 'I never knew how to market my bandhani work online. Now my textiles are featured in fashion blogs!',
      beforeIncome: '₹15,000',
      afterIncome: '₹65,000',
      followers: '28K+',
      platforms: ['Instagram', 'Pinterest'],
    },
    {
      id: 4,
      name: 'Suresh Kumar',
      region: 'Uttar Pradesh',
      craft: 'Brass Work',
      image: '🪔',
      quote: 'The viral reels created with Ophelia AI brought my brass diyas to international markets during Diwali season.',
      beforeIncome: '₹10,000',
      afterIncome: '₹55,000',
      followers: '18K+',
      platforms: ['Instagram', 'Facebook'],
    },
    {
      id: 5,
      name: 'Lakshmi Devi',
      region: 'Tamil Nadu',
      craft: 'Temple Jewelry',
      image: '💍',
      quote: 'AI helped tell the spiritual story behind my temple jewelry. Customers now understand the cultural value.',
      beforeIncome: '₹20,000',
      afterIncome: '₹85,000',
      followers: '35K+',
      platforms: ['Instagram', 'WhatsApp Business'],
    },
    {
      id: 6,
      name: 'Arjun Patel',
      region: 'Gujarat',
      craft: 'Wooden Carvings',
      image: '🪵',
      quote: 'From local exhibitions to global e-commerce platforms - Ophelia AI transformed my woodcraft business completely!',
      beforeIncome: '₹18,000',
      afterIncome: '₹72,000',
      followers: '25K+',
      platforms: ['Instagram', 'Amazon'],
    },
  ];

  const calculateGrowth = (before: string, after: string) => {
    const beforeNum = parseInt(before.replace(/[₹,]/g, ''));
    const afterNum = parseInt(after.replace(/[₹,]/g, ''));
    return Math.round(((afterNum - beforeNum) / beforeNum) * 100);
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
                {t('success.title')}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mt-6 max-w-3xl mx-auto">
                {t('success.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Active Artisans', value: '5,000+', color: 'text-primary' },
              { label: 'Average Income Growth', value: '340%', color: 'text-green-600' },
              { label: 'Total Revenue Generated', value: '₹2.5Cr+', color: 'text-purple-600' },
              { label: 'Social Media Followers', value: '1M+', color: 'text-blue-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full glass-card hover:shadow-large transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {story.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.region}</p>
                        <Badge variant="secondary" className="mt-1">
                          {story.craft}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Quote */}
                    <div className="relative">
                      <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                      <p className="text-sm italic text-muted-foreground leading-relaxed pl-6">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Income Comparison */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t('success.before')}:</span>
                        <span className="font-medium">{story.beforeIncome}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t('success.after')}:</span>
                        <span className="font-bold text-primary">{story.afterIncome}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <span className="text-sm font-medium">Growth:</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-bold">+{calculateGrowth(story.beforeIncome, story.afterIncome)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Social Stats */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Followers:</span>
                        <span className="font-medium">{story.followers}</span>
                      </div>
                      <div className="flex gap-2 justify-end">
                        {story.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                What Made Them Successful?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the key features that helped these artisans transform their businesses
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Cultural Storytelling',
                description: 'AI that understands and celebrates Indian craft heritage',
                icon: '📖',
              },
              {
                title: 'Multi-Platform Content',
                description: 'Optimized content for Instagram, Facebook, and more',
                icon: '📱',
              },
              {
                title: 'Pricing Intelligence',
                description: 'Smart pricing suggestions based on market trends',
                icon: '💰',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center glass-card hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-white/90">
              Join thousands of Indian artisans who have transformed their businesses with AI
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto gap-2"
              onClick={() => window.location.href = '/signup'}
            >
              {t('success.cta')}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;