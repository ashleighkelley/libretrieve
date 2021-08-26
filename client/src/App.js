import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PastPicks from './pages/PastPicks'
import PastSuggestions from './pages/PastSuggestions'
import Error from './pages/Error'
import Navbar from './components/Navbar'

const getLocalTheme = () => {
  let theme = 'amulet';
  if (localStorage.getItem('theme')){
    theme = localStorage.getItem('theme');
  }
  return theme;
}

function App() {

  const [theme, setTheme] = useState(getLocalTheme());

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme])

  /*const toggleTheme = () => {
    if(theme=== 'light-theme'){
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  }*/

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
