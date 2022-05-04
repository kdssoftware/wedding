import type { NextApiRequest, NextApiResponse } from 'next'
import {google, Auth} from 'googleapis'

type Data = {
  message: string|any[][]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method !== "POST"){
        res.status(403).send({message:"Use POST method instead of "+req.method})
        return;
    }
    if(!req.body.email){
        res.status(403).send({message:"Use the email body, you used: "+JSON.stringify(req.body)})
    }
    const secretKey = JSON.parse( Buffer.from(process.env.CLIENT_SECRET??"e30=","base64").toString('ascii') )
    console.log(secretKey);

    let jwtClient = new Auth.JWT( secretKey.client_email, undefined, secretKey.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
    jwtClient.authorize( (err) => {
        if (err) {
            console.log(err);
            res.status(500)
            return;
        } else {
            console.log("authorized")
            return
        }
    });
    
    let spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
    let sheetRange = 'database!A1:A1000'
    let sheets = google.sheets('v4');

    sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: sheetRange,
        requestBody:{
            majorDimension: "ROWS",
            values: [[req.body.email]]
        },
        insertDataOption:"INSERT_ROWS",
        valueInputOption: "USER_ENTERED",
        includeValuesInResponse: true,
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            res.status(500)
            return;
        } else {
            console.log(response?.data.updates)
            res.status(200).json({message:"Submitted"})
            return;
        }})

}
