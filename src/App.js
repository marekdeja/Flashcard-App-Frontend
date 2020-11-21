import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Search } from './components/Search'
import { Flashcards } from './components/Flashcards'
import styles from './App.module.scss'

function App() {
 
  return (
    <div className="App">
      <Router >
        <header>
          <div className={styles.title}>
            <div className={styles.titleText} ><Link to="/search">Flashcard App</Link></div>
          </div>
          <div className={styles.menu}>
            <Link to="/search"><div>Search</div></Link>
            <Link to="/flashcards"><div>Flashcards</div></Link>
            {/* <Link to="/game"><div>Game</div></Link> */}
          </div>
          <div className={styles.author}>by Marek Deja</div>
        </header>

        <Switch>
        <Route exact path="/">
            <Redirect to="/flashcards"/>
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/flashcards">
            <Flashcards />
          </Route>
          <Route path="/game">
            {/* <Game /> */}Game
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
