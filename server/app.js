const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');
const { raw } = require('body-parser');
const e = require('express');

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'Hacktech',
    multipleStatements :true
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(cors());

const init_db = `
CREATE TABLE Admin(Name VARCHAR(50), Admin_ID int(5), Password VARCHAR(64), PRIMARY KEY (Admin_ID));
CREATE TABLE Orders(Unit_ID bigint(200), Order_ID bigint(200), Order_Confirmation bool, Order_Date date, Delivery_Date date, Courier_Service_Name VARCHAR(50), Customer_ID int(8), Order_Status VARCHAR(20), PRIMARY KEY (Order_ID));
CREATE TABLE Inventory(Unit_ID bigint(200), Brand VARCHAR(50), Features VARCHAR(5000), Product_Name VARCHAR(100), Colour VARCHAR(20), Description VARCHAR(5000), Images VARCHAR(10), Cost_Price int(20), Selling_Price int(20), Admin_ID int(5), Category VARCHAR(10), PRIMARY KEY (Unit_ID), FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID));
CREATE TABLE Customers(Customer_ID int(8), Customer_Name VARCHAR(50), Address VARCHAR(1000), Past_Orders int(200), Email VARCHAR(50), Contact_Number bigint(200), CNIC_Number bigint(200), PRIMARY KEY (Customer_ID));
CREATE TABLE Accounts(Customer_ID int(8), Password VARCHAR(64), PRIMARY KEY (Customer_ID), FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID));
CREATE TABLE Printer(Unit_ID bigint(200), Wireless VARCHAR(3), Type VARCHAR(50), Portable VARCHAR(3), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Camera(Unit_ID bigint(200), Lens VARCHAR(50), Touch VARCHAR(3), Tripod_Compatibility VARCHAR(3), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Scanner(Unit_ID bigint(200), Resolution VARCHAR(20), Type VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE VG_Console(Unit_ID bigint(200), Memory VARCHAR(20), Disc_Compatibility VARCHAR(3), Controller VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Projector(Unit_ID bigint(200), Bulb VARCHAR(50), Projection_Distance int(20), Image_size int(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE TV(Unit_ID bigint(200), Screen_Size VARCHAR(20), Smart VARCHAR(3), Screen_Type VARCHAR(30), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Tablet(Unit_ID bigint(200), RAM VARCHAR(20), Memory VARCHAR(20), SIM VARCHAR(3), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Mobile_Phone(Unit_ID bigint(200), RAM VARCHAR(20), Memory VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Desktop(Unit_ID bigint(200), Processor VARCHAR(20), RAM VARCHAR(20), Graphic_Card VARCHAR(50), PSU VARCHAR(30), Memory VARCHAR(20), Cooling_System VARCHAR(20), RGB VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Laptop(Unit_ID bigint(200), Size VARCHAR(20), RAM VARCHAR(20), Processor VARCHAR(20), SSD VARCHAR(20), Generation VARCHAR(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
`;

const init_admins = `
INSERT INTO Admin VALUES('Abdullah Khan', 00001, 'pak123007');
INSERT INTO Admin VALUES('Shah Faraz', 00002, 'pak456007');
INSERT INTO Admin VALUES('Fawaz Ahmed', 00003, 'pak789007');
INSERT INTO Admin VALUES('Khuzaima Saeed', 00004, 'pak007007');
INSERT INTO Admin VALUES('Miqdad Quettawala', 00005, 'pak007009');
`;

// Initialize tables
app.get('/initialize-tables', (req, res) => {
    db.query(init_db, (err, result) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        console.log(result);
        res.send('Hacktech tables created...');
    });
});


// Initializing admins
app.get('/initialize-admins', (req, res) => {
    db.query(init_admins, (err, result) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        console.log(result);
        res.send('Founder Admins declared...');
    });
});

// Admin sign up
app.get('/admin-signup', (req, res) => {
    let sql = `INSERT INTO Admin VALUES("${req.body.Name}",${req.body.Admin_ID},"${req.body.Password}")`;
    db.query(sql, (err, result) => {
        if (err) {
            res.send({
                'isSuccessful':false,
                'accountType':'',
                'Name': '',
                'error': true,
                'message': err
            });
        }
        else
        {
            console.log(result);
            // res.send('Added an Admin...');
            res.send({
                'isSuccessful':true,
                'accountType':'Admin',
                'Name': req.body.Name,
                'error': false,
                'message': 'Admin has signed up successfully'
            });
        }
    });
});



// Customer sign up
app.post('/customer-signup', (req, res) => {
    // console.log(req.body)
    if (req.body.Customer_ID < 6)
    {
        return res.send({
            'isSuccessful':false,
            'accountType':'',
            'Name': '',
            'error': true,
            'message': 'Customers ID cannot be less than 6, kindly enter another ID'
        });
    }
    else
    {
        const sql = `INSERT INTO Customers VALUES(${req.body.Customer_ID},"${req.body.Customer_Name}","${req.body.Address}",${req.body.Past_Orders},"${req.body.Email}",${req.body.Contact_Number},${req.body.CNIC_Number})`;
        db.query(sql, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'',
                    'Name': '',
                    'error': true,
                    'message': err
                });
            }
            else
            {
                console.log(result);
                // inserting into accounts
                const sql2 = `INSERT INTO Accounts VALUES(${req.body.Customer_ID},"${req.body.Password}")`;
                db.query(sql2, (err, result) => {
                    if (err) {
                        res.send({
                            'isSuccessful':false,
                            'accountType':'',
                            'Name': '',
                            'error': true,
                            'message': err
                        });

                        console.log(err.message);
                        // throw err;
                    }
                    else
                    {
                        console.log(result);
                        // res.send('Customer signed up successfully...');
                        res.send({
                        'isSuccessful':true,
                        'accountType':'Customer',
                        'Name': req.body.Customer_Name,
                        'error': false,
                        'message': 'Customer has signed up successfully'
                        });
                    }
                });
            }

        });    
    }
}); 


// Customer and admin login
app.post('/login', (req, res) => {
    // console.log("yeh print wali body hay:-----------------------------><>");
    // console.log(req.body);
    const Customer_ID =  req.body.Admin_ID;
    const Admin_ID = req.body.Admin_ID;
    
    console.log(req.body);

    const sql =  `Select * from Accounts, Customers where Accounts.Customer_ID=Customers.Customer_ID and Accounts.Customer_ID=${Customer_ID} and Accounts.Password="${req.body.Password}"`;
    
    db.query(sql, (err, result) => {
        if (err){
            return res.send({
                'isSuccessful':false,
                'accountType':'',
                'Name': '',
                'error': true,
                'message': 'error in fetching body from database'
            });
        }
        console.log(result); // doubt on it as we dont know whats in result. Check by running when faraz has made tables
        const isEmpty = Object.keys(result).length === 0

        if (isEmpty === false)
        {
            res.send({
                'isSuccessful':true,
                'accountType':'Customer',
                'Name':result[0].Customer_Name,
                'error': false,
                'message': 'Customer has logged in successfully'
            });
        }
        else{
            const sql2 = `Select * from Admin where Admin_ID=${Admin_ID} and Password="${req.body.Password}"`;
            db.query(sql2, (err, result) => {
                if (err){
                    res.send({
                        'isSuccessful':false,
                        'accountType':'',
                        'Name': '',
                        'error': true,
                        'message': 'error in fetching body from database'
                    });
                    console.log(err.message);
                    throw err;
                }

                console.log(result); 
                var isEmpty = Object.keys(result).length === 0;


                if (isEmpty === false)
                {
                    res.send({
                        'isSuccessful':true,
                        'accountType':'Admin',
                        'Name':result[0].Name,
                        'error': false,
                        'message': 'Admin has logged in successfully'
                    });
                }
                else
                {
                    res.send({
                        'isSuccessful':false,
                        'accountType':'',
                        'Name': '',
                        'error': false,
                        'message': 'credentials are wrong'
                    });
                }
            });
        }
    });
});

// displaying the inventory
app.post('/inventory', (req, res) => {
    // console.log("helloooo-----------------")
    const sql = `Select * from inventory`;
    db.query(sql, (err, result) => {
        if (err) {
            return res.send({
                'isSuccessful':false,
                'accountType':'',
                'Name': '',
                'error': true,
                'message': err
            });
        }
        else
        {
            res.send({
                'isSuccessful':true,
                'accountType':'',
                'Name': '',
                'error': false,
                'message': 'Inventory displayed successfully',
                'result': result
            });
        }
    });    
});

// adding in the inventory
app.post('/inventory/add', (req, res) => {

    let post = {"Unit_ID":req.body.Unit_ID, "Brand":req.body.Brand, "Features":req.body.Features, "Product_Name":req.body.Product_Name, "Colour":req.body.Colour, "Description":req.body.Description, "Images":req.body.Images, "Cost_Price":req.body.Cost_Price, "Selling_Price":req.body.Selling_Price, "Admin_ID":req.body.Admin_ID, "Category":req.body.Category};

    const sql = 'INSERT INTO inventory SET ?';
    let body = db.query(sql, post, (err, result) => {
        if (err) {
            return res.send({
                'isSuccessful':false,
                'accountType':'Admin',
                'Admin_ID': req.body.Admin_ID,
                'error': true,
                'message': err
            });
        }
        else
        {
            if (req.body.Category === "Mobile_Phone")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "RAM":req.body.ram, "Memory":req.body.Memory}
                const sql_new = 'INSERT INTO Mobile_Phone SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Mobile Phone and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "Tablet")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "RAM":req.body.ram, "Memory":req.body.Memory, "SIM":req.body.sim}
                const sql_new = 'INSERT INTO Tablet SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Tablet and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "Laptop")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Size":req.body.Size, "RAM":req.body.ram, "Processor":req.body.Processor, "SSD":req.body.ssd, "Generation":req.body.Generation}
                const sql_new = 'INSERT INTO Laptop SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Laptop and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "TV")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Screen_Size":req.body.Screen_Size, "Smart":req.body.Smart, "Screen_Type":req.body.Screen_Type};
                const sql_new = 'INSERT INTO TV SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in TV and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "VG_Console")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Memory":req.body.Memory, "Disc_Compatibility": req.body.Disc_Compatibility, "Controller":req.body.Controller};
                const sql_new = 'INSERT INTO VG_Console SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in VG Console and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "Camera")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Lens":req.body.Lens, "Touch":req.body.Touch, "Tripod_Compatibility":req.body.Tripod_Compatibility}
                const sql_new = 'INSERT INTO Camera SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Camera and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "Scanner")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Resolution":req.body.Resolution, "Type":req.body.Type}
                const sql_new = 'INSERT INTO Scanner SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Scanner and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "Printer")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Wireless":req.body.Wireless, "Type":req.body.Type, "Portable":req.body.Portable};
                const sql_new = 'INSERT INTO Printer SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Printer and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "Projector")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Bulb":req.body.Bulb, "Projection_Distance":req.body.Projection_Distance, "Image_size":req.body.Image_size}
                const sql_new = 'INSERT INTO Projector SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Projector and Inventory'
                        });
                    }
                });
            }
            else if (req.body.Category === "Desktop")
            {
                let post_new = {"Unit_ID":req.body.Unit_ID, "Processor":req.body.Processor, "RAM":req.body.ram, "Graphic_Card":req.body.Graphic_Card, "PSU":req.body.psu, "Memory":req.body.Memory, "Cooling_System":req.body.Cooling_System, "RGB":req.body.rgb};
                const sql_new = 'INSERT INTO Desktop SET ?';
                let body = db.query(sql_new, post_new, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else{
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully added in Desktop and Inventory'
                        });
                    }
                });
            }
        } 
    });   
}); 

// deleting from the inventory
app.post('/inventory/delete', (req, res) => {
    const sql = `select Category from Inventory where Unit_ID=${req.body.Unit_ID}`;

    db.query(sql, (err, result) => {
        if (err) {
            return res.send({
                'isSuccessful':false,
                'accountType':'Admin',
                'error': true,
                'message': err
            });
        }
        else
        {
            const sql_temp = `DELETE from ${result[0].Category} where Unit_ID=${req.body.Unit_ID}`;
            db.query(sql_temp, (err, result) => {
                if (err) {
                    return res.send({
                        'isSuccessful':false,
                        'accountType':'Admin',
                        'error': true,
                        'message': err
                    });
                }
                else{
                    const sql_new = `DELETE from inventory where Unit_ID=${req.body.Unit_ID}`;
                    db.query(sql_new, (err, result) => {
                        if (err) {
                            return res.send({
                                'isSuccessful':false,
                                'accountType':'Admin',
                                'error': true,
                                'message': err
                            });
                        }
                        else{
                            return res.send({
                                'isSuccessful':true,
                                'accountType':'',
                                'error': false,
                                'message': 'Inventory deleted successfully from both Inventory and category table'
                            });
                        }
                    });
                }
            });
        }
    });    
});


// Editing a specific entry in inventory and category table
app.post('/inventory/edit', (req, res) => {

    if (req.body.Category === "Mobile_Phone")
    {
        let post_new = {"RAM":req.body.ram, "Memory":req.body.Memory}
        const sql_new = `Update Mobile_Phone SET ? Where Unit_ID=${req.body.Unit_ID}`;

        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Mobile Phone and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "Tablet")
    {
        let post_new = {"RAM":req.body.ram, "Memory":req.body.Memory, "SIM":req.body.sim}
        const sql_new = `Update Tablet SET ? Where Unit_ID=${req.body.Unit_ID}`;

        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Tablet and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "Laptop")
    {
        let post_new = {"Size":req.body.Size, "RAM":req.body.ram, "Processor":req.body.Processor, "SSD":req.body.ssd, "Generation":req.body.Generation}
        const sql_new = `Update Laptop SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Laptop and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "TV")
    {
        let post_new = {"Screen_Size":req.body.Screen_Size, "Smart":req.body.Smart, "Screen_Type":req.body.Screen_Type};
        const sql_new = `Update TV SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in TV and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "VG Console")
    {
        let post_new = {"Memory":req.body.Memory, "Disc_Compatibility": req.body.Disc_Compatibility, "Controller":req.body.Controller};
        const sql_new = `Update VG_Console SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in VG Console and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "Camera")
    {
        let post_new = {"Lens":req.body.Lens, "Touch":req.body.Touch, "Tripod_Compatibility":req.body.Tripod_Compatibility}
        const sql_new = `Update Camera SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Camera and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "Scanner")
    {
        let post_new = {"Resolution":req.body.Resolution, "Type":req.body.Type}
        const sql_new = `Update Scanner SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Scanner and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "Printer")
    {
        let post_new = {"Wireless":req.body.Wireless, "Type":req.body.Type, "Portable":req.body.Portable};
        const sql_new = `Update Printer SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Printer and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "Projector")
    {
        let post_new = {"Bulb":req.body.Bulb, "Projection_Distance":req.body.Projection_Distance, "Image_size":req.body.Image_size}
        const sql_new = `Update Projector SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Projector and Inventory'
                        });
                    }
                });
            }
        });
    }
    else if (req.body.Category === "Desktop")
    {
        let post_new = {"Processor":req.body.Processor, "RAM":req.body.ram, "Graphic_Card":req.body.Graphic_Card, "PSU":req.body.psu, "Memory":req.body.Memory, "Cooling_System":req.body.Cooling_System, "RGB":req.body.rgb};
        const sql_new = `Update Desktop SET ? Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, post_new, (err, result) => {
            if (err) {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Admin',
                    'Admin_ID': req.body.Admin_ID,
                    'error': true,
                    'message': err
                });
            }
            else{
                const sql = `UPDATE Inventory SET Brand=${req.body.Brand}, Features=${req.body.Features}, Product_Name=${req.body.Product_Name}, Colour=${req.body.Colour}, Description=${req.body.Description}, Images=${req.body.Images}, Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category=${req.body.Category}, where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, post, (err, result) => {
                    if (err) {
                        return res.send({
                            'isSuccessful':false,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': true,
                            'message': err
                        });
                    }
                    else
                    {
                        return res.send({
                            'isSuccessful':true,
                            'accountType':'Admin',
                            'Admin_ID': req.body.Admin_ID,
                            'error': false,
                            'message': 'Product successfully updated in Desktop and Inventory'
                        });
                    }
                });
            }
        });
    }    
});


// see order confirmation 
app.post('/order/confirmation', (req, res) => {
    const sql = `select Order_Confirmation from Orders where Order_ID=${req.body.Order_ID}`;

    db.query(sql, (err, result) => {
        if (err) {
            return res.send({
                'isSuccessful':false,
                'accountType':'Customer',
                'error': true,
                'message': err
            });
        }
        else
        {
            return res.send({
                'isSuccessful':true,
                'accountType':'Customer',
                'error': false,
                'message': result
            });
        }
    });    
});

// see order status 
app.post('/order/status', (req, res) => {
    const sql = `select Order_Status from Orders where Order_ID=${req.body.Order_ID}`;

    db.query(sql, (err, result) => {
        if (err) {
            return res.send({
                'isSuccessful':false,
                'accountType':'Customer',
                'error': true,
                'message': err
            });
        }
        else
        {
            return res.send({
                'isSuccessful':true,
                'accountType':'Customer',
                'error': false,
                'message': result
            });
        }
    });    
});

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
    let body = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts 1 added...');
    });
});
let PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    
});
