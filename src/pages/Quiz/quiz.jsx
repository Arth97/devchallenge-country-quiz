/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './quiz.css';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router';
import Question from '../../components/Question/question';
import questionFactory from '../../factory/questionFactory';

const Quiz = () => {
	const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [countriesData, setCountriesData] = useState([]);
	const [pointsCounter, setPointsCounter] = useState(0);
	const [questionsAnswered, setQuestionsAnswered] = useState(0);

	const API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,idd,flags,region,continents,currencies,borders,languages";

	const navigate = useNavigate();
	const { questionIndex } = useParams();


	// #region useEffects
  useEffect(() => {
		fetchData();
		navigate('/1')
  }, []);

  useEffect(() => {
		createQuestionsList();
  }, [countriesData]);

	useEffect(() => {
		if (questionList.length)
			setCurrentQuestion(questionList[Number(questionIndex)-1]);
  }, [questionIndex, questionList]);
	// #endregion useEffects


	const createQuestionsList = () => {
		if (countriesData.length === 0) return;
		let auxQuestionList = [];
		auxQuestionList = countriesData.map((countryData, index) => {
			return questionFactory(countryData, index, countriesData)
		})
		setQuestionList(auxQuestionList)
	}

	const fetchData = async () => {
		try {
			const response = await fetch(API_URL);
			const data = await response.json();
			const randomData = _.sampleSize(data, 10);
			setCountriesData(randomData);
			return;
		} catch (err) {
			console.log("err", err);
		}
	}

  const handleAnswer = (userSelectedAnswer) => {
		if (userSelectedAnswer === currentQuestion?.answer)
			setPointsCounter(pointsCounter + 1);
		const userAnswer = [...userAnswers];
		userAnswer[Number(questionIndex)-1] = userSelectedAnswer;
		setUserAnswers(userAnswer)
		setQuestionsAnswered(questionsAnswered + 1);
		if (Number(questionIndex) === 10) {
			localStorage.setItem('pointsCounter', String(pointsCounter));
			setTimeout(() => {
				navigate(`/results`);
			}, 2000);
		}
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
			{questionList.length > 0 ? (
				<Question questionIndex={questionIndex} currentQuestion={currentQuestion} userAnswers={userAnswers} handleAnswer={handleAnswer} />
			) : null}
    </div>
  );
};

export default Quiz;