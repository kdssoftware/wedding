import type { NextApiRequest, NextApiResponse } from 'next'
import { register } from '../../../utils/sheets'
import type {Inschrijving} from '../../../utils/sheets'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Boolean>
) {
  const email = req.body.email;
  console.log(req.body);
  const data = req.body.data as Inschrijving[];  
  console.log("type ",typeof data)
  await register(email,data).catch(e=>{
    console.log(e)
    res.status(500).send(false);
    return;
  })
  res.status(200).send(true)
}