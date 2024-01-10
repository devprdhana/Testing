const Job = require("../models/Job");

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

  if(!job){
    res.status(500).json({message:"Internal sever"})
  }

  res.status(201).json(job)
};

const getJobById = async(req,res,next)=>{
  const {id} = req.params
  console.log(id)
  let job ;
  try{
    job = await Job.findById(id)
  }catch(err){
    console.log(err)
  }

  if(job){
    res.status(200).json(job)

  }else {
    res.status(404).json({message:"Job not found"})
  }

}

const getJobBySkill = async(req,res,next)=>{
  const {skills} = req.body
  console.log(skills)
  let jobs;
  try{
    jobs = await Job.find()
  }catch(err){
    console.log(err)
  }
  console.log("jobs",jobs)
  if(!jobs){
    res.status(500).json({message:"Internal sever error"})
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

const getAllJobs = async(req,res)=>{
  let jobs;
  try{
    jobs = await Job.find()
  }catch(err){
    console.log(err)
  }
  if(!jobs){
    res.status(500).json({message:"Internal server error"})
  }else{
    res.status(200).json(jobs)
  }
  
}


exports.postJob = postJob
exports.getJobById = getJobById
exports.getJobBySkill = getJobBySkill
exports.getAllJobs = getAllJobs
