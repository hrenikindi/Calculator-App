import Keypad from "./keypad";
import "./styles.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  function handleClick(value) {
    setInput((prevInput) => prevInput + value);
  }

  function calculate() {
    let result;
    try {
      result = evalInput();
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  }

  function evalInput() {
    let operands = input.split(/[\+\-\*\/]/);

    function extractOperator(input) {
      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (isNaN(parseInt(char)) && char !== ".") {
          return char;
        }
      }
      return null;
    }

    let operator = extractOperator(input);

    if (!operator || operands.length !== 2) {
      throw new Error("Invalid input");
    }

    let operand1 = parseFloat(operands[0]);
    let operand2 = parseFloat(operands[1]);

    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        if (operand2 === 0) {
          throw new Error("Division by zero");
        }
        return operand1 / operand2;
      default:
        throw new Error("Invalid operator");
    }
  }

  function handleClear() {
    setInput("");
  }

  return (
    <div className="container">
      <h1>Calculator App using React</h1>
      <div className="calculator">
        <input type="text" value={input} className="output" readOnly />
        <Keypad
          handleClick={handleClick}
          handleClear={handleClear}
          calculate={calculate}
        />
      </div>
    </div>
  );
}

export default App;
