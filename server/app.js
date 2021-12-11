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
CREATE TABLE Admin(Name VARCHAR(300), Admin_ID int(5), Password VARCHAR(300), PRIMARY KEY (Admin_ID));
CREATE TABLE Orders(Unit_ID bigint(200), Order_ID bigint(200), Order_Confirmation bool, Order_Date date, Delivery_Date date, Courier_Service_Name VARCHAR(300), Customer_ID int(8), Order_Status VARCHAR(300), Cost_Price int(20), Selling_Price int(20), PRIMARY KEY (Order_ID));
CREATE TABLE Inventory(Unit_ID bigint(200), Brand VARCHAR(300), Features VARCHAR(5000), Product_Name VARCHAR(300), Colour VARCHAR(200), Description VARCHAR(5000), Images VARCHAR(300), Cost_Price int(20), Selling_Price int(20), Admin_ID int(5), Category VARCHAR(5000), PRIMARY KEY (Unit_ID), FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID));
CREATE TABLE Customers(Customer_ID int(8), Customer_Name VARCHAR(300), Address VARCHAR(300), Past_Orders int(200), Email VARCHAR(50), Contact_Number bigint(200), CNIC_Number bigint(200), PRIMARY KEY (Customer_ID));
CREATE TABLE Accounts(Customer_ID int(8), Password VARCHAR(300), PRIMARY KEY (Customer_ID), FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID));
CREATE TABLE Printer(Unit_ID bigint(200), Wireless VARCHAR(300), Type VARCHAR(300), Portable VARCHAR(300), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Camera(Unit_ID bigint(200), Lens VARCHAR(300), Touch VARCHAR(500), Tripod_Compatibility VARCHAR(500), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Scanner(Unit_ID bigint(200), Resolution VARCHAR(500), Type VARCHAR(500), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE VG_Console(Unit_ID bigint(200), Memory VARCHAR(200), Disc_Compatibility VARCHAR(500), Controller VARCHAR(500), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Projector(Unit_ID bigint(200), Bulb VARCHAR(500), Projection_Distance int(20), Image_size int(20), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE TV(Unit_ID bigint(200), Screen_Size VARCHAR(500), Smart VARCHAR(500), Screen_Type VARCHAR(200), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Tablet(Unit_ID bigint(200), RAM VARCHAR(500), Memory VARCHAR(500), SIM VARCHAR(500), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Mobile_Phone(Unit_ID bigint(200), RAM VARCHAR(500), Memory VARCHAR(500), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Desktop(Unit_ID bigint(200), Processor VARCHAR(500), RAM VARCHAR(500), Graphic_Card VARCHAR(200), PSU VARCHAR(200), Memory VARCHAR(500), Cooling_System VARCHAR(500), RGB VARCHAR(500), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
CREATE TABLE Laptop(Unit_ID bigint(200), Size VARCHAR(500), RAM VARCHAR(500), Processor VARCHAR(500), SSD VARCHAR(500), Generation VARCHAR(500), PRIMARY KEY (Unit_ID), FOREIGN KEY (Unit_ID) REFERENCES Inventory(Unit_ID));
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


// orders 
app.post('/orders', (req, res) => {
    console.log('hello is this working')
    const sql = 'SELECT * from Orders'
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
            res.send({
                'isSuccessful': true,
                'accountType':'',
                'Name': '',
                'error': false,
                'message': result
            });
        }
        
    });
});

// orders 
app.post('/orders/each-customer', (req, res) => {
    const sql = `SELECT * from Orders where Customer_ID=${req.body.Customer_ID}`
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
            res.send({
                'isSuccessful': true,
                'accountType':'',
                'Name': '',
                'Customer ID': req.body.Customer_ID,
                'error': false,
                'message': result
            });
        }
        
    });
});

// input orders from users
app.post('/orders/new-order',(req,res)=>{

    const sql_temp = `select Inventory.Unit_ID, Inventory.Cost_Price, Inventory.Selling_Price from Inventory,${req.body.Category} where Inventory.Unit_ID=${req.body.Category}.Unit_ID and Inventory.Product_Name="${req.body.Product_Name}" and Inventory.Unit_ID=(Select MAX(Inventory.Unit_ID) from Inventory,${req.body.Category} where Inventory.Unit_ID=${req.body.Category}.Unit_ID)`;

    db.query(sql_temp, (err, result) => {
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
            if(result.length>0)
            {
                const Unit_ID = result[0].Unit_ID;
                const cp = result[0].Cost_Price
                const sp = result[0].Selling_Price
                const magic_number = Math.floor(Math.random() * (1000000 - 2 + 1)) + 2;
                const sql = `INSERT INTO ORDERS VALUES(${Unit_ID},${magic_number},FALSE,"${req.body.Order_Date}","${req.body.Delivery_Date}","tcs",${req.body.Customer_ID}, "New", ${cp}, ${sp})`;
                // const sql = `INSERT INTO ORDERS VALUES(${Unit_ID},${req.body.Order_ID},FALSE,"${req.body.Order_Date}","${req.body.Delivery_Date}","${req.body.Courier_Service_Name}",${req.body.Customer_ID}, "New", ${cp}, ${sp})`;
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
                        const sql2 = `SELECT Category FROM INVENTORY where Unit_ID = (${Unit_ID})`;
                        db.query(sql2, (err, result) => {
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
                                const Category_Name = result[0].Category;
                                console.log("category name is", Category_Name);

                                const sql3 = `SELECT * from INVENTORY,${result[0].Category} WHERE Inventory.Unit_ID=${Category_Name}.Unit_ID and Inventory.Unit_ID=${Unit_ID}`;
                                db.query(sql3, (err, result) => {
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
                                        const sql4 = `DELETE FROM ${Category_Name} WHERE ${Category_Name}.Unit_ID = (${Unit_ID})`
                                        db.query(sql4, (err, result) => {
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
                                                const sql5 = `DELETE FROM Inventory WHERE Inventory.Unit_ID = (${Unit_ID})`
                                                db.query(sql5, (err, result) => {
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
                                                        console.log('reached main3');
                                                        console.log(result);
                                                        return res.send({
                                                            'isSuccessful': true,
                                                            'accountType':'',
                                                            'Name': '',
                                                            'error': false,
                                                            'Order_ID': magic_number,
                                                            'message': 'Order placed successfully and product removed from inventory and category table'
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                        console.log('reached main2');
                                        console.log(result);
                                        // return res.send({
                                        //     'isSuccessful': true,
                                        //     'accountType':'Customer',
                                        //     'error': false,
                                        //     'message': result
                                        // });
                                    }
                                    
                                });
                                console.log('reached main1');
                                console.log(result);
                                // res.send({
                                //     'isSuccessful': true,
                                //     'accountType':'',
                                //     'Name': '',
                                //     'error': false,
                                //     'message': result
                                // });
                                
                            }
                            
                        });
                    }
                    
                });
            }
            else
            {
                return res.send({
                    'isSuccessful':false,
                    'accountType':'Customer',
                    'error': true,
                    'message': "The product is Out of Stock, Please select another product"
                });
            }

        }
    });    
});




// allow admin to edit the orders table(Order_Confirmation bool and Order_Status)
app.post('/orders/admin-edit', (req, res) => {
    const sql = `UPDATE Orders SET Order_Confirmation = ${req.body.Order_Confirmation}, Order_Status = "${req.body.Order_Status}" WHERE Unit_ID = ${req.body.Unit_ID}`
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
            res.send({
                'isSuccessful': true,
                'accountType':'',
                'Name': '',
                'error': false,
                'message': result
            });
        }
        
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
            console.log(result)
            console.log(result[0])

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
        const sql_new = `Update Mobile_Phone SET RAM="${req.body.ram}", Memory="${req.body.Memory}" Where Unit_ID=${req.body.Unit_ID}`;

        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;
                let body = db.query(sql, (err, result) => {
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
        
        const sql_new = `Update Tablet SET RAM="${req.body.ram}", Memory="${req.body.Memory}", SIM="${req.body.sim}" Where Unit_ID=${req.body.Unit_ID}`;

        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update Laptop SET Size="${req.body.Size}", RAM="${req.body.ram}", Processor="${req.body.Processor}", SSD="${req.body.ssd}", Generation="${req.body.Generation}" Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update TV SET Screen_Size="${req.body.Screen_Size}", Smart="${req.body.Smart}", Screen_Type="${req.body.Screen_Type}" Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update VG_Console SET Memory="${req.body.Memory}", Disc_Compatibility="${req.body.Disc_Compatibility}", Controller="${req.body.Controller}" Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update Camera SET Lens="${req.body.Lens}", Touch="${req.body.Touch}", Tripod_Compatibility="${req.body.Tripod_Compatibility}" Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update Scanner SET Resolution="${req.body.Resolution}", Type="${req.body.Type}" Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update Printer SET Wireless="${req.body.Wireless}", Type="${req.body.Type}", Portable="${req.body.Portable}" Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update Projector SET Bulb="${req.body.Bulb}", Projection_Distance=${req.body.Projection_Distance}, Image_size=${req.body.Image_size} Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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
        const sql_new = `Update Desktop SET Processor="${req.body.Processor}", RAM="${req.body.ram}", Graphic_Card="${req.body.Graphic_Card}", PSU="${req.body.psu}", Memory="${req.body.Memory}", Cooling_System="${req.body.Cooling_System}", RGB="${req.body.rgb}" Where Unit_ID=${req.body.Unit_ID}`;
        let body = db.query(sql_new, (err, result) => {
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
                const sql = `UPDATE Inventory SET Brand="${req.body.Brand}", Features="${req.body.Features}", Product_Name="${req.body.Product_Name}", Colour="${req.body.Colour}", Description="${req.body.Description}", Images="${req.body.Images}", Cost_Price=${req.body.Cost_Price}, Selling_Price=${req.body.Selling_Price}, Admin_ID=${req.body.Admin_ID}, Category="${req.body.Category}" where Unit_ID=${req.body.Unit_ID}`;

                let body = db.query(sql, (err, result) => {
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

// see a specific product
app.post('/inventory/specific-product', (req, res) => {
    const sql = `select * from Inventory,${req.body.Category} where Inventory.Unit_ID=${req.body.Category}.Unit_ID and Inventory.Product_Name="${req.body.Product_Name}" and Inventory.Unit_ID=(Select MAX(Inventory.Unit_ID) from Inventory,${req.body.Category} where Inventory.Unit_ID=${req.body.Category}.Unit_ID)`;

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


// inventory merged with category for specific category, will send all the products for this category
// see a specific product
app.post('/inventory/category', (req, res) => {
    const sql = `select * from Inventory,${req.body.Category} where Inventory.Unit_ID=${req.body.Category}.Unit_ID`; 

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


// COD 
app.post('/cod/amountowe', (req, res) => {
    const sql = `SELECT SUM(Selling_Price - 100) AS Total FROM Orders WHERE Order_Status ='Delivered'`;

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
            return res.send({
                'isSuccessful':true,
                'accountType':'Admin',
                'error': false,
                'amount Courier service owe to Hacktech':  result[0].Total,
                'message': result
            });
        }
    });    
});

// gets payments of the order
app.post('/admin/payments',(req,res)=>{ // Order status must be Completed

    const sql = `select Cost_Price,Selling_Price from Orders where Order_Status = 'Completed'`;


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
            const number_of_orders = Object.keys(result).length

            let Total_Cost = 0;
            let Total_Revenue = 0;
            let Profit_Loss = 0;

            for (let i = 0; i < number_of_orders; i++) {
                
                Total_Cost += result[i].Cost_Price;
                Total_Revenue += result[i].Selling_Price;
            }
            
            Profit_Loss = Total_Revenue - Total_Cost;
            console.log('Total Cost is--->',Total_Cost);
            console.log('Total Revenue is--->',Total_Revenue);
            if (Profit_Loss >= 0)
            {
                console.log('Profit is -->',Profit_Loss)

                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'Profit was earnt',
                    'Profit': Profit_Loss
                });
            }
            else if(Profit_Loss == 0)
            {
                console.log('Break even');
                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'HackTech Broke Even',
                });
            }
            else
            {
                console.log('Loss is --->',-Profit_Loss);
                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'Loss was dealt',
                    'Loss': -Profit_Loss
                });
            }
        }
    });    

});

app.post('/admin/payments-month',(req,res)=>{

    const sql = `select Cost_Price,Selling_Price from Orders where Order_Status = 'Completed' and month(Order_Date) = ${req.body.Month} and year(Order_Date) = ${req.body.Year}`;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        else
        {
            const number_of_orders = Object.keys(result).length

            let Total_Cost = 0;
            let Total_Revenue = 0;
            let Profit_Loss = 0;

            for (let i = 0; i < number_of_orders; i++) {
                
                Total_Cost += result[i].Cost_Price;
                Total_Revenue += result[i].Selling_Price;
            }
            
            Profit_Loss = Total_Revenue - Total_Cost;
            console.log('Total Cost is--->',Total_Cost);
            console.log('Total Revenue is--->',Total_Revenue);
            if (Profit_Loss >= 0)
            {
                console.log('Profit is -->',Profit_Loss)

                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'Profit was earnt',
                    'Profit': Profit_Loss
                });
            }
            else if(Profit_Loss == 0)
            {
                console.log('Break even');
                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'HackTech Broke Even',
                });
            }
            else
            {
                console.log('Loss is --->',-Profit_Loss);
                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'Loss was dealt',
                    'Loss': -Profit_Loss
                });
            }
        }
    });
});

app.post('/admin/payments-year',(req,res)=>{

    const sql = `select Cost_Price,Selling_Price from Orders where Order_Status = 'Completed' and year(Order_Date) = ${req.body.Year}`;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        else
        {
            const number_of_orders = Object.keys(result).length

            let Total_Cost = 0;
            let Total_Revenue = 0;
            let Profit_Loss = 0;

            for (let i = 0; i < number_of_orders; i++) {
                
                Total_Cost += result[i].Cost_Price;
                Total_Revenue += result[i].Selling_Price;
            }
            
            Profit_Loss = Total_Revenue - Total_Cost;
            console.log('Total Cost is--->',Total_Cost);
            console.log('Total Revenue is--->',Total_Revenue);
            if (Profit_Loss >= 0)
            {
                console.log('Profit is -->',Profit_Loss)

                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'Profit was earnt',
                    'Profit': Profit_Loss
                });
            }
            else if(Profit_Loss == 0)
            {
                console.log('Break even');
                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'HackTech Broke Even',
                });
            }
            else
            {
                console.log('Loss is --->',-Profit_Loss);
                return res.send({
                    'isSuccessful':true,
                    'accountType':'Customer',
                    'error': false,
                    'message': 'Loss was dealt',
                    'Loss': -Profit_Loss
                });
            }
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
