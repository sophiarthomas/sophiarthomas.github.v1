import React from 'react';

export default function DesktopIcon({ label, icon, onLaunch }) {
  return (
    <div className="desktop-item" onDoubleClick={onLaunch} onClick={onLaunch}>
      <div className="icon"><img img src={icon} alt="icon" width={45} height={45}></img></div>
      <div className="icon-label">{label}</div>
    </div>
  );
}