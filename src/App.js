import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { Introduction } from './components/introduction/Introduction';
import { Concepts } from './components/concepts/Concepts';
import { Budget } from './components/budget/Budget';
import { Planner } from './components/planner/Planner';
import { Animation } from './components/animation/Animation';
import { PageEnum } from './constants/PageEnum';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={PageEnum.CONCEPTS}>
            <Concepts/>
          </Route>
          <Route path={PageEnum.BUDGET}>
            <Budget/>
          </Route>
          <Route path={PageEnum.PLAN}>
            <Planner/>
          </Route>
          <Route path={PageEnum.ANIM}>
            <Animation/>
          </Route>
          <Route path={PageEnum.INTRO}>
            <Introduction/>
          </Route>
          <Route path={PageEnum.DEFAULT}>
            <Introduction/>
          </Route>
        </Switch>
      </Router>
      );
    }
}
