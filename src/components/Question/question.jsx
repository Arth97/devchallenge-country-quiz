import { useEffect } from 'react';
import './question.css';

const Question = ({questionIndex, question}) => {

	useEffect(() => {
		console.log("question", question);
	});

  return (
    <div className="question">
			<div className="question-index">
				{Array.from({ length: 10 }, (_, index) => (
					<div className="question-indicator" key={index + 1}> {index + 1} </div>
				))}
			</div>

			<div className="question-phrase text-semibold-20">
				{question?.question}
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