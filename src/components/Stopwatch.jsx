import React, {useRef, useState} from 'react';

const Stopwatch = () => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isWait, setIsWait] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const increment = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsWait(true)
    setIsReset(true)
    setTimer(0)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleWait = () => {
    clearInterval(increment.current)
    setIsWait(false)
    setIsReset(false)
  }

  const handleStop = () => {
    clearInterval(increment.current)
    setIsWait(false)
    setTimer(0)
  }

  const handleResume = () => {
    setIsWait(true)
    setIsReset(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setIsReset(false)
    setIsWait(true)
    setTimer(0)
    clearInterval(increment.current)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className='stopwatch container text-center mt-4'>
      <h3>Stopwatch</h3>
      <div className='stopwatch-card'>
        <p>{formatTime()}</p>
        <div className='buttons'>
          {
            !isActive && !isWait ?
              <button className='btn btn-success'
                      onClick={handleStart}>Start</button>
              : ((isWait ? <button className="btn btn-danger"
                                   onClick={handleStop}>Stop</button>
                : <button className='btn btn-success'
                          onClick={handleResume}>Start</button>)
                  || (isReset && !isWait ? <button className='btn btn-success'
                                                   onClick={handleResume}>Start</button>
                    : <button className="btn btn-danger"
                              onClick={handleStop}>Stop</button>))
          }
          <button className="btn btn-warning ml-2"
                  onDoubleClick={handleWait}>Wait</button>
          <button className="btn btn-primary ml-2"
                  onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;