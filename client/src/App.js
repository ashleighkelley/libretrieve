import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import pages
import PastPicks from './pages/PastPicks'
import PastSuggestions from './pages/PastSuggestions'
import Error from './pages/Error'

// import components
import Navbar from './components/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    fetch("/picks")
      .then((res) => res.json())
      .then((book) => setBook(book));
  }, []);


  /*return (
      <main>

        <Table striped bordered hover size="med">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <Books items={bookList} />
        </Table>
      </main>
  );*/

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/">
          <PastPicks/>
        </Route>
        <Route path="/picks">
          <PastPicks/>
        </Route>
        <Route path="/suggestions">
          <PastSuggestions/>
        </Route>
        <Route path="*">
          <Error/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
