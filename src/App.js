import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Introduction} from './components/introduction/Introduction';
import {Concepts} from './components/concepts/Concepts';
import {Budget} from './components/budget/Budget';
import {Planner} from './components/planner/Planner';
import {AnimationPage} from './components/animationPage/AnimationPage';
import {PageEnum} from './constants/PageEnum';
import {UserContext} from "./constants/Context";
import "./styles/App.css";
import {Login} from "./components/login/Login";
import {v1 as uuid} from 'uuid';
import {Endgame} from "./components/endgame/Endgame";

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: uuid()
        }

        this.setUser = this.setUser.bind(this);
    }

    render() {
        return (
            <div style={{minWidth: 320, minHeight: "100%"}}>
                <Router>
                    <Switch>
                        <Route path={PageEnum.CONCEPTS}>
                            <UserContext.Provider value={this.state.user}>
                                <Concepts/>
                            </UserContext.Provider>
                        </Route>
                        <Route path={PageEnum.BUDGET}>
                            <UserContext.Provider value={this.state.user}>
                                <Budget/>
                            </UserContext.Provider>
                        </Route>
                        <Route path={PageEnum.PLAN}>
                            <UserContext.Provider value={this.state.user}>
                                <Planner/>
                            </UserContext.Provider>
                        </Route>
                        <Route path={PageEnum.ANIM}>
                            <UserContext.Provider value={this.state.user}>
                                <AnimationPage/>
                            </UserContext.Provider>
                        </Route>
                        <Route path={PageEnum.INTRO}>
                            <UserContext.Provider value={this.state.user}>
                                <Introduction/>
                            </UserContext.Provider>
                        </Route>
                        <Route path={PageEnum.ENDGAME}>
                            <UserContext.Provider value={this.state.user}>
                                <Endgame/>
                            </UserContext.Provider>
                        </Route>
                        <Route path={PageEnum.DEFAULT}>
                            <Login setUser={this.setUser}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }

    setUser(user) {
        this.setState({user: user});
    }
}
