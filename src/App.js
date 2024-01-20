import AllRoutes from './AllRoutes';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <AllRoutes/>
    </BrowserRouter>
  );
}

export default App;