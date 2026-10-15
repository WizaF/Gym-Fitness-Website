import { useRef } from "react";

export default function Tilt({ children, className = "" }) {
  const r = useRef(null);
  const move = (e) => {
    const b = r.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    r.current.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
  };
  const leave = () => { r.current.style.transform = ""; };
  return (
    <div ref={r} className={"card " + className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
