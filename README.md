# react-tropi
A react component to create accessible modal with css animations

> since version 0.2 the component use react hooks so you'll need to upgrade react to version >=16.8

## Install

```bash
yarn add react-tropi

# or with npm

npm install --save react-tropi
```

## Basic examples

#### example
jsx file :
```jsx
import { Modal } from 'react-tropi';

const animationClassNames = {
  enter: 'animation-enter',
  enterActive: 'animation-enter-active',
  exit: 'animation-exit',
  exitActive: 'animation-exit-active',
};

...

<Modal
  displayed={displayed}
  animationDuration={500}
  className="modal"
  overlayClassName="modal-overlay"
  animationClassNames={animationClassNames}
  onClickOutside={this.closeModal}
>
  <div>Hello World !</div>
</Modal>
```

css file :
```css
.modal {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
}
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

/* animation of modal */
.animation-enter .modal {
  transform: scale(0);
}
.animation-enter-active .modal {
  transform: scale(1);
  transition: 500ms;
}
.animation-exit .modal {
  transform: scale(1);
}
.animation-exit-active .modal {
  transform: scale(0);
  transition: 500ms;
}

/* animation of overlay */
.animation-enter .modal-overlay {
  opacity: 0;
}
.animation-enter-active .modal-overlay {
  opacity: 1;
  transition: 500ms;
}
.animation-exit .modal-overlay {
  opacity: 1;
}
.animation-exit-active .modal-overlay {
  opacity: 0;
  transition: 500ms;
}
```

## Documentation

### Modal

#### Props :
**displayed** `boolean`  
define if modal is displayed or not

**className** `(optional) string`  
className of the modal.

**overlayClassName** `(optional) string`  
className of the overlay.

**animationClassNames** `(optional) { enter: string; enterActive: string; exit: string; exitActive: string }`  
classNames to apply on component during animation.

**animationDuration** `(optional) number | { enter: number; exit: number }`  
duration of the animation.

**onClickOutside**  `(optional) () => void`  
function called when user click on overlay.

**onEscapePress**  `(optional) () => void`  
function called when user press escape key.

**zIndex**  `(optional) number`  
default to 1, you can chose an appropriate z-index to fit with your expected behavior with other components using portal.

**children** `ReactNode`  
modal content.
