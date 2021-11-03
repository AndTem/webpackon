import { add } from 'core/utils';
import reactLogoSrc from 'images/react-logo.svg';

const App = () => (
  <main>
    <img src={reactLogoSrc} alt="react logo" />
    <h1>Assemby webpackon!!!</h1>
    {add(10, 1)}
  </main>
);

export default App;
