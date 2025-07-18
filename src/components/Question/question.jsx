import { useEffect } from 'react';
import './question.css';
import { useNavigate } from 'react-router';

const Question = ({ questionIndex, currentQuestion }) => {
	const navigate = useNavigate();

	useEffect(() => {
		console.log("---");
		console.log("currentQuestion", currentQuestion);
	},[]);

	// TODO: Change countriesData (???)

	const getQuestion = () => {
		if (currentQuestion?.type === "flag") {
			return (
				<>
					<p>{currentQuestion?.question}</p>
					<div className="flag-img-wrapper">
						<img src={currentQuestion?.flag} alt="Country Flag" />
					</div>
				</>
			);
		} else {
			return (
				<>
					<p>{currentQuestion?.question}<span>{currentQuestion?.questionValue}</span>{currentQuestion?.question2}</p>
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
				{getQuestion()}
			</div>

			<div className="question-answers">
				<div className="answer">{currentQuestion.options[0]}</div>
				<div className="answer">{currentQuestion.options[1]}</div>
				<div className="answer">{currentQuestion.options[2]}</div>
				<div className="answer">{currentQuestion.options[3]}</div>
			</div>
    </div>
  );
};

export default Question;