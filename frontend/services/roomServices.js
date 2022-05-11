import axios from 'axios'
const API_URL = 'http://localhost:1337'

export async function getRooms() {
    try {
        const res = await axios.get(`${API_URL}/api/rooms`)
        return res.data
    } catch (error) {
        console.log(error.message)
        return {}
    }
}

export async function getRoomById(roomId, jwt) {
    try {
        const res = await axios.get(`${API_URL}/api/rooms/${roomId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        })
        return res.data
    } catch (error) {
        console.log(error.message)
        return {}
    }
}

export async function createRoom(roomData, jwt) {
    try {
        const res = await axios.post(
            `${API_URL}/api/rooms/`, { data: roomData }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
        return {...res.data, statsCode: res.status }
    } catch (error) {
        console.log(error.response.data.error.message)
        return {
            errorMessage: error && error.response && error.response.data.error.message ?
                error.response.data.error.message :
                'Something went wrong, Please try again after some times',
            statsCode: res.status,
        }
    }
}

export async function updateRoom(id, data) {
    try {
        const res = await axios.put(
            `${API_URL}/api/rooms/${id}`, { data: roomData }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return res.data
    } catch (error) {
        console.log(error.message)
        return {}
    }
}