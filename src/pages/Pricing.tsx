import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, ArrowRight, Sparkles, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individual artisans starting their digital journey',
      monthlyPrice: 299,
      annualPrice: 2990,
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: [
        'Up to 50 AI-generated posts per month',
        'Basic social media captions',
        'Image enhancement',
        'Instagram & Facebook integration',
        'Basic analytics dashboard',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for established artisans and small craft businesses',
      monthlyPrice: 599,
      annualPrice: 5990,
      icon: <Sparkles className="h-6 w-6" />,
      color: 'bg-primary',
      features: [
        'Up to 200 AI-generated posts per month',
        'Advanced storytelling & heritage content',
        'Video script generation',
        'Multi-platform optimization',
        'Advanced analytics & insights',
        'Pricing intelligence',
        'WhatsApp Business integration',
        'Priority email & chat support',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For craft cooperatives and large artisan communities',
      monthlyPrice: 1299,
      annualPrice: 12990,
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-purple-500',
      features: [
        'Unlimited AI-generated content',
        'Custom brand voice training',
        'Bulk content scheduling',
        'Team collaboration tools',
        'Advanced market insights',
        'Custom integrations',
        'Dedicated account manager',
        '24/7 phone & chat support',
        'Training workshops',
      ],
      popular: false,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (!isAnnual) return 0;
    const monthlyTotal = plan.monthlyPrice * 12;
    return monthlyTotal - plan.annualPrice;
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
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mt-6 max-w-3xl mx-auto">
                Choose the perfect plan to transform your craft business with AI-powered marketing
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-sm mx-auto"
            >
              <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-white/70'}`}>
                Monthly
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-white"
              />
              <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-white/70'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2 bg-green-500 text-white">
                  Save 17%
                </Badge>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full glass-card hover:shadow-large transition-all duration-300 ${
                  plan.popular ? 'border-primary/50 scale-105' : ''
                }`}>
                  <CardHeader className="pb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${plan.color} text-white`}>
                        {plan.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">
                          ₹{getPrice(plan).toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      </div>
                      {isAnnual && getSavings(plan) > 0 && (
                        <p className="text-sm text-green-600 font-medium">
                          Save ₹{getSavings(plan).toLocaleString()} annually
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      size="lg"
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'bg-gradient-primary hover:bg-gradient-primary/90'
                      } text-white gap-2`}
                      onClick={() => window.location.href = '/signup'}
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI understands Indian craft heritage and helps you tell your story to the world
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Cultural Storytelling',
                description: 'AI that understands Indian craft traditions and heritage',
                icon: '📖',
              },
              {
                title: 'Multi-Language Support',
                description: 'Generate content in English and regional languages',
                icon: '🌐',
              },
              {
                title: 'Platform Optimization',
                description: 'Tailored content for Instagram, Facebook, WhatsApp, and more',
                icon: '📱',
              },
              {
                title: 'Market Intelligence',
                description: 'Pricing insights and trend analysis for your crafts',
                icon: '📊',
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
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
              },
              {
                question: 'Do you offer discounts for cooperatives?',
                answer: 'Yes! We offer special pricing for craft cooperatives and artisan communities. Contact us for custom enterprise pricing.',
              },
              {
                question: 'What languages does the AI support?',
                answer: 'Currently, we support English and Kannada, with plans to add Hindi, Tamil, Telugu, and other regional languages soon.',
              },
              {
                question: 'Is there a free trial available?',
                answer: 'Yes! You can try our Starter plan free for 7 days. No credit card required.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
              Ready to Transform Your Craft Business?
            </h2>
            <p className="text-lg text-white/90">
              Join thousands of Indian artisans who are already using AI to grow their business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 gap-2"
                onClick={() => window.location.href = '/signup'}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 gap-2"
                onClick={() => window.location.href = '/demo'}
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;