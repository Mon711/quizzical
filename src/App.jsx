import { useState, useEffect } from "react";
import Question from "./Question";
import he from "he";

function App() {
	const [isStarted, setIsStarted] = useState(false);
	const [quizRound, setQuizRound] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [correctAnswers, setCorrectAnswers] = useState([]);

	const allAnswersSelected =
		Object.keys(selectedAnswers).length === questions.length;

	// Implement Fisher-Yates (Knuth) Shuffle algo to randomise
	// the correct ans in the incorrect ans array
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	const API_URL =
		"https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple";

	useEffect(() => {
		if (!isStarted) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				setQuestions([]); // so old questions disappear during loading

				const response = await fetch(API_URL);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				// Response Code 0 indicates success as per documentation
				if (data.response_code === 0) {
					const processedQuestions = data.results.map((item) => ({
						...item,
						allAnswers: shuffle([
							...item.incorrect_answers.map((ans) => he.decode(ans)),
							he.decode(item.correct_answer),
						]),
					}));
					setQuestions(processedQuestions);
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
	}, [isStarted, quizRound]);

	function onStart() {
		setIsStarted(true);
		setQuizRound((prev) => prev + 1);  // first fetch
	}

	function onRestart() {
		// Keep isStarted true, just reset game state + refetch
		setIsCompleted(false);
		setSelectedAnswers({});
		setCorrectAnswers([]);
		setQuizRound((prev) => prev + 1) // trigger next fetch
	}

	function handleAnswerSelect(questionIndex, answer) {
		setSelectedAnswers((prev) => ({
			...prev,
			[questionIndex]: answer,
		}));
	}

	function checkAnswers() {
		const correct = [];
		questions.forEach((question, index) => {
			const userAnswer = selectedAnswers[index];
			const correctAnswer = he.decode(question.correct_answer);

			if (userAnswer === correctAnswer) {
				correct.push(index);
			}
		});

		setCorrectAnswers(correct);
		setIsCompleted(true);
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
										return (
											<Question
												key={`${quizRound}-${index}`} // force fresh Question state each round
												questionIndex={index}
												question={he.decode(item.question)}
												allAnswers={item.allAnswers}
												correctAnswer={he.decode(item.correct_answer)}
												onSelectAnswer={handleAnswerSelect}
												isCompleted={isCompleted}
												correctAnswers={correctAnswers}
											/>
										);
									})}
						</h1>

						{!loading && questions.length > 0 && (
							<div className="footer-container">
								{isCompleted ? (
									<>
										<p className="score">
											You scored {correctAnswers.length}/{questions.length}{" "}
											correct answers
										</p>
										<button className="restart-btn" onClick={onRestart}>Play again</button>
									</>
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
