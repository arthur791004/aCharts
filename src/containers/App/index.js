import React, { PureComponent, Fragment } from 'react';
import { temperatureData as data } from '@/constants';
import d3 from '@/utils/d3';
import Charts from '@/components/Charts';
import ChartsContext from '@/components/Charts/context';
import GraphLayer from '@/components/GraphLayer';
import { XAxis, YAxis } from '@/components/Axis';
import ClipArea from '@/components/Area/ClipArea';
import Tooltip from '@/components/Tooltip';

const HEIGHT = 500;
const WIDTH = 1000;

class App extends PureComponent {
  static defaultProps = {
    width: WIDTH,
    height: HEIGHT,
  };

  constructor(props) {
    super(props);

    const { width, height } = props;

    this.selectDay = d => new Date(d.day).setHours(0,0,0,0);
    this.selectNewYork = d => d['NewYork'];
    this.selectSanFrancisco = d => d['SanFrancisco'];
  }

  render() {
    const { width, height } = this.props;
    const boundary = { width, height };
    const xSelector = this.selectDay;
    const ySelectors = [
      this.selectNewYork,
      this.selectSanFrancisco,
    ];

    return (
      <Fragment>
        <h1>aCharts</h1>
        <Charts
          width={width}
          height={height}
          data={data}
          xSelector={xSelector}
          ySelectors={ySelectors}
        >
          <XAxis ticks={data.length / 20} />
          <YAxis ticks={3} />
          <GraphLayer boundary={boundary}>
            <ClipArea
              xSelector={this.selectDay}
              ySelector={this.selectNewYork}
              clipYSelector={this.selectSanFrancisco}
              color="#8884d8"
            />
            <ClipArea
              xSelector={this.selectDay}
              ySelector={this.selectSanFrancisco}
              clipYSelector={this.selectNewYork}
              color="#82ca9d"
            />
          </GraphLayer>
          <Tooltip
            xSelector={xSelector}
            ySelectors={ySelectors}
          />
        </Charts>
      </Fragment>
    );
  }
}

export default App;