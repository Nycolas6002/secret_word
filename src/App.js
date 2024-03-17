import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";

// data
import { wordsList } from "./data/wordsList";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);//palavra em forma de
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(category, word);

    return { category, word };
  }, [words]);

  const startGame = useCallback(() => {

    clearLettersStates();

    const { category, word } = pickWordAndCategory();

    let wordLetters = word.split("");//array 

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    // setTimeout(() => {
    //   setGameStage(stages[1].name);
    // }, );

   setGameStage(stages[1].name);//assim que a função era chamada o setGameStage já ia para a segunda tela 
    
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters,normalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters,normalizedLetter]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGuessedLetters([])
    setGameStage(stages[0].name);
  };

  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses === 0) {
      clearLettersStates();
      retry()
      
    }
  }, [guesses]);

  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];// javascript -> javscript

    console.log(guessedLetters)//[]
    console.log(uniqueLetters)//[] nada + ["o","v","o"]        javascript -> javscript
    console.log("passou00")//[] nada + ["o","v","o"]        javascript -> javscript
    
    if (guessedLetters.length > 0 && guessedLetters.length === uniqueLetters.length){
      console.log("passou")
      setScore((actualScore) => (actualScore += 100));
      startGame();
    }
  }, [letters,guessedLetters]);

  return (
    <div className="App">

      {gameStage === "start" && <StartScreen startGame={startGame} />}

      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;