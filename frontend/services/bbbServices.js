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

export async function getRecording(meetingId) {
  try {
    const urlString =
      'getRecordings' + `meetingID=${meetingId}` + bbbServer.secret
    const checksum = generateChecksum(urlString)
    const url = `getRecordings?meetingID=${meetingId}&checksum=${checksum}`
    const res = await axios.get(`${bbbServer.url}/${url}`)
    const rec = await parser.parse(res.data).response
    if (rec.messageKey == 'noRecordings') {
      return { status: 200, data: [] }
    }
    const recordings = []
    if (typeof rec.recordings.recording[0] == 'undefined') {
      recordings.push({
        name: rec.recordings.recording.name,
        length: rec.recordings.recording.playback.format.length,
        peoples: rec.recordings.recording.participants,
        action: rec.recordings.recording.playback.format.url,
      })
      return { status: 200, data: recordings }
    }

    rec.recordings.recording.forEach((r) => {
      recordings.push({
        name: r.name,
        length: r.playback.format.length,
        peoples: r.participants,
        action: r.playback.format.url,
      })
    })
    return { status: 200, data: recordings }
  } catch (error) {
    console.log(error.message)
    return false
  }
}

function generateChecksum(params) {
  const checksum = createHash('sha1').update(params).digest('hex')
  return checksum
}
