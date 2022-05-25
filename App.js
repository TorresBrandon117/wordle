
import './App.css';
import Row from "./Row";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {useState} from "react";
import words from "./words";

function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)];
}

const keyboardLayout = {
  default: [
    "Q W E R T Y U I O P {money}",
    "A S D F G H J K L {bksp}",
    "Y X C V B N M {rnd}{enter}",
  ],
};

const keyboardDisplay ={
  "{rnd}": "Random",
  "{money}": "Money",
  "{bksp}": "",
  "{enter}": "Enter",
};

function getDefaultButtonTheme() {
  return[
{
  class: "correct",

  buttons: "",
},
{
  class: "present",
  buttons: "",
},
{
  class: "not-found",
  buttons: "",
},
  ];
}



function App() {

const [row, setRow] = useState(0);

const [data, setData] = useState(["", "", "", "", "", ""]);

const [wordToGuess, setWordToGuess] = useState(getRandomWord());

const [buttonTheme, setButtonTheme] = useState(getDefaultButtonTheme());

function getCurrentWord() {
  return data[row];
}
function setCurrentWord(word) {
data[row] = word;
setData([...data]);
}


function keyboardPressed(key){
  if (key === "{enter}"){
    
    const correctLetters = [];
    const presentLetters = [];
    const notFoundLetters = [];
  
    for (let i = 0; i < getCurrentWord().length; i++){
      const char = getCurrentWord().charAt(i);
      if(wordToGuess.charAt(i) === char){
        correctLetters.push(char);
      }
      else if (wordToGuess.includes(char)){
        presentLetters.push(char);
      }
      else{
        notFoundLetters.push(char);
      }
    }

    buttonTheme[0].buttons += " " + correctLetters.join(" ");
    buttonTheme[1].buttons += " " + presentLetters.join(" ");
    buttonTheme[2].buttons += " " + notFoundLetters.join(" ");
    
    buttonTheme[0].buttons.split(" ").forEach((letter)=> {
      buttonTheme[1].buttons = buttonTheme[1].buttons
      .split(" ")
      .filter((letter2) => letter2 != letter)
      .join(" ");
    });

    if (row === 4){
      setTimeout(() => {
        if (getCurrentWord() === wordToGuess){
          alert("You win");
        }

        else {
          alert("You lose. Correct word was: " + wordToGuess);
        }
        setWordToGuess(getRandomWord());
        setData(["", "", "", "", "", ""]);
        setRow(0);
        setButtonTheme(getDefaultButtonTheme());

}, 1000);
    }
    
    setRow(row + 1);
  }
  else{

  }
    return;
  }
  if (key === "{rnd}"){
    setCurrentWord(getRandomWord());
    return;
  }
  if (key === "{money}"){
    setCurrentWord("MONEY");
    return;
  }
  if (key === "{bksp}") {
    if (getCurrentWord().length === 0) return;
    setCurrentWord(getCurrentWord().slice(0,-1));
return;
    }

  if (getCurrentWord().length !== 5){
    setCurrentWord(getCurrentWord() + key);
  }
}
  return (
    <div className="App">
     <div className="wrapper">
    <div className="field">
    <Row active={row === 0} word={data[0]} wordToGuess={row > 0 ? wordToGuess : null} />
    <Row active={row === 1} word={data[1]} wordToGuess={row > 1 ? wordToGuess : null}/>
    <Row active={row === 2} word={data[2]} wordToGuess={row > 2 ? wordToGuess : null}/>
    <Row active={row === 3} word={data[3]} wordToGuess={row > 3 ? wordToGuess : null}/>
    <Row active={row === 4} word={data[4]} wordToGuess={row > 4 ? wordToGuess : null}/>
    </div>

    <div className="keyboard">
      <keyboard 
      onKeyPress={keyboardPressed}
      layout ={keyboardLayout} 
      display={keyboardDisplay}
      buttonTheme={buttonTheme}
      >{JSON.stringify(buttonTheme)}
      </keyboard>
      </div>
    </div>
    </div>
  );
  }

export default App;
