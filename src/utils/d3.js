import { scaleLinear, scaleTime } from 'd3-scale';
import { area, line } from 'd3-shape';
import { extent, bisector } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { zoom } from 'd3-zoom';

const d3 = {
  /* scale */
  scaleLinear,
  scaleTime,
  /* shape */
  area,
  line,
  /* array */
  extent,
  bisector,
  /* axis */
  axisBottom,
  axisLeft,
  /* selection */
  select,
  /* zoom */
  zoom,
};

export default d3;