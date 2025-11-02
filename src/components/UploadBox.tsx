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

  const handleGenerateClick = () => {
    // Just notify parent that file is ready
    onUploadComplete({ file: selectedFile, preview });
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

            <Button 
              onClick={handleGenerateClick}
              className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white"
              size="lg"
            >
              Continue to Generate Content
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadBox;