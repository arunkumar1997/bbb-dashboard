import axios from 'axios'
const API_URL = 'http://localhost:1337'

export async function signin(data) {
    try {
        const res = await axios.post(`${API_URL}/api/auth/local`, {
            identifier: data.identifier,
            password: data.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return {
            ...res.data,
            statusCode: res.status
        }
    } catch (error) {
        if (error && error.response && error.response.data.error.message) {
            return { errorMessage: error.response.data.error.message, statusCode: 400 };
        }
        return { errorMessage: error.message, statusCode: 400 };
    }
}

export async function signup(data) {
    try {
        const res = await axios.post(`${API_URL}/api/auth/local/register`, {
            username: data.email,
            email: data.email,
            password: data.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return {
            ...res.data,
            statusCode: res.status
        }
    } catch (error) {
        if (error && error.response && error.response.data.error.message) {
            return { errorMessage: error.response.data.error.message, statusCode: 400 };
        }
        return { errorMessage: error.message, statusCode: 400 };
    }
}