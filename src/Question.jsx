import React from "react";

function Question(props){
    return (
        <div className="question-container">
            {/* 1. The Question Text */}
            <h3 className="question-title">{props.question}</h3>

            {/* 2. The Answer Buttons */}
            <div className="answers-group">
                {props.allAnswers.map((answer, index)=> (
                    <button key={index} className="answer-btn">
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Question;