import React, { useState } from 'react';

export default function Window({ title, zIndex, initialX, initialY, onClose, onFocus, children }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (e.target.closest('.control-btn')) return; // Ignore window buttons
    onFocus();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="window"
      style={{
        zIndex: zIndex,
        transform: `translate(${position.x}px, ${position.y}px)`,
        top: 0,
        left: 0,
      }}
      onMouseDown={onFocus}
    >
      <div
        className="title-bar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <span className="window-title">{title}</span>
        <div className="window-controls">
          <button className="control-btn btn-minimize"></button>
          <button className="control-btn btn-maximize"></button>
          <button className="control-btn btn-close" onClick={(e) => { e.stopPropagation(); onClose(); }}></button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}