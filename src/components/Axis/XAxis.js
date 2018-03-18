import React from 'react';
import d3 from '@/utils/d3';
import { withChartsConsumer } from '@/components/Charts/context';
import Axis from './Axis';

const XAxis = ({ ticks, xScale, height, style, ...props }) => {
  const axis = d3.axisBottom()
    .scale(xScale)
    .ticks(ticks);

  const currentStyle = {
    transform: `translateY(${height}px)`,
    ...style
  };

  return (
    <Axis
      axis={axis}
      style={currentStyle}
      {...props}
    />
  );
};

export default withChartsConsumer(XAxis);