import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FormEvent, ReactElement, useState } from 'react'
import { useMeasure } from 'react-use'
import { Inschrijving, Invite } from '../utils/sheets'
import { useTranslation } from 'next-i18next';
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('common');
  const emailSvg = ( <svg  width="40" height="31" viewBox="0 0 40 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="38" height="28.1449" rx="4" stroke="white" strokeWidth="2"/>
  <path d="M6.03653 5.76294L19.7102 18.2608" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  <path d="M33.6232 5.79709L19.7411 18.2458" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  <line x1="6.41727" y1="24.0936" x2="15.398" y2="15.6118" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  <line x1="33.3689" y1="24.9658" x2="23.8063" y2="15.9065" stroke="white" strokeWidth="2" strokeLinecap="round"/>
</svg>)

  const [page, setPage] = useState<string>("main")
  const [height, setHeight] = useState<number|string>()
  const [formStep,setFormStep] = useState<number>(0) //0: not started yet. 1: email put in, can input invitations. 2: send invitations
  const [inschrijvingen,setInschrijvingen] = useState<Inschrijving[]>([])
  const [formOneLoading,  setFormOneLoading] = useState(false);
  const [inschrijvingenCache,setInschrijvingenCache] = useState<Inschrijving[]>([])
  const [invite,setInvite] = useState<Invite|null>()
  const [emailIsFound,setEmailIsFound] = useState(false)
  const [ableToEditPersonen,setAbleToEditPersonen] = useState(false);
  const [emailText,setEmailText] = useState("")
  const [showTK, setShowTK] = useState(true)
  const [showRSVP, setShowRSVP] = useState(true)

  //form 0
  const [email,setEmail] = useState<string>("")
  const [regName,setRegName] = useState<string>("")
  const [regSurName,setRegSurName] = useState<string>("")


  const setNewPage = async (page :string) => {
    setTimeout(()=>{
      setPage("")
      setEmailText("")
      setShowRSVP(true);
      setShowTK(true)
      setInvite(null)
      setEmailIsFound(false)
      setInschrijvingen([])
      setFormOneLoading(false)
      setFormStep(0)
      setHeight(0)
    },100)
    setTimeout(()=>{
      setHeight(400)
    },400)
    setTimeout(()=>{
      setPage(page)
    },450)
  }

  //search email from user. if email found. able to edit personen. if not found. not able to edit personen
  const submitFormulier0 = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStep(0)
    setEmailIsFound(false);
    setFormOneLoading(true)
    await axios.get("/api/v0/search?email="+email+"&name="+regName+"&surName="+regSurName).then((response)=>{
      setShowTK(false);
      setShowRSVP(false);
      const invite = response.data as Invite
      console.log(invite)

      let inschrijvingenNew : Inschrijving[] = []
      for (let i = 0 ; i < invite?.personen??0 ; i++ ){
        if(i===0){
          inschrijvingenNew.push({
            avond:false,
            lactoseVrij:false,
            voornaam:regName,
            achternaam:regSurName,
            receptie:true,
            vegan:false,
            vegetarisch:false,
            geenVoorkeur:false,
          })
        }else{
          inschrijvingenNew.push({
            avond:false,
            lactoseVrij:false,
            voornaam:"",
            achternaam:"",
            receptie:true,
            vegan:false,
            vegetarisch:false,
            geenVoorkeur:false,
          })
        }
      }
      setInschrijvingen(inschrijvingenNew)
      setInschrijvingenCache(inschrijvingenNew)
      setHeight("95%");
      setInvite(invite);
      setFormStep(1)
      setEmailIsFound(true); 
      setFormOneLoading(false)
    }).catch((err : AxiosError)=>{
      const status = err.request.status;
      if(status === 404){
        setShowTK(false);
        setShowRSVP(false);
        let inschrijvingenNew : Inschrijving[] = [{
          avond:false,
          lactoseVrij:false,
          voornaam:"",
          achternaam:"",
          receptie:false,
          vegan:false,
          vegetarisch:false,
          geenVoorkeur:false,
        }]
        const newInvite : Invite = {
          emails:[email],
          isAvond:false,
          isReceptie:true,
          personen:1,
        }
        setInvite(newInvite)
        setInschrijvingen(inschrijvingenNew)
        setInschrijvingenCache(inschrijvingenNew)
        setFormStep(1)
        setHeight(400);
        setEmailIsFound(false)
        // setEmailText("We hebben het email adres niet gevonden");
        setFormOneLoading(false)
      }else{
        console.log(status)
        setShowTK(true);
        setShowRSVP(true);
        setInschrijvingen([])
        setInschrijvingenCache([])
        setEmailIsFound(false)
        setFormStep(0)
        setHeight(250);
        setEmailText(t("Er liep iets fouts, probeer het nog eens"));
        setFormOneLoading(false)
      }
    })
  } 

  const formulier0 = (
    <>
    <p>
      {t("Indien je inschrijft als familie of +1, vul één van je namen in.")}
    </p>
    <form onSubmit={(e)=>{submitFormulier0(e)}}  className='flex flex-col place-items-center mb-0 sm:mb-4 md:mb-8 lg:mb-12 justify-center content-center pt-2'>

    <div className='flex w-full md:w-2/3 lg:w-2/4  xl:w-2/5 flex-col sm:flex-row gap-2'>
        <input onChange={(e)=>{
          setRegName(e.target.value)
        }}
        value={regName}
        type='text' placeholder={t("Voornaam")} 
        className='w-full bg-olive-400 p-2 opacity-80 rounded-lg text-white placeholder-white focus:opacity-100'></input>
        <input onChange={(e)=>{
          setRegSurName(e.target.value)
        }}
        value={regSurName}
        type='text' placeholder={t("Achternaam")} 
        className='w-full bg-olive-400 p-2 opacity-80 rounded-lg text-white placeholder-white focus:opacity-100'></input>
    </div>  
    <div className='w-full md:w-2/3 lg:w-2/4 xl:w-2/5 my-2'>
      <input onChange={(e)=>{
            setEmail(e.target.value)
          }}
          value={email}
          type='email' placeholder={t("E-Mailadres")} 
          className='w-full bg-olive-400 p-2 opacity-80 rounded-lg text-white placeholder-white focus:opacity-100'></input>
    </div>
    <div className='w-full flex justify-center'>
    <input type='submit' className='hidden' id='submit' required={true}  />
      <label htmlFor="submit" className='bg-olive-500 rounded-lg py-3 px-4 hover:bg-olive-400 transition cursor-pointer w-full sm:w-20 flex justify-center' >
      <svg className={formOneLoading?"animate-bounce":""} width="40" height="31"  fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z"/></svg>
      </label>  
    </div>
  </form>
  </>
  )

const inschrijvingPersoonForm = (inschrijving:Inschrijving,inschrijvingIndex:number) => {
  return(
  <div key={inschrijvingIndex} className="flex flex-col md:flex-row my-1 lg:my-5 w-95 not-not-italic ">
    <div className='flex flex-col w-full md:w-1/3 justify-start'>
      <label htmlFor={"voornaam_"+inschrijvingIndex} className='bold text-3xl text-left underline mb-3'>{t("Naam")}</label>
      <div className='flex flex-col lg:my-4 lg:flex-col xl:flex-row w-full'>
        <input className='w-2/3 my-2 md:my-2 md:w-full text-black text-xl rounded-lg px-2 mx-1' type="text" placeholder={t("Voornaam")} id={"voornaam_"+inschrijvingIndex} value={inschrijvingen[inschrijvingIndex]?.voornaam} onChange={(e)=>{
          setInschrijvingen(
            inschrijvingen.map((val,i)=>{
              if(i===inschrijvingIndex){
                val.voornaam = e.target.value
              }
              return val
            })
          )
        }} />
        <input className='w-2/3 my-2 md:my-2 md:w-full text-black text-xl rounded-lg px-2 mx-1' type="text" placeholder={t("Achternaam")} id={"achternaam_"+inschrijvingIndex} value={inschrijvingen[inschrijvingIndex]?.achternaam} onChange={(e)=>{
          setInschrijvingen(
            inschrijvingen.map((val,i)=>{
              if(i===inschrijvingIndex){
                val.achternaam = e.target.value
              }
              return val
            })
          )
        }} />
      </div>
    </div>

    <div className='flex flex-row items-start justify-start md:justify-center my-2 md:my-0 lg:mx-4 w-1/3'>
    <fieldset className='mx-0 md:mx-4 flex-col flex w-1/6'>
      <legend className='bold text-3xl underline'>{t("Receptie")}</legend>
      <div className='ml-4'>
        <div>
          <label htmlFor={"receptie_"+inschrijvingIndex} className='flex flex-row items-center justify-start '>
            <span>{t("ja")}</span>
        <input className='ml-2' type="radio" name={"receptie_"+inschrijvingIndex} id={"receptie_ja_"+inschrijvingIndex}  value={"1"} onChange={(e)=>{
          setInschrijvingen(
            inschrijvingen.map((val,i)=>{
              if(i===inschrijvingIndex){
                val.receptie = true
              }
              return val
            })
          )
        }} /></label>
        </div>
        <div>
          <label  htmlFor={"receptie_nee_"+inschrijvingIndex} className='flex flex-row items-center justify-start '>
            <span>{t("nee")}</span>
          <input className='ml-2' type="radio" name={"receptie_"+inschrijvingIndex} id={"receptie_nee_"+inschrijvingIndex} value={"0"} onChange={(e)=>{
            setInschrijvingen(
              inschrijvingen.map((val,i)=>{
                if(i===inschrijvingIndex){
                  val.receptie = false
                }
                return val
              })
            )
          }} />
        </label>
        </div>
      </div>
    </fieldset>
    </div>
    {
      invite?.isAvond && (
        <div className='flex flex-row items-start justify-start md:justify-center my-2 md:my-0 lg:mx-4 w-1/3'>
        <fieldset className='mx-0 md:mx-4 flex-col flex w-1/6'>
              <legend className='bold text-3xl underline'>{t("Avondfeest")}</legend>
              <div className='ml-4'>
                <div>
                  <label htmlFor={"avond_ja_"+inschrijvingIndex} className='flex flex-row items-center justify-start '>
                    <span>{t("ja")}</span>
                <input className='ml-2' type="radio" name={"avond_"+inschrijvingIndex} id={"avond_ja_"+inschrijvingIndex}  value={"1"} onChange={(e)=>{
                  setInschrijvingen(
                    inschrijvingen.map((val,i)=>{
                      if(i===inschrijvingIndex){
                        val.avond = true
                      }
                      return val
                    })
                  )
                }} /></label>
                </div>
                <div>
                  <label htmlFor={"avond_nee_"+inschrijvingIndex} className='flex flex-row items-center justify-start'>
                    <span>{t("nee")}</span>
                  <input className='ml-2' type="radio" name={"avond_"+inschrijvingIndex} id={"avond_nee_"+inschrijvingIndex}  value={"0"} onChange={(e)=>{
                    setInschrijvingen(
                      inschrijvingen.map((val,i)=>{
                        if(i===inschrijvingIndex){
                          val.avond = false
                        }
                        return val
                      })
                    )
                  }} />
                </label>
                </div>
              </div>
            </fieldset>
            </div>
      )
    }
    <div className='flex w-full md:w-1/3 justify-start md:justify-center md:border-0 border-b-2 border-b-olive-400'>
      <fieldset>
        <legend className='bold text-3xl underline'>{t("Voorkeur eten")}</legend>
        <div>
        <label htmlFor={"vegetarisch_"+inschrijvingIndex} className='flex flex-row items-center justify-between '>
          <span>{t("vegetarisch")}</span>
        <input type="checkbox" id={"vegetarisch_"+inschrijvingIndex} checked={inschrijvingen[inschrijvingIndex]?.vegetarisch} onChange={(e)=>{
              setInschrijvingen(
                inschrijvingen.map((val,i)=>{
                  if(i===inschrijvingIndex){
                    val.vegetarisch = e.target.checked
                  }
                  return val
                })
              )
            }} />
            </label>
        </div>
              
        <div>
        <label htmlFor={"vegan_"+inschrijvingIndex} className='flex flex-row items-center justify-between '>
          <span>{t("vegan")}</span>
          <input type="checkbox" id={"vegan_"+inschrijvingIndex} checked={inschrijvingen[inschrijvingIndex]?.vegan} onChange={(e)=>{
                setInschrijvingen(
                  inschrijvingen.map((val,i)=>{
                    if(i===inschrijvingIndex){
                      val.vegan = e.target.checked
                    }
                    return val
                  })
                )
              }} />
          </label>
        </div>
        <div>
        <label htmlFor={"lactoseVrij_"+inschrijvingIndex} className='flex flex-row items-center justify-between '>
          <span>{t("lactosevrij")}</span>
      <input type="checkbox" id={"lactoseVrij_"+inschrijvingIndex} checked={inschrijvingen[inschrijvingIndex]?.lactoseVrij} onChange={(e)=>{
            setInschrijvingen(
              inschrijvingen.map((val,i)=>{
                if(i===inschrijvingIndex){
                  val.lactoseVrij = e.target.checked
                }
                return val
              })
            )
          }} />
          </label>
        </div>
        <div>
        <label htmlFor={"geenvookeur_"+inschrijvingIndex} className='flex flex-row items-center justify-between '>
          <span>{t("geen voorkeur")}</span>
      <input type="checkbox" id={"geenvookeur_"+inschrijvingIndex} checked={inschrijvingen[inschrijvingIndex]?.geenVoorkeur} onChange={(e)=>{
            setInschrijvingen(
              inschrijvingen.map((val,i)=>{
                if(i===inschrijvingIndex){
                  val.geenVoorkeur = e.target.checked
                }
                return val
              })
            )
          }} />
          </label>
        </div>
      </fieldset>
    </div>
  </div>
  )
}

 const formulier1 = (
  <form onSubmit={(e)=>{submitFormulier1()}}  className='flex flex-col w-full mx-0 sm:mx-4 md:mx-8 lg:mx-12 justify-center content-center pt-5'>
    {
      emailIsFound && false && 
      <div className='flex flex-col items-center'>
        <label htmlFor="aantal">{t("Aantal personen")}</label>
        <input className='text-black rounded-lg text-3xl my-1 w-12 text-center' type="number" min="1" step="1" max="6" value={invite?.personen} onChange={(e)=>{
          const newPersonen = Number(e.target.value)
          if(invite==null){
            setFormStep(0);
            setInschrijvingen([])
            setEmailIsFound(false)
            setEmail("")
            return;
          }
        if(newPersonen < invite.personen){ //setting personen lower. put in cache
          
        }else if (newPersonen > invite.personen){ //setting personen higher. put in cache

        }
      }} />
      </div>
    }
    {
      inschrijvingen.map((insc, i )=> (
        inschrijvingPersoonForm(insc,i)
      ))
    }
    <div className='flex w-full justify-center'>
      <button onClick={(e)=>{
        e.preventDefault()
        submitFormulier1()

      }} className='bg-olive-400 p-2 hover:opacity-100 transition opacity-90 rounded-lg w-9/10 md:w-1/2 xl:w-2/5  text-white placeholder-white col-span-5 focus:opacity-100 flex flex-row justify-center'>
        <span className='mr-3'>{t("Inschrijven")}</span>
        {emailSvg}
      </button>
    </div>
  </form>
 )

 const submitFormulier1 = async () => {
   //submit and send e-mail
   await axios.post("/api/v0/send",{
    data:inschrijvingen,
    email:email,
   }).then((response)=>{
     setEmailText(t("Inschrijving gelukt! Tot dan!"))
     setFormStep(2)
     setHeight(250)
     setShowTK(true)
     setShowRSVP(true);
   }).catch((error)=>{
    console.log(error)
    setEmailText(t("Er was iets misgelopen. stuur een mail naar karel@karel.be"))
    setFormStep(2)
    setHeight(250)
   })
   
 }


  const showFormulier = () => {
    switch(formStep){
      case 0:
        return formulier0;
      case 1:
        return formulier1;
      default:
        return formulier0;
    }
  }

  const viewPage = (page : string) : ReactElement => {
    switch (page) {
      case t("RSVP"):
        return (
          <div className="text-center text-2xl " >
            <h2 className="text-5xl underline pb-3">
              {showRSVP && t("RSVP")}
            </h2>
              {!showRSVP && 
                <div className='text-2xl not-italic '>
                  {t("Klopt het aantal personen niet? Stuur gerust een berichtje naar")} <a className='text-olive-200 underline not-not-italic' href="mailto:karel@karel.be?subject=Inschrijven trouw">karel@karel.be</a>
                </div>
              }
              {
                showFormulier()
              }
              <div className='text-center'>{emailText}</div>
          </div>
          )
      case t("Tips"):
        return (
          <div className="text-center text-2xl" >
              <p className="text-4xl underline pb-3">{t("Handige tips voor in Leuven")}</p>
              <ul className="text-left md:text-center list-inside">
                  <li className="list-item list-disc">{t("Bij de receptie heb je toegang tot het hele museum! Geniet ervan!")}</li>
                  <li className="list-item list-disc">{t("Een hoed of zonnebril is aangeraden op het dakterras van Museum M")}</li>
                  <li className="list-item list-disc">{t("In plaats van bloemetjes ontvangen we graag een centje. Dat kan op")}{" "}<span className='text-olive-100'>BE25 7460 3403 1082</span> </li>
                  <li className='list-item list-disc'>{t("Bekijk de tips hier regelmatig voor updates")}</li>
              </ul>
          </div>
        )
      case t("Planning"):
        return (
          <div className="text-center text-2xl" >
              <h2 className="text-5xl underline pb-3">{t("Planning")}</h2>
              <ul className='flex flex-col text-left items-start md:items-center list-outside justify-start md:justify-center pl-6'>  
              <li className='list-disc md:list-none  list-item'>
                    <span className='bold not-not-italic text-2xl text-olive-200'>12h15 :</span> {t("Trouwceremonie voor dichtste familie")}
                    </li>
                    <li className='list-disc md:list-none list-item'>
                    <span className='bold not-not-italic text-2xl text-olive-200'>12h30 :</span> {t("Verwelkoming aan het")}{" "}
                    <a className='bold text-olive-200 underline' href="https://maps.app.goo.gl/JC64MjwhFmpkDA4a9">{t("Stadhuis")}</a>
                    </li>
                    <li className='list-disc md:list-none list-item'>
                    <span className='bold not-not-italic text-2xl text-olive-200'>{t("Nadien")} :</span> {t("Wandeling naar")}{" "}
                    <a className='bold text-olive-200 underline' href="https://goo.gl/maps/uGpFJjHqcsgtHUKG8">{t("Museum M")}</a>
                    </li>
                    <li className='list-disc md:list-none  list-item'>
                    <span className='bold not-not-italic text-2xl text-olive-200'>13h15 - 15h15 :</span> {t("Receptie")}{" "}
                    <a className='bold text-olive-200 underline' href="https://goo.gl/maps/uGpFJjHqcsgtHUKG8">{t("Museum M")}</a>
                    </li>
                    <li className='list-disc md:list-none list-item'>
                    <span className='bold not-not-italic text-2xl text-olive-200'>18h00 : </span>{t("Avondfeest in")}{" "}
                    <a className='bold text-olive-200 underline' href="https://goo.gl/maps/aqc6oGPdmJRw4mvSA">{t("het Huis van Mihr")}</a>
                    </li>
              </ul>
          </div>
          )
      case "main":
        return (
          <div>
            <h2 className='text-6xl text-center'>{t("Welkom!")}</h2>
              <hr />
              <p className='text-4xl text-center'>
                {t("Wij gaan trouwen op")} <span className={'font-font9 not-not-italic text-5xl font-bold'}>{t("13 augustus")}</span>
              </p>    
        </div>  
          )
      case "":
      default :
        return <></>
    }
  }

  const classes = "fixed bottom-14 w-full text-white bg-olive-700 bg-opacity-60 rounded-lg p-6 transition-all overflow-y-scroll overflow-x-hidden"

  return (
    <>
      <div className='font-font9 not-italic [text-shadow:0_4px_8px_rgba(0,0,0,0.65)]'>
        <button onClick={()=>{
          setNewPage("main")
        }}>
          <h1 className='text-white font-font9 text-maxxl not-not-italic text-center w-screen shadow-black py-5' >
            {showTK && <span>
              T<span className='font-symbol'>&</span>K
              </span>}
          </h1>
        </button>
          {
            showTK && (
            <Link
            href='/'
            locale={router.locale === 'nl' ? 'en' : 'nl'}
          >
            <button className='bg-olive-800 opacity-90 px-4 py-2 rounded-lg bold text-2xl fixed top-1 right-1'>
              {(router.locale === 'nl' ? 'en' : 'nl').toUpperCase()}
            </button>
          </Link>
          )
          }
        <div className='fixed w-screen bottom-0'>
        <div className='grid place-items-center pb-4'>
          <div className={classes} style={{height:height}} >
            {viewPage(page) }
          </div>
        </div>
        <nav className="h-12 bottom-0 bg-olive-300 bg-opacity-40 grid grid-cols-3 gap-2 justify-center text-center ">
          {
              [
                  t("Planning"),
                  t("RSVP"),
                  t("Tips")
              ].map( (title, key) => (
                  <div className="text-4xl text-white cursor-pointer hover:scale-125 transition-all" onClick={()=>{
                    console.log(title);
                    setNewPage(title)
                  }} key={key}>
                      {title}
                  </div>
              ) )
          }
      </nav>
      </div>
      </div>

    </>
  )
}

export const getStaticProps = async ({ locale }:{locale:any}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})


export default Home
