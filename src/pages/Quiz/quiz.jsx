import { useEffect, useState } from 'react';
import './quiz.css';

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

	const APIURL = "https://restcountries.com/v3.1/all?limit=10";

  useEffect(() => {
		fetchData();
  }, []);

	const fetchData = async () => {
		try {
			const response = await fetch(APIURL);
			const data = await response.json();
			console.log("data", data);
			return data;
		} catch (err) {
			console.log("err", err);
		}
	}

  const handleAnswer = (questionIndex, answerIndex) => {
    // Update user's answer for the current question
  };

  const handleNextQuestion = () => {

  };

  const handlePrevQuestion = () => {

  };

  const handleFinishQuiz = () => {
		
  };

  return (
    <div className="quiz">
			<div className="w-full flex justify-between">
      	<h1>Quiz Component</h1>
				<div className="points-counter">temporal</div>
			</div>
			<div className="question-container"></div>
    </div>
  );
};

export default Quiz;