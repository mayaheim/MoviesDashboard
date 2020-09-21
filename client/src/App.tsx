import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {MovieCard} from "./components/movie-card/movie";
import {MoviesGrid} from "./components/movies-grid/movies-grid";

export default function App() {
  return (
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/movie/:id"
                   component={MovieCard}/>
            <Route path="/">
              <MoviesGrid />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

