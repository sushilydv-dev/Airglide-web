import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

// An app screenshot that opens full size in a lightbox.
export default function Screenshot({ src, alt, className, imgClassName, zoom = true, priority = false, width, height }) {
  const [open, setOpen] = useState(false);
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={clsx("block h-auto w-full select-none", imgClassName)}
      draggable={false}
    />
  );
  if (!zoom) return <div className={className}>{img}</div>;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className={clsx("group relative block w-full cursor-zoom-in text-left", className)} aria-label={`Enlarge: ${alt}`}>
          {img}
          <span className="pointer-events-none absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-10"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpen(false)}
              >
                <Dialog.Title className="sr-only">{alt}</Dialog.Title>
                <img src={src} alt={alt} className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl" />
                <Dialog.Close className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25" aria-label="Close">
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
