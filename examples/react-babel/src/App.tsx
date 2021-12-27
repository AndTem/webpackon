import { size } from 'lodash-es';
import { add } from 'core/utils';
import reactLogoSrc from 'images/react-logo.svg';
import './app.style.css';
import { Button } from '@material-ui/core';
import { TranspileMe } from '@webpackon/example-package/main';

const App = () => (
  <main>
    <img src={reactLogoSrc} alt="react logo" />
    <h1>Assemby webpackon!!!</h1>
    {add(10, 1)}
    {size({ d: 2 })}
    <TranspileMe number={22} />
    <Button>bn</Button>
  </main>
);

export default App;
