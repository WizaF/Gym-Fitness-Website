import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "", delay = 0, tag: Tag = "div" }) {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current;
    const show = () => el.classList.add("in");
    // Already on screen when the page mounts? Reveal immediately (no waiting on the observer).
    const b = el.getBoundingClientRect();
    if (b.top < window.innerHeight && b.bottom > 0) { requestAnimationFrame(show); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { show(); io.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={r} className={"rv " + className} style={{ transitionDelay: delay + "ms" }}>{children}</Tag>;
}
