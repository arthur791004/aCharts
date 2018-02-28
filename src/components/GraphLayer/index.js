import React, { Fragment } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import ClipPath from '@/components/ClipPath';

const Graph = styled.g`
   transform: translate(
     ${props => props.left || 0}px, ${props => props.top || 0}px
   );
`;

const GraphLayer = ({
  boundary,
  children,
  ...props,
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
          />
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