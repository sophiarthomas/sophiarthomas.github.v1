import React, { useState, useEffect } from 'react';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Terminal from './components/Terminal';
import './App.css';

const APP_CONTENTS = {
  about: (
    <div className="static-window-content">
      <h2 className="title-blue">ℹ️ About Me</h2>
      <p><strong>Name:</strong> Sophia R. Thomas</p>
      <p><strong>Role:</strong> IT Support Specialist & Aspiring Cybersecurity Analyst</p>
      <p className="mt-10">I build custom virtual systems to verify infrastructure exploits and study defense systems. Welcome to my web console interface!</p>
    </div>
  ),
  skills: (
    <div className="static-window-content">
      <h2 className="title-blue">🛠️ Technical Inventory</h2>
      <ul className="skills-list">
        <li><span className="text-green">Systems:</span> Linux (Kali, Ubuntu), Windows Server, Active Directory</li>
        <li><span className="text-green">Networking:</span> TCP/IP, DNS routing, Wireshark packet capture</li>
        <li><span className="text-green">Security:</span> Threat mitigation, vulnerability management, basic penetration testing</li>
        <li><span className="text-green">Development:</span> HTML5, CSS3, JavaScript (ES6+), React</li>
      </ul>
    </div>
  ),
  projects: (
    <div className="static-window-content">
      <h2 className="title-blue">📁 Projects Archive</h2>
      <p><strong>1. Kali Linux OS Simulation</strong> - <em>This site!</em> Fully refactored using React state hooks.</p>
      <p className="mt-10"><strong>2. Certificate Issuance Engine</strong> - Automated SSL/TLS registration processing workflows.</p>
      <p className="mt-10"><strong>3. Network Packet Monitor</strong> - Customized dashboard for reviewing live packet streaming logs.</p>
    </div>
  ),
};

export default function App() {
  const [time, setTime] = useState('');
  const [openWindows, setOpenWindows] = useState([]);
  const [topZIndex, setTopZIndex] = useState(100);

  // Sync System Time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Open an application window or bring it to focus if already open
  const launchApp = (id, title, isTerminal = false) => {
    const existing = openWindows.find(w => w.id === id);
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);

    if (existing) {
      setOpenWindows(openWindows.map(w => w.id === id ? { ...w, zIndex: nextZ } : w));
    } else {
      // Calculate random cascade spawn offsets
      const offset = Math.floor(Math.random() * 60) + 40;
      setOpenWindows([...openWindows, {
        id,
        title,
        isTerminal,
        zIndex: nextZ,
        x: offset,
        y: offset
      }]);
    }
  };

  const closeApp = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const focusApp = (id) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, zIndex: nextZ } : w));
  };

  // Automatically boot the terminal window on startup
  useEffect(() => {
    launchApp('terminal', 'root@kali: ~', true);
  }, []);

  return (
    <div className="os-environment">
      {/* Top Status Panel Bar */}
      <div className="top-bar">
        <div className="left-menu">
          <span className="kali-logo">🐉</span>
          <span className="menu-item active">Applications</span>
          <span className="menu-item">Places</span>
        </div>
        <div className="center-status">
          <span>root@kali: ~</span>
        </div>
        <div className="right-menu">
          <span className="status-icon">🌐</span>
          <span className="status-icon">🔋</span>
          <span className="live-clock">{time}</span>
        </div>
      </div>

      {/* Desktop Space Grid Workspace */}
      <div className="desktop">
        <DesktopIcon label="about_me" icon="📁" onLaunch={() => launchApp('about', 'root@kali: ~/about_me')} />
        <DesktopIcon label="skills" icon="📁" onLaunch={() => launchApp('skills', 'root@kali: ~/skills')} />
        <DesktopIcon label="projects" icon="📁" onLaunch={() => launchApp('projects', 'root@kali: ~/projects')} />
        <DesktopIcon label="Kali Terminal" icon="🐚" onLaunch={() => launchApp('terminal', 'root@kali: ~', true)} />
      </div>

      {/* Render Dynamic Windows Ecosystem */}
      {openWindows.map(win => (
        <Window
          key={win.id}
          title={win.title}
          zIndex={win.zIndex}
          initialX={win.x}
          initialY={win.y}
          onClose={() => closeApp(win.id)}
          onFocus={() => focusApp(win.id)}
        >
          {win.isTerminal ? <Terminal /> : APP_CONTENTS[win.id]}
        </Window>
      ))}
    </div>
  );
}