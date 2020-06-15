import React, { Component } from 'react';

import styles from './ResetPassword.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

class ResetPassword extends Component {

    state = {
        email: ''
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state);

        await this.props.resetPasswordRequest(this.state.email);
        
        if (this.props.forgotPasswordStatus){
            this.props.history.push('/resetPasswordEmail')
        }

    }

    render() {
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Reset Password</h1>

                    <p className={styles.text}>Please enter your email. A password reset link will be sent to your inbox</p>
                    <form className={styles.form} onSubmit={this.handleSubmit}>
                   
                        <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.inputChangeHandler}/>
                        
                        <p style={{color: 'red', textAlign: 'center'}}>{this.props.error}</p>
                        <input className={styles.submit} type="submit" value='Submit'/>
                    </form>

                    
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error,
        forgotPasswordStatus: state.auth.forgotPasswordStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPasswordRequest: (email) => dispatch(authActionCreators.resetPasswordRequest(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);