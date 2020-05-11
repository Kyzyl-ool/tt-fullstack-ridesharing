import React, { useState } from 'react';
import { Dialog } from 'components/Dialog';
import { Input, validators } from 'components/Input';
import { Button } from 'components/Button';
import { ICar } from 'domain/car';
import './CreateCarDialog.scss';

type CarInfo = Omit<ICar, 'id' | 'owner'>;

interface ICreateCarDialog {
  onClose: () => void;
  // onModelChange: (value: string) => void;
  // onRegistryNumberChange: (value: string) => void;
  // onColorChange: (value: string) => void;
  onReady: (carInfo: CarInfo) => Promise<void>;
}

export const CreateCarDialog = ({ onClose, onReady }: ICreateCarDialog) => {
  const [creatingCarInfo, setCreatingCarInfo] = useState<CarInfo>({
    model: '',
    registryNumber: '',
    color: ''
  });

  const onModelChange = (model: string) => {
    setCreatingCarInfo({ ...creatingCarInfo, model });
  };

  const onRegistryNumberChange = (registryNumber: string) => {
    setCreatingCarInfo({ ...creatingCarInfo, registryNumber });
  };

  const onColorChange = (color: string) => {
    setCreatingCarInfo({ ...creatingCarInfo, color });
  };

  const onCreatingReady = () => {
    onReady(creatingCarInfo);
  };

  const isReady = !!(creatingCarInfo.model && creatingCarInfo.registryNumber && creatingCarInfo.color);

  return (
    <div className="create-car-dialog">
      <div className="create-car-dialog__blurred-background" />
      <Dialog
        onClose={onClose}
        hide={false}
        buttonText="Подтвердить"
        withConfirmButton={false}
        redirectTo=""
        withRedirectTo={false}
      >
        <p className="create-car-dialog__text">Новый автомобиль</p>
        <Input
          id="model"
          placeholderText="Модель"
          placeholderType="subscript"
          onChange={(value, isValid) => onModelChange(isValid ? value : '')}
          className="create-car-dialog__input"
          validate={validators.composeValidators(validators.notEmpty, validators.isString)}
        />
        <Input
          id="registryNumber"
          placeholderText="Регистрационный номер"
          placeholderType="subscript"
          onChange={(value, isValid) => onRegistryNumberChange(isValid ? value : '')}
          changeModifier={value => value.toUpperCase()}
          validate={validators.composeValidators(validators.notEmpty, validators.validRegistryNumber)}
          className="create-car-dialog__input"
        />
        <Input
          id="color"
          placeholderText="Цвет"
          placeholderType="subscript"
          onChange={(value, isValid) => onColorChange(isValid ? value : '')}
          className="create-car-dialog__input"
          validate={validators.composeValidators(validators.notEmpty, validators.isString)}
        />
        <Button disabled={!isReady} filled className="create-car-dialog__button" onClick={onCreatingReady}>
          Готово
        </Button>
      </Dialog>
    </div>
  );
};
