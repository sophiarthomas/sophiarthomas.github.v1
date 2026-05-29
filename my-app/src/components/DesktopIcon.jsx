import React from 'react';

export default function DesktopIcon({ label, icon, onLaunch }) {
  return (
    <div className="desktop-item" onDoubleClick={onLaunch} onClick={onLaunch}>
      <div className="icon">{icon}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
}