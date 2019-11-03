import { createElement, Fragment, useRef, useEffect } from 'react';
import AniPortal from 'react-aniportal';

interface AnimationClassNames {
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
}

interface Props {
  displayed: boolean;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  animationClassNames?: AnimationClassNames;
  animationDuration?: number | { enter: number; exit: number };
  onClickOutside?: () => void;
  onEscapePress?: () => void;
  zIndex?: number;
}

const ESCAPE_KEYCODE = 27;

function getPortalStyle(zIndex: number): React.CSSProperties {
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
const containerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
};
const backgroundStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
};

function useEscapePress(displayed: boolean, onEscapePress: (() => void) | undefined) {
  const handleEscapeRef = useRef(onEscapePress);

  useEffect(() => {
    handleEscapeRef.current = onEscapePress;
  }, [onEscapePress]);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.keyCode === ESCAPE_KEYCODE && handleEscapeRef.current) {
        handleEscapeRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [displayed]);
}

const Modal: React.FC<Props> = ({
  displayed,
  children,
  className,
  overlayClassName,
  animationClassNames,
  animationDuration = 0,
  onClickOutside,
  onEscapePress,
  zIndex = 1,
}) => {
  useEscapePress(displayed, onEscapePress);

  if (displayed) {
    return (
      <AniPortal
        classNames={animationClassNames}
        style={getPortalStyle(zIndex)}
        timeout={animationDuration}
      >
        <Fragment>
          <div role="dialog" className={className} style={containerStyle}>
            {children}
          </div>
          <div className={overlayClassName} style={backgroundStyle} onClick={onClickOutside} />
        </Fragment>
      </AniPortal>
    );
  }

  return null;
};

Modal.displayName = 'Modal (react-tropi)';

export default Modal;
