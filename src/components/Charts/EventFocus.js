import React from 'react';
import styled from 'styled-components';

const ZoomRect = styled.rect`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  fill: none;
  pointer-events: all;
`;

const EventFoucs = ({
  width,
  height,
  handleZoom,
  handleTooltip,
}) => {
  return (
    <ZoomRect
      width={width}
      height={height}
      innerRef={handleZoom}
      onMouseMove={handleTooltip}
    />
  );
}

export default EventFoucs;