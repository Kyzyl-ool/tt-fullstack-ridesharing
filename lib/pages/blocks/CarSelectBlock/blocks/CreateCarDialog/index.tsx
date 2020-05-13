import React, { useState } from 'react';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import { Dialog } from 'components/Dialog';
import { Input, validators } from 'components/Input';
import { Button } from 'components/Button';
import { ICar } from 'domain/car';
import { Select } from 'components/Select';
import { colorDict, ColorTile } from './components/ColorTile';
import './CreateCarDialog.scss';
import UserModel from 'models/UserModel';

type CarInfo = Omit<ICar, 'id' | 'owner'>;

interface ICreateCarDialog {
  onClose: () => void;
  onReady: (carInfo: CarInfo) => Promise<void>;
}

const serializeDict = (dict: string[]) => dict.map(elem => ({ id: elem, name: elem }));

const delayedModelSearch = _debounce(async value => await UserModel.searchCarModel(value), 300);

export const CreateCarDialog = ({ onClose, onReady }: ICreateCarDialog) => {
  const [creatingCarInfo, setCreatingCarInfo] = useState<CarInfo>({
    model: '',
    registryNumber: '',
    color: ''
  });

  const [colorOptions, setColorOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  const onModelSelected = (model: string) => {
    console.log(model);
    setCreatingCarInfo({ ...creatingCarInfo, model });
    setModelOptions([]);
  };

  const onRegistryNumberChange = (registryNumber: string) => {
    setCreatingCarInfo({ ...creatingCarInfo, registryNumber });
  };

  const onColorSelected = (color: string) => {
    setCreatingCarInfo({ ...creatingCarInfo, color });
    setColorOptions([]);
  };

  const onFilterColors = (value: string) => {
    const filteredColorsOptions = colorDict.filter(color => color.match(new RegExp(value, 'i')));
    setColorOptions(filteredColorsOptions);
  };

  const onFilterModels = async (value: string) => {
    const filteredModelsOptions = await delayedModelSearch(value);
    setModelOptions(filteredModelsOptions);
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
        <Select
          id="model"
          placeholderText="Модель"
          placeholderType="subscript"
          onChange={(value, isValid) => onFilterModels(isValid ? value : '')}
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
        <Select
          id="color"
          placeholderText="Цвет"
          placeholderType="subscript"
          onChange={(value, isValid) => onFilterColors(isValid ? value : '')}
          className="create-car-dialog__input"
          defaultValue={creatingCarInfo.color || ''}
          selectionOptions={serializeDict(!_isEmpty(colorOptions) ? colorOptions : [])}
          onSelect={onColorSelected}
          renderOption={(option, onSelectOption) => (
            <div onClick={() => onSelectOption(option)} className="create-car-dialog__color-option">
              <p className="create-car-dialog__color-option-name">{option.name}</p>
              <ColorTile color={option.name} />
            </div>
          )}
          renderRightAdornment={creatingCarInfo.color ? () => <ColorTile color={creatingCarInfo.color} /> : null}
        />
        <Button disabled={!isReady} filled className="create-car-dialog__button" onClick={onCreatingReady}>
          Готово
        </Button>
      </Dialog>
    </div>
  );
};
