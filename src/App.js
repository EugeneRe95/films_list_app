import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom"
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <Route exact path="/" component={MainPage}/>
    </Router>
  );
}

export default App;
