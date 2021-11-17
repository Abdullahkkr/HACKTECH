import axios from 'axios';
const url = "http://localhost:3000";
export const login = async(email, password) => {
    const request = {"Admin_ID" : email, "Password" : password}
    return await axios.post(`${url}/login`, request);
}
