const Work = require('../models/Work');


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
         work = await Work.findOne({_id:workId}).populate('user');
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!work) {
        return res.status(404).json({ message: 'Work not found' });
    }
    res.status(200).json(work);
};

// Create a new work
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
        res.status(201).json(work);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
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