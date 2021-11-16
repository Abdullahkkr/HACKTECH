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
CREATE TABLE Admin(Name VARCHAR(50), Admin_ID int(5), Password VARCHAR(64), PRIMARY KEY (Admin_ID));
CREATE TABLE Orders(Unit_ID int(500), Order_ID int(10), Order_Confirmation bool, Order_Date date, Delivery_Date date, Courier_Service_Name VARCHAR(50), Customer_ID int(8), Order_Status VARCHAR(20), PRIMARY KEY (Order_ID));
CREATE TABLE Inventory(Unit_ID int(10), Brand VARCHAR(50), Features VARCHAR(5000), Product_Name VARCHAR(100), Colour VARCHAR(20), Description VARCHAR(5000), Images VARCHAR(10), Cost_Price double(20), Selling_Price double(20), Admin_ID int(5), PRIMARY KEY (Unit_ID), FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID));
CREATE TABLE Customers(Customer_ID int(8), Customer_Name VARCHAR(50), Address VARCHAR(1000), Past_Orders int(5000), Email VARCHAR(50), Contact_Number int(12), CNIC_Number int(13), PRIMARY KEY (Customer_ID));
CREATE TABLE Accounts(Customer_ID int(8), Password VARCHAR(64), PRIMARY KEY (Customer_ID), FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID));
CREATE TABLE Printer(Unit_ID int(10), Wireless VARCHAR(3), Type VARCHAR(50), Portable VARCHAR(3), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Camera(Unit_ID int(10), Lens VARCHAR(50), Touch VARCHAR(3), Tripod_Compatibility VARCHAR(3), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Scanner(Unit_ID int(10), Resolution VARCHAR(20), Type VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE VG_Console(Unit_ID int(10), Memory VARCHAR(20), Disc_Compatibility VARCHAR(3), Controller VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Projector(Unit_ID int(10), Bulb VARCHAR(50), Projection_Distance double(20), Image_size double(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE TV(Unit_ID int(10), Screen_Size VARCHAR(20), Smart VARCHAR(3), Screen_Type VARCHAR(30), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Tablet(Unit_ID int(10), RAM VARCHAR(20), Memory VARCHAR(20), SIM VARCHAR(3), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Mobile_Phone(Unit_ID int(10), RAM VARCHAR(20), Memory VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Desktop(Unit_ID int(10), Processor VARCHAR(20), RAM VARCHAR(20), Graphic_Card VARCHAR(50), PSU VARCHAR(30), Memory VARCHAR(20), Cooling_System VARCHAR(20), RGB VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Laptop(Unit_ID int(10), Size VARCHAR(20), RAM VARCHAR(20), Processor VARCHAR(20), SSD VARCHAR(20), Generation VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
`;

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
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
