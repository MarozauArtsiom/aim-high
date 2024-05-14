export default function CanView({ canColor, stickerColor }) {
  return (
    <svg
      width="390px"
      height="780px"
      viewBox="0 0 195 390"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Can Body */}
      <rect
        x="39"
        y="39"
        width="117"
        height="312"
        rx="29"
        fill={stickerColor}
      />
      {/* Top */}
      <ellipse cx="97.5" cy="39" rx="58.5" ry="19.5" fill={canColor} />
      {/* Bottom */}
      <ellipse cx="97.5" cy="351" rx="58.5" ry="19.5" fill={canColor} />
    </svg>
  );
}
