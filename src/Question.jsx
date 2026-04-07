import React, { useState } from "react";

function Question(props) {
	// 1. Initialize state to track the ID or text of the chosen answer
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	// 2. Function to handle the click event
	const handleSelect = (answer) => {
		setSelectedAnswer(answer);
		// Call the function from App to track this selection
		props.onSelectAnswer(props.questionIndex, answer)
	};

	function isCorrect(index){

	}

	return (
		<div className="question-container">
			{/* 1. The Question Text */}
			<h3 className="question-title">{props.question}</h3>

			{/* 2. The Answer Buttons */}
			<div className="answers-group">
				{props.allAnswers.map((answer, index) => {
					// 3. Check if THIS specific answer is the one in state
					const isSelected = answer === selectedAnswer;
					const isCorrect = answer === props.correctAnswer;

					return !props.isCompleted ? (
						<button
							key={index}
							className={`answer-btn ${isSelected ? "selected" : ""}`}
							onClick={() => handleSelect(answer)}
						>
							{answer}
						</button>
					) :
					(
						<button
							key={index}
							className={`answer-btn ${
								isCorrect ? "correct" : isSelected ? "incorrect" : "dimmed"
							}`}
							onClick={() => handleSelect(answer)}
							disabled
						>
							{answer}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default Question;
