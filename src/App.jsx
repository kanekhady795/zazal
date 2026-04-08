

import { useState, useEffect, useRef, useCallback } from "react";
import studio1 from './assets/studio1.png';
import portrait1 from './assets/portrait1.png';
import famille1 from './assets/famille1.png';
import mariage1 from './assets/mariage1.png';
import event1 from './assets/event1.png';

/* ============================================================
   DONNÉES — modifiez ici vos infos, tarifs, témoignages
   ============================================================ */
const CONTACT = {
  phone: "771612935",
  whatsapp: "221771612935",
  email: "Salioudiop292@gmail.com",
  instagram: "https://www.instagram.com/zazaldesignofficiel",
  tiktok: "https://www.tiktok.com/@zazal.d",
  address: "DKR / Diamaguène / Tally Mame Diarra",
};

const PRICING = [
  { photos: 2,  price: 3000,  popular: false },
  { photos: 3,  price: 5000,  popular: false },
  { photos: 4,  price: 6000,  popular: false },
  { photos: 5,  price: 8000,  popular: true  },
  { photos: 6,  price: 10000, popular: false },
  { photos: 8,  price: 15000, popular: false },
  { photos: 10, price: 18000, popular: true  },
  { photos: 15, price: 30000, popular: false },
  { photos: 20, price: 35000, popular: false },
];

const GALLERY_DATA = [
  {
    id: "studio", label: "Studio", icon: "🎬",
    photos: [
      { src: studio1, alt: "Séance studio pro 1", bg: "#1a1a2e" },
      // { src: null, alt: "Séance studio pro 2", bg: "#16213e" },
      // { src: null, alt: "Séance studio pro 3", bg: "#0f3460" },
      // { src: null, alt: "Séance studio pro 4", bg: "#1a1a3e" },
    ],
  },
  {
    id: "portrait", label: "Portrait", icon: "👤",
    photos: [
      { src: portrait1, alt: "Portrait artistique 1", bg: "#2d1b00" },
      // { src: null, alt: "Portrait artistique 2", bg: "#3d2200" },
      // { src: null, alt: "Portrait artistique 3", bg: "#1a0a00" },
      // { src: null, alt: "Portrait artistique 4", bg: "#4a2b00" },
    ],
  },
  {
    id: "famille", label: "Famille", icon: "👨‍👩‍👧",
    photos: [
      { src: famille1, alt: "Photo de famille 1", bg: "#001a1a" },
      // { src: null, alt: "Photo de famille 2", bg: "#003333" },
      // { src: null, alt: "Photo de famille 3", bg: "#002626" },
      // { src: null, alt: "Photo de famille 4", bg: "#004040" },
    ],
  },
  {
    id: "mariage", label: "Mariage", icon: "💍",
    photos: [
      // { src: null, alt: "Mariage cérémonie 1", bg: "#1a0020" },
      // { src: null, alt: "Mariage cérémonie 2", bg: "#2a0033" },
      // { src: null, alt: "Mariage cérémonie 3", bg: "#15001a" },
      { src: mariage1, alt: "Mariage cérémonie 4", bg: "#330040" },
    ],
  },
  {
    id: "evenements", label: "Événements", icon: "🎉",
    photos: [
      { src: event1, alt: "Événement festif 1", bg: "#1a1000" },
      // { src: null, alt: "Événement festif 2", bg: "#2a1800" },
      // { src: null, alt: "Événement festif 3", bg: "#0d0800" },
      // { src: null, alt: "Événement festif 4", bg: "#332000" },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Aminata Diallo", role: "Séance Portrait", avatar: "AD",
    text: "ZAZAL Studio a capturé mon essence avec une sensibilité rare. Les photos sont magnifiques, le cadre chaleureux et très professionnel. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Moussa & Fatou Ndiaye", role: "Mariage", avatar: "MF",
    text: "Notre mariage a été immortalisé avec une qualité exceptionnelle. Chaque photo raconte une histoire. ZAZAL Studio a dépassé toutes nos attentes !",
    rating: 5,
  },
  {
    name: "Ibrahima Sow", role: "Photos Business", avatar: "IS",
    text: "Des photos professionnelles pour mon portfolio. Service impeccable, résultat impressionnant. Le studio maîtrise parfaitement la lumière et la mise en scène.",
    rating: 5,
  },
  {
    name: "Mariama Ba", role: "Photo de Famille", avatar: "MB",
    text: "Toute ma famille rassemblée dans de belles photos. L'ambiance était détendue et les photos sont tout simplement parfaites. Merci ZAZAL !",
    rating: 5,
  },
  {
    name: "Oumar Traoré", role: "Événement Corporate", avatar: "OT",
    text: "Couverture complète de notre événement d'entreprise. Très professionnel, discret et efficace. Les photos reflètent parfaitement l'esprit de notre marque.",
    rating: 5,
  },
];

const SESSION_TYPES = [
  "Photos Studio",
  "Portrait Artistique",
  "Photo de Famille",
  "Mariage / Fiançailles",
  "Événement Professionnel",
  "Photo Business / CV",
  "Autre",
];

/* ============================================================
   STYLES GLOBAUX (injectés une seule fois)
   ============================================================ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body {
    background: #0a0a0a;
    color: #e8e0d0;
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #a07a2a; border-radius: 2px; }
  a { color: inherit; text-decoration: none; }
  button { cursor: none; font-family: 'Outfit', sans-serif; }
  input, select, textarea { font-family: 'Outfit', sans-serif; }

  @keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  @keyframes scanline { 0% { top:-2px; } 100% { top:100%; } }
  @keyframes pulseRing { 0%,100% { box-shadow:0 0 0 0 rgba(212,168,67,.4); } 50% { box-shadow:0 0 0 16px rgba(212,168,67,0); } }
  @keyframes shimmer  { from { left:-100%; } to { left:200%; } }
  @keyframes grain {
    0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
    20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)}
    40%{transform:translate(2%,-1%)} 50%{transform:translate(-3%,2%)}
    60%{transform:translate(1%,-2%)} 70%{transform:translate(-2%,3%)}
    80%{transform:translate(3%,1%)} 90%{transform:translate(-1%,-3%)}
  }

  .zzl-cursor {
    position: fixed; width: 10px; height: 10px; background: #d4a843;
    border-radius: 50%; pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%); transition: width .2s, height .2s, background .2s;
    mix-blend-mode: difference;
  }
  .zzl-cursor.hov { width: 20px; height: 20px; }
  .zzl-follower {
    position: fixed; width: 34px; height: 34px; border: 1.5px solid #d4a843;
    border-radius: 50%; pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%); transition: width .25s, height .25s, opacity .25s;
    opacity: .55;
  }
  .zzl-follower.hov { width: 56px; height: 56px; opacity: .25; }

  .zzl-progress {
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9990;
    background: linear-gradient(90deg, #a07a2a, #d4a843, #f0cc7a);
    transition: width .1s linear;
  }

  .grain-bg::after {
    content:''; position:fixed; top:-50%; left:-50%; width:200%; height:200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
    opacity: .022; pointer-events: none; z-index: 999; animation: grain .5s steps(1) infinite;
  }

  .nav-link {
    background: none; border: none; font-family: 'Outfit', sans-serif;
    font-size: 12px; letter-spacing: .12em; text-transform: uppercase;
    color: #8a8070; padding: 4px 0; position: relative; transition: color .3s;
  }
  .nav-link:hover, .nav-link.active { color: #d4a843; }
  .nav-link.active::after {
    content:''; position:absolute; bottom:-2px; left:0; right:0; height:1px; background:#d4a843;
  }

  .btn-gold {
    background: #d4a843; border: none; color: #0a0a0a;
    font-family: 'Outfit', sans-serif; font-weight: 700;
    letter-spacing: .1em; transition: all .3s;
  }
  .btn-gold:hover { background: #f0cc7a; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(212,168,67,.35); }

  .btn-outline {
    background: transparent; border: 1px solid rgba(212,168,67,.45); color: #d4a843;
    font-family: 'Outfit', sans-serif; letter-spacing: .1em; transition: all .3s;
  }
  .btn-outline:hover { background: rgba(212,168,67,.09); border-color: #d4a843; }

  .section-tag {
    font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .35em;
    text-transform: uppercase; color: #d4a843; display: block; margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif; font-weight: 300;
    line-height: 1.05; letter-spacing: -.01em; color: #faf6ee;
  }
  .gold-bar {
    width: 56px; height: 2px; background: linear-gradient(90deg,#d4a843,transparent); margin-top: 18px;
  }

  .price-card {
    padding: 28px 22px; border: 1px solid rgba(255,255,255,.05);
    background: rgba(255,255,255,.02); transition: all .35s; position: relative; overflow: hidden;
  }
  .price-card:hover { transform: translateY(-5px); border-color: rgba(212,168,67,.3); background: rgba(212,168,67,.05); }
  .price-card.popular { border-color: rgba(212,168,67,.5); background: linear-gradient(135deg,rgba(212,168,67,.1),rgba(212,168,67,.04)); }

  .gallery-card {
    position: relative; overflow: hidden;
    background: #1a1a1a; cursor: none; transition: transform .4s;
  }
  .gallery-card:hover { transform: scale(1.025); }
  .gallery-card .overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg,transparent 40%,rgba(0,0,0,.7) 100%);
    opacity: 0; transition: opacity .3s; display: flex; align-items: flex-end; padding: 14px;
  }
  .gallery-card:hover .overlay { opacity: 1; }
  .gallery-card .corner {
    position: absolute; top:0; left:0; width:18px; height:18px;
    border-top: 2px solid #d4a843; border-left: 2px solid #d4a843;
    opacity: 0; transition: opacity .3s;
  }
  .gallery-card:hover .corner { opacity: 1; }

  .tab-btn {
    background: transparent; border: 1px solid rgba(212,168,67,.22);
    color: #8a8070; font-size: 13px; letter-spacing: .07em; padding: 10px 18px;
    transition: all .3s; display: flex; align-items: center; gap: 7px;
  }
  .tab-btn:hover { border-color: #d4a843; color: #d4a843; }
  .tab-btn.active { background: #d4a843; border-color: #d4a843; color: #0a0a0a; font-weight: 600; }

  .testi-card {
    background: linear-gradient(135deg,rgba(212,168,67,.07),rgba(212,168,67,.02));
    border: 1px solid rgba(212,168,67,.15); padding: clamp(28px,5vw,52px);
    position: relative; animation: fadeIn .4s ease;
  }

  .form-field {
    width: 100%; background: rgba(255,255,255,.03); border: 1px solid rgba(212,168,67,.2);
    color: #e8e0d0; font-family:'Outfit',sans-serif; font-size: 14px;
    padding: 13px 15px; outline: none; transition: border-color .3s;
  }
  .form-field:focus { border-color: rgba(212,168,67,.55); }
  .form-label {
    display: block; font-family:'Space Mono',monospace; font-size:10px;
    letter-spacing:.22em; color:#8a8070; text-transform:uppercase; margin-bottom:7px;
  }
  select.form-field { appearance: none; cursor: none; color-scheme: dark;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M0 0l5 7 5-7z' fill='%23D4A843'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center;
  }

  .share-btn {
    background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
    padding: 16px; transition: all .3s; text-align: left; cursor: none;
    display: flex; flex-direction: column; gap: 3px; width: 100%;
  }
  .share-btn:hover { transform: translateY(-2px); }

  .social-chip {
    display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08); padding: 9px 15px;
    font-size: 13px; transition: all .3s; text-decoration: none; color: #e8e0d0;
  }
  .social-chip:hover { transform: translateY(-2px); }

  .lightbox-bg {
    position: fixed; inset: 0; background: rgba(0,0,0,.93);
    z-index: 900; display: flex; align-items: center; justify-content: center;
    animation: fadeIn .3s ease;
  }

  .wapp-float {
    position: fixed; bottom: 26px; right: 26px; width: 54px; height: 54px;
    background: #25d366; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-size: 26px; z-index: 700; text-decoration: none;
    box-shadow: 0 4px 18px rgba(37,211,102,.4); animation: pulseRing 3s infinite;
    transition: all .3s;
  }
  .wapp-float:hover { transform: scale(1.12); box-shadow: 0 8px 30px rgba(37,211,102,.6); }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mob-menu-btn { display: flex !important; }
    .two-col { grid-template-columns: 1fr !important; }
    .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 480px) {
    .pricing-grid { grid-template-columns: 1fr !important; }
  }
`;

/* ============================================================
   UTILITAIRES
   ============================================================ */
const fmt = (n) => n.toLocaleString("fr-FR");
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* ============================================================
   COMPOSANTS UTILITAIRES
   ============================================================ */
function SectionHeader({ tag, title, sub }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <span className="section-tag">— {tag}</span>
      <h2 className="section-title" style={{ fontSize: "clamp(34px,6vw,62px)", marginBottom: 14 }}>
        {title}
      </h2>
      {sub && (
        <p style={{ color: "#8a8070", fontSize: 15, fontStyle: "italic", maxWidth: 500, lineHeight: 1.65 }}>{sub}</p>
      )}
      <div className="gold-bar" />
    </div>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { id: "accueil", l: "Accueil" },
    { id: "galerie", l: "Galerie" },
    { id: "tarifs", l: "Tarifs" },
    { id: "temoignages", l: "Avis" },
    { id: "reservation", l: "Réserver" },
    { id: "contact", l: "Contact" },
  ];
  const go = (id) => { onNav(id); setMob(false); };
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 800,
        padding: scrolled ? "11px clamp(16px,5vw,44px)" : "22px clamp(16px,5vw,44px)",
        background: scrolled ? "rgba(10,10,10,.96)" : "linear-gradient(180deg,rgba(10,10,10,.75) 0%,transparent 100%)",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,67,.12)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all .4s",
      }}>
        <button onClick={() => go("accueil")} style={{ background: "none", border: "none", padding: 0 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 27, fontWeight: 300, color: "#d4a843", letterSpacing: ".15em", lineHeight: 1 }}>ZAZAL design </div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#8a8070", letterSpacing: ".28em", textTransform: "uppercase", marginTop: 2 }}>STUDIO & GALERIE</div>
          </div>
        </button>
        <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(({ id, l }) => (
            <button key={id} className={`nav-link${active === id ? " active" : ""}`} onClick={() => go(id)}>{l}</button>
          ))}
          <button className="btn-outline" onClick={() => go("reservation")} style={{ fontSize: 12, padding: "10px 20px" }}>📷 Réserver</button>
        </div>
        <button
          className="mob-menu-btn"
          onClick={() => setMob(!mob)}
          style={{ background: "none", border: "none", display: "none", flexDirection: "column", gap: 5, padding: 8 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 24, height: 1.5, background: "#d4a843", transition: "all .3s",
              transform: mob ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "scaleX(0)") : "none",
            }} />
          ))}
        </button>
      </nav>
      {mob && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(10,10,10,.97)", zIndex: 790,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30,
          animation: "fadeIn .3s ease",
        }}>
          {links.map(({ id, l }) => (
            <button key={id} onClick={() => go(id)} style={{
              background: "none", border: "none",
              fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300,
              color: active === id ? "#d4a843" : "#faf6ee", letterSpacing: ".06em",
            }}>{l}</button>
          ))}
        </div>
      )}
    </>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onNav }) {
  const [vis, setVis] = useState(false);
  const canvasRef = useRef(null);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.4 + .3, dx: (Math.random() - .5) * .28,
      dy: (Math.random() - .5) * .28, a: Math.random() * .45 + .08,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,67,${p.a})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > c.width) p.dx *= -1;
        if (p.y < 0 || p.y > c.height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const tr = (delay, extra = {}) => ({
    opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .85s ease ${delay}s, transform .85s ease ${delay}s`, ...extra,
  });

  return (
    <section id="accueil" style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
      justifyContent: "center", overflow: "hidden",
      background: "radial-gradient(ellipse at 28% 60%,rgba(212,168,67,.06) 0%,transparent 58%), radial-gradient(ellipse at 72% 18%,rgba(192,57,43,.04) 0%,transparent 50%), #0a0a0a",
    }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: .6 }} />
      {/* Vertical lines */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", top: 0, left: `${10 + i * 18}%`, width: 1, height: "100%",
          background: `linear-gradient(180deg,transparent,rgba(212,168,67,${.025 + i * .008}),transparent)`,
          pointerEvents: "none",
        }} />
      ))}
      {/* Scanline */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg,transparent,rgba(212,168,67,.28),transparent)",
        animation: "scanline 9s linear infinite", pointerEvents: "none",
      }} />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px", maxWidth: 880 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(212,168,67,.07)", border: "1px solid rgba(212,168,67,.18)",
          padding: "8px 20px", marginBottom: 30, ...tr(.18),
        }}>
          <span style={{ width: 6, height: 6, background: "#d4a843", borderRadius: "50%", animation: "pulseRing 2s infinite" }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: ".3em", color: "#d4a843", textTransform: "uppercase" }}>
            Diamaguène · Dakar
          </span>
        </div>
        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          fontSize: "clamp(58px,13vw,124px)", lineHeight: .92, letterSpacing: "-.02em",
          marginBottom: 10, ...tr(.32),
        }}>
          <span style={{ color: "#faf6ee" }}>ZA</span>
          <span style={{ color: "#d4a843", fontStyle: "italic" }}>ZAL</span>
        </h1>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(10px,1.8vw,13px)", letterSpacing: ".5em", color: "#8a8070", textTransform: "uppercase", marginBottom: 30, ...tr(.48) }}>
          Studio & Galerie d'Image
        </div>
        {/* Tagline */}
        <p style={{
          fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(17px,2.8vw,26px)",
          fontWeight: 300, fontStyle: "italic", color: "#e8e0d0",
          maxWidth: 580, margin: "0 auto 44px", lineHeight: 1.45, ...tr(.6),
        }}>
          Nous capturons vos moments importants<br />
          avec <span style={{ color: "#d4a843" }}>qualité</span> et <span style={{ color: "#d4a843" }}>créativité</span>
        </p>
        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", ...tr(.76) }}>
          {[
            { label: "📷 Voir la Galerie", id: "galerie", gold: true },
            { label: "📅 Prendre Rendez-vous", id: "reservation" },
            { label: "💰 Voir les Tarifs", id: "tarifs" },
          ].map(({ label, id, gold }) => (
            <button key={id} className={gold ? "btn-gold" : "btn-outline"} onClick={() => onNav(id)}
              style={{ fontSize: 14, padding: "14px 26px" }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
        opacity: vis ? .45 : 0, transition: "opacity 1s ease 1.4s",
        animation: vis ? "float 3s ease infinite 1.4s" : "none",
      }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: ".3em", color: "#8a8070" }}>SCROLL</span>
        <div style={{ width: 1, height: 30, background: "linear-gradient(180deg,#d4a843,transparent)" }} />
      </div>
      {/* Corner decos */}
      {[{ top: 82, left: 22, rot: 0 }, { bottom: 82, right: 22, rot: 180 }].map((s, i) => (
        <div key={i} style={{ position: "absolute", opacity: .28, ...s }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M0 38L0 0L38 0" stroke="rgba(212,168,67,.7)" strokeWidth="1.5" />
            <path d="M5 38L5 5L38 5" stroke="rgba(212,168,67,.22)" strokeWidth=".5" />
          </svg>
        </div>
      ))}
    </section>
  );
}

/* ============================================================
   GALERIE
   ============================================================ */
function Gallery() {
  const [cat, setCat] = useState("studio");
  const [lb, setLb] = useState(null);
  const current = GALLERY_DATA.find(c => c.id === cat);
  return (
    <section id="galerie" style={{
      padding: "clamp(80px,12vw,138px) clamp(16px,5vw,76px)",
      background: "linear-gradient(180deg,#0a0a0a 0%,#141414 100%)", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 55, right: -15, fontFamily: "'Cormorant Garamond',serif",
        fontSize: "clamp(80px,15vw,180px)", fontWeight: 300, color: "rgba(212,168,67,.025)",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
      }}>GALERIE</div>
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader tag="Notre Travail" title="Galerie Photo" sub="Chaque image raconte une histoire unique — découvrez notre univers créatif" />
        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 44, borderBottom: "1px solid rgba(212,168,67,.09)", paddingBottom: 22 }}>
          {GALLERY_DATA.map(c => (
            <button key={c.id} className={`tab-btn${cat === c.id ? " active" : ""}`} onClick={() => setCat(c.id)}>
              <span>{c.icon}</span><span>Photos {c.label}</span>
            </button>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14, animation: "fadeIn .4s ease" }}>
          {current.photos.map((p, i) => (
            <div key={i} className="gallery-card" onClick={() => setLb(p)}
              style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3", background: p.bg }}>
              {p.src
                ? <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ fontSize: 32, opacity: .3 }}>📷</span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(212,168,67,.35)", letterSpacing: ".18em", textTransform: "uppercase", textAlign: "center", padding: "0 12px" }}>{p.alt}</span>
                  </div>
              }
              <div className="overlay">
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#d4a843", fontStyle: "italic" }}>Voir en grand</p>
                  <div style={{ width: 28, height: 1, background: "#d4a843", marginTop: 5 }} />
                </div>
              </div>
              <div className="corner" />
            </div>
          ))}
        </div>
        {/* Import hint */}
        <div style={{ marginTop: 36, padding: "18px 22px", background: "rgba(212,168,67,.04)", border: "1px dashed rgba(212,168,67,.18)" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#8a8070", lineHeight: 1.9 }}>
            <span style={{ color: "#d4a843" }}></span><br />
             <span style={{ color: "#f0cc7a" }}></span><br />
             <span style={{ color: "#f0cc7a" }}></span><br />
           <span style={{ color: "#f0cc7a" }}></span> <span style={{ color: "#f0cc7a" }}></span> par <span style={{ color: "#f0cc7a" }}></span>
          </p>
        </div>
      </div>
      {/* Lightbox */}
      {lb && (
        <div className="lightbox-bg" onClick={() => setLb(null)}>
          <div style={{ position: "relative", maxWidth: "82vw" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: "min(600px,80vw)", height: "min(440px,70vh)", background: lb.bg || "#1a1a1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
              {lb.src
                ? <img src={lb.src} alt={lb.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <>
                    <span style={{ fontSize: 48 }}>📸</span>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#d4a843", fontStyle: "italic", textAlign: "center", padding: "0 20px" }}>{lb.alt}</p>
                  </>
              }
            </div>
            <button onClick={() => setLb(null)} style={{
              position: "absolute", top: -14, right: -14, background: "#d4a843", border: "none",
              color: "#0a0a0a", width: 34, height: 34, fontSize: 17, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   TARIFS
   ============================================================ */
function Pricing({ onReserve }) {
  return (
    <section id="tarifs" style={{
      padding: "clamp(80px,12vw,138px) clamp(16px,5vw,76px)",
      background: "linear-gradient(180deg,#141414 0%,#1e1e1e 100%)", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "50%", right: -90, width: 360, height: 360, background: "radial-gradient(circle,rgba(212,168,67,.04) 0%,transparent 70%)", transform: "translateY(-50%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader tag="Nos Prestations" title="Tarifs Studio" sub="Des formules adaptées à tous vos besoins, qualité professionnelle garantie" />
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 44 }}>
          {PRICING.map((item, i) => (
            <div key={i} className={`price-card${item.popular ? " popular" : ""}`}>
              {item.popular && (
                <div style={{ position: "absolute", top: 11, right: 11, background: "#d4a843", color: "#0a0a0a", fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: ".18em", padding: "4px 9px", textTransform: "uppercase" }}>
                  Populaire
                </div>
              )}
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#8a8070", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 10 }}>📸 Formule</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px,5vw,50px)", fontWeight: 300, color: item.popular ? "#d4a843" : "#faf6ee", lineHeight: 1, marginBottom: 4 }}>
                {item.photos}<span style={{ fontSize: 18, color: "#8a8070", marginLeft: 4 }}>photos</span>
              </div>
              <div style={{ fontSize: 21, fontWeight: 600, color: "#f0cc7a", marginBottom: 18 }}>
                {fmt(item.price)} <span style={{ fontSize: 12, color: "#8a8070" }}>FCFA</span>
              </div>
              <div style={{ width: "100%", height: 1, background: "rgba(212,168,67,.13)", marginBottom: 16 }} />
              <div style={{ fontSize: 12, color: "#8a8070", fontStyle: "italic", marginBottom: 18 }}>
                {fmt(Math.round(item.price / item.photos))} FCFA / photo
              </div>
              <button onClick={() => onReserve(item)} className={item.popular ? "btn-gold" : "btn-outline"} style={{ width: "100%", fontSize: 12, padding: "10px 0" }}>
                Choisir cette formule →
              </button>
            </div>
          ))}
        </div>
        {/* Footer note */}
        <div style={{ textAlign: "center", padding: "30px", border: "1px solid rgba(212,168,67,.13)", background: "rgba(212,168,67,.025)", position: "relative" }}>
          <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", width: 70, height: 1, background: "#d4a843" }} />
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontStyle: "italic", color: "#e8e0d0", marginBottom: 6 }}>
            Tarifs spéciaux pour événements & grandes familles
          </p>
          <p style={{ color: "#8a8070", fontSize: 13, marginBottom: 22 }}>Contactez-nous pour un devis personnalisé</p>
          <button className="btn-gold" onClick={() => onReserve(null)} style={{ fontSize: 14, padding: "13px 30px" }}>
            📅 Réserver une séance
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TÉMOIGNAGES
   ============================================================ */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setIdx(p => (p + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(t);
  }, [auto]);
  const t = TESTIMONIALS[idx];
  const go = (i) => { setIdx(i); setAuto(false); };
  return (
    <section id="temoignages" style={{
      padding: "clamp(80px,12vw,138px) clamp(16px,5vw,76px)",
      background: "#0a0a0a", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "14%", left: "4%", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(120px,20vw,240px)", color: "rgba(212,168,67,.018)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>"</div>
      <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader tag="Ce qu'ils disent" title="Témoignages" sub="La satisfaction de nos clients est notre plus belle récompense" />
        {/* Card */}
        <div className="testi-card" key={idx}>
          <div style={{ position: "absolute", top: 22, right: 28, fontFamily: "'Cormorant Garamond',serif", fontSize: 76, color: "rgba(212,168,67,.13)", lineHeight: 1, pointerEvents: "none" }}>"</div>
          {/* Stars */}
          <div style={{ display: "flex", gap: 4, marginBottom: 22 }}>
            {[...Array(t.rating)].map((_, i) => (
              <span key={i} style={{ color: "#d4a843", fontSize: 15, animation: `fadeIn .4s ease ${i * .08}s both` }}>★</span>
            ))}
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(17px,2.8vw,25px)", fontWeight: 300, fontStyle: "italic", color: "#e8e0d0", lineHeight: 1.5, marginBottom: 30, position: "relative", zIndex: 1 }}>
            {t.text}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{ width: 50, height: 50, background: "rgba(212,168,67,.1)", border: "1px solid rgba(212,168,67,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono',monospace", fontSize: 13, color: "#d4a843", fontWeight: 700, flexShrink: 0 }}>
              {t.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#faf6ee", marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#d4a843", letterSpacing: ".14em" }}>{t.role}</div>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
          {TESTIMONIALS.map((item, i) => (
            <button key={i} onClick={() => go(i)} style={{
              background: "none", border: `1px solid ${i === idx ? "#d4a843" : "rgba(212,168,67,.18)"}`,
              padding: "11px 15px", cursor: "none", transition: "all .3s",
              display: "flex", alignItems: "center", gap: 9,
              opacity: i === idx ? 1 : .45, transform: i === idx ? "scale(1.02)" : "scale(1)",
            }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#d4a843", fontWeight: 700 }}>{item.avatar}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 12, color: "#faf6ee", fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: "#8a8070" }}>{item.role}</div>
              </div>
            </button>
          ))}
        </div>
        {/* Progress */}
        <div style={{ marginTop: 22, height: 2, background: "rgba(212,168,67,.09)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: `${(idx / TESTIMONIALS.length) * 100}%`, width: `${100 / TESTIMONIALS.length}%`, height: "100%", background: "#d4a843", transition: "left .5s ease" }} />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RÉSERVATION
   ============================================================ */
function Reservation({ prefill }) {
  const [form, setForm] = useState({
    nom: "", telephone: "", date: "", heure: "",
    seance: prefill ? `Photos Studio — ${prefill.photos} photos (${fmt(prefill.price)} FCFA)` : "",
    message: "",
  });
  const [done, setDone] = useState(false);
  const [modal, setModal] = useState(false);
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => {
    if (prefill) up("seance", `Photos Studio — ${prefill.photos} photos (${fmt(prefill.price)} FCFA)`);
  }, [prefill]);

  const msg = () =>
    `🎯 *Nouvelle Réservation — ZAZAL design*\n\n` +
    `👤 *Nom :* ${form.nom}\n📞 *Téléphone :* ${form.telephone}\n📅 *Date :* ${form.date}\n🕐 *Heure :* ${form.heure}\n📸 *Séance :* ${form.seance}\n💬 *Message :* ${form.message || "Aucun"}`;

  const submit = () => {
    if (!form.nom || !form.telephone || !form.date || !form.heure || !form.seance) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setModal(true);
  };

  const sendWA = () => { window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg())}`, "_blank"); setDone(true); setModal(false); };
  const sendMail = () => { window.open(`mailto:${CONTACT.email}?subject=${encodeURIComponent("Réservation ZAZAL Studio — " + form.nom)}&body=${encodeURIComponent(msg().replace(/\*/g, ""))}`, "_blank"); setDone(true); setModal(false); };
  const openIG = () => { window.open(CONTACT.instagram, "_blank"); setDone(true); setModal(false); };
  const openTT = () => { window.open(CONTACT.tiktok, "_blank"); setDone(true); setModal(false); };

  if (done) return (
    <section id="reservation" style={{ padding: "clamp(80px,12vw,138px) clamp(16px,5vw,76px)", background: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center", animation: "fadeInUp .8s ease", maxWidth: 480 }}>
        <div style={{ fontSize: 60, marginBottom: 22, animation: "float 3s ease infinite" }}>✨</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, fontStyle: "italic", color: "#d4a843", marginBottom: 14 }}>Merci {form.nom} !</h2>
        <p style={{ color: "#8a8070", fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>Votre demande a été envoyée. Nous vous confirmerons votre rendez-vous dans les plus brefs délais.</p>
        <button className="btn-outline" onClick={() => { setDone(false); setForm({ nom:"",telephone:"",date:"",heure:"",seance:"",message:"" }); }} style={{ padding: "12px 26px", fontSize: 13 }}>← Nouvelle réservation</button>
      </div>
    </section>
  );

  return (
    <section id="reservation" style={{ padding: "clamp(80px,12vw,138px) clamp(16px,5vw,76px)", background: "linear-gradient(180deg,#1e1e1e 0%,#0a0a0a 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -90, right: -90, width: 380, height: 380, border: "1px solid rgba(212,168,67,.05)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -55, right: -55, width: 280, height: 280, border: "1px solid rgba(212,168,67,.04)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader tag="Planifiez votre séance" title="Prendre Rendez-vous" sub="Remplissez le formulaire et envoyez-nous votre demande via WhatsApp, email ou nos réseaux sociaux" />
        <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(212,168,67,.11)", padding: "clamp(22px,5vw,46px)" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
            {[
              { k: "nom", label: "Nom complet", icon: "👤", placeholder: "Votre nom et prénom" },
              { k: "telephone", label: "Téléphone", icon: "📞", placeholder: "7X XXX XX XX", type: "tel" },
              { k: "date", label: "Date souhaitée", icon: "📅", type: "date" },
              { k: "heure", label: "Heure", icon: "🕐", type: "time" },
            ].map(({ k, label, icon, placeholder, type = "text" }) => (
              <div key={k}>
                <label className="form-label">{icon} {label} *</label>
                <input type={type} className="form-field" value={form[k]} onChange={e => up(k, e.target.value)} placeholder={placeholder} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label className="form-label">📸 Type de séance *</label>
            <select className="form-field" value={form.seance} onChange={e => up("seance", e.target.value)}>
              <option value="" style={{ background: "#1a1a1a" }}>Choisir un type de séance...</option>
              {SESSION_TYPES.map(s => <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 30 }}>
            <label className="form-label">💬 Message (optionnel)</label>
            <textarea className="form-field" rows={4} value={form.message} onChange={e => up("message", e.target.value)} placeholder="Précisions sur votre séance, vos attentes, nombre de personnes..." style={{ resize: "vertical", lineHeight: 1.6 }} />
          </div>
          <button className="btn-gold" onClick={submit} style={{ width: "100%", fontSize: 15, padding: "17px" }}>
            📅 Fixer mon rendez-vous →
          </button>
        </div>
      </div>
      {/* Share modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.87)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn .3s ease" }} onClick={() => setModal(false)}>
          <div style={{ background: "#1e1e1e", border: "1px solid rgba(212,168,67,.28)", padding: "38px", maxWidth: 460, width: "calc(100% - 32px)", position: "relative", animation: "fadeInUp .4s ease" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: "#d4a843", marginBottom: 7 }}>Envoyer votre réservation</h3>
            <p style={{ color: "#8a8070", fontSize: 13, marginBottom: 26 }}>Choisissez votre moyen de contact préféré :</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
              {[
                { color: "#25d366", emoji: "💬", label: "WhatsApp", sub: "Envoi direct & rapide", fn: sendWA },
                { color: "#ea4335", emoji: "✉️", label: "Email", sub: CONTACT.email.slice(0, 20) + "...", fn: sendMail },
                { color: "#e1306c", emoji: "📸", label: "Instagram", sub: "@zazaldesignofficiel", fn: openIG },
                { color: "#ffffff", emoji: "🎵", label: "TikTok", sub: "@zazal.d", fn: openTT },
              ].map(({ color, emoji, label, sub, fn }) => (
                <button key={label} className="share-btn" onClick={fn}
                  onMouseEnter={e => { e.currentTarget.style.background = color + "18"; e.currentTarget.style.borderColor = color + "55"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; }}>
                  <span style={{ fontSize: 22 }}>{emoji}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "#faf6ee" }}>{label}</span>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#8a8070" }}>{sub}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setModal(false)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#8a8070", fontSize: 20, cursor: "none" }}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  return (
    <section id="contact" style={{ padding: "clamp(80px,12vw,138px) clamp(16px,5vw,76px)", background: "#141414", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(212,168,67,.3),transparent)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          {/* Left */}
          <div>
            <SectionHeader tag="Nous trouver" title={"Contact &\nLocalisation"} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 38 }}>
              {[
                { icon: "📍", label: "Adresse", val: CONTACT.address },
                { icon: "📞", label: "Téléphone", val: CONTACT.phone, href: `tel:+${CONTACT.whatsapp}` },
                { icon: "✉️", label: "Email", val: CONTACT.email, href: `mailto:${CONTACT.email}` },
              ].map(({ icon, label, val, href }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 15 }}>
                  <div style={{ width: 44, height: 44, background: "rgba(212,168,67,.07)", border: "1px solid rgba(212,168,67,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div className="form-label" style={{ marginBottom: 4 }}>{label}</div>
                    {href
                      ? <a href={href} style={{ color: "#e8e0d0", fontSize: 14, transition: "color .3s" }} onMouseEnter={e => e.currentTarget.style.color = "#d4a843"} onMouseLeave={e => e.currentTarget.style.color = "#e8e0d0"}>{val}</a>
                      : <div style={{ color: "#e8e0d0", fontSize: 14 }}>{val}</div>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="form-label" style={{ marginBottom: 14 }}>Nous suivre</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { href: `https://wa.me/${CONTACT.whatsapp}`, emoji: "💬", label: "WhatsApp", color: "#25d366" },
                { href: CONTACT.instagram, emoji: "📸", label: "Instagram", color: "#e1306c" },
                { href: CONTACT.tiktok, emoji: "🎵", label: "TikTok", color: "#ffffff" },
                { href: `mailto:${CONTACT.email}`, emoji: "✉️", label: "Email", color: "#d4a843" },
              ].map(({ href, emoji, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-chip"
                  onMouseEnter={e => { e.currentTarget.style.background = color + "16"; e.currentTarget.style.borderColor = color + "50"; e.currentTarget.style.color = color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.color = "#e8e0d0"; e.currentTarget.style.transform = "none"; }}>
                  <span style={{ fontSize: 16 }}>{emoji}</span><span>{label}</span>
                </a>
              ))}
            </div>
          </div>
          {/* Right */}
          <div>
            {/* Map placeholder */}
            <div style={{ width: "100%", aspectRatio: "4/3", background: "rgba(212,168,67,.04)", border: "1px solid rgba(212,168,67,.13)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 22, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,168,67,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,168,67,.04) 1px,transparent 1px)", backgroundSize: "38px 38px" }} />
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 46, marginBottom: 10, animation: "float 3s ease infinite" }}>📍</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, fontStyle: "italic", color: "#d4a843", marginBottom: 6 }}>Diamaguène, Dakar</p>
                <p style={{ color: "#8a8070", fontSize: 13 }}>Tally Mame Diarra</p>
              </div>
              <a href="https://maps.google.com/?q=Diamaguene+Dakar+Senegal" target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ position: "relative", zIndex: 1, fontSize: 12, padding: "9px 18px" }}>
                Voir sur Google Maps →
              </a>
            </div>
            {/* Hours */}
            <div style={{ padding: "22px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(212,168,67,.09)" }}>
              <div className="form-label" style={{ color: "#d4a843", marginBottom: 14 }}>🕐 Horaires d'ouverture</div>
              {[
                { j: "Tous les jours" },
              ].map(({ j, h }) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(212,168,67,.06)" }}>
                  <span style={{ color: "#8a8070", fontSize: 14 }}>{j}</span>
                  <span style={{ color: "#e8e0d0", fontSize: 14, fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{ padding: "28px clamp(16px,5vw,76px)", background: "#0a0a0a", borderTop: "1px solid rgba(212,168,67,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
      <div>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#d4a843", letterSpacing: ".14em", marginRight: 8 }}>ZAZAL design</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#8a8070", letterSpacing: ".28em", textTransform: "uppercase" }}>Studio & Galerie</span>
      </div>
      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#8a8070", letterSpacing: ".14em" }}>
        © {new Date().getFullYear()} ZAZAL design Studio — Diamaguène, Dakar 📸
      </p>
      <div style={{ display: "flex", gap: 16 }}>
        {[`https://wa.me/${CONTACT.whatsapp}`, CONTACT.instagram, CONTACT.tiktok, `mailto:${CONTACT.email}`].map((href, i) => (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 18, opacity: .42, transition: "opacity .3s, transform .3s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = ".42"; e.currentTarget.style.transform = "none"; }}>
            {["💬", "📸", "🎵", "✉️"][i]}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ============================================================
   APP PRINCIPALE
   ============================================================ */
export default function App() {
  const [active, setActive] = useState("accueil");
  const [scroll, setScroll] = useState(0);
  const [cur, setCur] = useState({ x: -200, y: -200 });
  const [fol, setFol] = useState({ x: -200, y: -200 });
  const [hov, setHov] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const folRef = useRef({ x: -200, y: -200 });

  /* Inject global CSS once */
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  /* Custom cursor */
  useEffect(() => {
    const onMove = e => { setCur({ x: e.clientX, y: e.clientY }); folRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf;
    const follow = () => {
      setFol(p => ({ x: p.x + (folRef.current.x - p.x) * .11, y: p.y + (folRef.current.y - p.y) * .11 }));
      raf = requestAnimationFrame(follow);
    };
    follow();
    const onEnter = () => setHov(true);
    const onLeave = () => setHov(false);
    const addListeners = () => {
      document.querySelectorAll("button,a,[role=button]").forEach(el => {
        el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();
    const obs = new MutationObserver(addListeners);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  /* Scroll progress & scroll spy */
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScroll((top / total) * 100);
    };
    const sections = ["accueil", "galerie", "tarifs", "temoignages", "reservation", "contact"];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.28 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const nav = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleReserve = (item) => { setPrefill(item); setTimeout(() => nav("reservation"), 80); };

  return (
    <div className="grain-bg" style={{ position: "relative" }}>
      {/* Cursor */}
      <div className={`zzl-cursor${hov ? " hov" : ""}`} style={{ left: cur.x, top: cur.y }} />
      <div className={`zzl-follower${hov ? " hov" : ""}`} style={{ left: fol.x, top: fol.y }} />
      {/* Progress bar */}
      <div className="zzl-progress" style={{ width: `${scroll}%` }} />
      {/* Sections */}
      <Navbar active={active} onNav={nav} />
      <Hero onNav={nav} />
      <Gallery />
      <Pricing onReserve={handleReserve} />
      <Testimonials />
      <Reservation prefill={prefill} />
      <Contact />
      <Footer />
      {/* WhatsApp float */}
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="wapp-float" title="WhatsApp">💬</a>
    </div>
  );
}