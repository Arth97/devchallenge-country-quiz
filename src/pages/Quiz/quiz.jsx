/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './quiz.css';
import _, { set } from 'lodash';
import { useNavigate, useParams } from 'react-router';
import Question from '../../components/Question/question';
import questionFactory from '../../factory/questionFactory';

const Quiz = () => {
	const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [countriesData, setCountriesData] = useState([]);

	const pointsCounter = 0;

	const APIURL = "https://restcountries.com/v3.1/all?fields=name,capital,idd,flags,region,continents,currencies,borders,languages";

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
		console.log("auxQuestionList", auxQuestionList);
		setQuestionList(auxQuestionList)
	}

	const fetchData = async () => {
		try {
			const response = await fetch(APIURL);
			const data = await response.json();
			const randomData = _.sampleSize(data, 10);
			console.log("randomData", randomData);
			setCountriesData(randomData);
			return;
		} catch (err) {
			console.log("err", err);
		}
	}

  const handleAnswer = (userSelectedAnswer) => {
		const userAnswer = [...userAnswers];
		userAnswer[Number(questionIndex)-1] = userSelectedAnswer;
		setUserAnswers(userAnswer)
    // TODO: Visual feedback for question answered
  };

  const handleNextQuestion = () => {
  };

  const handlePrevQuestion = () => {
  };

  const handleFinishQuiz = () => {
		// TODO: Throw results
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