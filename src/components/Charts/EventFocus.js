import React from 'react';
import styled from 'styled-components';

const Rect = styled.rect`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  fill: none;
  pointer-events: all;
`;

const EventFocus = ({
  width,
  height,
  handleZoom,
  handleTooltip,
}) => {
  return (
    <Rect
      width={width}
      height={height}
      innerRef={handleZoom}
      onMouseMove={handleTooltip}
    />
  );
};

export default EventFocus;