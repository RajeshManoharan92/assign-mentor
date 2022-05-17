const mongo = require('../shared')
const { ObjectId } = require('mongodb')


// to post mentor details

module.exports.Postmentordetails = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('mentor').insertOne(req.body)
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}

// to post student details

module.exports.Poststudentdetails = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('student').insertOne(req.body)
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}

// to get posted mentor details

module.exports.getmentordetails = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('mentor').aggregate([
            {
                $project: {
                    _id: 0
                }
            }]).toArray();
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}

// to get posted studentdetails

module.exports.getstudentdetails = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('student').aggregate([
            {
                $project: {
                    _id: 0
                }
            }]).toArray()
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}

// to get student details who not assigned to any mentor

module.exports.getstudentdetailsofmentornotassigned = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('student').aggregate([
            {
                $match: {
                    "Mentor-id": "not-assigned"
                }
            },
            {
                $project: {
                    _id: 0
                }
            }]).toArray()
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}

// to assign or change mentor for a patricular student

module.exports.AssignorChangeMentor = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('student').findOneAndUpdate(
            { "Student-id": parseInt(req.params.id) },
            { $set: { ...req.body } },
            { runValidators: true, new: true, returnNewDocument: true }
        )
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}

// to get overall details of both mentor and students

module.exports.getoveralldetails = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('student').aggregate([{
            $lookup: {
                from: "mentor",
                localField: "Mentor-id",
                foreignField: "Mentor-id",
                as: "Mentor-details"
            },
        },
        {
            $project: {
                _id: 0,
                "Mentor-details._id": 0,
                "Mentor-details.Mentor-id": 0
            }
        }]).toArray();
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}

// to get students of particular mentor

module.exports.getstudentsofparticularmentor = async (req, res) => {
    try {
        const response = await mongo.selectedDb.collection('mentor').aggregate([{
            $lookup: {
                from: "student",
                localField: "Mentor-id",
                foreignField: "Mentor-id",
                as: "student-details"
            },
        },
        {
            $match: (req.body)
        },

        {
            $project: {
                _id: 0,
                "student-details.Student-Name": 1,
            }
        }]).toArray();
        res.send(response)
    }
    catch (err) {
        console.log(err)

    }
}


