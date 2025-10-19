"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { handleFileChange } from "@jmacera/cloudinary-image-upload";


interface PDFUploadProps {
  onUpload: (url: string) => void;
  onRemove: () => void;
  currentUrl?: string;
}

export function PDFUpload({ onUpload, onRemove, currentUrl }: PDFUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to convert PDF to PNG using dynamic import
  // const convertPdfToImage = async (file: File): Promise<File> => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       // Dynamic import to avoid build-time issues
  //       const pdfjsLib = await import('pdfjs-dist');
        
  //       // Configure worker
  //       pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        
  //       const reader = new FileReader();
        
  //       reader.onload = async (e) => {
  //         try {
  //           const arrayBuffer = e.target?.result as ArrayBuffer;
            
  //           // Load PDF document
  //           const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  //           const page = await pdf.getPage(1); // Get first page
            
  //           // Set up canvas
  //           const canvas = document.createElement('canvas');
  //           const context = canvas.getContext('2d');
            
  //           if (!context) {
  //             reject(new Error('Could not get canvas context'));
  //             return;
  //           }
            
  //           // Set canvas dimensions
  //           const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
  //           canvas.width = viewport.width;
  //           canvas.height = viewport.height;
            
  //           // Render PDF page to canvas
  //           await page.render({
  //             canvasContext: context,
  //             viewport: viewport
  //           }).promise;
            
  //           // Convert canvas to blob
  //           canvas.toBlob((blob) => {
  //             if (blob) {
  //               // Create a new File object from the blob
  //               const imageFile = new File([blob], `${file.name.replace('.pdf', '')}.png`, {
  //                 type: 'image/png',
  //                 lastModified: Date.now()
  //               });
  //               resolve(imageFile);
  //             } else {
  //               reject(new Error('Failed to convert canvas to blob'));
  //             }
  //           }, 'image/png', 0.9);
            
  //         } catch (error) {
  //           reject(error);
  //         }
  //       };
        
  //       reader.onerror = () => reject(new Error('Failed to read file'));
  //       reader.readAsArrayBuffer(file);
        
  //     } catch (error) {
  //       reject(new Error('Failed to load PDF.js library'));
  //     }
  //   });
  // };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type - accept PDFs and common image formats
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg", 
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml"
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Please upload a PDF file or image (JPG, PNG, GIF, WebP, SVG).");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      let fileToUpload: File;
      
      // Check if it's a PDF - convert to PNG
      // if (file.type === "application/pdf") {
      //   fileToUpload = await convertPdfToImage(file);
      // } else {
        // It's already an image - use as is
        fileToUpload = file;
      // }
      
      // Cloudinary configuration - use image upload
      const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload";
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your-upload-preset";
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "your-api-key";

      // Use the proper handleFileChange function
      const secureUrl = await handleFileChange(cloudinaryUrl, uploadPreset, apiKey, fileToUpload);
      
      if (secureUrl) {
        onUpload(secureUrl);
      } else {
        setUploadError("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("An error occurred while uploading. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Purchase Order Document</span>
        </CardTitle>
        <CardDescription>
          Upload a PDF file or image containing your purchase order request (PDFs will be converted to images)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentUrl ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">File uploaded successfully</p>
                <p className="text-xs text-green-600">Purchase order document attached</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="text-green-600 hover:text-green-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(currentUrl, "_blank")}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveFile}
              >
                Remove Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.svg"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Click to upload PDF or image</p>
              <p className="text-xs text-muted-foreground">or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">Max file size: 10MB • PDFs will be converted to images</p>
            </div>

            {isUploading && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="text-sm text-blue-800">Processing and uploading file...</p>
              </div>
            )}

            {uploadError && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-800">{uploadError}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
