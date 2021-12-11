import axios from 'axios';
const url = "http://localhost:3001";

// user log in 
export const login = async(email, password) => {
    const request = {"Admin_ID" : email, "Password" : password}
    return await axios.post(`${url}/login`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// user sign up
export const signup = async(email, password, name, cnic, contactnumber, address, pastorder) => {
    const request = {"Customer_ID" : email, "Password" : password, "Customer_Name" : name, "Address" : address, "CNIC_Number" : cnic, "Contact_Number" : contactnumber, "Past_Orders" : pastorder = null}
    return await axios.post(`${url}/customer-signup`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// add camera inventory
export const Camera_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Lens,Touch,Tripod_Compatibility) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Lens" : Lens,"Touch" : Touch,"Tripod_Compatibility" : Tripod_Compatibility}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// edit camera inventory
export const CameraEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Lens,Touch,Tripod_Compatibility) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Lens" : Lens,"Touch" : Touch,"Tripod_Compatibility" : Tripod_Compatibility}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const Laptop_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Size,ram,Processor,ssd,Generation) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Size" : Size,"ram" : ram,"Processor" : Processor,"ssd" : ssd,"Generation" : Generation}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const LaptopEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Size,ram,Processor,ssd,Generation) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Size" : Size,"ram" : ram,"Processor" : Processor,"ssd" : ssd,"Generation" : Generation}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//add scanner inventory
export const Scanner_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Resolution, Type) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Resolution" : Resolution,"Type" : Type}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//edit scanner inventory
export const ScannerEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Resolution, Type) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Resolution" : Resolution,"Type" : Type}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//add printer inventory
export const Printer_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Wireless, Type, Portable) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Wireless" : Wireless,"Type" : Type, "Portable" : Portable}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//edit printer inventory
export const PrinterEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Wireless, Type, Portable) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Wireless" : Wireless,"Type" : Type, "Portable" : Portable}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//add projector inventory
export const Projector_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Bulb, Projection_Distance, Image_size) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Bulb" : Bulb,"Projection_Distance" : Projection_Distance, "Image_size" : Image_size}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//edit projector inventory
export const ProjectorEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Bulb, Projection_Distance, Image_size) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Bulb" : Bulb,"Projection_Distance" : Projection_Distance, "Image_size" : Image_size}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//add Desktop inventory
export const Desktop_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Processor,ram,Graphic_Card, psu, Memory, Cooling_System, rgb) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Processor" : Processor,"ram" : ram, "Graphic_Card" : Graphic_Card, "psu" : psu, "Memory" : Memory, "Cooling_System" : Cooling_System, "rgb" : rgb}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//edit Desktop inventory
export const DesktopEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Processor,ram,Graphic_Card, psu, Memory, Cooling_System, rgb) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Processor" : Processor,"ram" : ram, "Graphic_Card" : Graphic_Card, "psu" : psu, "Memory" : Memory, "Cooling_System" : Cooling_System, "rgb" : rgb}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// delete inventory 
export const Delete_inventory = async(Unit_ID) => {
    const request = {"Unit_ID" : Unit_ID}
    return await axios.post(`${url}/inventory/delete`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const Tablet_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,ram,Memory,sim) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "ram" : ram, "Memory" : Memory, "sim" : sim}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const TabletEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,ram,Memory,sim) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "ram" : ram, "Memory" : Memory, "sim" : sim}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// LED
// Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Screen_Size,Smart,Screen_Type

export const LED_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Screen_Size,Smart,Screen_Type) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Screen_Size" : Screen_Size, "Smart" : Smart, "Screen_Type" : Screen_Type}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const LEDEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Screen_Size,Smart,Screen_Type) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Screen_Size" : Screen_Size, "Smart" : Smart, "Screen_Type" : Screen_Type}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}
// Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,ram,Memory

export const Mobile_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,ram,Memory) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "ram" : ram, "Memory" : Memory}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const MobileEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,ram,Memory) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "ram" : ram, "Memory" : Memory}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Memory,Disc_Compatibility,Controller

export const Console_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Memory,Disc_Compatibility,Controller) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Memory" : Memory, "Disc_Compatibility" : Disc_Compatibility, "Controller" : Controller}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const ConsoleEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Memory,Disc_Compatibility,Controller) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Memory" : Memory, "Disc_Compatibility" : Disc_Compatibility, "Controller" : Controller}
    return await axios.post(`${url}/inventory/edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const allInventory = async() => {
    const request = {}
    return await axios.post(`${url}/inventory`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const ShowSpecificInventory = async(Category) => {
    const request = {Category}
    return await axios.post(`${url}/inventory/category`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const newOrder = async(Category, Product_Name, Order_Date, Delivery_Date, Customer_ID) => {
    console.log("api-hittt")
    console.log(Category, Product_Name, Order_Date, Delivery_Date, Customer_ID)
    const request = {"Category": Category, "Product_Name": Product_Name, "Order_Date": Order_Date, "Delivery_Date": Delivery_Date, "Customer_ID": Customer_ID}
    return await axios.post(`${url}/orders/new-order`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

export const allOrders = async() => {
    const request = {}
    return await axios.post(`${url}/orders`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// Find customer orders 
export const Find_Orders = async(Customer_ID) => {
    const request = {"Customer_ID" : Customer_ID}
    return await axios.post(`${url}/orders/each-customer`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// Find customer orders 
export const EditOrder = async(Customer_ID,Order_Status, Order_Confirmation) => {
    const request = {"Customer_ID" : Customer_ID,"Order_Status":Order_Status,"Order_Confirmation":Order_Confirmation}
    return await axios.post(`${url}/orders/admin-edit`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// find order confirmation
export const Order_Confirmation = async(Order_ID) => {
    const request = {"Order_ID" : Order_ID}
    return await axios.post(`${url}/order/confirmation`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// find order Status
export const Order_Status = async(Order_ID) => {
    const request = {"Order_ID" : Order_ID}
    return await axios.post(`${url}/order/status`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// '/admin/payments'
export const payments = async() => {
    const request = {}
    return await axios.post(`${url}/admin/payments`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// amounts owe
export const AmountsOwe = async() => {
    const request = {}
    return await axios.post(`${url}/cod/amountowe`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

// amounts owe
export const month = async() => {
    const request = {}
    return await axios.post(`${url}/admin/payments-month`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}