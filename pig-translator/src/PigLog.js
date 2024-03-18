const PigLog = ({ pigWordLog }) => {

  return (
    <>
    <div className="logs">
      <p>Pig Log</p>
      <ul className='pig-log-cont'>
        {pigWordLog.map((word, index) => {
            return <li key={index}>{word}</li>
        })}
      </ul>
    </div>
    </>
  )
}

export default PigLog