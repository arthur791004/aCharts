import React, { PureComponent, Fragment } from 'react';
import shortid from 'shortid';
import { temperatureData as data } from '@/constants';
import d3 from '@/utils/d3';
import SVG from '@/components/SVG';
import Axis from '@/components/Axis';
import Area from '@/components/Area';
import ClipPath from '@/components/ClipPath';
import Tooltip from '@/components/Tooltip';

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

  state = {
    tooltipPoint: null,
  };

  showTooltip = (tooltipPoint) => {
    this.setState({ tooltipPoint });
  }

  render() {
    const { width, height, margin } = this.props;
    const { tooltipPoint } = this.state;
    const clipPathID1 = shortid();
    const clipPathID2 = shortid();
  
    const selectDay = d => new Date(d.day).setHours(0,0,0,0);
    const selectNewYork = d => d['NewYork'];
    const selectSanFrancisco = d => d['SanFrancisco'];
  
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, selectDay))
      .range([0, width]);
    const yScale = d3.scaleLinear()
      .domain(d3.extent([
        ...data.map(selectNewYork),
        ...data.map(selectSanFrancisco),
      ]))
      .range([height, 0]);
  
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
          <Fragment>
            <ClipPath clipPathID={clipPathID1}>
              <Area
                width={width}
                height={height}
                data={data}
                selectX={selectDay}
                selectY={selectSanFrancisco}
                xScale={xScale}
                yScale={yScale}
                baseValue={0}
              />
            </ClipPath>
            <Area
              width={width}
              height={height}
              data={data}
              selectX={selectDay}
              selectY={selectNewYork}
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
                selectX={selectDay}
                selectY={selectNewYork}
                xScale={xScale}
                yScale={yScale}
                baseValue={0}
              />
            </ClipPath>
            <Area
              width={width}
              height={height}
              data={data}
              selectX={selectDay}
              selectY={selectSanFrancisco}
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
          <Tooltip point={tooltipPoint} />
        </SVG>
      </Fragment>
    );
  }
}

export default App;