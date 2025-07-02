import { useEffect, useState } from 'react';
import './quiz.css';
import _ from 'lodash';
import questionsJson from '../../data/questions.json';
import { useNavigate, useParams } from 'react-router';
import Question from '../../components/Question/question';

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

	const pointsCounter = 0;

	const APIURL = "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,continents,currencies,borders,car,landlocked";

	const navigate = useNavigate();
	const { questionIndex } = useParams();

  useEffect(() => {
		setQuestions(questionsJson)
		fetchData();
		navigate('/1')
		console.log("questionIndex", questionIndex);
  }, []);

	const fetchData = async () => {
		try {
			const response = await fetch(APIURL);
			const data = await response.json();
			const randomData = _.sampleSize(data, 10);
			console.log("randomData", randomData);
			return randomData;
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
			<div className="w-full flex justify-between items-center">
      	<h1 className="text-medium-24 text-3xl">Country Quiz</h1>
				<div className="points-counter">
					<p>🏆</p>
					<p><span>{pointsCounter}</span>/10 Points</p>
				</div>
			</div>
			<Question questionIndex={questionIndex} question={questions[questionIndex]}/>
    </div>
  );
};

export default Quiz;