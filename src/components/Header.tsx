import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.demo', href: '/demo' },
    { key: 'nav.analytics', href: '/analytics' },
    { key: 'nav.success', href: '/success' },
    { key: 'nav.pricing', href: '/pricing' },
  ];

  const handleSignupClick = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass neon-border border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary glow group-hover:scale-110 transition-transform">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Ophelia AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-white transition-smooth"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Link to="/login">
              <Button variant="outline" size="sm" className="glass neon-border text-white hover:bg-white/10 rounded-full">
                {t('nav.login')}
              </Button>
            </Link>
            <Button 
              onClick={handleSignupClick}
              className="bg-gradient-primary hover:opacity-90 text-white glow font-semibold rounded-full"
            >
              {t('hero.cta_signup')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 glass neon-border text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-smooth"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="flex gap-3 pt-3 border-t border-border/50">
                <Link to="/login" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Button>
                </Link>
                <Button 
                  onClick={handleSignupClick}
                  className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                >
                  {t('nav.signup')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;