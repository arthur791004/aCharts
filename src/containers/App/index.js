import React, { PureComponent, Fragment } from 'react';
import shortid from 'shortid';
import { event as currentEvent } from 'd3-selection';
import { temperatureData as data } from '@/constants';
import d3 from '@/utils/d3';
import SVG from '@/components/SVG';
import GraphLayer from '@/components/GraphLayer';
import Axis from '@/components/Axis';
import Area from '@/components/Area';
import ClipPath from '@/components/ClipPath';
import Tooltip from '@/components/Tooltip';
import ZoomAnchor from '@/components/ZoomAnchor';

const HEIGHT = 500;
const WIDTH = 1000;

class App extends PureComponent {
  static defaultProps = {
    width: WIDTH,
    height: HEIGHT,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    },
  };

  constructor(props) {
    super(props);

    const { width, height, margin } = props;

    this.selectDay = d => new Date(d.day).setHours(0,0,0,0);
    this.selectNewYork = d => d['NewYork'];
    this.selectSanFrancisco = d => d['SanFrancisco'];

    this.xDefScale = d3.scaleTime()
      .domain(d3.extent(data, this.selectDay))
      .range([0, width]);
    this.yDefScale = d3.scaleLinear()
      .domain(d3.extent([
        ...data.map(this.selectNewYork),
        ...data.map(this.selectSanFrancisco),
      ]))
      .range([height, 0]);

    this.state = {
      xScale: this.xDefScale,
      yScale: this.yDefScale,
      tooltipPoint: null,
    };
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

  showTooltip = (tooltipPoint) => {
    this.setState({ tooltipPoint });
  }

  render() {
    const { width, height, margin } = this.props;
    const { xScale, yScale, tooltipPoint } = this.state;
    const boundary = { width, height };
    const clipPathID1 = shortid();
    const clipPathID2 = shortid();

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(data.length / 20);
    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(3);

    return (
      <Fragment>
        <h1>aCharts</h1>
        <SVG
          width={width}
          height={height}
          margin={margin}
        >
          <Axis axis={xAxis} style={{ transform: `translateY(${height}px)` }} />
          <Axis axis={yAxis} />
          <GraphLayer boundary={boundary}>
            <Fragment>
              <ClipPath clipPathID={clipPathID1}>
                <Area
                  width={width}
                  height={height}
                  data={data}
                  selectX={this.selectDay}
                  selectY={this.selectSanFrancisco}
                  xScale={xScale}
                  yScale={yScale}
                  baseValue={0}
                />
              </ClipPath>
              <Area
                width={width}
                height={height}
                data={data}
                selectX={this.selectDay}
                selectY={this.selectNewYork}
                xScale={xScale}
                yScale={yScale}
                baseValue={height}
                styles={{
                  stroke: "#8884d8",
                  fill: "#8884d8",
                  fillOpacity: "0.6",
                  clipPath: `url(#${clipPathID1})`,
                }}
                showTooltip={this.showTooltip}
              />
            </Fragment>
            <Fragment>
              <ClipPath clipPathID={clipPathID2}>
                <Area
                  width={width}
                  height={height}
                  data={data}
                  selectX={this.selectDay}
                  selectY={this.selectNewYork}
                  xScale={xScale}
                  yScale={yScale}
                  baseValue={0}
                />
              </ClipPath>
              <Area
                width={width}
                height={height}
                data={data}
                selectX={this.selectDay}
                selectY={this.selectSanFrancisco}
                xScale={xScale}
                yScale={yScale}
                baseValue={HEIGHT}
                styles={{
                  stroke: "#82ca9d",
                  fill: "#82ca9d",
                  fillOpacity: "0.6",
                  clipPath: `url(#${clipPathID2})`,
                }}
                showTooltip={this.showTooltip}
              />
            </Fragment>
          </GraphLayer>
          <ZoomAnchor
            width={width}
            height={height}
            handleZoom={this.handleZoom}
          />
          <Tooltip point={tooltipPoint} />
        </SVG>
      </Fragment>
    );
  }
}

export default App;