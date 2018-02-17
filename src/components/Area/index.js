import React, { PureComponent } from 'react';
import d3 from '@/utils/d3';
import getDataPoint from '@/utils/getDataPoint';

class Area extends PureComponent {
  constructor(props) {
    super(props);

    const { selectX } = props;

    this.bisectX = d3.bisector(selectX).left;
  }

  handleTooltip = (event) => {
    const {
      data,
      xScale,
      yScale,
      selectX,
      selectY,
      showTooltip,
    } = this.props;

    const point = getDataPoint({
      event,
      data,
      selectX,
      selectY,
      xScale,
      yScale,
    });

    return showTooltip(point);
  }

  render() {
    const {
      width,
      height,
      styles,
      data,
      xScale,
      yScale,
      selectX,
      selectY,
      baseValue,
      handleMouseMove,
    } = this.props;

    const selectScaledX = datum => xScale(selectX(datum));
    const selectScaledY = datum => yScale(selectY(datum));
    const area = d3.area()
      .x(selectScaledX)
      .y0(baseValue)
      .y1(selectScaledY);

    return (
      <path
        {...styles}
        d={area(data)}
        onMouseMove={this.handleTooltip}
      />
    )
  }
}

export default Area;