import React, { Component } from 'react';

import styles from './Edit.module.css';

import {connect} from 'react-redux';

import * as jobsActionCreators from '../../../Redux/Actions/JobsActionCreators';

class Edit extends Component {

    state = {
        companyName: '',
        jobUrl: '',
        date: Date.now(),
        status: '',
        resume: null,
        coverLetter: null
    }

    async componentDidMount(){
        const jobId = this.props.match.params.id;
        if (this.props.jobs.length === 0){
            await this.props.getAllJobs();
        }
        const currentJob = this.props.jobs.filter(elem => elem._id === jobId)[0];
        // console.log(currentJob);
        this.setState({
            companyName: currentJob.companyName,
            // date: currentJob.dateCreated.split('T')[0],
            status: currentJob.status,
            jobUrl: currentJob.jobUrl
        });

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state);

        const res = await this.props.updateJob(this.state.companyName, this.state.status, this.state.jobUrl, this.state.date, this.state.resume, this.state.coverLetter, this.props.match.params.id);
        if (res.status === 'success'){
            this.props.history.push('/');
        }

    }

    handleResumeFile = (e) => {
        this.setState({
            resume: e.target.files[0]
        });
    }

    handleCoverLetterFile = (e) => {
        this.setState({
            coverLetter: e.target.files[0]
        });
    }

    disableSubmitBtn = () => {
        let disable = true;
        if (this.state.companyName && this.state.status){
            disable = false;
        }

        return disable;
    }

    render() {
        
        return this.props.jobs.length > 0 ? (
            <div className={styles.new}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Edit Job</h1>

                    <label className={styles.label} htmlFor="companyName">Company Name</label>
                    <input className={styles.input} type="text" name="companyName" placeholder="Company Name" value={this.state.companyName} onChange={this.handleInputChange}/>
                    <label className={styles.label} htmlFor="status">Status</label>
                    {/* <input className={styles.input} type="text" name="status" placeholder="Status" value={this.state.status} onChange={this.handleInputChange}/> */}
                    <select className={styles.select} name="status" id="select" onChange={this.handleInputChange}>
                        <option value="status" hidden>Status</option>
                        <option value="success" >Success</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejeted</option>
                    </select>

                    <label className={styles.label} htmlFor="jobUrl">Job Url</label>
                    <input className={styles.input} type="text" name="jobUrl" placeholder="Job Url" value={this.state.jobUrl} onChange={this.handleInputChange}/>
                    
                    <label className={styles.label} htmlFor="resume">Resume</label>
                    <input className={styles.file} type="file" id="resume" name="resume" onChange={this.handleResumeFile}/>
                    
                    <label className={styles.label} htmlFor="coverLetter">Cover Letter</label>
                    <input className={styles.file} type="file" id="coverLetter" name="coverLetter" onChange={this.handleCoverLetterFile}/>

                    {this.props.error ? <p style={{color: 'red', textAlign: 'center'}}>{this.props.error}</p> : null }

                    <input className={styles.submit} type="submit" value="Submit" disabled={this.disableSubmitBtn()}/>
                </form>
                
            </div>
        ): 
        <h1>Loading...</h1>
    }
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs,
        error: state.error.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllJobs: () => dispatch(jobsActionCreators.getAllJobs()),
        updateJob: (companyName, status, jobURL, date, resume, coverLetter, id) => dispatch(jobsActionCreators.updateJob(companyName, status, jobURL, date, resume, coverLetter, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);