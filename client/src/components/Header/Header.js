import React, { Component } from 'react';

import styles from './Header.module.css';

import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';
import * as jobActionCreators from '../../Redux/Actions/JobsActionCreators';
 
class Header extends Component {

    handleLogout = () => {
        this.props.logout();
        this.props.resetJobState();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className={styles.header}>

                <Link to='/' className={styles.logo}>JobsApp</Link>

                <div className={styles.links}>

                    {   !this.props.isAuthenticated ?  
                    <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to='/register' className={styles.link}>Register</Link>
                    </>
                    :
                    <>
                        <Link to='/settings' className={styles.link}>Settings</Link>
                        <div className={styles.link} onClick={this.handleLogout}>Logout</div>
                    </>
                    }

                    
                </div>
                
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout()),
        resetJobState: () => dispatch(jobActionCreators.resetJobState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));