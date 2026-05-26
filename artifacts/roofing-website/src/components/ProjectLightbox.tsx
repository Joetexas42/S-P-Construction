import { useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Building2, Calendar, ChevronLeft, ChevronRight, Layers, Ruler, X } from "lucide-react";
import type { CityRecentProject } from "@/pages/CityPage";
import {
  buildImageSrcSet as buildProjectImageSrcSet,
  SIZES_HALF_COLUMN_GRID as PROJECT_IMAGE_SIZES,
} from "@/lib/responsiveImage";

function formatSqFt(n: number) {
  return n.toLocaleString("en-US");
}

interface ProjectLightboxProps {
  projects: CityRecentProject[];
  index: number | null;
  cityName: string;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export function ProjectLightbox({
  projects,
  index,
  cityName,
  onClose,
  onNavigate,
}: ProjectLightboxProps) {
  const open = index !== null && index >= 0 && index < projects.length;
  const project = open ? projects[index] : null;
  const total = projects.length;
  const hasSiblings = total > 1;

  const goPrev = useCallback(() => {
    if (index === null || !hasSiblings) return;
    onNavigate((index - 1 + total) % total);
  }, [index, hasSiblings, total, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null || !hasSiblings) return;
    onNavigate((index + 1) % total);
  }, [index, hasSiblings, total, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col bg-background sm:inset-4 sm:rounded-lg sm:overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          data-testid="project-lightbox"
          aria-describedby={undefined}
        >
          {project && (
            <>
              <DialogPrimitive.Title className="sr-only">
                {project.title}
              </DialogPrimitive.Title>

              <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center">
                <img
                  src={project.image}
                  srcSet={buildProjectImageSrcSet(project.image)}
                  sizes={PROJECT_IMAGE_SIZES}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain"
                  data-testid="project-lightbox-image"
                />

                <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-white bg-secondary px-2.5 py-1 rounded shadow">
                  {project.system}
                </span>

                <DialogPrimitive.Close
                  className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-secondary"
                  aria-label="Close"
                  data-testid="project-lightbox-close"
                >
                  <X className="h-5 w-5" />
                </DialogPrimitive.Close>

                {hasSiblings && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous project"
                      data-testid="project-lightbox-prev"
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next project"
                      data-testid="project-lightbox-next"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider text-white bg-black/60 px-3 py-1 rounded-full">
                      {index! + 1} / {total}
                    </div>
                  </>
                )}
              </div>

              <div className="border-t border-border bg-card p-5 sm:p-6 max-h-[45vh] overflow-y-auto">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  {cityName}, TX
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-tight text-foreground mb-4 leading-tight">
                  {project.title}
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                        Building
                      </dt>
                      <dd className="text-foreground">{project.buildingType}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Ruler className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                        Size
                      </dt>
                      <dd className="text-foreground">{formatSqFt(project.sqFt)} sq ft</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                        System
                      </dt>
                      <dd className="text-foreground">{project.system}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                        Completed
                      </dt>
                      <dd className="text-foreground">{project.completed}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
