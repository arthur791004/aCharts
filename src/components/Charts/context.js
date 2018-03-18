import React from 'react';
import createReactContext from 'create-react-context';

const context = {
  width: null,
  height: null,
  xScale: null,
  yScale: null,
  data: null,
  currentPoint: null,
};

const ChartsContext = createReactContext(context);

export const withChartsConsumer = Component => props => (
  <ChartsContext.Consumer>
    {context => <Component {...context} {...props} />}
  </ChartsContext.Consumer>
)

export default ChartsContext;