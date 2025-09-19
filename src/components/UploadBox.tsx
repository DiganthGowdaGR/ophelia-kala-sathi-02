import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Image, Video, Music, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface UploadBoxProps {
  onUploadComplete: (result: any) => void;
}

const UploadBox = ({ onUploadComplete }: UploadBoxProps) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-8 w-8" />;
    if (type.startsWith('video/')) return <Video className="h-8 w-8" />;
    if (type.startsWith('audio/')) return <Music className="h-8 w-8" />;
    return <FileText className="h-8 w-8" />;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    // Create preview for images and videos
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI response
    const mockResult = {
      story: "This beautiful handcrafted piece showcases the intricate artistry of traditional Indian craftsmanship. Each detail tells a story of generations of skill passed down through families, creating not just an object, but a piece of cultural heritage.",
      captions: {
        instagram: "✨ Handcrafted with love and tradition ✨ Each piece tells a unique story of Indian artistry #HandmadeIndia #TraditionalCraft #ArtisanMade",
        facebook: "Discover the beauty of traditional Indian craftsmanship! This handcrafted piece represents hours of dedicated work and centuries of artistic tradition. Support local artisans and own a piece of history.",
        twitter: "🎨 Pure artistry in every detail! Supporting Indian artisans means preserving our cultural heritage. #MadeInIndia #Handcraft"
      },
      reelScript: "Start with a close-up of skilled hands at work... Show the intricate process... Reveal the beautiful finished piece... End with proud artisan holding their creation.",
      suggestedPrice: "₹2,500 - ₹4,500",
      tags: ["handmade", "traditional", "indian-craft", "artisan", "heritage"]
    };

    setIsUploading(false);
    onUploadComplete(mockResult);
    toast.success(t('upload.processing'));
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-primary/5 scale-105' 
            : selectedFile
            ? 'border-primary/50 bg-card'
            : 'border-border hover:border-primary/50 bg-card'
        }`}
      >
        {!selectedFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="p-12 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full transition-colors ${
                isDragging ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                <Upload className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {t('upload.drag_drop')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('upload.or')}
                </p>
              </div>

              <Button 
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {t('upload.browse')}
              </Button>

              <p className="text-xs text-muted-foreground">
                {t('upload.supported')}
              </p>
            </div>

            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*,video/*,audio/*,.txt,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                {preview ? (
                  selectedFile?.type.startsWith('image/') ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <video 
                      src={preview} 
                      className="w-16 h-16 object-cover rounded-lg"
                      muted
                    />
                  )
                ) : (
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    {getFileIcon(selectedFile.type)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={removeFile}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isUploading ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>{t('upload.uploading')}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            ) : (
              <Button 
                onClick={simulateUpload}
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                size="lg"
              >
                Generate AI Content
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadBox;