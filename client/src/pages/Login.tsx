import { useState, FormEvent, ChangeEvent } from "react";
import Animated from "../components/Animated";
import Auth from "../utils/auth"; // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI"; // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin"; // Import the interface for UserLogin


const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Handle changes in the input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
      // Clear any previous error messages
      setErrorMessage("");
      console.log('login successful');
      
      // await geoLocation();
    } catch (err) {
      console.error("Failed to login", err);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <Animated>
        <div className="form-container">
          <form className="form login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {/* Username input field */}
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-input"
                type="text"
                name="username"
                value={loginData.username || ""}
                onChange={handleChange}
              />
            </div>
            {/* Password input field */}
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={loginData.password || ""}
                onChange={handleChange}
              />
            </div>
            {/* Submit button for the login form */}
            <div>
              <button className="form-button" type="submit">
                Login
              </button>
            </div>
            {/* Display error message */}
            {errorMessage && (
              <div className="error-message">
                <br/>
                <p>{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
      </Animated>
    </>
  );
};

export default Login;
