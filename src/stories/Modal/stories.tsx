import { createElement, Component, Fragment } from 'react';
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

class InteractiveComponent extends Component<{}, { displayed: boolean }> {
  state = { displayed: false };

  openModal = () => this.setState({ displayed: true });
  closeModal = () => this.setState({ displayed: false });

  render() {
    const { displayed } = this.state;

    return (
      <Fragment>
        <button className={style.button} onClick={this.openModal}>
          Open Modal
        </button>
        <Modal
          displayed={displayed}
          animationDuration={500}
          className={style.modal}
          overlayClassName={style.overlay}
          animationClassNames={animationClassNames}
          onClickOutside={this.closeModal}
        >
          <input type="text" />
          <button className={style.button} onClick={this.closeModal}>
            Close Modal
          </button>
        </Modal>
      </Fragment>
    );
  }
}
