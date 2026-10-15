import { useEffect, useRef, useState } from "react";

export default function Count({ to, suffix = "" }) {
  const [v, setV] = useState(0);
  const r = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const st = performance.now();
      const f = (n) => {
        const p = Math.min((n - st) / 1400, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    }, { threshold: 0 });
    io.observe(r.current);
    return () => io.disconnect();
  }, [to]);
  return <b ref={r}>{v.toLocaleString()}{suffix}</b>;
}
