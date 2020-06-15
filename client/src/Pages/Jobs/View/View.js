import React, { Component } from 'react';

import styles from './View.module.css';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as jobsActionCreators from '../../../Redux/Actions/JobsActionCreators';

class View extends Component {

    handleDelete = async () => {
        const res = await this.props.deleteJob(this.props.match.params.id);
        // console.log(res);
        
        if (res.status === 'success'){
            this.props.history.push('/');
        }
    }

    renderJob = () => {
        const jobId = this.props.match.params.id;
        const currentJob = this.props.jobs.filter(elem => elem._id === jobId)[0];
        if (currentJob){
            // console.log(currentJob);
            return (
                <div className={styles.view}>
    
                    <div className={styles.btnContainer}>
                        <Link to={`/jobs/edit/${this.props.match.params.id}`} className={styles.btn}>Edit</Link>
                        <div onClick={this.handleDelete} className={styles.btnDel}>Delete</div>
                    </div>
                    
                    <p className={styles.date}>Applied On: {currentJob.dateCreated.split('T')[0]}</p>
                    <p className={styles.status}>Status: <span className={`${currentJob.status === 'success' ? styles.green : ''} ${currentJob.status === 'pending' ? styles.orange : ''} ${currentJob.status === 'rejected' ? styles.red : ''} `}>{currentJob.status.toUpperCase()}</span></p>
    
                    <h1 className={styles.title}>Company: {currentJob.companyName}</h1>

                    <p className={styles.jobUrl}>URL: <a href={currentJob.jobUrl} target='_blank' rel="noopener noreferrer" >{currentJob.jobUrl}</a></p>

                    <div className={styles.container}>
                        <div className={styles.block}>
                            <p className={styles.label}>Resume</p>
                            <p className={styles.labelContent}>{`${currentJob.resumeURL.slice(0, 10)}.resume.pdf`}</p>
                            <a className={styles.btnLink} href={`http://localhost:8080/jobs/resume/view/${currentJob.resumeURL}`} target='_blank' rel="noopener noreferrer" >View</a>
                            <a className={styles.btnLink} href={`http://localhost:8080/jobs/resume/download/${currentJob.resumeURL}`} target='_blank' rel="noopener noreferrer">Download</a>
                        </div>

                        <div className={styles.block}>
                            <p className={styles.label}>Cover Letter</p>
                            <p className={styles.labelContent}>{`${currentJob.coverLetterURL.slice(0, 10)}.cover.pdf`}</p>
                            <a className={styles.btnLink} href={`http://localhost:8080/jobs/coverLetter/view/${currentJob.coverLetterURL}`} target='_blank' rel="noopener noreferrer" >View</a>
                            <a className={styles.btnLink} href={`http://localhost:8080/jobs/coverLetter/download/${currentJob.coverLetterURL}`} target='_blank' rel="noopener noreferrer">Download</a>
                        </div>
                    </div>
                    
                </div>
            )
        }
    }


    render() {
    
        return this.props.jobs.length > 0 ? 
            
            <div>
                {this.renderJob()}
            </div>
            : 
            null;

        
        
        
    }
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteJob: (id) => dispatch(jobsActionCreators.deleteJob(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)