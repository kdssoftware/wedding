import type { NextPage } from 'next'
import { useState } from 'react'
import Info from '../components/Info'
import Main from '../components/Main'
import RSVP from '../components/RSVP'
import Tips from '../components/Tips'

const Home: NextPage = () => {
   
  const [page, setPage] = useState<string>("main")
  const [height, setHeight] = useState<number>()

  const setNewPage = (page :string) => {
    setTimeout(()=>{
      setPage("")
      setHeight(0)
    },200)
    setTimeout(()=>{
      setHeight(250)
    },400)
    setTimeout(()=>{
      setPage(page)
    },450)
  }

  const viewPage = (page : string, ...properties : any[]) => {
    switch (page.toLocaleLowerCase()) {
      case "rsvp":
        return <RSVP />
      case "tips":
        return <Tips/>
      case "info":
        return <Info />
      case "main":
        return <Main />
      case "":
      default :
        return <></>
    }
  }

  return (
    <>
      <div className='font-font2 [text-shadow:0_4px_8px_rgba(0,0,0,0.65)] italic'>

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
          <div className={"w-full text-white bg-[#c19440] bg-opacity-60 rounded-lg p-6 transition-all"} style={{height:height}} >
            {viewPage(page)}
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
