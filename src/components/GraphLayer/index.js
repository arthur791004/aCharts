import React, { Fragment } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import ClipPath from '@/components/ClipPath';

const Graph = styled.g.attrs({
  style: ({ left, top }) => ({
    transform: `translate(${left || 0}px, ${top || 0}px)`,
  }),
})``;

const GraphLayer = ({
  boundary,
  children,
  ...props
}) => {
  let clipPath;
  let clipPathID;

  if (boundary) {
    clipPathID = shortid();
    clipPath = `url(#${clipPathID})`;
  }

  return (
    <Fragment>
      {clipPathID && (
        <ClipPath clipPathID={clipPathID}>
          <rect
            width={boundary.width}
            height={boundary.height}
          >
            <animate
              attributeName="width"
              dur="1.5s"
              from="0"
              to="100%"
              fill="freeze"
            />
          </rect>
        </ClipPath>
      )}
      <Graph
        clipPath={clipPath}
        {...props}
      >
        {children}
      </Graph>
    </Fragment>
  );
};

export default GraphLayer;