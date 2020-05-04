import React from 'react';

// Export Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//Components
import Login from '../components/auth/Login'
import NewAccount from '../components/auth/NewAccount'
import Projects from './proyecto/Projects'
// CSS
import '../css/App.css';

//Context & Reducer
import ProjectState from '../context/project/projectState';
import TaskState from '../context/task/taskState';
import AlertState from '../context/alert/alertState';
import AuthenticationState from '../context/authentication/authentificationState';

// Token
import tokenAuth from '../config/token'

// HHC
import RoutePrivate from './route/routePrivate'

const token = localStorage.getItem("token");
if (token) tokenAuth(token);

function App() {

  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthenticationState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/newAccount" component={NewAccount} />
                <RoutePrivate exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthenticationState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
