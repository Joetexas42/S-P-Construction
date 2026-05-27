import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ImageLightboxProps {
  open: boolean;
  imageBase: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export function ImageLightbox({
  open,
  imageBase,
  alt,
  caption,
  onClose,
}: ImageLightboxProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          data-testid="image-lightbox-overlay"
        />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col bg-transparent focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          data-testid="image-lightbox"
          aria-describedby={caption ? "image-lightbox-caption" : undefined}
          onClick={onClose}
        >
          {imageBase && (
            <>
              <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>

              <DialogPrimitive.Close
                className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Close"
                data-testid="image-lightbox-close"
                onClick={(e) => e.stopPropagation()}
              >
                <X className="h-5 w-5" />
              </DialogPrimitive.Close>

              <div className="flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8">
                <img
                  src={`${imageBase}-1280w.webp`}
                  alt={alt}
                  className="max-h-full max-w-full object-contain"
                  data-testid="image-lightbox-image"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {caption && (
                <div className="shrink-0 px-4 pb-6 sm:pb-8 text-center">
                  <p
                    id="image-lightbox-caption"
                    className="text-sm sm:text-base text-white/90 italic leading-relaxed max-w-3xl mx-auto"
                    data-testid="image-lightbox-caption"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {caption}
                  </p>
                </div>
              )}
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
