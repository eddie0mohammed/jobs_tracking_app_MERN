import React, { Component } from 'react';

import styles from './New.module.css';

import {connect} from 'react-redux';

import * as jobsActionCreators from '../../../Redux/Actions/JobsActionCreators';

class New extends Component {

    state = {
        companyName: '',
        jobUrl: '',
        resume: null,
        coverLetter: null
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit =  async (e) => {
        e.preventDefault();
        // console.log(this.state);

        const res = await this.props.createNewJob(this.state.companyName, this.state.jobUrl, this.state.resume, this.state.coverLetter);
        
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
        if (this.state.companyName && this.state.resume && this.state.coverLetter){
            disable = false;
        }

        return disable;
    }

    render() {

        // console.log(this.props.error);
        return (
            <div className={styles.new}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>New Job</h1>

                    <label className={styles.label} htmlFor="companyName">Company Name</label>
                    <input className={styles.input} type="text" name="companyName" placeholder="Company Name" value={this.state.companyName} onChange={this.handleInputChange}/>
                    
                    <label className={styles.label} htmlFor="jobUrl">Job Url</label>
                    <input className={styles.input} type="text" name="jobUrl" placeholder="Job URL" value={this.state.jobUrl} onChange={this.handleInputChange}/>

                    <label className={styles.label} htmlFor="resume">Resume</label>
                    <input className={styles.file} type="file" id="resume" name="resume" onChange={this.handleResumeFile}/>
                    
                    <label className={styles.label} htmlFor="coverLetter">Cover Letter</label>
                    <input className={styles.file} type="file" id="coverLetter" name="coverLetter" onChange={this.handleCoverLetterFile}/>

                    {this.props.error ? <p style={{color: 'red', textAlign:'center'}}>{this.props.error}</p> : null }
                    
                    <input className={styles.submit} type="submit" value="Submit" disabled={this.disableSubmitBtn()}/>
                </form>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewJob: (companyName, jobUrl, resume, coverLetter) => dispatch(jobsActionCreators.createNewJob(companyName, jobUrl, resume, coverLetter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New);