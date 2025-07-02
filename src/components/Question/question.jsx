import { useEffect } from 'react';
import './question.css';
import { useNavigate } from 'react-router';

const Question = ({questionIndex, question, data}) => {
	const navigate = useNavigate();

	useEffect(() => {
		console.log("QUESTION", question);
		console.log("DATA", data);
	});

	const getQuestion = () => {
		switch (question?.type) {
			case "flag":
				return (
					<>
						<p>{question?.question}</p>
						<div className="flag-img-wrapper">
							<img src={data[questionIndex-1]?.flags?.svg} alt="Country Flag" />
						</div>
					</>
				)
				//TODO: Fix porque vaya tonteria he dejado aqui
			case "continent":
				return (
					<>
						<p>{question?.question}<span>{data[questionIndex-1]?.name?.common}</span>{question?.question2}</p>
					</>
				)
			default:
				return (
					<>
						<p>{question?.question}<span>{data[questionIndex-1]?.name?.common}</span>{question?.question2}</p>
					</>
				)
		}
	}

  return (
    <div className="question">
			<div className="question-index">
				{Array.from({ length: 10 }, (_, index) => (
					<div className="question-indicator" key={index + 1} onClick={() => {navigate(`/${index + 1}`)}}>
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