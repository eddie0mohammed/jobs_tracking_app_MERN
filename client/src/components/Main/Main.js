
import React, { Component } from 'react';

import styles from './Main.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

// import * as jobActionCreators from '../../Redux/Actions/JobsActionCreators';

class Main extends Component {

    state = {
        data: [],
        search: '',
        input: '',
        sort: null
    }

    componentDidMount(){
        // this.props.getAllJobs();
    }

    componentDidUpdate(prevProps){
        if (prevProps.jobs !== this.props.jobs){
            this.setState({
                data: [...this.props.jobs]
            });
        }

    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
       
    }


    renderRows = () => {
        let dataArray = this.filterSort(this.props.jobs);
        if (this.state.input){
            return (
                dataArray.filter(elem => elem.companyName.startsWith(this.state.input)).map((elem) => {
                return (
                    <div className={styles.tableRow} key={elem._id}>
                        <p className={styles.content}>{elem.companyName}</p>
                        <p className={styles.content}>{elem.dateCreated.split('T')[0]}</p>
                        <p className={styles.content}>{elem.status}</p>
                        <Link to={`/jobs/${elem._id}`} className={styles.link}>View</Link>
                        
                    </div>
                    )
                })
            )

        }else{

            return dataArray.map((elem) => {
                return (
                    <div className={styles.tableRow} key={elem._id}>
                        <p className={styles.content}>{elem.companyName}</p>
                        <p className={styles.content}>{elem.dateCreated.split('T')[0]}</p>
                        <p className={`${styles.content} ${elem.status === 'success' ? styles.green : ''} ${elem.status === 'pending' ? styles.orange : ''} ${elem.status === 'rejected' ? styles.red : ''} `}>{elem.status}</p>
                        <Link to={`/jobs/${elem._id}`} className={styles.link}>View</Link>
                        
                    </div>
                )
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.setState({
            input: this.state.search
        })
    }

    refresh = () => {
        this.setState({
            input: '',
            search: '',
            sort: 'company'
        })
    }

    filterSort = (arr) => {
        //sort by date
        if (this.state.sort === 'earliest'){
            return arr.sort((a, b) => {
                return Date.parse(a.dateCreated) - Date.parse(b.dateCreated);
            });
        }else if (this.state.sort === 'latest'){
            return arr.sort((a, b) => {
                return Date.parse(b.dateCreated) - Date.parse(a.dateCreated);
            });
        }else if (this.state.sort === 'company'){
            return arr.sort((a, b) => {
                return a.companyName - b.companyName
            })
        }else if (this.state.sort === 'success'){
            return arr.filter(elem => elem.status === 'success');
        }else if (this.state.sort === 'pending'){
            return arr.filter(elem => elem.status === 'pending');
        }else if (this.state.sort === 'rejected'){
            return arr.filter(elem => elem.status === 'rejected');
        }

        else{
            return arr;
        }

    }

    render() {

        // console.log(this.props.jobs);
        // console.log(this.state);
        // console.log(Date.parse('2020-04-07T20:32:09.349Z'));

        // console.log(this.filterSort(this.state.data));
        const total = this.props.jobs.length;
        const success = this.props.jobs.filter(elem => elem.status === 'success').length;
        const pending = this.props.jobs.filter(elem => elem.status === 'pending').length;
        

        return (
            <div className={styles.main}>

                <div className={styles.row}>

                    <form className={styles.form} onSubmit={this.handleSubmit}>
                        <input className={styles.search} type="text" name='search' placeholder="search" value={this.state.search} onChange={this.inputChangeHandler}/>
                    </form>

                    <div className={styles.stats}>
                        <div className={styles.stat} style={{color: 'green'}}>Success: {success}</div>
                        <div className={styles.stat} style={{color: 'orangered'}}>Pending: {pending}</div>
                        <div className={styles.stat}>Total: {total}</div>
                    </div>
                </div>

                <div className={styles.btnRow}>
                    <div className={styles.refresh} onClick={this.refresh}>Refresh</div>
                    <Link to='/jobs/new' className={styles.new}>New</Link>
                </div>

                <div className={styles.window}>
                    

                    <div className={styles.headerRow}>
                        <p className={styles.heading}>Company</p>
                        <p className={styles.heading}>Date</p>
                        <p className={styles.heading}>Status</p>
                        <p className={styles.heading}>View</p>
                        {/* <p className={styles.heading}></p> */}

                        <select className={`${styles.select} ${this.state.sort === 'success' ? styles.green : ''} ${this.state.sort === 'pending' ? styles.orange : ''} ${this.state.sort === 'rejected' ? styles.red : ''}`} name="sort" id="sort" onChange={this.inputChangeHandler}>
                            <option value="sort" hidden defaultValue>Sort By</option>
                            <option value="latest">Date - latest</option>
                            <option value="earliest">Date - earliest</option>
                            <option value="company">Company</option>
                            <option value="success">Success</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* <div className={styles.tableRow}>
                        <p className={styles.content}>Company</p>
                        <p className={styles.content}>Date</p>
                        <p className={styles.content}>Status</p>
                        <p className={styles.content}>View</p>
                        <div className={styles.content}>
                            <div className={}></div>
                        </div>
                    </div> */}

                    {this.renderRows()}


                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getAllJobs: () => dispatch(jobActionCreators.getAllJobs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);