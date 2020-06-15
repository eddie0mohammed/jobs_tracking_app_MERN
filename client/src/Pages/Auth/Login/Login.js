import React, { Component } from 'react';

import styles from './Login.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';
import * as jobActionCreators from '../../../Redux/Actions/JobsActionCreators';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount(){
        this.props.resetPasswordSuccessStatus();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state)

        await this.props.login(this.state.email, this.state.password);
        await this.props.getAllJobs();

        
        if (this.props.isAuthenticated){
            this.props.history.push('/');
        }

    }

    
    render() {
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Login</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        
                        <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                        <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>

                        <p style={{textAlign: 'center', color: 'red'}}>{this.props.error ? this.props.error : null}</p>
                        <input className={styles.submit} type="submit" value='Submit'/>
                    </form>

                    <Link className={styles.link} to='/resetPassword'><p className={styles.text}>Forgot your password?</p></Link>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(authActionCreators.login(email, password)),
        resetPasswordSuccessStatus: () => dispatch(authActionCreators.resetPasswordSuccessStatus()),
        getAllJobs: () => dispatch(jobActionCreators.getAllJobs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);