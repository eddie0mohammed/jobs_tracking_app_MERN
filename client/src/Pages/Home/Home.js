
import React, { Component } from 'react'

import styles from './Home.module.css';

import Main from '../../components/Main/Main';

class Home extends Component {
    render() {
        return (
            <div className={styles.home}>

                <Main />

            </div>
        )
    }
}

export default Home;