// The app's soft blue glow, kept to the top of the page so the layout reads as editorial.
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1100px] overflow-hidden">
      <div className="absolute -right-40 -top-44 h-[460px] w-[680px] animate-drift rounded-full bg-[var(--blob-1)] blur-[90px]" />
      <div className="absolute -top-56 right-[260px] h-[380px] w-[460px] animate-drift rounded-full bg-[var(--blob-2)] blur-[90px] [animation-delay:-6s]" />
    </div>
  );
}
