import {AppProvider} from './context/AppContext'
import Header from './component/Header'
import Body from './component/Body'
import './style/App.css';

function App() {
  return (
      <AppProvider>
        <Header />
        <Body />
      </AppProvider>
  );
}

export default App;
