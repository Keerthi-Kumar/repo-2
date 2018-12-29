const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); // this (middleware) is used to enable json object in the body of the request

const courses = [

  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
 
 ];

  app.get('/api/courses', (req, res) => {
    res.send(courses);
});

  app.post('/app/courses', (req, res) => {
    const scheme = {
      name: Joi.string().min(3).required() // by doing this we are telling that 'name' is a string, and its min characters is '3' and it is required
   };

    const result = Joi.validate(req.body, schema);
    console.log(result);
    if(result.error) {
      res.status(404).send(result.error.details[0].message);
      return;

    };
  const course = {
    id: courses.length + 1, // by doing this we are adding (or) assigning new id for new course
    name: req.body.name // by doing this we are reading from the body of the request (to make this line to work we use parsing of JSON object in the body of the request coz by default this feature is not enabled in express)
  };
  courses.push(course);
  res.send(course);
  
});


app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('the course with the given Id does not exist..!');
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('the course with the given Id does not exist..!');

  

});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));