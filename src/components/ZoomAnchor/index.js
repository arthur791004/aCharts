import React from 'react';
import styled from 'styled-components';
import GraphLayer from '@/components/GraphLayer';

const ZoomRect = styled.rect`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  fill: none;
  pointer-events: all;
`;

const ZoomAnchor = ({
  width,
  height,
  handleZoom,
}) => {
  return (
    <ZoomRect
      width={width}
      height={height}
      innerRef={handleZoom}
    />
  );
}

export default ZoomAnchor;