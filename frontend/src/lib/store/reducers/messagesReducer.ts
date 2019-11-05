const plot = [
  'Оно призвано помочь участникам из одной организации найти попутчиков.',
  'Как вас зовут? (это имя будет отображаться при взаимодействии с другими пользователями)',
  'Ваш номер телефона? (для контакта других пользователей с вами)',
  'Придумайте пароль для входа в приложение.',
  'Вы являетесь водителем? (Да/Нет)',
  'Регистрация вашего профиля почти закончена. Осталось присоединиться к организации, либо создать новую.',
  'На этом регистрация завершена. Приятного пользования нашим приложением =)'
];

const driverPlot = [
  'Подготовьте, пожалуйста, ваше водительское удостоверение.',
  'Сфотографируйте ваше водительское удостоверение.'
];

let plotIndex = 0;
const driverIndex = 0;

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case 'new': {
      return Array.from(state).concat([
        {
          from: action.payload.from,
          time: new Date().toLocaleTimeString(),
          message: action.payload.message
        }
      ]);
      // return Array.from(state).concat([{
      //   ...action.payload
      // }])
    }
    case 'next': {
      if (plotIndex < plot.length) {
        return Array.from(state).concat([
          {
            from: 0,
            time: new Date().toLocaleTimeString(),
            message: plot[plotIndex++]
          }
        ]);
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};