import type { NextPage } from 'next'
import { ReactElement, useState } from 'react'
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

  const setNewPage = async (page :string) => {
    await setMeasureDiv(viewPage(page))
    console.log("measured height", heightDiv)
    setTimeout(()=>{
      console.log("setHeight as 0 and empty")
      setPage("")
      setHeight(0)
    },100)
    setTimeout(()=>{
      console.log("set height as",heightDiv);
      setHeight(heightDiv)
    },400)
    setTimeout(()=>{
      console.log("set page to correct view")
      setPage(page)
    },450)
  }

  const viewPage = (page : string) : ReactElement => {
    switch (page.toLocaleLowerCase()) {
      case "rsvp":
        return (
          <div className="text-center text-2xl " >
            <h2 className="text-5xl underline pb-3">RSVP</h2>
            <p>Meer info komt nog...</p>
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
                Wij gaan trouwen op {time("13 augustus",5)}
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
      <div className='font-font2 [text-shadow:0_4px_8px_rgba(0,0,0,0.65)] italic'>
        <div className='w-full -z-50 absolute' ref={ref}>
          <div className={classes} >
            {
              measureDiv
            }
          </div>
        </div>
        <span className='hidden w-0 h-0 text-1xl text-2xl text-3xl text-4xl text-5xl text-6xl text-7xl text-8xl text-9xl [text-shadow:0_4px_8px_rgba(0,0,0,0.85)]'></span>
        <button onClick={()=>{
          setNewPage("main")
        }}>
          <h1 className='text-white text-maxxl text-center w-screen shadow-black py-5' >
            T&K
          </h1>
        </button>
        <div className='fixed w-screen bottom-0'>
        <div className='grid place-items-center pb-4'>
          <div className={classes} style={{height:height}} >
            {viewPage(page) }
          </div>
        </div>
        <nav className=" h-12 bottom-0 bg-orange-300 bg-opacity-40 grid grid-cols-3 gap-2 justify-center text-center ">
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
