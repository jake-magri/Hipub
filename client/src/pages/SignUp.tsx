import { useState, FormEvent } from "react";
import Animated from "../components/Animated";
import { UserData } from "../interfaces/UserData";

const SignUp = () => {
  // Manage form data with useState
  const [signUpData, setSignUpData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
  });

  // Update form state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  // Form submission handler
  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Send a POST request to the server
      const response = await fetch("/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const result = await response.json();
      console.log("Account created:", result);

      // clear the form or provide feedback to the user
      setSignUpData({ username: "", email: "", password: "" });
    } catch (error: unknown) {
      console.error("Error:", error);
    }
  };

  return (
    <Animated>
      <div className="form-container">
        <h2>Create Your Account</h2>
        <form className="signup-form" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={signUpData.username || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={signUpData.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={signUpData.password || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="form-button">
            Sign Up
          </button>
        </form>
      </div>
    </Animated>
  );
};

export default SignUp;
