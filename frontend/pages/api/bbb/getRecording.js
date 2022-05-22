import { getRecording } from '../../../services/bbbServices'

export default async function handler(req, res) {
  const { meetingId } = req.body
  const response = await getRecording(meetingId)
  if (response.status != 200) {
    res.status(500).send(response.data)
  }
  res.status(200).send(response.data)
}
