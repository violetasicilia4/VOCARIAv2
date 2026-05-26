// ============================================
// VOCARIA — Brand mark
// "Notch Disk" — filled solid disk with a small
// triangular notch on the right (3 o'clock).
// Asymmetric on purpose: origin that opens to a direction.
// 16×16 viewBox · scales clean from 14px → 512px.
// ============================================

import React from 'react';

function VocariaMark({ size = 20, className = '' }) {
  // Disk radius 5.5, centered at (8,8)
  // Notch cut at 3 o'clock: ±15° edge points, inward apex 3px from center
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`vocaria-mark ${className}`}
      aria-hidden="true"
    >
      <path
        d="
          M 8 2.5
          A 5.5 5.5 0 0 0 2.5 8
          A 5.5 5.5 0 0 0 8 13.5
          A 5.5 5.5 0 0 0 13.31 9.42
          L 10.5 8
          L 13.31 6.58
          A 5.5 5.5 0 0 0 8 2.5
          Z
        "
        fill="currentColor"
      />
    </svg>
  );
}

export default VocariaMark;
