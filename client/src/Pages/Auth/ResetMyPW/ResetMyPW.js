import React, { Component } from 'react';

import styles from './ResetMyPW.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

class ResetMyPW extends Component {

    state = {
        currentPassword: '',
        password: '',
        confirmPassword: ''
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state);
        if (this.state.password === this.state.confirmPassword && this.state.currentPassword){
            
            await this.props.resetMyPassword(this.state.currentPassword, this.state.password);
        }

        if (this.props.resetPasswordSuccess){
            this.props.history.push('/settings');
        }

        
    }

    render() {
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Reset My Password</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        
                        
                        <input className={styles.input} type="password" name="currentPassword" placeholder="Current Password" value={this.state.currentPassword} onChange={this.inputChangeHandler}/>
                        <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputChangeHandler}/>
                        <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.inputChangeHandler}/>

                        <p style={{textAlign: 'center', color: 'red'}}>{this.props.error}</p>
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
        resetMyPassword: (currentPassword, newPassword) => dispatch(authActionCreators.resetMyPassword(currentPassword, newPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetMyPW);