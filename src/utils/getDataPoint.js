import d3 from '@/utils/d3';
import getEventPoint from '@/utils/getEventPoint';

const getDataPoint = ({
  event,
  data,
  xSelector,
  xScale,
}) => {
  const bisectX = d3.bisector(xSelector).left;
  const { x } = getEventPoint(event);
  const originX = xScale.invert(x);
  const index = bisectX(data, originX, 1, data.length - 1);
  const leftPoint = data[index - 1];
  const rightPoint = data[index];
  const matchPoint = x - xSelector(leftPoint) < xSelector(rightPoint) - x
    ? leftPoint
    : rightPoint;

  return matchPoint;
};

export default getDataPoint;