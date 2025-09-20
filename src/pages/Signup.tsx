import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Mail, Lock, User, Phone, Chrome, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy signup - just simulate loading and redirect
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast.success('Account created successfully! Welcome to Ophelia AI!');
    
    // Always redirect to analytics (dummy auth)
    setTimeout(() => {
      window.location.href = '/analytics';
    }, 500);
  };

  const handleSocialSignup = (provider: string) => {
    toast.success('Creating your account...');
    // Dummy social auth - direct redirect
    setTimeout(() => {
      window.location.href = '/analytics';
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent-light/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-xl bg-card/80 border-border/20 shadow-2xl">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-primary shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {t('auth.signup_title')}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-3 text-base">
                  Start your AI-powered marketing journey today
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('auth.name')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('auth.phone')}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {t('auth.signup_button')}
                    </>
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      {t('auth.or_continue')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup('Google')}
                    className="gap-2"
                  >
                    <Chrome className="h-4 w-4" />
                    {t('auth.google')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup('Facebook')}
                    className="gap-2"
                  >
                    <Facebook className="h-4 w-4" />
                    {t('auth.facebook')}
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">{t('auth.have_account')} </span>
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  {t('nav.login')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="glass-card border-border/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-center text-white">What you get:</h3>
              <div className="space-y-3 text-sm text-white/90">
                {[
                  '✨ AI-powered content generation',
                  '📈 Real-time analytics dashboard',
                  '🎯 Multi-platform optimization',
                  '💰 Smart pricing recommendations',
                  '🌍 Global market reach',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;