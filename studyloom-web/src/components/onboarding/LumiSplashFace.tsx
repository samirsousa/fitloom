// Rosto da Lumi do splash, igual ao do protótipo (olhos piscando e boca animada pelo CSS)
export default function LumiSplashFace() {
  return (
    <div className="lumi-face-minimal">
      <svg
        className="lumi-face-svg"
        viewBox="0 0 240 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M46 36 C 62 24, 84 26, 94 34" stroke="#7A2900" strokeWidth="7" strokeLinecap="round" />
        <path d="M194 36 C 178 24, 156 26, 146 34" stroke="#7A2900" strokeWidth="7" strokeLinecap="round" />
        <g className="lumi-eye-group">
          <ellipse cx="72" cy="78" rx="28" ry="31" fill="#FFFFFF" />
          <ellipse cx="75" cy="80" rx="20" ry="23" fill="#8B3A0E" />
          <ellipse cx="76" cy="81" rx="13" ry="15" fill="#1E1410" />
          <circle cx="67" cy="69" r="7" fill="#FFFFFF" />
          <circle cx="83" cy="88" r="3.5" fill="#FFFFFF" opacity="0.85" />

          <ellipse cx="168" cy="78" rx="28" ry="31" fill="#FFFFFF" />
          <ellipse cx="165" cy="80" rx="20" ry="23" fill="#8B3A0E" />
          <ellipse cx="164" cy="81" rx="13" ry="15" fill="#1E1410" />
          <circle cx="157" cy="69" r="7" fill="#FFFFFF" />
          <circle cx="173" cy="88" r="3.5" fill="#FFFFFF" opacity="0.85" />
        </g>
        <ellipse cx="42" cy="116" rx="14" ry="8" fill="#FF4B4B" opacity="0.35" />
        <ellipse cx="198" cy="116" rx="14" ry="8" fill="#FF4B4B" opacity="0.35" />
        <g className="lumi-mouth-group">
          <path
            d="M106 112 C 106 105, 134 105, 134 112 C 134 121, 125 127, 120 127 C 115 127, 106 121, 106 112 Z"
            fill="#231815"
          />
          <ellipse cx="116" cy="110" rx="5" ry="2.5" fill="#FFFFFF" opacity="0.55" />
          <path d="M90 134 Q 120 150 150 134 C 147 162, 134 172, 120 172 C 106 172, 93 162, 90 134 Z" fill="#681818" />
          <path
            d="M103 153 C 108 144, 132 144, 137 153 C 133 165, 127 170, 120 170 C 113 170, 107 165, 103 153 Z"
            fill="#FF758F"
          />
          <path
            d="M84 132 Q 102 146 120 133 Q 138 146 156 132"
            stroke="#FFF8F0"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M98 138 L 102 145 L 106 139 Z" fill="#FFFFFF" />
          <path d="M134 139 L 138 145 L 142 138 Z" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
