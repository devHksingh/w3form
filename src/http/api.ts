import axios from "axios";


export interface Formsprop {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    access_key: string;
}
const api = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})




const postForm = async (data: Formsprop) => {
    // 0705b402-49b2-4c29-9e02-aa8ad746f353


    const res = await api.post('',data)
    return res
}

export {
    postForm
}