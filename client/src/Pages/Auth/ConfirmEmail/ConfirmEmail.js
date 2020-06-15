import React, { Component } from 'react';

import styles from './ConfirmEmail.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as authActionCreators from '../../../Redux/Actions/AuthActionCreators';


class ConfirmEmail extends Component {

    componentDidMount(){
        this.props.resetRegisterStatus();
    }

    render() {
        
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Activate Your Account</h1>

                    <p className={styles.text}>Please check your inbox. An activation link has been sent to your inbox</p>

                    <Link style={{textDecoration: 'none'}} to='/login'><div className={styles.btn}>Login</div></Link>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetRegisterStatus: () => dispatch(authActionCreators.resetRegisterStatus()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);