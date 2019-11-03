import { createElement, Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from '../../../src/index';
import * as style from './style.scss';

const animationClassNames = {
  enter: style.animationEnter,
  enterActive: style.animationEnterActive,
  exit: style.animationExit,
  exitActive: style.animationExitActive,
};

storiesOf('Modal', module).add('default', () => <InteractiveComponent />);

const InteractiveComponent: React.FC = () => {
  const [displayed, setDisplayed] = useState(false);

  const openModal = () => setDisplayed(true);
  const closeModal = () => setDisplayed(false);

  return (
    <Fragment>
      <button className={style.button} onClick={openModal}>
        Open Modal
      </button>
      <Modal
        displayed={displayed}
        animationDuration={500}
        className={style.modal}
        overlayClassName={style.overlay}
        animationClassNames={animationClassNames}
        onClickOutside={closeModal}
        onEscapePress={closeModal}
      >
        <input type="text" />
        <button className={style.button} onClick={closeModal}>
          Close Modal
        </button>
      </Modal>
    </Fragment>
  );
};
