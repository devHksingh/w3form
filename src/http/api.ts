import axios from "axios";


export interface Formsprop {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    access_key: string;
    country: "United States" | "Canada" | "Mexico";
}
const api = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})




const postForm = async (data: Formsprop) => {
    


    const res = await api.post('',data)
    return res
}

export {
    postForm
}