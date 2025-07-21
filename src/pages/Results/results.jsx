import { useNavigate } from 'react-router';
import './results.css';
import { useEffect, useState } from 'react';

const Results = () => {
  const navigate = useNavigate();
	const [pointsCounter, setPointsCounter] = useState(0);

	useEffect(() => {
		setPointsCounter(Number(localStorage.getItem('pointsCounter')))
	},[])

  const handlePlayAgain = () => {
    navigate('/1');
    window.location.reload();
  };

  return (
    <div className="results-bg">
      <div className="results">
        <div className="results-icon">
          <img src="congrats.png" alt="Party" className="w-full h-full" />
        </div>
        <h2 className="text-medium-24 results-title">
          Congrats! You completed the quiz.
        </h2>
        <p className="text-semibold-16 results-score">
          You answer <span>{pointsCounter}/10</span> correctly
        </p>
        <button
          className="results-btn"
          onClick={handlePlayAgain}
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export default Results;