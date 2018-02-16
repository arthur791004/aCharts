import d3 from '@/utils/d3';
import getEventPoint from '@/utils/getEventPoint';

const getDataPoint = ({
  event,
  data,
  selectX,
  selectY,
  xScale,
  yScale,
}) => {
  const bisectX = d3.bisector(selectX).left;
  const { x } = getEventPoint(event);
  const originX = xScale.invert(x);
  const index = bisectX(data, originX, 1, data.length - 1);
  const leftPoint = data[index - 1];
  const rightPoint = data[index];
  const matchPoint = x - selectX(leftPoint) < selectX(rightPoint) - x
    ? leftPoint
    : rightPoint;

  return {
    x: xScale(selectX(matchPoint)),
    y: yScale(selectY(matchPoint)),
  };
};

export default getDataPoint;