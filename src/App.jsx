import { useState, useEffect } from "react";
import Question from "./Question";
import he from "he";

function App() {
	const [isStarted, setIsStarted] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [correctAnswers, setCorrectAnswers] = useState([]);

	const allAnswersSelected =
		Object.keys(selectedAnswers).length === questions.length;

	const API_URL =
		"https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple";

	useEffect(() => {
		if (!isStarted) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(API_URL);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				// Response Code 0 indicates success as per documentation
				if (data.response_code === 0) {
					setQuestions(data.results);
				} else {
					setError(`API Error: Response Code ${data.response_code}`);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [isStarted]);

	function onStart() {
		setIsStarted(true);
	}

	function handleAnswerSelect(questionIndex, answer) {
		setSelectedAnswers((prev) => ({
			...prev,
			[questionIndex]: answer,
		}));
	}

	function checkAnswers() {
		questions.forEach((question, index) => {
			const userAnswer = selectedAnswers[index];
			const correctAnswer = question.correct_answer;

			if (userAnswer === correctAnswer) {
				setCorrectAnswers((prev) => [...prev, index]);
			}

			setIsCompleted(true);
			// if(userAnswer === correctAnswer){
			// 	console.log(`Question ${index}: CORRECT ✓`);
			// }else {
			// 	console.log(`Question ${index}: WRONG ✗`);
			// }
		});
	}

	if (isStarted)
		return (
			<>
				<div class="app-container">
					<div class="blob-top"></div>
					<div class="blob-bottom"></div>

					<main class="content during-game-content">
						{/* <h1>{loading ? "Loading...." : `Found ${questions.length} questions`}</h1> */}
						<h1>
							{loading
								? "Loading...."
								: questions.map((item, index) => {
										// Combine correct and incorrect answers into one list
										const allAnswers = [
											...item.incorrect_answers.map((ans) => he.decode(ans)),
											he.decode(item.correct_answer),
										];

										// console.log(allAnswers)

										return (
											<Question
												key={index}
												questionIndex={index}
												question={he.decode(item.question)}
												allAnswers={allAnswers}
												correctAnswer={he.decode(item.correct_answer)}
												onSelectAnswer={handleAnswerSelect}
											/>
										);
									})}
						</h1>

						{!loading && questions.length > 0 && (
							<div className="footer-container">
								{isCompleted ? (
									<p>
										You scored {correctAnswers.length}/{questions.length}{" "}
										correct answers
									</p>
								) : (
									<button
										className="check-btn"
										onClick={checkAnswers}
										disabled={!allAnswersSelected}
									>
										Check answers
									</button>
								)}
							</div>
						)}
					</main>
				</div>
			</>
		);

	return (
		<>
			<div class="app-container">
				<div class="blob-top"></div>
				<div class="blob-bottom"></div>

				<main class="content">
					<h1>Quizzical</h1>
					<p>A fun quiz app for all ages. Play for FREE!</p>
					<button class="start-btn" onClick={onStart}>
						Start quiz
					</button>
				</main>
			</div>
		</>
	);
}

export default App;
