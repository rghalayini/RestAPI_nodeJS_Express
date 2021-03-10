const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());  //we need this for the post request

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

//post request
app.post('/api/courses', (req, res) =>{
    //below is the old way of doing it, but we will replace it with the function call defined further below
    //define joi schema
            // const schema = {
            //     name: Joi.string().min(3).required()
            // };
            // const result = Joi.validate(req.body, schema);
    //add validation
            // if(result.error){
            //     //400 Bad Request
            //     res.status(400).send(result.error.details[0].message);
            //     return;
            // }

    const {error} = validateCourse(req.body); //equivalent to getting result.error as object desctructuring
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,  //because we're not working with a databases
        name: req.body.name     //we assume that in the request body there is an object and this object has a name property\
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');
    res.send(course);
});

//to update courses
app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found!');
    }

    //validate by calling the Joi function
    //if invalid, return 400 - bad request
    const {error} = validateCourse(req.body); //equivalent to getting result.error as object desctructuring
    if(error) return res.status(400).send(error.details[0].message)

    //update course
    course.name = req.body.name;
    //return updated course to client
    res.send(course);
});

//to delete courses
app.delete('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');

    // Delete by finding the index first
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the response to client
    res.send(course);
    
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

//to get courses based on the id we insert in url
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });


// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });


//to read querry parameters do this instead
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);
// });
//assign port
const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`Listening on port ${port}...`));