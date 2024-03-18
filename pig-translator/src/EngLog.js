import React from 'react'

const EngLog = ({ engWordLog }) => {
  return (
    <>
      <div className="logs">
        <p>English log</p>
        <ul className='eng-log-cont'>
          {engWordLog.map((word, index) => {
              return <li key={index}>{word}</li>
          })}
        </ul>
      </div>
    </>
  )
}

export default EngLog