import axios from 'axios'
import * as qs from 'qs'
import { createHash } from 'crypto'
import { XMLParser } from 'fast-xml-parser'

const options = {
    ignoreAttributes: false,
}

const parser = new XMLParser(options)

const bbbServer = {
    url: process.env.NEXT_PUBLIC_BBB_URL,
    secret: process.env.NEXT_PUBLIC_BBB_SECRET,
}

export async function createMeeting(params) {
    try {
        const ulParams = qs.stringify(params)
        const urlString = 'create' + ulParams + bbbServer.secret
        const checksum = generateChecksum(urlString)
        const url = `create?${ulParams}&checksum=${checksum}`
        console.log('url:', `${bbbServer.url}/${url}`)
        const res = await axios.get(`${bbbServer.url}/${url}`)
        return parser.parse(res.data).response
    } catch (error) {}
}
export function joinMeeting(params) {
    const ulParams = qs.stringify(params)
    const urlString = 'join' + ulParams + bbbServer.secret
    const checksum = generateChecksum(urlString)
    return `${bbbServer.url}/join?${ulParams}&checksum=${checksum}`
}

function generateChecksum(params) {
    const checksum = createHash('sha1').update(params).digest('hex')
    return checksum
}