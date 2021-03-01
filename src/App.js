import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading";
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/Dashboard';
import QuestionPage from './components/QuestionPage';
import QuestionResult from './components/QuestionResult';
import AddQuestion from './components/AddQuestion';
import Leaderboard from './components/Leaderboard';
import Error from './components/Error';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser, users, questions } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {authedUser
              ? (
                <>
                  <NavigationBar authedUser={authedUser} />

                  <Switch>
                    <Route exact path="/" component={() => <Dashboard authedUser={users[authedUser]} questions={questions} />} />
                    <Route
                      path="/questions/:question_id"
                      render={({ match }) => (<QuestionPage id={match.params.question_id} />)} />
                    <Route
                      path="/questions/:question_id/view"
                      render={({ match }) => (
                        <QuestionResult id={match.params.question_id} />
                      )}
                    />
                    <Route path="/add" component={AddQuestion} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/not-found" component={Error} />
                  </Switch>

                </>
              )
              : (
                <>
                  <Redirect to="/login" />
                  <Route path='/login' exact component={Login} />
                </>
              )}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    loading: authedUser ? authedUser : null,
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(App) 