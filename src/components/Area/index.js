import React, { PureComponent } from 'react';
import d3 from '@/utils/d3';
import { withChartsConsumer } from '@/components/Charts/context';

const Area = ({
  width,
  height,
  data,
  xScale,
  yScale,
  xSelector,
  ySelector,
  baseValue,
  color,
  styles = {},
}) => {
  const xScaledSelector = datum => xScale(xSelector(datum));
  const yScaledSelector = datum => yScale(ySelector(datum));
  const y0 = typeof baseValue === 'undefined' || baseValue === null
    ? height
    : baseValue;

  const area = d3.area()
    .x(xScaledSelector)
    .y0(y0)
    .y1(yScaledSelector);

  return (
    <path
      stroke={color}
      fill={color}
      fillOpacity={0.6}
      {...styles}
      d={area(data)}
    />
  )
};

export default withChartsConsumer(Area);