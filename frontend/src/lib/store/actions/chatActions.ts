import * as actions from './actionTypes';

interface INewMessageAction {
  from: number;
  time: Date;
  text: string;
}
export const newMessageAction: (args: INewMessageAction) => any = ({ from, text, time }) => {
  return {
    type: actions.CHAT_NEW_MESSAGE,
    payload: {
      from,
      text,
      time
    }
  };
};

export const tapAction = () => {
  return {
    type: actions.CHAT_TAP
  };
};

export const sendAction = () => {
  return {
    type: actions.CHAT_SEND
  };
};

export const nextStep = () => {
  return {
    type: actions.CHAT_NEXT_STEP
  };
};
