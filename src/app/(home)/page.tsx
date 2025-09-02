import React from 'react'

export default function page() {
  return (
    <div>
      <div className="bg-midnight-navy">page</div>
      <div className="bg-gradient-navy-crimson">page</div>
      <div style={{ background: "var(--gradient-navy-crimson)" }}>
        Gradient background
      </div>
    </div>
  );
}
