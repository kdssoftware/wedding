import type { NextApiRequest, NextApiResponse } from 'next'
import {google, Auth} from 'googleapis'
import secretKey from '../../../client_secret.json'

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
    let sheetRange = 'database!A2:A1000' //always start from 2. sheet has headers on 1
    let sheets = google.sheets('v4');

    //1. read collumn  to max 300
    //2. find email


    sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: sheetRange
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            res.status(500)
            return;
        } else {
            const emails = response?.data.values
            if(emails){
                const indexEmail = emails.findIndex((e)=>{
                    console.log(e[0]," === ", req.body.email)
                    return e[0] === req.body.email
                });
                console.log(indexEmail,emails)
                if(indexEmail===-1){
                    //3. find last index that is empty
                    const indexToWrite = emails[0].length
                    //4. write in on that index
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
                }else{
                    res.status(200).json({ message:"Already submitted" }) 
                    return;
                }
            }
            console.log(emails)
        }
    });

}
