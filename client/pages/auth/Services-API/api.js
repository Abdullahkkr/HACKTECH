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

//add scanner inventory
export const Scanner_inventory = async(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Resolution, Type) => {
    const request = {"Unit_ID" : Unit_ID, "Brand" : Brand, "Features" : Features, "Product_Name" : Product_Name, "Colour" : Colour, "Description" : Description, "Images" : Images = null,"Cost_Price" : Cost_Price, "Selling_Price" : Selling_Price, "Admin_ID" : Admin_ID,"Category" : Category, "Resolution" : Resolution,"Type" : Type}
    return await axios.post(`${url}/inventory/add`, request,{
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