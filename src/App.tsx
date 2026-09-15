import React, { useEffect, useMemo, useState } from 'react';
import { Activity, Bell, Cpu, Database, Gauge, Layers3, Menu, Mic, Network, Search, Shield, Sparkles, Terminal, Wifi, X } from 'lucide-react';
import './styles.css';

const navItems = [
  ['Overview', Gauge], ['Intelligence', Sparkles], ['Systems', Layers3], ['Activity', Activity], ['Security', Shield],
] as const;

const events = [
  ['22:08:41', 'Inference cluster optimized', 'NEXUS CORE', '99.2%'],
  ['22:07:18', 'Anomaly scan completed', 'SENTINEL', '0 threats'],
  ['22:05:56', 'Data stream synchronized', 'ORBIT DB', '18.4 GB'],
  ['22:04:12', 'Neural cache refreshed', 'MEMORY', '4.8 ms'],
  ['22:02:39', 'Secure channel handshake', 'GATEWAY', 'PASSED'],
];

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [pulse, setPulse] = useState(74);
  const [active, setActive] = useState('Overview');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setPulse((p) => Math.min(99, Math.max(68, p + (Math.random() > .5 ? 1 : -1)))), 1600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setNavOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const health = useMemo(() => [
    { label: 'Compute', value: '72%', icon: Cpu },
    { label: 'Network', value: '18ms', icon: Network },
    { label: 'Memory', value: '64%', icon: Database },
  ], []);

  const submitCommand = () => {
    if (!command.trim()) return;
    setCommand('Command queued for execution');
  };

  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    {navOpen && <button className="nav-backdrop" aria-label="Close navigation" onClick={() => setNavOpen(false)} />}

    <aside className={`sidebar ${navOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><span /></div><div><strong>NEXUS</strong><small>AI COMMAND CENTER</small></div><button className="close-nav" aria-label="Close menu" onClick={() => setNavOpen(false)}><X size={18}/></button></div>
      <nav aria-label="Primary navigation">{navItems.map(([item, Icon]) => <button key={item} className={active === item ? 'nav-item active' : 'nav-item'} onClick={() => {setActive(item);setNavOpen(false)}}><span className="nav-icon"><Icon size={17}/></span>{item}<span className="nav-dot" /></button>)}</nav>
      <div className="sidebar-bottom"><div className="operator"><div className="avatar">S</div><div><b>Operator</b><span>AUTHORIZED</span></div><div className="online" /></div><div className="system-mini"><span><Wifi size={14}/> SYSTEM LINK</span><b>STABLE</b></div></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="menu" aria-label="Open navigation" onClick={() => setNavOpen(true)}><Menu/></button>
        <div className="crumb"><span>COMMAND</span><i>/</i>{active.toUpperCase()}</div>
        <div className="top-actions">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}><Search size={17}/></button>
          <button aria-label="Notifications" className="notification-button" onClick={() => setNotice((v) => !v)}><Bell size={17}/><em /></button>
          <div className="clock">22:09 <span>IST</span></div>
        </div>
        {notice && <div className="notification-pop">All systems nominal<span>No new critical alerts.</span></div>}
      </header>

      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><span className="live-dot"/> NEXUS ONLINE</p><h1>Good evening,<br/><strong>Operator.</strong></h1><p className="hero-sub">Your intelligence layer is synchronized. All critical systems are operating within nominal parameters.</p><div className="command-bar"><Terminal size={17}/><input aria-label="Ask NEXUS" value={command} onChange={e=>setCommand(e.target.value)} placeholder="Ask NEXUS anything..." onKeyDown={e=>e.key==='Enter' && submitCommand()} /><kbd>⌘ K</kbd><button aria-label="Voice command"><Mic size={16}/></button></div></div>
        <div className="core-wrap" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/><div className="core"><div className="core-grid"/><div className="core-face"><div className="eye left"/><div className="eye right"/><div className="mouth"/></div><span className="core-label">N</span></div><div className="core-status"><span>NEURAL CORE</span><b>{pulse}.8%</b></div></div>
      </section>

      <section className="metrics">{health.map(({label,value,icon:Icon})=><div className="metric" key={label}><div className="metric-icon"><Icon size={17}/></div><div><span>{label}</span><strong>{value}</strong></div><div className="spark" aria-hidden="true"><i/><i/><i/><i/><i/></div></div>)}<div className="metric accent"><div className="metric-icon"><Activity size={17}/></div><div><span>System health</span><strong>OPTIMAL</strong></div><div className="health-ring">98</div></div></section>

      <section className="dashboard-grid">
        <div className="panel activity-panel"><div className="panel-head"><div><span className="panel-kicker">LIVE FEED</span><h2>System activity</h2></div><button>VIEW ALL <span>→</span></button></div><div className="activity-list">{events.map(([time,title,source,value])=><div className="event" key={time}><time>{time}</time><div className="event-line"><span className="event-node"/><div><b>{title}</b><small>{source}</small></div></div><strong>{value}</strong></div>)}</div></div>
        <div className="panel insight-panel"><div className="panel-head"><div><span className="panel-kicker">NEXUS INSIGHT</span><h2>Signal intelligence</h2></div><Sparkles size={17}/></div><div className="signal"><div className="signal-value">94<span>/100</span></div><p>Operational confidence</p><div className="progress"><i style={{width:'94%'}}/></div></div><div className="signal-row"><span>Pattern recognition</span><b>98%</b></div><div className="signal-row"><span>Threat detection</span><b>99.7%</b></div><div className="signal-row"><span>Decision latency</span><b>12ms</b></div><div className="insight-note"><span>◆</span> No emerging anomalies detected across monitored systems.</div></div>
      </section>
      <footer><span>NEXUS v1.0</span><span>ENCRYPTED SESSION</span><span>© 2026 NEXUS INTELLIGENCE</span></footer>
    </main>

    {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Command search" onClick={() => setSearchOpen(false)}><div className="search-modal" onClick={e => e.stopPropagation()}><div className="search-title"><Search size={18}/><input autoFocus placeholder="Search command center..." onChange={e=>setCommand(e.target.value)} /><button aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={17}/></button></div><div className="search-hint">Press <kbd>ESC</kbd> to close · <kbd>⌘ K</kbd> anytime</div></div></div>}
  </div>;
}

export default App;
