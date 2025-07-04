import { useEffect } from 'react';
import './question.css';
import { useNavigate } from 'react-router';

const Question = ({questionIndex, questionJson, countriesData}) => {
	const navigate = useNavigate();

	useEffect(() => {
		// console.log("QUESTIONJSON", questionJson);
		// console.log("COUNTRIES-DATA", countriesData);
		// console.log("questionIndex", questionIndex);
	});

	const getQuestion = () => {
		if (questionJson?.type === "flag") {
			return (
				<>
					<p>{questionJson?.question}</p>
					<div className="flag-img-wrapper">
						<img src={countriesData[questionIndex-1]?.flags?.svg} alt="Country Flag" />
					</div>
				</>
			);
		} else {
			return (
				<>
					<p>{questionJson?.question}<span>{countriesData[questionIndex-1]?.name?.common}</span>{questionJson?.question2}</p>
				</>
			);
		}
	}

  return (
    <div className="question">
			<div className="question-index">
				{Array.from({ length: 10 }, (_, index) => (
					<div
						className={`question-indicator ${Number(questionIndex) === (index + 1) ? 'question-indicator-selected' : ''}`}
						key={index + 1}
						onClick={() => {navigate(`/${index + 1}`)}}
					>
					 {index + 1}
					 </div>
				))}
			</div>

			<div className="text-semibold-20 flex flex-row items-center gap-4">
				{/* {question?.question} */}
				{getQuestion()}
			</div>

			<div className="question-answers">
				<div className="answer">Content</div>
				<div className="answer">Content</div>
				<div className="answer">Content</div>
				<div className="answer">Content</div>
			</div>
    </div>
  );
};

export default Question;