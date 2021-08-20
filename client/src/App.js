import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PastPicks from './pages/PastPicks'
import PastSuggestions from './pages/PastSuggestions'
import Error from './pages/Error'
import Navbar from './components/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/pastpicks" component={PastPicks}/>
        <Route path="/pastsuggestions" component={PastSuggestions}/>
        <Route path="/" component={PastPicks}/>
        <Route path="*" component={Error}/>
      </Switch>
    </Router>
  )
}

export default App;
