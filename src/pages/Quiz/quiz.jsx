/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './quiz.css';
import _ from 'lodash';
import questionsJson from '../../data/questions.json';
import { useNavigate, useParams } from 'react-router';
import Question from '../../components/Question/question';

const Quiz = () => {
	const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [countriesData, setCountriesData] = useState([]);

	const pointsCounter = 0;

	const APIURL = "https://restcountries.com/v3.1/all?fields=name,capital,idd,flags,region,continents,currencies,borders,languages";

	const navigate = useNavigate();
	const { questionIndex } = useParams();

  useEffect(() => {
		fetchData();
		navigate('/1')
  }, []);

  useEffect(() => {
		createQuestionsList();
  }, [countriesData]);

	const createQuestionsList = () => {
		if (countriesData.length === 0) return;

		let auxQuestionList = {};
		countriesData.map((countryData, index) => {
			return createQuestion(countryData, index);
		})

		setQuestionList([...questionList, auxQuestionList])
	}

	const createQuestion = (countryData, index) => {
		const randomQuestion = _.sample(questionsJson);

		if (randomQuestion.type === "flag") {
			const flag = countryData.flags?.svg || countryData.flags?.png || "";
			const answer = countryData.name?.common || "";

			const otherCountries = countriesData.filter((c, i) => i !== index);
			const incorrectOptions = _.sampleSize(
				otherCountries.map(c => c.name?.common).filter(Boolean), 3
			);

			const options = _.shuffle([answer, ...incorrectOptions]);

			return {
				type: randomQuestion.type,
				question: randomQuestion.question,
				flag,
				options,
				answer
			};
		} else {
			const answer = countryData.name?.common || "";
			const question = randomQuestion.question || "";
			const question2 = randomQuestion.question2 || "";

			const otherCountries = countriesData.filter((c, i) => i !== index);
			const incorrectOptions = _.sampleSize(
				otherCountries.map(c => c.name?.common).filter(Boolean), 3
			);

			const options = _.shuffle([answer, ...incorrectOptions]);

			return {
				type: randomQuestion.type,
				question,
				question2,
				options,
				answer
			};
		}
	}

	useEffect(() => {
		// TODO			
  }, [questionIndex]);

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
			<Question questionIndex={questionIndex} questionJson={questionsJson[Number(questionIndex)-1]} countriesData={countriesData}/>
    </div>
  );
};

export default Quiz;