// Matches the original 500 one-pixel rules, 7.99px gaps, and 0.2px offset.
// The fixed width preserves centering/clipping in the existing divider frames.
export default function StripePattern() {
  return (
    <div
      aria-hidden="true"
      className="decorative-stripes h-full shrink-0 ml-[0.2px]"
      style={{ width: 4487.01 }}
    />
  );
}
