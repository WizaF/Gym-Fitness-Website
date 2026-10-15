import { useState } from "react";
import Reveal from "../components/Reveal.jsx";

const seed = [
  { id: 1, name: "Priya S.", text: "Hit my first 100kg deadlift today. The coaches never let me quit. 💪", hearts: 42 },
  { id: 2, name: "Rahul M.", text: "Down 14kg in 5 months. This gym feels like family.", hearts: 58 },
  { id: 3, name: "Ananya K.", text: "Morning HIIT crew, you are the reason I get out of bed ❤️", hearts: 31 },
  { id: 4, name: "Karan T.", text: "Recovery zone saved my back. Thank you, Coach Sana!", hearts: 27 },
];

export default function WallOfHeart() {
  const [posts, setPosts] = useState(seed);
  const [liked, setLiked] = useState({});
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const like = (id) => {
    const on = !liked[id];
    setLiked({ ...liked, [id]: on });
    setPosts(posts.map((p) => (p.id === id ? { ...p, hearts: p.hearts + (on ? 1 : -1) } : p)));
  };
  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setPosts([{ id: Date.now(), name: name.trim() || "Anonymous", text: text.trim(), hearts: 0 }, ...posts]);
    setText(""); setName("");
  };

  return (
    <section className="page pad">
      <Reveal><h2>Wall of 💘</h2><p className="sub">Wins, shout-outs and love notes from our community. Add yours.</p></Reveal>
      <form className="card form" onSubmit={add}>
        <input placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea rows="3" placeholder="Share a win or thank someone…" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn" type="submit">Post to the wall</button>
      </form>
      <div className="grid wall">
        {posts.map((p) => (
          <div className="card" key={p.id}>
            <p className="quote">“{p.text}”</p>
            <div className="meta">
              <b>{p.name}</b>
              <button className={"heart" + (liked[p.id] ? " on" : "")} onClick={() => like(p.id)}>
                {liked[p.id] ? "❤️" : "🤍"} {p.hearts}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
