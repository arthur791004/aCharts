import React from 'react';
import d3 from '@/utils/d3';
import { withChartsConsumer } from '@/components/Charts/context';

const Line = ({
  height,
  data,
  type,
  xScale,
  xSelector,
  color,
  position,
  styles = {},
}) => {
  if (position) {
    const { x1, x2, y1, y2 } = position;

    return (
      <line
        x1={x1}
        x2={x2}
        y1={0}
        y2={height}
        stroke={color}
        strokeWidth={1}
        strokeDasharray="3, 3"
        {...styles}
      />
    );
  }

  const xScaledSelector = datum => xScale(xSelector(datum));
  const line = d3.line()
    .x(xScaledSelector)
    .y0(0)
    .y1(height);

  return (
    <path
      stroke={color}
      fill={color}
      fillOpacity={0.6}
      {...styles}
      d={line(data)}
    />
  )
};

export default withChartsConsumer(Line);