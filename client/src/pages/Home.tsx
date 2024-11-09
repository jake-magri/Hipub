import { useState, useEffect, useLayoutEffect, FormEvent } from "react";
import ErrorPage from "./ErrorPage";
import auth from "../utils/auth";
import HomeImg from "../assets/Home.gif";
import { askQuestion } from "../api/gptAPI";
import Places from "../components/Places";
import { useSound } from "../components/SoundProvider";

const Home = () => {
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const { playSound, pauseSound, isPlaying } = useSound();

  useEffect(() => {
    console.log("Updated response:", response);
  }, [response]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
      playSound();
    }
  };

  // Once the fade-in animation is complete, trigger the second paragraph to show
  const handleAnimationEnd = () => {
    setShowSecondText(true);
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await askQuestion(prompt);
      setResponse(data);
      console.log(`client api response: ${JSON.stringify(data, null, 2)}`);
      playSound();
    } catch (err) {
      console.error("Failed to execute on line 48 home.tsx", err); // Log any errors that occur during login
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  useEffect(() => {
    // Trigger the fade-in animation after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <img className="eye" src={HomeImg} />
          <h1
            className={isVisible ? "fade-in" : ""}
            onAnimationEnd={handleAnimationEnd} // Listen for when the animation ends
          >
            Log in to speak with Finn
          </h1>

          {showSecondText && <h3 className="fade-in">He's been waiting</h3>}
        </div>
      ) : (
        <div className="form-container">
          {/* Mute/Play button for the crowd sound */}
          <button onClick={isPlaying ? pauseSound : playSound}>
            {isPlaying ? "🔇" : "🔊"}
          </button>

          {/* Display area for the response */}
          <textarea
            className="response-box"
            value={response}
            readOnly
            placeholder="Response will appear here..."
            rows={10}
            cols={30}
          />
          {/* Form to submit a new prompt */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter your prompt:</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your question here..."
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          <Places />
        </div>
      )}
    </>
  );
};

export default Home;
