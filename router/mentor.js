const express = require('express')

const router = express.Router();

const mentormodule = require("../module/mentor");


// to get posted mentor details

router.get('/getmentordetails', mentormodule.getmentordetails);

// to get posted studentdetails

router.get('/getstudentdetails', mentormodule.getstudentdetails);

// to get student details who not assigned to any mentor

router.get('/getstudentdetailsofmentornotassigned', mentormodule.getstudentdetailsofmentornotassigned);

// to get students of particular mentor

router.get('/getstudentsofparticularmentor', mentormodule.getstudentsofparticularmentor);

// to get overall details of both mentor and students

router.get('/getoveralldetails', mentormodule.getoveralldetails);

// to assign or change mentor for a patricular student

router.put('/AssignorChangeMentor/:id', mentormodule.AssignorChangeMentor)

// to post mentor details

router.post('/Postmentordetails', mentormodule.Postmentordetails)

// to post student details

router.post('/Poststudentdetails', mentormodule.Poststudentdetails)




module.exports = router; 