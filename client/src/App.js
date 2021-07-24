import './App.css';
import Home from './Home/Home';
import Admin from './Admin/Admin';
import Faculty from './Faculty/Faculty';
import Student from './Student/Student';
import Librarian from './Librarian/Librarian';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/Home' component={Home}/>
        <Route path='/Admin' component={Admin}/>
        <Route path='/Faculty' component={Faculty}/>
        <Route path='/Student' component={Student}/>
        <Route path='/Librarian' component={Librarian}/>
      </Switch>
    </Router>
    </>
);
}
export default App;
