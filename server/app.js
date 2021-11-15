const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// Faraz initialize all queries here
const init_db = `

`


// Initialize tables
app.get('/initialize-tables', (req, res) => {
    db.query(init_db, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Hacktech tables created...');
    });
});

// Admin sign up
app.get('/admin-signup', (req, res) => {
    let sql = `INSERT INTO Admin VALUES( ${req.query.admin-id}, ${req.query.name}, ${req.query.password})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Added an Admin...');
    });
});

// Customer sign up
app.get('/customer-signup', (req, res) => {
    let sql = `INSERT INTO Customers VALUES( ${req.query.customer-id}, ${req.query.name}, ${req.query.address}, ${req.query.past-orders}, ${req.query.email}, ${req.query.contact-number}, ${req.query.cnic}, ${req.query.password})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Customer signed up successfully...');
    });
}); 

// Admin login
app.get('/admin-login', (req, res) => {
    let sql = `Select Name from Admin where Admin_ID = ${req.query.admin-id} and Password = ${req.query.password}`;
    db.query(sql, (err, result) => {
        if (err){
            console.log(err.message);
            throw err;
        }
        console.log(result); // doubt on it as we dont know whats in result. Check by running when faraz has made tables
        res.send('Admin has logged in successfully...');
    });
});

// Customer login

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE Hacktech';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Hacktech database created...');
    });
});

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) console.log(err.message);
        console.log(result);
        res.send('Posts table created...');
    });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts 1 added...');
    });
});

app.listen('3000', () => {
    console.log("Server started on port 3000");
    
});
