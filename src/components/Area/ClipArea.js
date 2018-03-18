import React from 'react';
import shortid from 'shortid';
import ClipPath from '@/components/ClipPath';
import GraphLayer from '@/components/GraphLayer';
import Area from './';

const ClipArea = ({
  xSelector,
  ySelector,
  clipYSelector,
  styles,
  ...props
}) => {
  const clipPathID = shortid();

  return (
    <GraphLayer>
      <ClipPath clipPathID={clipPathID}>
        <Area
          xSelector={xSelector}
          ySelector={clipYSelector}
          baseValue={0}
        />
      </ClipPath>
      <Area
        xSelector={xSelector}
        ySelector={ySelector}
        styles={{
          clipPath: `url(#${clipPathID})`,
          ...styles,
        }}
        {...props}
      />
    </GraphLayer>
  );
};

export default ClipArea;