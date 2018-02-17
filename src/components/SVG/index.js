import React from 'react';
import GraphLayer from '@/components/GraphLayer';

const SVG = ({
  height,
  width,
  margin,
  children,
}) => {
  const { left, right, top, bottom } = margin;

  return (
    <svg
      width={width + left + right}
      height={height + top + bottom}
    >
      <GraphLayer
        left={left}
        top={top}
      >
        {children}
      </GraphLayer>
    </svg>
  )
};

export default SVG;