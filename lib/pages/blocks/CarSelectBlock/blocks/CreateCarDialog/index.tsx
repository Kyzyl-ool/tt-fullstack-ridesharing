import React, { useState, useCallback } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Dialog } from 'components/Dialog';
import { Input, validators } from 'components/Input';
import { Button } from 'components/Button';
import { ICar } from 'domain/car';
import { Select } from 'components/Select';
import { ColorTile } from './components/ColorTile';
import './CreateCarDialog.scss';
import UserModel from 'models/UserModel';
import { ColorPicker } from 'components/ColorPicker';
import { ColorChangeHandler } from 'react-color';

type CarInfo = Omit<ICar, 'id' | 'owner'>;

interface ICreateCarDialog {
  onClose: () => void;
  onReady: (carInfo: CarInfo) => Promise<void>;
}

const serializeDict = (dict: string[]) => dict.map(elem => ({ id: elem, name: elem }));

export const CreateCarDialog = ({ onClose, onReady }: ICreateCarDialog) => {
  const [creatingCarInfo, setCreatingCarInfo] = useState<CarInfo>({
    model: '',
    registryNumber: '',
    color: ''
  });

  const [modelOptions, setModelOptions] = useState([]);

  const modelSearch = useCallback(async value => await UserModel.searchCarModel(value), []);

  const onModelSelected = (model: string) => {
    setCreatingCarInfo({ ...creatingCarInfo, model });
    setModelOptions([]);
  };

  const onRegistryNumberChange = (registryNumber: string) => {
    setCreatingCarInfo({ ...creatingCarInfo, registryNumber });
  };

  const handleColorChangeComplete: ColorChangeHandler = color => {
    setCreatingCarInfo({ ...creatingCarInfo, color: color.hex });
  };

  const onFilterModels = useCallback(
    async (value: string) => {
      const filteredModelsOptions = await modelSearch(value);
      setModelOptions(filteredModelsOptions);
    },
    [modelSearch]
  );

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
        <Select
          id="model"
          placeholderText="Модель"
          placeholderType="subscript"
          onChange={value => onFilterModels(value)}
          className="create-car-dialog__input"
          defaultValue={creatingCarInfo.model || ''}
          validate={validators.composeValidators(validators.notEmpty, validators.isString)}
          onSelect={onModelSelected}
          selectionOptions={serializeDict(!_isEmpty(modelOptions) ? modelOptions : [])}
          renderOption={(option, onSelectOption) => (
            <div onClick={() => onSelectOption(option)} className="create-car-dialog__color-option">
              <p className="create-car-dialog__color-option-name">{option.name}</p>
            </div>
          )}
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
        <ColorPicker onChangeComplete={handleColorChangeComplete}>
          <div className="create-car-dialog__color-info">
            <p>Выбрать цвет</p>
            <ColorTile color={creatingCarInfo.color} />
          </div>
        </ColorPicker>
        <Button disabled={!isReady} filled className="create-car-dialog__button" onClick={onCreatingReady}>
          Готово
        </Button>
      </Dialog>
    </div>
  );
};
