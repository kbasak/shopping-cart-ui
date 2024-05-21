import axios from "axios";

export default async function LoginStatus(userdata) {
    const { data } = await axios.post("http://localhost:9090/login", userdata);
    return data;
}

export async function RegistrationStatus(userdata) {
    const { data } = await axios.post("http://localhost:9090/register", userdata);
    return data;
}

export async function LoadProductStatus() {
    const { data } = await axios.get("http://localhost:9091/loadpurchaseitems", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true'
        }
    });
    return data;
}

export async function AddToCartStatus(sku, quantity) {
    const { data } = await axios.get("http://localhost:9091/addtocart/" + sku + "/" + quantity, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true'
        }
    });
    return data;
}

export async function GetCartDetails() {
    const { data } = await axios.get("http://localhost:9091/getcartdetails", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true'
        }
    });
    return data;
}

export async function CheckOutCart(ids) {
    console.log(ids + "-------------");
    const { data } = await axios.get("http://localhost:9091/checkoutcart?id=" + ids, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true'
        }
    });
    console.log(data);
    return data;
}

export async function DeleteCart(ids) {
    console.log(ids + "-------------");
    const { data } = await axios.delete("http://localhost:9091/deletecart?id=" + ids, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true'
        }
    });
    console.log(data);
    return data;
}