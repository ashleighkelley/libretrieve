import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import pages
import PastPicks from './pages/PastPicks'
import PastSuggestions from './pages/PastSuggestions'
import Error from './pages/Error'

// import components
import Navbar from './components/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  /*const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    fetch("/picks")
      .then((res) => res.json())
      .then((book) => setBook(book));
  }, []);*/

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
