import React, { ReactNode, useState, useRef } from 'react';
import { SwatchesPicker, SwatchesPickerProps, ColorChangeHandler } from 'react-color';
import { useClickOutside } from 'hooks/useClickOutside';

interface IColorPickerProps {
  children: ReactNode;
  onOpen?: () => void;
}

export const ColorPicker: React.FC<IColorPickerProps & Pick<SwatchesPickerProps, 'onChangeComplete' | 'color'>> = ({
  children,
  onChangeComplete,
  color
}) => {
  const pickerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(pickerRef.current, () => setIsOpen(false));
  const handleChangeComplete: ColorChangeHandler = (clr, event) => {
    onChangeComplete(clr, event);
    setIsOpen(false);
  };
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div ref={pickerRef} onClick={handleClick}>
        {children}
      </div>
      {isOpen && <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} />}
    </>
  );
};
