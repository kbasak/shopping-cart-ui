import axios from "axios";

export default async function LoginStatus(userdata) {
    const { data } = await axios.post("http://localhost:9090/login", userdata);
    //console.log(data.jwtAuthToken);
    return data;
}

export async function RegistrationStatus(userdata) {
    const { data } = await axios.post("http://localhost:9090/register", userdata);
    //console.log(data.jwtAuthToken);
    return data;
}