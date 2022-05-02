import time from "../utils/time"

const Main = () => {

    return <div>
            <h2 className='text-6xl text-center'>Welkom!</h2>
              <hr />
              <p className='text-4xl text-center'>
                Wij gaan trouwen op {time("13 augustus",5)}
              </p>    
        </div>
}

export default Main