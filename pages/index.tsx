import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <>
      <div className='grid col-span-3'>
        <h1 className='text-white font-head text-maxxl text-center w-screen shadow-black py-5 [text-shadow:0_4px_8px_rgba(0,0,0,0.85)]' >
          T&K
        </h1>
        <div className='grid place-items-center h-screen pb-72'>
          <div className="  text-white bg-amber-500 bg-opacity-60 rounded-lg p-6 ">
              <h2 className='text-6xl text-center'>Currently developing this website.</h2>
              <hr />
              <p className='text-3xl'>
                Wij gaan trouwen op 13 augustus
              </p>
          </div>
        </div>
        <div></div>
      </div>

    </>
  )
}

export default Home
