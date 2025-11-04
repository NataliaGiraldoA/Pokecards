import axios from 'axios';

export const http = axios.create({
    baseURL: import.meta.env.VITE_POKEMON_API_BASE || "https://pokeapi.co/api/v2/",
    timeout: 10000,
})

//Interceptor de respuesta
http.interceptors.response.use(
    (res) => res,
    (error) =>{
        if(axios.isCancel?.(error) || error.code === "ERR_CANCELED" || error.name === "CanceledError"){
            return Promise.reject({ canceled: true });
        }
        const status = error?.response?.status ?? 0;
        const message = error?.response?.data?.message || error.message || "Error de red";
        //rechazamos con un objeto predecible
        return Promise.reject({ status, message, canceled: false });



    }
)

export default http;