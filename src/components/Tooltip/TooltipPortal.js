import ReactDOM from 'react-dom';

const bodyEl = document.querySelector('body');

const TooltipPortal = ({ children }) => ReactDOM.createPortal(
  children,
  bodyEl,
);

export default TooltipPortal;