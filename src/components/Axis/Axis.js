import React from 'react';
import d3 from '@/utils/d3';

const Axis = ({
  axis,
  style,
}) => {
  return (
    <g
      ref={node => d3.select(node).call(axis)}
      style={style}
    />
  );
};

export default Axis;