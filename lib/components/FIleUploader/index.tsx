import React, { useRef } from 'react';

export const FileUploader = ({ id, children, onChange, accept }) => {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current.click();
  };

  return (
    <div onClick={onClick}>
      <input id={id} type="file" onChange={onChange} accept={accept} hidden={true} ref={inputRef} />
      {children}
    </div>
  );
};
