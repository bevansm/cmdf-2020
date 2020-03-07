import React from 'react';
import './App.css';
import { Introduction } from './components/introduction/Introduction';
import { Concepts } from './components/concepts/Concepts';
import { Setup } from './components/setup/Setup';
import { Planning } from './components/planning/Planning';
import { Animation } from './components/animation/Animation';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/concepts"}>
          <Concepts/>
        </Route>
        <Route path={"/setup"}>
          <Setup/>
        </Route>
        <Route path={"/plan"}>
          <Planning/>
        </Route>
        <Route path={"/loading"}>
          <Animation/>
        </Route>
        <Route path={"/"}>
          <Introduction/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
