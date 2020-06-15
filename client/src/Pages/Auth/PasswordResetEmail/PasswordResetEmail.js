import React, { Component } from 'react';

import styles from './PasswordResetEmail.module.css';

import {Link} from 'react-router-dom';

class PasswordResetEmail extends Component {
    render() {
        return (
            <div className={styles.register}>


                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Reset Your Password</h1>

                    <p className={styles.text}>Please check your inbox. A password reset link has been sent to your inbox</p>

                    <Link to="/login" className={styles.link}><div className={styles.btn}>Login</div></Link>
                </div>
                
            </div>
        )
    }
}

export default PasswordResetEmail;