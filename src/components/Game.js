import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");

  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    letterInputRef.current.focus();
    setLetter("");
  };

  return (
    <div className="">

      <p className="points">
        <span>Pontuação:{score}</span>
      </p>

      <h1>Adivinhe a palvra:</h1>

      <h3 className="tip">
        Dica sobre a palavra <span>{pickedCategory}</span>
      </h3>
      <p>você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>tente adivinhar uma letra da palavra</p>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            ref={letterInputRef}
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
          />
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrongLetterContainer">
        <p>letras que vc já utilizou</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>
    </div>
  );
};

export default Game;
