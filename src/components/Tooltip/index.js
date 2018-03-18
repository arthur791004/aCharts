import React from 'react';

const ToolTip = ({
  radius = 2,
  point,
  xSelector,
  ySelectors,
}) => {
  if (!point) {
    return null;
  }

  return (
    <g>
      <circle
        r={radius}
        cx={point.x}
        cy={point.y}
      />
    </g>
  );
}

export default ToolTip;