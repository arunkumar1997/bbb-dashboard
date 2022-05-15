import { createMeeting } from '../../../services/bbbServices'

export default async function handler(req, res) {
    const params = req.body
    const response = await createMeeting(params)
    console.log(response)
    if (response.returncode != 'SUCCESS') {
        res.status(500).send(response)
    }
    res.status(200).send(response)
}