import React, { Component } from 'react';

import styles from './ResetPWForm.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';


class ResetPWForm extends Component {

    state = {
        password: '',
        confirmPassword: '',
        errorMsg: ''
    }

    componentDidMount(){
        this.props.resetPasswordForgotStatus();
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state);
        const token = this.props.match.params.token;

        if (this.state.password === this.state.confirmPassword){
            await (this.props.resetPassword(this.state.password, token));
        }else{
            this.setState({
                errorMsg: 'Passwords must match'
            });
        }

        if (this.props.resetPasswordSuccess){
            this.props.history.push('/login');
        }




    }


    render() {
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Reset Password</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>    
                        
                        <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputChangeHandler}/>
                        <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.inputChangeHandler}/>

                        <p style={{textAlign:'center', color: 'red'}}>{this.state.errorMsg ? this.state.errorMsg : null}</p>
                        <p style={{textAlign:'center', color: 'red'}}>{this.props.error}</p>
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
        resetPasswordSuccess: state.auth.resetPasswordSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPasswordForgotStatus: () => dispatch(authActionCreators.resetPasswordForgotStatus()),
        resetPassword: (password, token) => dispatch(authActionCreators.resetPassword(password, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPWForm);