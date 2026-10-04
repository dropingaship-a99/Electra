import { useEffect, useRef, useState } from 'react';
import heroImage from '@/assets/hero.jpg';
import wingsImage from '@/assets/angel-wings.jpg';
import statueImage from '@/assets/angel-statue.jpg';
import mouthImage from '@/assets/texture-mouth.jpg';
import fangsImage from '@/assets/fangs.jpg';

type Artist = { name: string; time: string; room: string; image: string };
const artists: Artist[] = [
  { name: 'ZENO', time: '19:00 — 23:00', room: 'MAIN FLOOR', image: wingsImage },
];

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [labelText, setLabelText] = useState('');
  useEffect(() => {
    let x = 0; let y = 0; let tx = 0; let ty = 0; let frame = 0;
    const move = (event: MouseEvent) => { tx = event.clientX; ty = event.clientY; };
    const animate = () => {
      x += (tx - x) * .18; y += (ty - y) * .18;
      [dot.current, ring.current, label.current].forEach((node) => { if (node) node.style.left = `${x}px`; if (node) node.style.top = `${y}px`; });
      frame = requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', move); frame = requestAnimationFrame(animate);
    const enter = (event: Event) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) { setHover(true); setLabelText(interactive.getAttribute('data-cursor') ?? ''); }
    };
    const leave = (event: Event) => { if ((event.target as HTMLElement).closest('a, button, [data-cursor]')) { setHover(false); setLabelText(''); } };
    document.addEventListener('mouseover', enter); document.addEventListener('mouseout', leave);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame); document.removeEventListener('mouseover', enter); document.removeEventListener('mouseout', leave); };
  }, []);
  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className={`cursor-ring ${hover ? 'is-hover' : ''}`} /><div ref={label} className={`cursor-label ${labelText ? 'visible' : ''}`}>{labelText}</div></>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [['SIGNAL', 'signal'], ['LINEUP', 'lineup'], ['FLOOR', 'floor'], ['ARCHIVE', 'archive'], ['ABOUT', 'about']];
  return <header className="topbar">
    <a className="wordmark" href="#top" data-cursor="TOP" data-testid="link-home">ELECTRA</a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} data-testid="button-menu">{open ? 'CLOSE' : 'MENU'}</button>
    <nav className={`topnav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} data-cursor="JUMP" data-testid={`link-${id}`}>{label}</a>)}
    </nav>
  </header>;
}

function SectionHead({ index, title }: { index: string; title: string }) {
  return <div className="section-head"><span className="index">{index}</span><span className="title">{title}</span></div>;
}

function Hero() {
  return <section className="hero" id="top">
    <img className="hero-image" src={heroImage} alt="A masked figure overlooking a city at night" />
    <span className="signal-stamp">UNAUTHORIZED BROADCAST / 02:17:44</span>
    <div className="hero-corner">CHANNEL 04<br />CARRIER WAVE<br />NO RETURN SIGNAL</div>
    <div className="hero-copy">
      <div className="hero-meta"><span className="mono">07:00 PM — 11:00 PM</span><span className="mono">LIVE TRANSMISSION // 001</span></div>
      <h1 className="hero-title"><span className="cut">ELECTRA</span></h1>
      <button className="hero-enter" onClick={() => document.querySelector('#signal')?.scrollIntoView({ behavior: 'smooth' })} data-cursor="ENTER" data-testid="button-enter">[ ENTER ELECTRA ]</button>
    </div>
  </section>;
}

function Signal() {
  return <section className="section signal" id="signal"><SectionHead index="01" title="THE SIGNAL" />
    <div className="signal-body reveal">
      <h2 className="signal-heading">THE<br /><em>SIGNAL</em><br />IS LIVE.</h2>
      <p className="signal-note"><span>Transmission received.</span><br /><br />A room below the room. One frequency. One artist. One night outside the ordinary. If you can read this, you are already close.</p>
      <div className="signal-strip"><span>NO SAFE FREQUENCY — ELECTRA — NO SAFE FREQUENCY — ELECTRA — NO SAFE FREQUENCY — ELECTRA — </span></div>
    </div>
  </section>;
}

function Lineup() {
  const [active, setActive] = useState<number | null>(null);
  return <section className="section lineup" id="lineup"><SectionHead index="02" title="THE LINEUP / ONE ARTIST" />
    <div className="artist-list">
      {artists.map((artist, index) => <div className={`artist-row reveal ${active === index ? 'active' : ''}`} key={artist.name} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} onClick={() => setActive(active === index ? null : index)} data-cursor={artist.name} data-testid={`artist-${index}`}>
        <span className="artist-num">0{index + 1}</span><h3 className="artist-name">{artist.name}</h3><div className="artist-info">{artist.time}<br />{artist.room}</div><img className="artist-portrait" src={artist.image} alt={`${artist.name} visual transmission`} loading="lazy" />
      </div>)}
    </div>
  </section>;
}

function Floor() {
  return <section className="floor" id="floor"><img className="floor-image" src={wingsImage} alt="Monochrome wings photographed as part of the ELECTRA rave archive" loading="lazy" /><div className="floor-overlay" /><div className="floor-content reveal"><h2 className="floor-title">THE<br />FLOOR</h2><div className="floor-caption"><span>ENTER THE IMAGE<br />THE IMAGE ENTERS YOU</span><span className="mono">[ FRAME 04 / 11 ]</span></div></div></section>;
}

function Frequency() {
  return <section className="section frequency" id="frequency"><SectionHead index="04" title="THE FREQUENCY / EVENT DATA" /><div className="frequency-layout reveal"><div><h2 className="frequency-hero">ELECTRA</h2><p className="frequency-tiny">Come without expectation. Leave with an afterimage. Access is requested, never assumed.</p></div><div className="frequency-details"><div className="detail"><span>Time</span><span>07:00 PM — 11:00 PM</span></div><div className="detail"><span>Date</span><span>TRANSMITTED SOON</span></div><div className="detail"><span>Location</span><span>WITHHELD / TBA</span></div><div className="detail"><span>Live</span><span>ZENO / MAIN FLOOR</span></div><div className="detail"><span>Entry</span><span>BY REQUEST ONLY</span></div><div className="detail"><span>Dress</span><span>BLACK / NO FLASH</span></div></div></div></section>;
}

function Archive() {
  return <section className="section archive" id="archive"><SectionHead index="05" title="AFTERIMAGE / ARCHIVE" /><div className="archive-grid reveal">
    <img className="archive-image archive-one" src={wingsImage} alt="Archive: teeth and hand" loading="lazy" /><img className="archive-image archive-two" src={mouthImage} alt="Archive: signal texture" loading="lazy" /><img className="archive-image archive-three" src={heroImage} alt="Archive: masked figure" loading="lazy" /><img className="archive-image archive-four" src={fangsImage} alt="Archive: pixel fangs" loading="lazy" /><img className="archive-image archive-five" src={statueImage} alt="Archive: angel statue" loading="lazy" /><span className="archive-mark">MEMORY CACHE / UNSTABLE</span><span className="archive-counter">05 IMAGES / 00 METADATA</span>
  </div></section>;
}

function Transmission() {
  return <section className="section transmission" id="transmission"><SectionHead index="06" title="TRANSMISSION STATUS" /><div className="transmission-copy reveal"><h2 className="transmission-title">TRANSMISSION<span>ACTIVE.</span></h2><img className="transmission-slice" src={mouthImage} alt="Distorted transmission texture" /><div className="transmission-sub"><p>Signal strength: persistent.<br />Interference: acceptable.<br />Exit path: not found.</p><span>STAY UNTIL THE SIGNAL ENDS</span></div></div></section>;
}

function About() {
  return <section className="section about" id="about"><SectionHead index="07" title="ABOUT THE BROADCAST" /><div className="about-copy reveal"><p className="about-line">NOT A</p><p className="about-line">FESTIVAL.</p><p className="about-line">A SIGNAL.</p><div className="about-aside">ELECTRA is a temporary frequency for bodies that refuse to stand still. No sponsors. No daylight. No clean exit.</div></div></section>;
}

function Finale() {
  return <section className="section finale" id="access"><SectionHead index="08" title="END OF TRANSMISSION" /><h2 className="finale-title reveal">ARE<br />YOU IN?</h2><a className="request" href="mailto:dropingaship@gmail.com?subject=ELECTRA%20REQUEST%20ACCESS" data-cursor="MAIL" data-testid="link-request-access"><span>REQUEST ACCESS</span><span className="arrow">↗</span></a></section>;
}

function Footer() {
  return <footer className="footer"><div className="footer-identity"><div className="footer-brand">ELECTRA</div><div className="footer-credit">MADE BY ABHINAV<br />INSTAGRAM <a href="https://instagram.com/abhinahhv" target="_blank" rel="noreferrer" data-cursor="INSTAGRAM" aria-label="Abhinav on Instagram">@abhinahhv</a></div></div><div><span className="footer-label">HOURS</span>07 PM — 11 PM</div><div><span className="footer-label">LOCATION</span>THE LOWER ROOM<br />ADDRESS WITHHELD</div><div><span className="footer-label">CONTACT</span><a href="mailto:dropingaship@gmail.com" data-cursor="CONTACT" data-testid="link-contact">dropingaship@gmail.com</a></div></footer>;
}

function Home() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <div className="electra-app"><div className="noise" /><div className="scanlines" /><Cursor /><Navigation /><main><Hero /><Signal /><Lineup /><Floor /><Frequency /><Archive /><Transmission /><About /><Finale /></main><Footer /></div>;
}

function App() {
  return <Home />;
}
export default App;