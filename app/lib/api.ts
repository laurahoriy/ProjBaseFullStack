import axios from 'axios';

// Cria a conexão base apontando para o Spring
// Use baseURL sem barra final para evitar inconsistências de junção de caminho.

const api = axios.create({
    baseURL: '/api'
})

api.interceptors.response.use(
    response => response,
    error => {
        if (axios.isAxiosError(error)) {
            console.error('API request failed:', {
                method: error.config?.method,
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        return Promise.reject(error);
    }
);

export default api;