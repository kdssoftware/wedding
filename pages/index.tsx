import type { NextPage } from 'next'


const Home: NextPage = () => {
 
  const time = (value:string) => (<span className='font-font3 text-3xl font-bold'>{value}</span>)
  
  return (
    <>
      <div className='grid col-span-3 font-font2'>
        <h1 className='text-white text-maxxl text-center w-screen shadow-black py-5 [text-shadow:0_4px_8px_rgba(0,0,0,0.85)]' >
          T&K
        </h1>
        <div className='grid place-items-center h-screen pb-72'>
          <div className="  w-4/5 h-4/5 text-white bg-[#ffd27f] bg-opacity-40 rounded-lg p-6 ">
              <h2 className='text-6xl text-center'>Welkom!</h2>
              <hr />
              <p className='text-3xl text-center'>
                Wij gaan trouwen op 13 augustus
              </p>
              <br />
              <div className='text-2xl'>
                <p >
                  We verwelkomen je graag om {time("12u30")} op de Oude Markt in Leuven.
                </p>
                <p>
                  De receptie start om {time("13u00")} aan Museum M.
                </p>
              </div>
          </div>
        </div>
        <div></div>
      </div>

    </>
  )
}

export default Home
