import './App.css';
import Authentication from './component.js/authentication';
import UserContextProvider from './context/usercontext';
import Home from './component.js/home';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Route exact path="/" component={Authentication} />
        <Route path="/home" component={Home} />
      </UserContextProvider>
    </Router>
  );
}

export default App;
