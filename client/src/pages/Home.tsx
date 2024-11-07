import { useState, useLayoutEffect, FormEvent, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import auth from "../utils/auth";
import { askQuestion } from "../api/gptAPI";

const Home = () => {
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState('');

  useEffect(() => {
    console.log('Updated response:', response);
  }, [response]);
  

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await askQuestion(prompt);
      setResponse(data);
      console.log(`client api response: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error("Failed to execute on line 48 home.tsx", err); // Log any errors that occur during login
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to view all your friends!</h1>
        </div>
      ) : (
        <div className="form-container">
          {/* Display area for the response */}
          <textarea
            className="response-box"
            value={response}
            readOnly
            placeholder="Response will appear here..."
            rows={10}
            cols={50}
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
        </div>
      )}
    </>
  );
};

export default Home;
