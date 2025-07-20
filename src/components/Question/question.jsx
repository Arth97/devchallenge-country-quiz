import { useEffect, useState } from 'react';
import './question.css';
import { useNavigate } from 'react-router';

const Question = ({ questionIndex, currentQuestion, userAnswers, handleAnswer }) => {
	const navigate = useNavigate();
	const [selectedIdx, setSelectedIdx] = useState(null);

	useEffect(() => {
		let idx = currentQuestion?.options?.findIndex((option, index) => {
			return option === userAnswers[questionIndex-1];
		});
		setSelectedIdx(idx);
	},[currentQuestion, questionIndex]);

	const checkAnswer = (userAnswer, idx) => {
		setSelectedIdx(idx);
		handleAnswer(userAnswer)
	}

	// TODO: CANT CHANGE OPTION ONCE SELECTED

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
					<p>
						{currentQuestion?.question}
						<span>
							{currentQuestion?.questionValue}
						</span>
						{currentQuestion?.question2}
					</p>
				</>
			);
		}
	}

  return (
    <div className="question">
			<div className="question-index">
				{Array.from({ length: 10 }, (_, index) => {
					const isCurrent = Number(questionIndex) === (index + 1);
					const isCompleted = Array.isArray(userAnswers) && userAnswers[index] !== null;

					return (
						<div
							className={`question-indicator ${
								isCurrent
								? 'question-indicator-selected'
								: isCompleted
								? 'question-indicator-completed'
								: ''
							}`}
							key={index + 1}
							onClick={() => { navigate(`/${index + 1}`); setSelectedIdx(null); }}
						>
							{index + 1}
						</div>
					);
				})}
			</div>

			<div className="text-semibold-20 flex flex-row items-center gap-4">
				{getQuestion()}
			</div>

			<div className="question-answers">
				{Array.isArray(currentQuestion?.options) && currentQuestion.options.length === 4 ? (
					currentQuestion.options.map((option, idx) => (
						<div
							className={`answer${selectedIdx === idx ? ' answer-selected' : ''}`}
							key={idx}
							onClick={() => checkAnswer(option, idx)}
						>
							{option}
						</div>
					))) : (
						<div className="text-bold-14">Loading options...</div>
					)}
			</div>
    </div>
  );
};

export default Question;