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
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Processor" : Processor,"RAM" : ram, "Graphic_Card" : Graphic_Card, "PSU" : psu, "Memory" : Memory, "Cooling_System" : Cooling_System, "RGB" : rgb}
    return await axios.post(`${url}/inventory/add`, request,{
        'Accept':'application/json',
        'content-type':'application/json'
    });
}

//edit Desktop inventory
export const DesktopEdit_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Processor,ram,Graphic_Card, psu, Memory, Cooling_System, rgb) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Processor" : Processor,"RAM" : ram, "Graphic_Card" : Graphic_Card, "PSU" : psu, "Memory" : Memory, "Cooling_System" : Cooling_System, "RGB" : rgb}
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