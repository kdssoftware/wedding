import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <>
      <div className='text-white text-8xl text-center w-screen mt-10 absolute shadow-black [text-shadow:0_4px_8px_rgba(0,0,0,0.85)]' >
        Tosia & Karel
      </div>
      <div className='grid place-items-center h-screen pb-72'>
        <div className="text-6xl text-center text-white bg-amber-500 bg-opacity-60 rounded-lg p-6 ">
            Currently developing this website.
        </div>
      </div>
    </>
  )
}

export default Home
