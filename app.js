const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true});
const port = 80;

// DEFINE MONGOOSE SCHEMA
let contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

let Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug'); //Set the template engine as pug
app.set('views', path.join(__dirname,'views')); //Set the views directory

//ENDPOINTS
app.get('/',(req,res) =>{
    const param ={ };
    res.status(200).render('home.pug',param);
})
app.get('/contact',(req,res) =>{
    const param ={};
    res.status(200).render('contact.pug',param);
})
app.post('/contact',(req,res) =>{
    var receivedContact = new Contact(req.body);
    receivedContact.save().then(() =>{
        const param ={'response' : `*The Item ${req.body.name} has been saved to the database`};
        res.status(200).render('contact.pug',param);
    }).catch(() => {
            res.status(400).send("Item was not saved to the database");
    })
})
// app.post('/contact',(req,res) =>{
//     console.log(req.body);
//     console.log("name:"+req.body.name+"\nphone: "+req.body.phone+"\nemail: "+req.body.email+"\naddress: "+req.body.address+"concern: "+req.body.concern);
// })

app.listen(port, () => {
    console.log(`The application started successfull on port ${port}`);
})