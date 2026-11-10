// Default gesture map (packages/settings.py) with the website's illustrations.
export const GESTURES = [
  { id: "shaka", name: "Thumb + pinky", action: "Next slide", hint: "Thumb and pinky out", img: "/images/hand-shaka.webp", fingers: [1, 0, 0, 0, 1] },
  { id: "fist", name: "Fist", action: "Previous slide", hint: "All fingers folded", img: "/images/hand-fist.webp", fingers: [0, 0, 0, 0, 0] },
  { id: "four", name: "Four fingers", action: "First slide", hint: "Thumb folded in", img: "/images/hand-four.webp", fingers: [0, 1, 1, 1, 1] },
  { id: "pinky", name: "Pinky only", action: "Last slide", hint: "Just the little finger", img: "/images/hand-pinky.webp", fingers: [0, 0, 0, 0, 1] },
  { id: "palm", name: "Open palm", action: "Laser / pen / off", hint: "All five fingers spread", img: "/images/hand-palm.webp", fingers: [1, 1, 1, 1, 1] },
  { id: "three", name: "Three fingers", action: "Black screen", hint: "Index, middle and ring", img: "/images/hand-three.webp", fingers: [0, 1, 1, 1, 0] },
  { id: "rock", name: "Index + pinky", action: "Exit slideshow", hint: "Held a little longer", img: "/images/hand-rock.webp", fingers: [0, 1, 0, 0, 1] },
  { id: "L", name: "L-shape", action: "Pause gestures", hint: "Thumb + index, held still", img: "/images/hand-l.webp", fingers: [1, 1, 0, 0, 0] },
  { id: "point", name: "Index only", action: "Volume up", hint: "Point straight up", img: "/images/hand-point.webp", fingers: [0, 1, 0, 0, 0] },
  { id: "peace", name: "Index + middle", action: "Volume down", hint: "Two fingers up", img: "/images/hand-peace.webp", fingers: [0, 1, 1, 0, 0] },
];

export const MOUSE_GESTURES = [
  { name: "Index finger up", action: "Move the cursor", img: "/images/hand-mouse-move.webp" },
  { name: "Pinch index + middle", action: "Click", img: "/images/hand-mouse-click.webp" },
  { name: "Three fingers up", action: "Scroll by moving your hand", img: "/images/hand-three.webp" },
  { name: "L-shape, held still", action: "Pause / resume", img: "/images/hand-l.webp" },
];
