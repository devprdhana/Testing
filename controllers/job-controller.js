const Job = require("../models/Job");

const postJob = async (req, res, next) => {
  const {
    jobTitle,
    jobDescription,
    paymentOneTime,
    paymentOngoing,
    oneTime,
    onGoing,
    appliedUsers
  } = req.body;
  let job;
  try {
    job = new Job({
      jobTitle,
      jobDescription,
      paymentOneTime,
      paymentOngoing,
      oneTime,
      onGoing,
      appliedUsers
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


exports.postJob = postJob