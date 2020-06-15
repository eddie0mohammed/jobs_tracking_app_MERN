
import React, { Component } from 'react';

import styles from './Settings.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';

class Settings extends Component {

    state = {
        username: '',
        email: '',
        createdAt: '',
       
    }

    componentDidMount(){

        this.props.resetPasswordSuccessStatus();
        if (this.props.user){

            this.setState({
                username: this.props.user.username,
                email: this.props.user.email,
                createdAt: this.props.user.createdAt.split('T')[0]
            });
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state)

        

    }

    
    render() {
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Settings</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        <input className={styles.input} type="text" name="username" placeholder="Username" value={this.state.username} disabled/>
                        <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} disabled/>
                        <input className={styles.input} type="text" name="createdAt" placeholder="Created At" value={this.state.createdAt} disabled/>

                        <div className={styles.change}>
                            <p className={styles.para}>Change Password</p>
                            <Link className={styles.btn} to='/resetMyPassword'>Click</Link>
                        </div>

                    </form>

                    
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPasswordSuccessStatus: () => dispatch(authActionCreators.resetPasswordSuccessStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);