import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Slider } from 'components/Slider';
import { Avatar } from 'components/Avatar/Avatar';
import { Menu } from 'components/Menu';
import { sampleAvatarSrc } from 'samples/samples';
import { isLaptopMatchMedia } from 'helpers/matchers';
import './Sidebar.scss';

interface ISidebar {
  visible: boolean;
  onClose: () => void;
}

export const Sidebar = ({ visible, onClose }: ISidebar) => {
  const location = useLocation();
  const userInfo = useSelector(state => state.user.user);

  const isDesktop = isLaptopMatchMedia();

  console.log(isDesktop);

  const renderReturnToMainLink = () =>
    location.pathname !== '/' && (
      <Link to="/">
        <div className="rsh-sidebar__main">Вернуться на главную</div>
      </Link>
    );

  return ReactDOM.createPortal(
    <Fragment>
      <Slider from="left" visible={!isDesktop ? visible : true} timeout={600} unmountOnExit>
        <menu className="rsh-sidebar">
          <div className="rsh-sidebar__container">
            <div className="rsh-sidebar__personal-info">
              <Avatar src={userInfo.photoUrl || sampleAvatarSrc} size="small" />
              <h3 className="rsh-sidebar__username">
                {userInfo.firstName} {userInfo.lastName}
              </h3>
            </div>
            {renderReturnToMainLink()}
            <Menu />
          </div>
        </menu>
      </Slider>
      <Slider from="right" visible={visible} timeout={1200} unmountOnExit>
        <div onClick={onClose} className="rsh-sidebar__close-button">
          <div className="rsh-sidebar__close-button-icon" />
        </div>
      </Slider>
    </Fragment>,
    document.body
  );
  // return (
  //   <Fragment>
  //     <Slider from="left" visible={visible} timeout={600} unmountOnExit>
  //       <menu className="rsh-sidebar">
  //         <div className="rsh-sidebar__container">
  //           <div className="rsh-sidebar__personal-info">
  //             <Avatar src={userInfo.photoUrl || sampleAvatarSrc} size="small" />
  //             <h3 className="rsh-sidebar__username">
  //               {userInfo.firstName} {userInfo.lastName}
  //             </h3>
  //           </div>
  //           {renderReturnToMainLink()}
  //           <Menu />
  //         </div>
  //       </menu>
  //     </Slider>
  //     <Slider from="right" visible={visible} timeout={1200} unmountOnExit>
  //       <div onClick={onClose} className="rsh-sidebar__close-button">
  //         <div className="rsh-sidebar__close-button-icon" />
  //       </div>
  //     </Slider>
  //   </Fragment>
  // );
  // return ReactDOM.createPortal(
  //   <Fragment>
  //     <Slider from="left" visible={visible} timeout={600} unmountOnExit>
  //       <menu className="rsh-sidebar">
  //         <div className="rsh-sidebar__container">
  //           <div className="rsh-sidebar__personal-info">
  //             <Avatar src={userInfo.photoUrl || sampleAvatarSrc} size="small" />
  //             <h3 className="rsh-sidebar__username">
  //               {userInfo.firstName} {userInfo.lastName}
  //             </h3>
  //           </div>
  //           {renderReturnToMainLink()}
  //           <Menu />
  //         </div>
  //       </menu>
  //     </Slider>
  //     <Slider from="right" visible={visible} timeout={1200} unmountOnExit>
  //       <div onClick={onClose} className="rsh-sidebar__close-button">
  //         <div className="rsh-sidebar__close-button-icon" />
  //       </div>
  //     </Slider>
  //   </Fragment>,
  //   document.querySelector('.rsh-backdrop')
  // );
};
