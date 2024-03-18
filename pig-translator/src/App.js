import React, { useState } from "react"
import "./App.css"
import pigPath from "./images/pig-icon.png"
import personPath from "./images/person-icon.png"
import EngLog from "./EngLog"
import PigLog from "./PigLog"

const App = () => {
  const [userInput, setUserInput] = useState("")
  const [inputTranslated, setInputTranslated] = useState("")
  const [engWordLog, setEngWordLog] = useState([ ])
  const [pigWordLog, setPigWordLog] = useState([ ])

  const engToPig = () => {
    const punctuation = /[.,?!]/g

    const userInputArr = userInput.toLowerCase().replace(punctuation, "").split(" ")

    const translatedWordsArray = userInputArr.map(eachWord => {
      const vowelsArray = eachWord.split("").filter(vowel => {
        return ["a", "e", "i", "o", "u"].includes(vowel)
      })

      if (vowelsArray.length === 0) {
        eachWord += "ay"
      } else if (vowelsArray[0] === eachWord.charAt(0)) {
        const yIndex = eachWord.indexOf('y')
        if (yIndex !== -1) {
          eachWord = eachWord.slice(0, yIndex) + eachWord.slice(yIndex) + "ay"
        } else {
          eachWord += "way"
        }
      } else {
        const firstVowelIndex = eachWord.search(/[aeiou]/)
        eachWord = eachWord.slice(firstVowelIndex) + eachWord.slice(0, firstVowelIndex) + "ay"
      }

      return eachWord
    })

    const translatedWords = translatedWordsArray.join(" ")

    setInputTranslated(translatedWords)
    setPigWordLog([...pigWordLog, translatedWords])
    setEngWordLog([...engWordLog, userInput])
  }

  const restartGame = () => {
    setUserInput("")
    setInputTranslated("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    engToPig()
  }

  const handleInput = (e) => {
    setUserInput(e.target.value)
  }

  const handleLogClear = () => {
    setPigWordLog([ ])
    setEngWordLog([ ])
  }

  return (
    <div className="app-wrapper">
      <div className="l-cont w-1/2">
        <div className="left">
          <div className="icon-cont">
            <img className="icon" src={personPath} alt="human icon" />
          </div>
          <h4 className="mt-5">Enter words to be translated:</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="user-input focus:outline-none"
              onChange={handleInput}
              value={userInput}
              placeholder="Enter text in english..."
            />
          </form>
          <button className="clear-text-btn" type="button" onClick={restartGame}>Clear text box</button>
          <EngLog engWordLog={engWordLog} />
        </div>
      </div>
      <div className="btns">
        <button className="translate-btn" type="submit" onClick={engToPig}>Translate to Pig</button>
        <button className="clear-logs-btn" type="button" onClick={handleLogClear}>Clear logs</button>
      </div>
      <div className="r-cont w-1/2">
        <div className="right">
          <div className="icon-cont">
            <img className="icon" src={pigPath} alt="pig icon" />
          </div>
          <h4 className="mt-5">Phrase translated:</h4>
          <p><span className="input-text"><em>{inputTranslated}</em></span></p>
          <PigLog pigWordLog={pigWordLog} />
        </div>
      </div>
    </div>
  )
}

export default App
