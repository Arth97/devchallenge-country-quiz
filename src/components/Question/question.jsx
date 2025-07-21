import { useEffect, useState } from 'react';
import './question.css';
import { useNavigate } from 'react-router';

const Question = ({ questionIndex, currentQuestion, userAnswers, handleAnswer }) => {
	const baseUrl = "/devchallenge-country-quiz"
	const navigate = useNavigate();
	const [selectedIdx, setSelectedIdx] = useState(null);

	useEffect(() => {
		let idx = currentQuestion?.options?.findIndex((option, index) => {
			return option === userAnswers[questionIndex-1];
		});
		setSelectedIdx(idx);
	},[currentQuestion, questionIndex]);

	const checkAnswer = (userAnswer, idx) => {
		if (userAnswers[questionIndex-1] !== null) return;
		setSelectedIdx(idx);
		handleAnswer(userAnswer)
	}

	const handleNavButtons = (index) => {
		if ((index+1) == questionIndex) return;
		navigate(`${baseUrl}/${index + 1}`);
		setSelectedIdx(null);
	}

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
							onClick={() => { handleNavButtons(index) }}
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
							<span className="ml-2">
								{(selectedIdx !== null && selectedIdx !== -1) && (
									option === currentQuestion.answer
										? <img src='Check_round_fill.svg' alt="Correct" />
										: (selectedIdx === idx && option !== currentQuestion.answer && <img src='Close_round_fill.svg' alt="Incorrect" />)
								)}
							</span>
						</div>
					))
				) : (
					<div className="text-bold-14">Loading options...</div>
				)}
			</div>
    </div>
  );
};

export default Question;