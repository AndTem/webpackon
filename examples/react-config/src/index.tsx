import ReactDOM from 'react-dom';

import App from './App';

const render = (Component: any) => {
  const root = document.getElementById('root');

  if (root) ReactDOM.render(<Component />, root);
};

render(App);
