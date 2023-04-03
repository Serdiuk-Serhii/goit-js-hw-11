import axios from "axios";

export async function fetchImg(url) {
    const response = await axios.get(url);
    return response.data;

    // return fetch(url).then(response => {
    //     if (!response.ok) {
    //         throw new Error(response.status);
    //     }
    //     return response.json()
    // })
};