import  express  from 'express';
const router = express.Router();
import {User}  from './models/user.js'
// const Student = require("./models/student")
import {Student} from "./models/student.js"
import { Movie } from "./models/movie.js"


router.get('/users', async (req, res) => {
    try {
        const users = await User.find().toArray()
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error');
    }
});


router.get('/students',async (req,res)=>{
    try{
        const students = await Student.find().toArray()
        res.json(students)
    }catch(err){
        console.log(err.message)
    }
})

router.post('/students',async(req,res)=>{
    try{
        console.log(req)
        console.log(req.body)
        const newStudent = await Student.insertOne(req.body)
        console.log(newStudent)
        res.status(201).send({message:`student with id: ${newStudent.insertedId} added successfully`})
        
    }catch(err){
        console.error(err.message)
    }
})

router.get('/movies',async(req,res)=>{
    try{
        const movies = await Movie.find().toArray()
        res.json(movies)
    }catch(err){
        console.log(err.message)
    }
})

export default router


