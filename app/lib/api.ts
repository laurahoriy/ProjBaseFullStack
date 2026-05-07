import axios from 'axios';

//Cria a conexão base apontando para o Spring

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

export default api;