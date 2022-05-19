import {google, Auth} from 'googleapis'
let sheets = google.sheets('v4');
let JWTClient : Auth.JWT | null = null

const getJWTClient = async ()  => {
    if(JWTClient === null){
        //e30 in base64 = {}
        const secretKey = JSON.parse( Buffer.from(process.env.CLIENT_SECRET??"e30=","base64").toString('ascii') )
        JWTClient = new Auth.JWT( secretKey.client_email, undefined, secretKey.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
        try{
            await JWTClient.authorize( (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            });
        }catch(e){
            console.trace(e);
        }
    }
    return JWTClient;
}

type Invite = {
    emails:string[],
    personen:number,
    isReceptie:boolean,
    isAvond:boolean,
}

const searchByName = async (name:string, surName:string) : Promise<Invite|null>=> {
    name = name.trim().toLowerCase()
    surName = surName.trim().toLowerCase()
    let found = false;
    const collumn = await sheets.spreadsheets.values.get({
        auth: await getJWTClient(),
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'database!A2:A300',
        majorDimension:"ROWS",
    });
    const Index = collumn.data.values?.findIndex((pr) => {        
        for( const nameDB of String(pr[0]).split(";")){
            
            if((nameDB.trim().toLowerCase() === name+" "+surName) || (nameDB.trim().toLowerCase() === surName+" "+name)){
                return true;
            }
        }
        return false
    });
    if(typeof Index === "number" && Index!==-1){
        found = true
        const IndexCorrect = Index+2;
        let dataRaw = (await sheets.spreadsheets.values.get({
            auth: await getJWTClient(),
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range:'database!B'+IndexCorrect+":E"+IndexCorrect+"",
            majorDimension:"ROWS",
        })).data.values
        if(dataRaw && dataRaw.length === 1 && dataRaw[0].length > 2){
            return {
                emails:String(dataRaw[0][0]).split(";"),
                personen:Number(dataRaw[0][1]),
                isReceptie:dataRaw[0][2] && String(dataRaw[0][2]||"")==="x",
                isAvond:dataRaw[0][3] && String(dataRaw[0][3]||"")==="x",
            }
        }
    }
    return null;
}

const searchByEmail = async (email:string) : Promise<Invite|null>=> {
    email = email.trim().toLowerCase()
    let found = false;
    const collumn = await sheets.spreadsheets.values.get({
        auth: await getJWTClient(),
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'database!B2:B300',
        majorDimension:"ROWS",
    });
    const emailIndex = collumn.data.values?.findIndex((pr) => {        
        for( const emailData of String(pr[0]).split(";")){
            if(emailData.toLowerCase() === email){
                return true;
            }
        }
        return false
    });
    if(typeof emailIndex === "number" && emailIndex!==-1){
        found = true
        const emailIndexCorrect = emailIndex+2;
        let dataRaw = (await sheets.spreadsheets.values.get({
            auth: await getJWTClient(),
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range:'database!B'+emailIndexCorrect+":E"+emailIndexCorrect+"",
            majorDimension:"ROWS",
        })).data.values
        if(dataRaw && dataRaw.length === 1 && dataRaw[0].length > 2){
            return {
                emails:String(dataRaw[0][0]).split(";"),
                personen:Number(dataRaw[0][1]),
                isReceptie:dataRaw[0][2] && String(dataRaw[0][2]||"")==="x",
                isAvond:dataRaw[0][3] && String(dataRaw[0][3]||"")==="x",
            }
        }
    }
    return null;
}

type Inschrijving = {
    voornaam:string,
    achternaam:string,
    receptie:boolean,
    avond:boolean,
    vegan:boolean,
    vegetarisch:boolean,
    lactoseVrij:boolean,
    geenVoorkeur:boolean,
}

const register = async (email:string, inschrijvingen : Inschrijving[], ) => {
    
    
    const now = new Date().toLocaleString("nl-BE")
    const sendData = inschrijvingen.map((i:Inschrijving)=> Object.values({
        email,
        naam:i.voornaam+" "+i.achternaam,
        receptie:i.receptie?"✅":"❌",
        avond:i.avond?"✅":"❌",
        vegan:i.vegan?"✅":"❌",
        vegetarisch:i.vegetarisch?"✅":"❌",
        lactoseVrij:i.lactoseVrij?"✅":"❌",
        geenVoorkeur:i.geenVoorkeur?"✅":"❌",
        now : now.toString()
    }))
    
    await sheets.spreadsheets.values.append({
        auth: await getJWTClient(),
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range:'inschrijvingen!A1:H500',
        valueInputOption:"RAW",
        requestBody:{
            values:
                sendData
        }
    }).catch(e=>{
        console.trace(e);
        throw Error(e.message);
    })
    return;
}

export {
    getJWTClient,
    searchByEmail,
    register,
    searchByName
};
export type {
    Inschrijving,
    Invite
};
