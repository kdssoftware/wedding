import type { NextApiRequest, NextApiResponse } from 'next'
import { Invite, searchByEmail, searchByName } from '../../../utils/sheets'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Invite|null|string>
) {
  if(req.method!=="GET"){
    res.status(401).send("should be get method");
  }
  if(!req.query.email || !req.query.name || !req.query.surName){
    res.status(500).send("requested email, name and surName in query string")
    return;
  }
  let data = await searchByName(req.query.name as string, req.query.surName as string);
  if(!data){
    data = await searchByEmail(req.query.email as string);
  }
  if(!data){
    res.status(404).send("not found")
  }else{
    res.status(200).json(data)
  }
}