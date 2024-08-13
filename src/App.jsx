import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {

  const { register, handleSubmit, reset } = useForm();
  const [randomNumbers, setRandomNumbers] = useState(
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1)
  );
  const [results, setResults] = useState(Array(5).fill(null));
  const [isGameWon, setIsGameWon] = useState(false);

  console.log(randomNumbers)
  const onSubmit = (data) => {
    const newResults = Object.values(data).map((value, index) => {
      if (randomNumbers[index] === parseInt(value, 10)) {
        return "green"
      } else if (randomNumbers[index] < parseInt(value, 10)) {
        return "red"
      } else if(randomNumbers[index] > parseInt(value, 10)) {
        return "yellow"
      }
    });
    setResults(newResults);

    const isallTrue = newResults.every((element) => {
      if (element === "green") {
        return true
      }
    })

    if (isallTrue) {
      setIsGameWon(true);
    }
  };

  const restartGame = () => {
    setRandomNumbers(Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1));
    setResults(Array(5).fill(null));
    setIsGameWon(false);
    reset();
  };

  return (
    <>
      <h1>Number Matching Game</h1>
      <div className="game-container">
      <form onSubmit={handleSubmit(onSubmit)} className="number-form">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="input-container">
            <input
              type="number"
              {...register(`number${index}`, { required: true, min: 1, max: 10 })}
              className={`input ${
                results[index] === "green" ? "correct" : results[index] === "red" ? "incorrect" : results[index] === "yellow" ? "yellow" : ""
              }`}
            />
          </div>
        ))}
        <button onClick={isGameWon && restartGame} type="submit" className="check-button">
          {isGameWon ? 'Play Again' : 'Check'}
        </button>
      </form>
    </div>
    </>
  );
}

export default App;
