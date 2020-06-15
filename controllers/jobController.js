
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Job = require('../models/job');

const uploadPDF = require('../utils/pdfUpload');
const deleteFile = require('../utils/deleteFile');



//MULTER Middleware
const multerMiddleware = (req, res, next) => {
    uploadPDF(req, res, (err) => {

        if (err){
            // console.log(err);
            return res.status(400).json({
                status: 'fail',
                error: err
            });
        }else{
            next();
        }
    })
}



//GET ALL JOBS
const getAllJobs = async (req, res, next) => {

    if (!req.user){
        return res.status(401).json({
            status: 'fail',
            error: 'Unauthorized'
        });
    }

    try{
        const jobs = await Job.find().populate('user');
        const filteredJobsByUserId = jobs.filter(elem => elem.user._id.toString() === req.user.id);
        // console.log(filteredJobs); 
        res.status(200).json({
            status: 'success',
            data: {
                jobs: filteredJobsByUserId
            }
        });


    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }


}


//CREATE JOB
const createJob = async (req, res, next) => {

    if (!req.user){
        return res.status(401).json({
            status: 'fail',
            error: 'Unauthorized'
        });
    }

    try{

        const newJob = new Job({
            companyName: req.body.companyName,
            jobUrl: req.body.jobUrl,
            user: req.user.id
        });

        if (req.files.resume && req.files.coverLetter){
            // console.log(req.files);
            // console.log(req.files.resume[0].filename);
            // console.log(req.files.coverLetter[0].filename);
            newJob.resumeURL = req.files.resume[0].filename;
            newJob.coverLetterURL = req.files.coverLetter[0].filename;
        }else{
            return res.status(400).json({
                status: 'fail', 
                error: 'Resume and Cover Letter are both required'
            });
        }

        await newJob.save();
        res.status(201).json({
            status: 'success',
            data: {
                job: newJob
            }
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}


//DELETE JOB
const deleteJob = async (req, res, next) => {

    try{
        const jobId = req.params.id;
        const job = await Job.findById(req.params.id).populate('user');
        if (job.user._id.toString() !== req.user.id){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }
        if (!job){
            return res.status(400).json({
                status: 'fail',
                error: 'No job found'
            });
        }
        deleteFile(job.resumeURL);
        deleteFile(job.coverLetterURL);
        

        await Job.findByIdAndDelete(jobId);
        res.status(200).json({
            status: 'success',
            message: 'job successfully deleted'
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }   
}



//EDIT JOB
const editJob = async (req, res, next) => {

    try{
        const id = req.params.id;
        const job = await Job.findById(id);
        if (!job){
            return res.status(400).json({
                status: 'fail',
                error: 'No job found'
            });
        }

        const body = {};
        
        if (req.body.companyName){
            body.companyName = req.body.companyName;
        }
        if (req.body.status){
            body.status = req.body.status;
        }
        if (req.body.date){
            body.dateCreated = req.body.date;
        }
        if (req.body.jobURL){
            body.jobUrl = req.body.jobURL;
        }

        if (req.files){
            if (req.files.resume){
                deleteFile(job.resumeURL);
                body.resumeURL = req.files.resume[0].filename;
            }
            if (req.files.coverLetter){
                deleteFile(job.coverLetterURL);
                body.coverLetterURL = req.files.coverLetter[0].filename;
            }
        }
        // console.log(body);

        const updatedJob = await Job.findByIdAndUpdate(id, body, {new: true, runValidators: true});


        res.status(201).json({
            status: 'success',
            data: {
                job: updatedJob
            }
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}




const getResume = async (req, res, next) => {

    const resumeURL = req.params.resumeURL;
    // console.log(resumeURL);
    const mypath = path.join(__dirname, '..', 'public', 'pdf', resumeURL);
    // console.log(mypath);

    // //method below is suitable for small files only
    // fs.readFile(mypath, (err, data) => {
    //     if (err){
    //         return res.status(400).json({
    //             status: 'fail',
    //             error: err
    //         });
    //     }
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Disposition', 'inline');
    //     res.send(data);
    // });
    const file = fs.createReadStream(mypath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    file.pipe(res);
}


const downloadResume =  async (req, res, next) => {

    const resumeURL = req.params.resumeURL;
    // console.log(resumeURL);
    const mypath = path.join(__dirname, '..', 'public', 'pdf', resumeURL);
    // console.log(mypath);

    const file = fs.createReadStream(mypath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment');
    file.pipe(res);
}


const getCoverLetter = async (req, res, next) => {

    const coverLetterURL = req.params.coverLetterURL;
    // console.log(resumeURL);
    const mypath = path.join(__dirname, '..', 'public', 'pdf', coverLetterURL);
    // console.log(mypath);

    const file = fs.createReadStream(mypath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    file.pipe(res);
}


const downloadCoverLetter =  async (req, res, next) => {

    const coverLetterURL = req.params.coverLetterURL;
    // console.log(resumeURL);
    const mypath = path.join(__dirname, '..', 'public', 'pdf', coverLetterURL);
    // console.log(mypath);

    const file = fs.createReadStream(mypath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment');
    file.pipe(res);
}



module.exports = {
    getAllJobs: getAllJobs,
    createJob: createJob,
    deleteJob: deleteJob,
    editJob: editJob,
    multerMiddleware: multerMiddleware,

    getResume: getResume,
    downloadResume: downloadResume,
    getCoverLetter: getCoverLetter,
    downloadCoverLetter: downloadCoverLetter,
}