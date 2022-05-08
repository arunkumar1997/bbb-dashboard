import axios from 'axios'
const API_URL = 'http://localhost:1337'

const rooms = [{
        id: 1,
        title: 'Room1',
        description: 'A small description',
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: 'room_1',
        roomSettings: {
            muteOnStart: true,
            record: true,
        },
    },
    {
        id: 2,
        title: 'Room2',
        description: 'A small description',
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: 'room_2',
        roomSettings: {
            muteOnStart: true,
            record: true,
        },
    },
    {
        id: 3,
        title: 'Room3',
        description: 'A small description',
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: 'room_3',
        roomSettings: {
            muteOnStart: true,
            record: true,
        },
    },
    {
        id: 4,
        title: 'Room4',
        description: 'A small description',
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbbId: 'room_4',
        roomSettings: {
            muteOnStart: true,
            record: true,
        },
    },
    {
        id: 5,
        title: 'Room5',
        description: 'A small description',
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: 'room_5',
        roomSettings: {
            muteOnStart: true,
            record: true,
        },
    },
    {
        id: 6,
        title: 'Room6',
        description: 'A small description',
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: 'room_6',
        roomSettings: {
            muteOnStart: true,
            record: true,
        },
    },
]

export async function getRooms() {
    try {
        const res = await axios.get(`${API_URL}/api/rooms`)
        return res.data
    } catch (error) {
        console.log(error.message)
        return {}
    }
}

export async function getRoomById(roomId) {
    try {
        const res = await axios.get(`${API_URL}/api/rooms/${roomId}`)
        return res.data
    } catch (error) {
        console.log(error.message)
        return {}
    }
}

export async function createRoom(data) {
    try {
        const res = await axios.post(`${API_URL}/api/rooms/`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.data
    } catch (error) {
        console.log(error.message)
        return {}
    }
}

export async function updateRoom(id, data) {
    try {
        const res = await axios.put(`${API_URL}/api/rooms/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.data
    } catch (error) {
        console.log(error.message)
        return {}
    }
}