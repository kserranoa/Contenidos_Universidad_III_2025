
import React, { useEffect, useState } from "react";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000); // mínimo 3s
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061024', overflow: 'hidden' }}>
      <style>{`
        .scene{ width:320px; height:320px; display:flex; align-items:center; justify-content:center; overflow:hidden }

        /* 3D stage */
        .stage3d{ width:200px; height:260px; perspective:900px; display:flex; align-items:center; justify-content:center }
        .walker3d{ width:140px; transform-style:preserve-3d; transform-origin:center; animation: bodyTilt 3s ease-in-out forwards, walkHorizontal 3s linear infinite }

        @keyframes bodyTilt{ 0%{ transform: rotateX(18deg) rotateY(-22deg) translateZ(0) } 50%{ transform: rotateX(6deg) rotateY(12deg) translateZ(6px) } 100%{ transform: rotateX(0deg) rotateY(0deg) translateZ(0) } }

        @keyframes walkHorizontal { 0% { transform: translateX(-160px) } 100% { transform: translateX(160px) } }

        /* limbs with small z offsets to suggest depth */
        .limb3d{ transform-origin: top center; transform-style:preserve-3d }
        .leg{ animation: legStep .62s ease-in-out infinite alternate }
        .leg.r{ animation-delay:.31s }
        .arm{ animation: armSwing .62s ease-in-out infinite alternate }
        .arm.r{ animation-delay:.31s }

        @keyframes legStep{ 0%{ transform: rotateX(10deg) rotateZ(26deg) translateZ(0) } 100%{ transform: rotateX(-8deg) rotateZ(-18deg) translateZ(6px) } }
        @keyframes armSwing{ 0%{ transform: rotateX(-8deg) rotateZ(-28deg) translateZ(0) } 100%{ transform: rotateX(6deg) rotateZ(18deg) translateZ(6px) } }

        /* torso bob and slight forward tilt */
        .torso{ animation: bob 0.62s ease-in-out infinite alternate; transform-origin:center; }
        @keyframes bob{ 0%{ transform: translateY(0) translateZ(0) } 100%{ transform: translateY(-6px) translateZ(8px) } }

        /* simple shading via gradients to emphasize 3D */
        .fill-light{ fill: url(#g1) }
        .fill-dark{ fill: url(#g2) }

        /* soft oval shadow */
        .shadow{ filter: blur(8px); opacity:.45 }

        .dashboard{ font-size:34px; font-weight:700; color:#e6f7ff }
      `}</style>

      {!ready ? (
        <div className="scene" aria-hidden>
          <div className="stage3d">
            <div className="walker3d">
              <svg width="180" height="260" viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#cbd5e1" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#475569" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* shadow */}
                <ellipse className="shadow" cx="90" cy="230" rx="54" ry="14" fill="#000" opacity="0.35" />

                <g transform="translate(90 120)">
                  {/* left leg (back) */}
                  <g className="limb3d leg" transform="translate(-22 30)">
                    <rect x="-8" y="0" width="16" height="70" rx="6" className="fill-dark" />
                    <rect x="-10" y="70" width="20" height="10" rx="3" fill="#0b1220" />
                  </g>

                  {/* right leg (front) */}
                  <g className="limb3d leg r" transform="translate(22 30)">
                    <rect x="-8" y="0" width="16" height="70" rx="6" className="fill-light" />
                    <rect x="-10" y="70" width="20" height="10" rx="3" fill="#0b1220" />
                  </g>

                  {/* torso */}
                  <g className="torso" transform="translate(0 -40)">
                    <rect x="-20" y="-60" width="40" height="60" rx="10" className="fill-light" />

                    {/* left arm (back) */}
                    <g className="limb3d arm" transform="translate(-30 -36)">
                      <rect x="-6" y="0" width="12" height="56" rx="8" className="fill-dark" />
                    </g>

                    {/* right arm (front) */}
                    <g className="limb3d arm r" transform="translate(30 -36)">
                      <rect x="-6" y="0" width="12" height="56" rx="8" className="fill-light" />
                    </g>

                    {/* head */}
                    <g transform="translate(0 -96)">
                      <circle cx="0" cy="0" r="18" fill="#fde68a" />
                      <circle cx="-6" cy="-2" r="2" fill="#111827" opacity="0.9" />
                      <circle cx="6" cy="-2" r="2" fill="#111827" opacity="0.9" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <h1 className="dashboard">dashboard</h1>
        </div>
      )}
    </div>
  );
}
