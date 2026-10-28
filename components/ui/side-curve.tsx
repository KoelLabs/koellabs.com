const curveFill =
  'M69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433C-69.6808 97.3525 69.9825 -0.460876 69.9963 96.9968C70.0013 132.346 70.0002 294.846 69.9986 452.469C70.0002 610.092 70.0014 772.592 69.9964 807.941Z';
const curveStroke =
  'M69.9963 196.941C69.9963 360.607 70.0045 750.741 69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433M-69.8022 -0.0624878C-69.8022 -0.0201653 -69.8022 0.0220944 -69.8022 0.0643433M69.9964 707.997C69.9964 544.33 70.0044 154.197 69.9963 96.9968C69.9825 -0.460854 -69.6808 97.3525 -69.8022 0.0643433';

// The curved side decoration, split into fixed top/bottom caps and a stretching middle so it
// keeps the same inset from the top and bottom of the section regardless of its height.
export function SideCurve({
  side,
  inset = 'top-4 bottom-[66px]',
  fade = false,
}: {
  side: 'left' | 'right';
  // Vertical insets from the positioned parent (default leaves room for a 50px ruled strip below)
  inset?: string;
  // Soft white fade on the inner edge, for content that slides under the curve
  fade?: boolean;
}) {
  const cap = (viewBoxY: number) => (
    <svg width="75" height="100" viewBox={`0 ${viewBoxY} 75 100`} fill="none" className="shrink-0">
      <path d={curveFill} fill="#ffffff" />
      <path d={curveStroke} stroke="#E5E5E5" />
    </svg>
  );
  return (
    <div
      aria-hidden="true"
      className={`absolute ${inset} w-[75px] z-[1] hidden 2xl:flex flex-col ${
        side === 'left' ? 'left-0' : 'right-0 rotate-180'
      }`}
    >
      {cap(0)}
      <div className="flex-1 w-[70.5px] bg-white border-r border-[#E5E5E5]" />
      {cap(805)}
      {fade && (
        <div className="absolute inset-y-0 left-[92%] w-64 bg-gradient-to-r from-white to-transparent pointer-events-none z-[-1] " />
      )}
    </div>
  );
}
