import { size } from 'lodash-es';
import { add } from 'core/utils';
import reactLogoSrc from 'images/react-logo.svg';
import './app.style.css';
import { Button } from '@material-ui/core';

const App = () => (
  <main>
    <img src={reactLogoSrc} alt="react logo" />
    <h1>Assemby webpackon!!!</h1>
    {add(10, 1)}
    {size({ d: 2 })}
    <Button>btn</Button>
  </main>
);

export default App;
