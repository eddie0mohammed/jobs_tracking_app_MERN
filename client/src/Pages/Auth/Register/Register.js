import React, { Component } from 'react';

import styles from './Register.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await this.props.register(this.state.username, this.state.email, this.state.password);
        if (this.props.registerStatus){
            this.props.history.push('/confirmEmail');
        }

    }


    render() {
        
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Register</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        <input className={styles.input} type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.inputChangeHandler}/>
                        <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.inputChangeHandler}/>
                        <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputChangeHandler}/>

                        <p style={{textAlign: 'center', color: 'red'}}>{this.props.error ? this.props.error : null}</p>
                        <input className={styles.submit} type="submit" value='Submit'/>
                    </form>

                    <Link to='/login' className={styles.link}><p className={styles.text}>Already have an account? Login</p></Link>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        registerStatus: state.auth.registerStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, email, password) => dispatch(authActionCreators.register(username, email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);