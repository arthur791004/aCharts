import React from 'react';

const ClipPath = ({
  clipPathID,
  children,
}) => {
  return (
    <defs>
      <clipPath id={clipPathID}>
        {children}
      </clipPath>
    </defs>
  );
}

export default ClipPath;