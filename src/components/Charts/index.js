import React, { Component } from 'react';
import { event as currentEvent } from 'd3-selection';
import d3 from '@/utils/d3';
import getDataPoint from '@/utils/getDataPoint';
import GraphLayer from '@/components/GraphLayer';
import ChartsContext from './context';
import EventFocus from './EventFocus';

class Charts extends Component {
  static defaultProps = {
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    },
  };

  constructor(props) {
    super(props);

    const { width, height, data, xSelector, ySelectors } = this.props;

    this.xDefScale = d3.scaleTime()
      .domain(d3.extent(data, xSelector))
      .range([0, width]);
    this.yDefScale = d3.scaleLinear()
      .domain(d3.extent(
        ySelectors.map(ySelector => data.map(ySelector))
          .reduce((acc, cur) => acc.concat(cur), [])
      ))
      .range([height, 0]);

    this.state = {
      xScale: this.xDefScale,
      yScale: this.yDefScale,
      currentPoint: null,
    };
  }

  handleTooltip = (event) => {
    const { data, xSelector, ySelectors } = this.props;
    const { xScale, yScale } = this.state;

    const dataPoint = getDataPoint({
      event,
      data,
      xSelector,
      xScale,
    });

    this.setState({ currentPoint: dataPoint });
  }

  handleZoom = node => {
    const { width, height } = this.props;
    const onZoom = () => {
      this.setState({
        xScale: currentEvent.transform.rescaleX(this.xDefScale),
        yScale: currentEvent.transform.rescaleY(this.yDefScale),
      });
    };

    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', onZoom);

    d3.select(node).call(zoom);
  }

  render() {
    const { width, height, margin, data, children } = this.props;
    const { xScale, yScale, currentPoint } = this.state;
    const { left, right, top, bottom } = margin;
    const context = {
      width,
      height,
      xScale,
      yScale,
      data,
      currentPoint,
    };

    return (
      <svg
        width={width + left + right}
        height={height + top + bottom}
      >
        <GraphLayer
          left={left}
          top={top}
        >
          <ChartsContext.Provider value={context}>
            {children}
          </ChartsContext.Provider>
          <EventFocus
            width={width}
            height={height}
            handleZoom={this.handleZoom}
            handleTooltip={this.handleTooltip}
          />
        </GraphLayer>
      </svg>
    );
  }
}

export default Charts;