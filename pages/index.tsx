import type { NextPage } from 'next'

const Home: NextPage = () => {
  
  const time = (value:string,fontSize:number=4) => (<span className={'font-font3 not-italic text-'+fontSize+'xl font-bold'}>{value}</span>)
  
  return (
    <>
      <div className='font-font2 [text-shadow:0_4px_8px_rgba(0,0,0,0.65)] italic'>

        <span className='hidden w-0 h-0 text-1xl text-2xl text-3xl text-4xl text-5xl text-6xl text-7xl text-8xl text-9xl [text-shadow:0_4px_8px_rgba(0,0,0,0.85)]'></span>

        <h1 className='text-white text-maxxl text-center w-screen shadow-black py-5 ' >
          T&K
        </h1>

        <div className='grid place-items-center h-screen pb-4'>
          <div className="w-full text-white bg-[#c19440] bg-opacity-60 rounded-lg p-6 ">
              <h2 className='text-6xl text-center'>Welkom!</h2>
              <hr />
              <p className='text-4xl text-center'>
                Wij gaan trouwen op {time("13 augustus",5)}
              </p>
          </div>
        </div>
        
        <nav className="fixed w-screen h-12 bottom-0 bg-orange-300 bg-opacity-40 grid grid-cols-3 gap-2 justify-center text-center ">
          {
              [
                  "info",
                  "RSVP",
                  "Tips"
              ].map( (title, key) => (
                  <div className="text-4xl text-white cursor-pointer hover:scale-125 transition-all duration-200 ease-in-out " key={key}>
                      {title}
                  </div>
              ) )
          }
      </nav>
      </div>

    </>
  )
}

export default Home
