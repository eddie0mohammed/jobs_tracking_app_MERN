import React from 'react';
import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/Header/Header';

import Home from './Pages/Home/Home';
import Register from './Pages/Auth/Register/Register';
import Login from './Pages/Auth/Login/Login';
import ConfirmEmail from './Pages/Auth/ConfirmEmail/ConfirmEmail';
import PasswordResetEmail from './Pages/Auth/PasswordResetEmail/PasswordResetEmail';
import ResetPassword from './Pages/Auth/ResetPassword/ResetPassword';
import ResetPWForm from './Pages/Auth/ResetPWForm/ResetPWForm';
import ResetMyPW from './Pages/Auth/ResetMyPW/ResetMyPW';
import Settings from './Pages/Auth/Settings/Settings';
import NotFound from './Pages/NotFound/NotFound';

import New from './Pages/Jobs/New/New';
import Edit from './Pages/Jobs/Edit/Edit';
import View from './Pages/Jobs/View/View';


import * as authActionCreators from './Redux/Actions/AuthActionCreators';
import * as jobActionCreators from './Redux/Actions/JobsActionCreators';

class App extends React.Component {

  async componentDidMount(){
    await this.props.getUser(this.props.token);

    this.props.getAllJobs();

  }

  render(){

    return (
      <div className="App">

        <Header />

        <Switch>

          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact render={(props) => this.props.isAuthenticated ? <Home {...props} /> : <Redirect to='/login' />} />
          <Route path="/register" exact render={(props) => !this.props.isAuthenticated ? <Register {...props} /> : <Redirect to='/' />}  />
          <Route path="/login" exact render={(props) => !this.props.isAuthenticated ? <Login {...props} /> : <Redirect to='/' />} />
          <Route path="/confirmEmail" exact component={ConfirmEmail} />
          <Route path="/resetPasswordEmail" exact component={PasswordResetEmail} />
          <Route path="/resetPassword" exact component={ResetPassword} />
          <Route path="/reset-password/:token" exact component={ResetPWForm} />
          <Route path="/resetMyPassword" exact render={(props) => this.props.isAuthenticated ? <ResetMyPW {...props} /> : <Redirect to='/login' />} />
          <Route path="/settings" exact render={(props) => this.props.isAuthenticated ? <Settings {...props} /> : <Redirect to='/login' />} />

          <Route path='/jobs/new' exact render={(props) => this.props.isAuthenticated ? <New {...props} /> : <Redirect to='/login' />} />
          <Route path='/jobs/edit/:id' exact render={(props) => this.props.isAuthenticated ? <Edit {...props} /> : <Redirect to='/login' />} />
          <Route path='/jobs/:id' exact render={(props) => this.props.isAuthenticated ? <View {...props} /> : <Redirect to='/login' />} />


          <Route component={NotFound} />

        </Switch>

      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token) => dispatch(authActionCreators.getUser(token)),

    getAllJobs: () => dispatch(jobActionCreators.getAllJobs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
