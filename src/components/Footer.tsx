import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sparkles, MessageCircle } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { key: 'footer.about', href: '/about' },
    { key: 'footer.faq', href: '/faq' },
    { key: 'footer.privacy', href: '/privacy' },
    { key: 'footer.terms', href: '/terms' },
  ];

  return (
    <footer className="bg-gradient-card border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Ophelia AI
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 w-fit"
                asChild
              >
                <a href="mailto:support@ophelia-ai.com">
                  {t('footer.support')}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 w-fit"
                asChild
              >
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t('footer.whatsapp')}
                </a>
              </Button>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Preferences</h3>
            <LanguageToggle />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Ophelia AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for Indian Artisans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;