import clsx from "clsx";

// A card with a soft glow that follows the pointer.
export default function Spotlight({ className, children, as: Tag = "div", ...rest }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={move} className={clsx("spotlight", className)} {...rest}>
      {children}
    </Tag>
  );
}
