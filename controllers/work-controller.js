const Work = require('../models/Work');
const User = require('../models/User');


exports.getAllWorks = async (req, res) => {
    try {
        const works = await Work.find().populate('user');
        res.json(works);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getWorkById = async (req, res) => {
    const { workId } = req.params;
    console.log(workId)
    let work
    try {
        work = await Work.findOne({ _id: workId }).populate('user');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!work) {
        return res.status(404).json({ message: 'Work not found' });
    }
    res.status(200).json(work);
};

exports.createWork = async (req, res) => {
    const { url, title, image, keywords, user } = req.body;
    let work;
    try {
        work = new Work({
            url,
            title,
            image,
            keywords,
            user,
        });

        work = await work.save();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log(user)

    let currentUser;
    try {
        currentUser = await User.findById(user)
        console.log(currentUser)
    } catch (err) {

    }
    if (!currentUser) {
        res.status(500).json({ message: "INternal error" })
    }
    console.log("Finded", currentUser)
    currentUser.proofofWork.push(work._id)
    currentUser = await currentUser.save()

    res.status(201).json(work);
};
exports.editWork = async (req, res) => {
    const { workId } = req.params;
    const { url, title, image, keywords } = req.body;
    let updatedWork
    try {
        updatedWork = await Work.findByIdAndUpdate(
            workId,
            { url, title, image, keywords },
            { new: true }
        );


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!updatedWork) {
        return res.status(404).json({ message: 'Work not found' });
    }

    res.json(updatedWork);
};

exports.deleteWork = async (req, res) => {
    const workId = req.params.workId;

    //Find work
    let work;
    try {
        work = await Work.findOne({_id:workId});
       
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Internal Server Error' });
   }
   if (!work) {
       return res.status(404).json({ message: 'Work not found' });
   }

   //Delete work
   let deletedWork;
    try {

        deletedWork = await Work.findByIdAndDelete(workId);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!deletedWork) {
        return res.status(404).json({ message: 'Work not found' });
    }
    
    //Find user
    
   const user= work.user;
    try {
        currentUser = await User.findById(user)
        console.log(currentUser)
    } catch (err) {
        console
    }
    if (!currentUser) {
        res.status(500).json({ message: "INternal error" })
    }
    console.log("Finded", currentUser)
    currentUser.proofofWork.pull(work._id)
    currentUser = await currentUser.save()
    res.status(204).send(deletedWork);

};

