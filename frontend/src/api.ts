// src/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-27nn.onrender.com', // Backend URL
});

export default api;