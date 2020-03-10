import React from 'react';

export const withClick = (node: React.ReactNode, func: () => any) => {
  return (
    <div onClick={func} style={{ cursor: 'pointer' }}>
      {node}
    </div>
  );
};
