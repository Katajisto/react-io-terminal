
import React, { useState, useEffect } from 'react';
import './index.css';

const Terminal = (props) => {
  const [inputValue, setInputValue] = useState("")
  const [lines, setLines] = useState([])
  const [newID, setNewID] = useState(0)

  const getId = () => {
    let tempID = newID;
    setNewID(newID + 1);
    return tempID;
  }



  const addLines = (linesToAdd) => {
    console.log(linesToAdd)
    setLines(lines.concat(linesToAdd));
  }

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  //If the input field is no longer in focus, make it focused.
  const handleInputBlur = () => {
    document.getElementById("lineInput").focus();
  }

  const handleKeypress = (e) => {
    if (e.keyCode == 13) {
      if (inputValue === "") return;
      let newLine = { content: "< " + inputValue, id: getId() }
      let rawInput = inputValue;
      setInputValue("");
      addLines([newLine, { content: props.Handler(rawInput), id: getId() }])
    }
  }

  useEffect(() => {
    document.getElementById("lineInput").focus()
  });

  const lineList = lines.map(x => <li className="terminalLine" key={x.id}>{x.content}</li>)

  return (
    <div className="terminal-container">
      <div className="content-container">
        <ul>
          {lineList}
          <li id={-1} className="inputLineContainer">~$<input spellCheck="false" autoComplete="off" id="lineInput" value={inputValue} onKeyDown={handleKeypress} type="text" className="inputLineInput" onBlur={handleInputBlur} onChange={handleInput}></input></li>
        </ul>
      </div>
    </div>
  )
}

export default Terminal;