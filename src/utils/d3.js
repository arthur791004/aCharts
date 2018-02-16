import { scaleLinear, scaleTime } from 'd3-scale';
import { area } from 'd3-shape';
import { extent, bisector } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

const d3 = {
  /* scale */
  scaleLinear,
  scaleTime,
  /* shape */
  area,
  /* array */
  extent,
  bisector,
  /* axis */
  axisBottom,
  axisLeft,
  /* selection */
  select,
};

export default d3;