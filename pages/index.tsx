import axios from 'axios'
import type { NextPage } from 'next'
import { FormEvent, ReactElement, useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import { UseMeasureRef } from 'react-use/lib/useMeasure'
import Info from '../components/Info'
import Main from '../components/Main'
import RSVP from '../components/RSVP'
import Tips from '../components/Tips'
import time from '../utils/time'

const Home: NextPage = () => {
  const [measureDiv,setMeasureDiv] = useState<ReactElement>();
  const [page, setPage] = useState<string>("main")
  const [height, setHeight] = useState<number>()
  const [ref, { x, y, width, height:heightDiv, top, right, bottom, left }] = useMeasure<HTMLDivElement>();
  const [email,setEmail] = useState<string>("")


  const setNewPage = async (page :string) => {
    await setMeasureDiv(viewPage(page))
    setTimeout(()=>{
      setPage("")
      setHeight(0)
    },100)
    setTimeout(()=>{
      setHeight(250)
    },400)
    setTimeout(()=>{
      setPage(page)
    },450)
  }

  const submitForm = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("/api/db/email",{email}).then(e=>{
      console.log(e)
      setEmail("")
    })
  } 

  const viewPage = (page : string) : ReactElement => {
    switch (page.toLocaleLowerCase()) {
      case "rsvp":
        return (
          <div className="text-center text-2xl " >
            <h2 className="text-5xl underline pb-3">RSVP</h2>
              <form onSubmit={(e)=>{submitForm(e)}}  className='grid grid-cols-6 '>
                <input onChange={(e)=>{
                  setEmail(e.target.value)
                }} 
                value={email}
                type='email'   placeholder="Uw E-mail" className='bg-amber-400 p-2 opacity-80 rounded-l-lg w-full text-white placeholder-white col-span-5 focus:opacity-100'></input>
                <div className='col-span-1 rounded-r-lg bg-amber-500 py-2 px-4 hover:bg-amber-400 transition cursor-pointer'>
                  <input type='submit' className='hidden' id='submit' required={true} />
                  <label htmlFor="submit" className='cursor-pointer' >
                    <svg width="40" height="31" viewBox="0 0 40 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="38" height="28.1449" rx="4" stroke="white" strokeWidth="2"/>
                        <path d="M6.03653 5.76294L19.7102 18.2608" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M33.6232 5.79709L19.7411 18.2458" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="6.41727" y1="24.0936" x2="15.398" y2="15.6118" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="33.3689" y1="24.9658" x2="23.8063" y2="15.9065" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                  </label>
                </div>
              </form>
          </div>
          )
      case "tips":
        return (
          <div className="text-center text-2xl" >
              <p className="text-4xl underline pb-3">Handige tips voor in Leuven:</p>
              <ul className="list-inside">
                  <li className="list-item list-disc">Bij de receptie heb je toegang tot het hele museum! geniet ervan</li>
                  <li className="list-item list-disc">Een hoed of zonnebril aan te raden op het dakterras van Museum M</li>
              </ul>
          </div>
        )
      case "info":
        return (
          <div className="text-center text-2xl " >
              <h2 className="text-5xl underline pb-3">Meer info komt nog...</h2>
          </div>
          )
      case "main":
        return (
          <div>
            <h2 className='text-6xl text-center'>Welkom!</h2>
              <hr />
              <p className='text-4xl text-center'>
                Wij gaan trouwen op <span className={'font-font3 not-italic text-5xl font-bold'}>13 augustus</span>
              </p>    
        </div>  
          )
      case "":
      default :
        return <></>
    }
  }

  const classes = "w-full text-white bg-[#c19440] bg-opacity-60 rounded-lg p-6 transition-all"

  return (
    <>
      <div className='font-font2 italic [text-shadow:0_4px_8px_rgba(0,0,0,0.65)]'>
        <button onClick={()=>{
          setNewPage("main")
        }}>
          <h1 className='text-white font-font2 text-maxxl italic text-center w-screen shadow-black py-5' >
            T&K
          </h1>
        </button>
        <div className='fixed w-screen bottom-0'>
        <div className='grid place-items-center pb-4'>
          <div className={classes} style={{height:height}} >
            {viewPage(page) }
          </div>
        </div>
        <nav className="h-12 bottom-0 bg-orange-300 bg-opacity-40 grid grid-cols-3 gap-2 justify-center text-center ">
          {
              [
                  "info",
                  "RSVP",
                  "Tips"
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

export default Home
