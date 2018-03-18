import React from 'react';
import d3 from '@/utils/d3';
import { withChartsConsumer } from '@/components/Charts/context';
import Axis from './Axis';

const YAxis = ({ ticks, yScale, ...props }) => {
  const axis = d3.axisLeft()
    .scale(yScale)
    .ticks(ticks);

  return <Axis axis={axis} {...props} />;
};

export default withChartsConsumer(YAxis);