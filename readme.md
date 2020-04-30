# React-io-terminal

This is a simple terminal component that you can embed into your site. It is meant to function very simply. You give it visual configuration options as props, as well as a handler function. This handler gets the raw user input as a parameter and can return a string, or an array of strings. The returned strings are the lines printed as a response to the user input.

## Installation

Install react-io-terminal from npm

```
npm i react-io-terminal
```

## Demo

View the demo here: [https://terminal-demo.ktj.st](https://terminal-demo.ktj.st)

## Example usage

```javascript
import React from "react";
import Terminal from "react-io-terminal";

function App() {
  const handler = (input) => {
    if (input === "ping") return "pong";
    return [`You typed: ${input}`, `It was ${input.length} characters long`];
  };

  return (
    <div className="App">
      <div
        style={{ width: "500px", height: "500px" }}
        className="shellcontainer"
      >
        <Terminal
          Config={{
            fontSize: "20px",
            font: "Arial",
            handler: handler,
            handlerOutPrefix: "+",
            userOutPrefix: "-",
          }}
        ></Terminal>
      </div>
    </div>
  );
}

export default App;
```

## Config options

```
prefix (the terminal prefix before user input, default value: ">")
userOutPrefix (the terminal prefix before user typed lines in the input history, default: "<")
handlerOutPrefix (the prefix before things your handler sends to the terminal, default: "[callback]")
handler (the function that handles user input, default is a function that returns "OK" every time.)
textColor (the color of the text in the terminal, default: "white")
background (the color of the background, default: "blue")
font (the font of the text in the terminal, default: "monospace")
fontSize (the size of the font in the terminal, default "1em")
getFocusOnRender (Gets focus to the terminal input when rendered, default: false)

```
