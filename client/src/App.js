import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Projects from './components/projects/Projects'

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState'
import AuthState from './context/auth/authState'
import authToken from './config/authToken'
import PrivateRoutes from './components/routes/privateRoutes'

//review token
const token = localStorage.getItem('token')
if(token) {
    authToken(token)
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <PrivateRoutes exact path='/projects' component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  )
}

export default App
