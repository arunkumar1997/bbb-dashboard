const rooms = [{
        id: 1,
        title: "Room1",
        description: "A small description",
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: "room_1",
        roomSettings: {
            muteOnStart: true,
            record: true
        }
    }, {
        id: 2,
        title: "Room2",
        description: "A small description",
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: "room_2",
        roomSettings: {
            muteOnStart: true,
            record: true
        }
    },
    {
        id: 3,
        title: "Room3",
        description: "A small description",
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: "room_3",
        roomSettings: {
            muteOnStart: true,
            record: true
        }
    }, {
        id: 4,
        title: "Room4",
        description: "A small description",
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: "room_4",
        roomSettings: {
            muteOnStart: true,
            record: true
        }
    },
    {
        id: 5,
        title: "Room5",
        description: "A small description",
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: "room_5",
        roomSettings: {
            muteOnStart: true,
            record: true
        }
    }, {
        id: 6,
        title: "Room6",
        description: "A small description",
        lastSession: new Date().toDateString(),
        moderatorPassword: 1234,
        attendieePassword: 5678,
        bbb_id: "room_6",
        roomSettings: {
            muteOnStart: true,
            record: true
        }
    },
]

export async function getRooms() {
    return rooms
}

export async function getRoomById(roomId) {
    const res = rooms.find(room => room.id === roomId)
    if (!res) {
        return false
    }
    return res
}