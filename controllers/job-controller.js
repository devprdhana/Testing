const { default: mongoose } = require("mongoose");
const Job = require("../models/Job");
const User = require("../models/User");

const postJob = async (req, res, next) => {
  const {
    jobTitle,
    jobDescription,
    paymentOneTime,
    requiredSkills,
    paymentOngoing,
    oneTime,
    onGoing,
    appliedUsers,
    client
  } = req.body;
  let job;
  try {
    job = new Job({
      jobTitle,
      jobDescription,
      paymentOneTime,
      paymentOngoing,
      requiredSkills,
      oneTime,
      onGoing,
      appliedUsers,
      client
    });
    job = await job.save()
  } catch (err) {
    console.log(err);
  }

  if (!job) {
    res.status(500).json({ message: "Internal sever" })
  }

  res.status(201).json(job)
};

const getJobById = async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  let job;
  try {
    job = await Job.findById(id)
  } catch (err) {
    console.log(err)
  }

  if (job) {
    res.status(200).json(job)

  } else {
    res.status(404).json({ message: "Job not found" })
  }

}

const getJobBySkill = async (req, res, next) => {
  const { skills } = req.body
  console.log(skills)
  let jobs;
  try {
    jobs = await Job.find()
  } catch (err) {
    console.log(err)
  }
  console.log("jobs", jobs)
  if (!jobs) {
    res.status(500).json({ message: "Internal sever error" })
  }

  const filterJobsBySkills = (jobs, skills) => {
    return jobs.filter(job => {
      const jobSkills = job.requiredSkills || [];
      // Check if any of the required skills match with the skills array
      return skills.some(skill => jobSkills.includes(skill));
    });
  };

  const filteredJobs = filterJobsBySkills(jobs, skills);

  console.log(filteredJobs);


  res.status(200).json(filteredJobs)
}

const getAllJobs = async (req, res) => {
  let jobs;
  try {
    jobs = await Job.find()
  } catch (err) {
    console.log(err)
  }
  if (!jobs) {
    res.status(500).json({ message: "Internal server error" })
  } else {
    res.status(200).json(jobs)
  }

}
const updateJob = async (req, res, next) => {
  const { jobId } = req.params;
  const updateData = req.body;
  let updatedJob;
  try {
    

    updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
    console.log(updatedJob)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  if (!updatedJob) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.status(200).json(updatedJob);
};

const getAppliedUsersByjobID = async (req,res,next) => {
  const {jobId} = req.params
  let job,appliedUsers;
  try {
    // Find the job by its ID and populate the 'appliedUsers' field
    job = await Job.findById(jobId).populate('appliedUsers');

    if (!job) {
      // Handle the case where the job with the given ID is not found
      return null;
    }

    // Access the detailed information of the applied users
    appliedUsers = job.appliedUsers;

    // return appliedUsers;
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error('Error fetching applied users:', error);
    throw error; // You may want to handle errors according to your application's requirements
  }

  res.status(200).json(appliedUsers)
}



const applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.body;
  let job,user;
  try {
    // Find the job by its ID
     job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update the job document by adding the applicant to the 'appliedUsers' array
    job.appliedUsers.push(userId);
    job = await job.save()

    // update user
    user = await User.findById(userId)
    user.appliedJobs.push(jobId)
    user = await user.save()

    
  } catch (error) {
    console.error('Error applying to job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  res.status(200).json({job,user});
   
};

exports.postJob = postJob
exports.getJobById = getJobById
exports.getJobBySkill = getJobBySkill
exports.getAllJobs = getAllJobs
exports.updateJob = updateJob
exports.getAppliedUsersByjobID = getAppliedUsersByjobID
exports.applyToJob = applyToJob