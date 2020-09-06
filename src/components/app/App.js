import React from 'react';
import classes from './App.module.css';
import Quiz from "../../containers/quiz";
import Drawer from "../Navigation/Drawer/Drawer";
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from "react-router-dom"
import Auth from "../../containers/Auth/Auth";
import QuizCreator from "../../containers/QuizCreator/QuizCreator";
import QuizList from "../../containers/QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "../Logout/Logout";
import {autoLogin} from "../../store/actions/auth";


class App extends React.Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {


        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz-creator" component={QuizCreator}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" exact component={QuizList}/>
                <Redirect to="/"/>
            </Switch>
        )

        if (this.props.isAuthenticated)
            routes = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator}/>
                    <Route path="/quiz/:id" component={Quiz}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={QuizList}/>
                    <Redirect to="/"/>
                </Switch>
            )


        return (
            <Router>
                <div className={classes.App}>

                    <Drawer
                        isOpen={this.state.menu}
                        onClose={this.menuCloseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />

                    <MenuToggle
                        onToggle={this.toggleMenuHandler}
                        isOpen={this.state.menu}
                    />

                    {routes}

                </div>
            </Router>
        );
    }


}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
