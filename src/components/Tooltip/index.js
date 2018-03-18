import React from 'react';
import styled from 'styled-components';
import { withChartsConsumer } from '@/components/Charts/context';
import GraphLayer from '@/components/GraphLayer';
import Line from '@/components/Line';
import TooltipPortal from './TooltipPortal';

const MOUSE_OFFSET = 10;

const ToolTipWrapper = styled.div.attrs({
  style: ({ left, top }) => ({
    position: 'absolute',
    left: left,
    top: top,
  }),
})`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  z-index: 100;
  transition: all 0.3s ease-out;
  pointer-events: none;

  > div + div {
    margin-top: 2px;
  }
`;

const ToolTip = ({
  xScale,
  yScale,
  radius = 2,
  currentPoint,
  mousePosition,
  xSelector,
  ySelectors,
}) => {
  if (!currentPoint) {
    return null;
  }

  const { clientX, clientY } = mousePosition;
  const x = xScale(xSelector(currentPoint));
  const poistion = {
    x1: x,
    x2: x,
  };

  return (
    <GraphLayer>
      <Line
        color="gray"
        position={poistion}
      />

      {ySelectors.map((ySelector, index) => {
        const y = yScale(ySelector(currentPoint));

        return (
          <circle
            key={index}
            r={radius}
            cx={x}
            cy={y}
          />
        );
      })}

      <TooltipPortal>
        <ToolTipWrapper
          left={clientX + MOUSE_OFFSET}
          top={clientY - MOUSE_OFFSET}
        >
          {Object.entries(currentPoint)
            .map(([key, value]) => (
              <div key={key}>{`${key}: ${value}`}</div>
            ))}
        </ToolTipWrapper>
      </TooltipPortal>
    </GraphLayer>
  );
}

export default withChartsConsumer(ToolTip);