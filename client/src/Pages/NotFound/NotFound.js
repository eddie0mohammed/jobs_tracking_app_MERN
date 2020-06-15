import React, { Component } from 'react'

import styles from './NotFound.module.css';

class NotFound extends Component {
    render() {
        return (
            <div className={styles.notFound}>
               <p style={{textAlign: 'center', fontSize: '3rem'}}>NOT FOUND</p> 
            </div>
        )
    }
}

export default NotFound;