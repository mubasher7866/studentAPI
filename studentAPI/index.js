const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Student = require('./student.js')
const mongoose = require('mongoose')
const {
  Schema
} = mongoose;



app.use(bodyParser.urlencoded({
  extended: false
}))


app.get('/student', (req, res) => {

  Student.find((err, students) => {

    if (err) {
      res.status(404).send(err)
      return
    }
    res.status(200).send(students)
    console.log(students)
  })
})

app.post('/student', (req, res) => {

  let student = new Student({

    name: req.body.name,
    age: parseInt(req.body.age),
    course: req.body.course,
    email: req.body.email

  })

  student.save(err => {
    if (err) {
      res.status(404).send(err)
      return
    }
    res.status(201).send("New Student was inserted Successfully")
    console.log("Student inserted")
  })
})

app.get('/student/:id', (req, res) => {
  const id = req.params.id;

  Student.findById(id, (err, student) => {
    if (err) {
      res.send("Student not found")
      return
    }

    res.send(student)
    console.log(student)
  })
})


app.put('/student/:id', (req, res) => {

  console.log("Trying to edit the student")
  console.log(parseInt(req.body.age))


  Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: ((parseInt(req.body.age) == NaN) ? 0 : parseInt(req.body.age)),
    course: req.body.course,
    email: req.body.email
  }, err => {
    if (err) {
      res.send("The was not successfull. The error is: " + err)
      return;
    }
    res.send("IThe Edit was Successfull")
  })
})

app.delete('/student/:id', (req, res) => {

  Student.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("Student was not Deleted, Please try again")
      return
    }
    res.send("Student was deleted successfully")
    console.log(`Student with id ${req.params.id} is now deleted`)
  })
})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://admin:admin@studentapi.v1ljc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})