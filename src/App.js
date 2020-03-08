import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Introduction} from './components/introduction/Introduction';
import {Concepts} from './components/concepts/Concepts';
import {Budget} from './components/budget/Budget';
import {Planner} from './components/planner/Planner';
import {AnimationPage} from './components/animationPage/AnimationPage';
import {PageEnum} from './constants/PageEnum';
import "./styles/App.css";
import {Login} from "./components/login/Login";
import {Endgame} from "./components/endgame/Endgame";

export class App extends Component {

    constructor(props) {
        super(props);

        this.setUser = this.setUser.bind(this);
        this.renderWrappedRoute = this.renderWrappedRoute.bind(this);
    }

    render() {
        return (
            <div style={{minWidth: 320, minHeight: "100%"}}>
                <Router>
                    <Switch>
                        <Route path={PageEnum.CONCEPTS}>
                            {this.renderWrappedRoute(<Concepts/>)}
                        </Route>
                        <Route path={PageEnum.BUDGET}>
                            {this.renderWrappedRoute(<Budget/>)}
                        </Route>
                        <Route path={PageEnum.PLAN}>
                            {this.renderWrappedRoute(<Planner/>)}
                        </Route>
                        <Route path={PageEnum.ANIM}>
                            {this.renderWrappedRoute(<AnimationPage/>)}
                        </Route>
                        <Route path={PageEnum.INTRO}>
                            {this.renderWrappedRoute(<Introduction/>)}
                        </Route>
                        <Route path={PageEnum.ENDGAME}>
                            {this.renderWrappedRoute(<Endgame/>)}
                        </Route>
                        <Route path={PageEnum.DEFAULT}>
                            <Login setUser={this.setUser}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }

    renderWrappedRoute(component) {
        sessionStorage.getItem("user");
        if (!sessionStorage.getItem("user")) return <Redirect to={PageEnum.DEFAULT}/>;
        return component;
    }

    setUser(user) {
        sessionStorage.setItem("user", user);
    }
}
