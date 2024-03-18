import React, { useState } from "react"
import "./App.css"

const App = () => {
  const [userInput, setUserInput] = useState("")
  const [inputTranslated, setInputTranslated] = useState("")

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
        const yIndex = eachWord.indexOf('y');
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

  return (
    <div className="app-wrapper">
      <div className="l-cont w-1/2">
        <div className="left">
          <h4>Enter phrase to be translated:</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="user-input"
              onChange={handleInput}
              value={userInput}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={restartGame}>Clear</button>
          </form>
        </div>
      </div>
      <div className="r-cont w-1/2">
        <div className="right">
          <h4>Phrase translated:</h4>
          <p><span className="input-text">{inputTranslated}</span></p>
        </div>
      </div>
    </div>
  )
}

export default App
