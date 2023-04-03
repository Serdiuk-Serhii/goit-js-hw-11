// import axios from "axios";

export async function fetchImg(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;

    // return fetch(url).then(response => {
    //     if (!response.ok) {
    //         throw new Error(response.status);
    //     }
    //     return response.json()
    // })
};