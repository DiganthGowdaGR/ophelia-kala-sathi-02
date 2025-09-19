import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl font-bold text-white mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-lg text-white/80 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
