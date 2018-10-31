import { createElement, Component, ReactNode, CSSProperties, Fragment } from 'react';
import AniPortal from 'react-aniportal';

interface AnimationClassNames {
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
}

interface Props {
  displayed: boolean;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  animationClassNames?: AnimationClassNames;
  animationDuration: number | { enter: number; exit: number };
  onClickOutside?: () => void;
  zIndex: number;
}

const TAB_KEYCODE = 9;
const ESCAPE_KEYCODE = 27;

function getPortalStyle(zIndex: number): CSSProperties {
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
}
const containerStyle: CSSProperties = {
  position: 'relative',
  zIndex: 2,
};
const backgroundStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
};

class Modal extends Component<Props> {
  container: HTMLDivElement | null = null;
  focusableElements: HTMLElement[] = [];
  beforeOpenFocusedELement: HTMLElement | null = null;

  static defaultProps = {
    animationDuration: 0,
    zIndex: 1,
  };

  constructor(props: Props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setContainer = this.setContainer.bind(this);
  }

  componentDidUpdate({ displayed: wasDisplayed }: Props) {
    const { displayed } = this.props;
    if (wasDisplayed && !displayed) {
      this.modalDidClose();
    }
    this.focusableElements = this.getFocusableElements();
  }

  componentDidMount() {
    if (this.props.displayed) {
      this.modalDidOpen();
    }
  }

  componentWillUnmount() {
    this.modalDidClose();
  }

  modalDidOpen() {
    this.focusableElements = this.getFocusableElements();
    // keep last focused element to focus it again when modal will be closed
    this.beforeOpenFocusedELement = document.activeElement as HTMLElement;
    // set focus on container
    if (this.container) {
      this.container.focus();
    }

    window.addEventListener('keydown', this.handleKeyDown);
  }

  modalDidClose() {
    this.focusableElements = [];
    // reset focus on focused element before modal was open
    if (this.beforeOpenFocusedELement && this.beforeOpenFocusedELement.focus) {
      this.beforeOpenFocusedELement.focus();
    }
    this.beforeOpenFocusedELement = null;

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getFocusableElements(): HTMLElement[] {
    if (this.container) {
      const cssQuery = // tslint:disable-next-line max-line-length
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
      const nodeList = this.container.querySelectorAll(cssQuery);
      return Array.prototype.slice.call(nodeList);
    }
    return [];
  }

  handleKeyDown(event: KeyboardEvent) {
    const { displayed, onClickOutside } = this.props;
    if (displayed) {
      switch (event.keyCode) {
        case TAB_KEYCODE: {
          const { shiftKey } = event;
          if (this.focusableElements.length === 0) {
            event.preventDefault();
          } else if (shiftKey) {
            this.focusPreviousElement(event);
          } else {
            this.focusNextElement(event);
          }
          break;
        }
        case ESCAPE_KEYCODE: {
          if (onClickOutside) {
            onClickOutside();
          }
          break;
        }
      }
    }
  }

  focusNextElement(event: KeyboardEvent) {
    const lastFocusableIndex = this.focusableElements.length - 1;
    const lastFocusableElement = this.focusableElements[lastFocusableIndex];
    if (document.activeElement === lastFocusableElement) {
      const firstFocusableElement = this.focusableElements[0];
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }

  focusPreviousElement(event: KeyboardEvent) {
    const firstFocusableElement = this.focusableElements[0];
    if (document.activeElement === firstFocusableElement) {
      const lastFocusableIndex = this.focusableElements.length - 1;
      const lastFocusableElement = this.focusableElements[lastFocusableIndex];
      event.preventDefault();
      lastFocusableElement.focus();
    }
  }

  setContainer(ref: HTMLDivElement | null) {
    this.container = ref;
    if (ref) {
      // call modal did open here because ref is null in componentDidMount and componentDidUpdate
      this.modalDidOpen();
    }
  }

  render() {
    const {
      displayed,
      children,
      className,
      overlayClassName,
      animationClassNames,
      animationDuration,
      onClickOutside,
      zIndex,
    } = this.props;

    if (displayed) {
      return (
        <AniPortal
          classNames={animationClassNames}
          style={getPortalStyle(zIndex)}
          timeout={animationDuration}
        >
          <Fragment>
            <div
              role="dialog"
              tabIndex={-1}
              ref={this.setContainer}
              className={className}
              style={containerStyle}
            >
              {children}
            </div>
            <div className={overlayClassName} style={backgroundStyle} onClick={onClickOutside} />
          </Fragment>
        </AniPortal>
      );
    }
    return null;
  }
}

export default Modal;
