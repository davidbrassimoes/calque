import React, { useState, useEffect } from "react"
import ReactDom from "react-dom/client"
import "./index.css"

const Main = () => {
  const [leftOp, setLeftOp] = useState()
  const [rightOp, setRightOp] = useState()
  const [operator, setOperator] = useState()
  const [displayed, setDisplayed] = useState(0)
  const [isSet, setIsSet] = useState(false)
  const [result, setResult] = useState()

  const handleClick = (x) => {
    if (
      displayed == 0 &&
      x != "C" &&
      x != "=" &&
      x != "/" &&
      x != "*" &&
      x != "-" &&
      x != "+"
    ) {
      setDisplayed(x)
    } else if (x == "C") {
      setDisplayed(0)
      setLeftOp()
      setRightOp()
      setResult()
      setOperator()
      setIsSet(false)
    } else if (x == "/" || x == "*" || x == "-" || x == "+") {
      if (isSet) {
        setResult(calculate(leftOp, displayed, operator))
        setLeftOp(calculate(leftOp, displayed, operator))
        setOperator(x)
        setRightOp()
        setIsSet(false)
        setDisplayed(0)
      } else {
        setLeftOp(displayed)
        setOperator(x)
        setIsSet(true)
        setDisplayed(0)
      }
    } else if (x == "=") {
      setRightOp(displayed)
      setResult(calculate(leftOp, displayed, operator))
      setDisplayed(calculate(leftOp, displayed, operator))
    } else {
      setDisplayed("" + displayed + x)
    }
  }

  const calculate = (leftOp, rightOp, operator) => {
    leftOp = parseInt(leftOp)
    rightOp = parseInt(rightOp)
    if (operator == "/") {
      return leftOp / rightOp
    } else if (operator == "*") {
      return leftOp * rightOp
    } else if (operator == "-") {
      return leftOp - rightOp
    } else if (operator == "+") {
      return leftOp + rightOp
    }
  }

  const handleKeyPress = (event) => {
    event.preventDefault()
    const { key } = event
    // Check if the pressed key is a number or an operator
    if (/[+\-*/]/.test(key)) {
      handleClick(key)
    } else if (/[0-9]/.test(key)) {
      handleClick(key)
    } else if (key == "Enter") {
      handleClick("=")
    } else if (key == "Backspace") {
      handleClick("C")
    }
  }

  // Add event listener to handle key press
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <>
      <h1 className='title'>calque</h1>
      <Display x={displayed} />
      <section className='calc'>
        {input.map((x) => (
          <button
            type='button'
            className='calculatorButton'
            onClick={() => handleClick(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </section>
      <Output
        leftOp={leftOp}
        operator={operator}
        rightOp={rightOp}
        result={result}
      />
    </>
  )
}

const Output = ({ leftOp, operator, rightOp, result }) => {
  return (
    <div className='output'>
      <div className='calculating'>
        {leftOp} {operator} {rightOp}
      </div>{" "}
      <div className='result'>{result}</div>
    </div>
  )
}

const Display = ({ x, leftOp, operator, rightOp, result }) => {
  return <div className='display'>{x} </div>
}

const input = [7, 8, 9, "*", 4, 5, 6, "/", 1, 2, 3, "-", "C", 0, "=", "+"]

const root = ReactDom.createRoot(document.getElementById("root"))
root.render(<Main />)
