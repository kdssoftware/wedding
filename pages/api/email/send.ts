import type { NextApiRequest, NextApiResponse } from 'next'
import { json, text } from 'stream/consumers'
import { sendMail } from '../../../utils/nodemailer'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    res.status(200).json({ message:"test mail send" })
}
