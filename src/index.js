import React, { useState, useEffect } from "react";
import "./index.css";

const Terminal = (props) => {
  //Component state

  const [inputValue, setInputValue] = useState("");
  const [lines, setLines] = useState([]);
  const [newID, setNewID] = useState(0);

  //Load config for component

  let config = props.Config || {};

  const conf = {
    prefix: config.prefix || ">",
    userOutPrefix: config.userOutPrefix || "< ",
    callbackOutPrefix: config.handlerOutPrefix || "[callback]",
    callback:
      config.handler ||
      (() => {
        return "OK";
      }),
    textColor: config.textColor || "white",
    background: config.background || "blue",
    font: config.font || "monospace",
    fontSize: config.fontSize || "1em",
    getFocusOnRender: config.getFocusOnRender || false,
  };

  /* Function for getting a new id every time.
   *
   * Addition parameter allows you to get multiple ids.
   * Just call getID() once, with the amount of ids you
   * are going to need, and do id+n.
   */

  const getID = (addition) => {
    let tempID = newID;
    //Plus operator
    setNewID(newID + addition);
    return tempID;
  };

  const addLines = (linesToAdd) => {
    if (Array.isArray(linesToAdd)) {
      const baseID = getID(linesToAdd.length);
      let objArr = [];
      for (let i = 0; i < linesToAdd.length; i++) {
        objArr.push({ content: String(linesToAdd[i]), id: baseID + i });
      }
      setLines(lines.concat(objArr));
    } else {
      setLines(lines.concat({ content: String(linesToAdd), id: getID(1) }));
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeypress = (e) => {
    if (e.keyCode == 13) {
      if (inputValue === "") return;
      let lineArr = [`${conf.userOutPrefix}${inputValue}`];
      const callbackResponse = conf.callback(inputValue);
      let line;
      for (line in callbackResponse) {
        lineArr = lineArr.concat(
          `${conf.callbackOutPrefix}${String(callbackResponse[line])}`
        );
      }
      addLines(lineArr);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (conf.getFocusOnRender) document.getElementById("lineInput").focus();
  });

  const lineList = lines.map((x) => (
    <li style={{ color: conf.textColor }} className="terminalLine" key={x.id}>
      {x.content}
    </li>
  ));

  const handleClick = (e) => {
    document.getElementById("lineInput").focus();
  };

  return (
    <div
      className="terminal-container"
      style={{
        background: conf.background,
        fontFamily: conf.font,
        fontSize: conf.fontSize,
      }}
      onClick={handleClick}
    >
      <div
        style={{ background: conf.background }}
        className="content-container"
      >
        <ul style={{ color: conf.textColor }}>
          {lineList}
          <li
            style={{ color: conf.textColor }}
            id={-1}
            className="inputLineContainer"
          >
            {conf.prefix}
            <input
              style={{ color: conf.textColor }}
              spellCheck="false"
              autoComplete="off"
              id="lineInput"
              value={inputValue}
              onKeyDown={handleKeypress}
              type="text"
              className="inputLineInput"
              onChange={handleInput}
            ></input>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Terminal;
