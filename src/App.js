import { getTranslation } from './services/api/dictionaryApi';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Search } from './components/Search'

function App() {

  getTranslation()
  return (
    <div className="App">
      <Router>

        <header className="App-header">
          Flashcard Game
      </header>
        <div>
          <Link to="/search">Search</Link>
          <Link to="/flashcards">Flashcards</Link>
          <Link to="/game">Game</Link>

        </div>

        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/flashcards">
            {/* <Flashcards /> */}Flashcards
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
