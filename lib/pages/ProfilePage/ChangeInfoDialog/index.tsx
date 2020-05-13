import React from 'react';
import { Input, validators } from 'components/Input';
import { Dialog } from 'components/Dialog';
import './ChangeInfoDialog.scss';

const defaultEditObject = {
  variant: null,
  payload: null
};

type editObject = typeof defaultEditObject;

interface IChangeInfoDialog {
  editObject: editObject;
  onUpdate: (editObject: editObject) => void;
  onUpdateDone: () => void;
}

export const ChangeInfoDialog = ({ editObject, onUpdate, onUpdateDone }: IChangeInfoDialog) => {
  const onDone = () => {
    onUpdateDone();
    onUpdate(defaultEditObject);
  };
  const renderEditDialog = () => {
    let inputs: React.ReactNode;
    switch (editObject.variant) {
      case 'NAME':
        inputs = (
          <>
            <Input
              id={'last-name'}
              placeholderText={'Фамилия'}
              placeholderType={'subscript'}
              validate={validators.composeValidators(validators.notEmpty, validators.isString)}
              onChange={value =>
                onUpdate({
                  variant: 'NAME',
                  payload: {
                    ...editObject.payload,
                    lastName: value
                  }
                })
              }
            />
            <Input
              id={'first-name'}
              placeholderText={'Имя'}
              placeholderType={'subscript'}
              validate={validators.composeValidators(validators.notEmpty, validators.isString)}
              onChange={value =>
                onUpdate({
                  variant: 'NAME',
                  payload: {
                    ...editObject.payload,
                    firstName: value
                  }
                })
              }
            />
          </>
        );
        break;
      case 'EMAIL':
        inputs = (
          <Input
            id={'email'}
            placeholderText={'Электронная почта'}
            placeholderType={'subscript'}
            validate={validators.validEmail}
            onChange={value =>
              onUpdate({
                variant: 'EMAIL',
                payload: {
                  email: value
                }
              })
            }
          />
        );
        break;
      default:
        return null;
    }
    return (
      <Dialog onDone={onDone} onClose={() => onUpdate(defaultEditObject)} hide={false}>
        <p className="change-info-dialog__text">Введите новые данные</p>
        {inputs}
      </Dialog>
    );
  };
  return renderEditDialog();
};
