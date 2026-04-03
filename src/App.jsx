import { useState } from "react";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  function onStart(){
    setIsStarted(true);
  }
  if (isStarted) return (
    <>
      <div class="app-container">
				<div class="blob-top"></div>
				<div class="blob-bottom"></div>

				<main class="content">
					<h1>The game has begun!</h1>
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
					<button class="start-btn" onClick={onStart}>Start quiz</button>
				</main>
			</div>
		</>
	);
}

export default App;
