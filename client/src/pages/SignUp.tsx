import Animated from "../components/Animated";

const SignUp = () => {
  return (
    <>
      <Animated>
        <body>
          <div className="form-container">
            <h2>Create Your Account</h2>
            <form className="signup-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
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
                  required
                />
              </div>

              <button type="submit" className="form-button">
                Sign Up
              </button>
            </form>
          </div>
        </body>
      </Animated>
    </>
  );
};

export default SignUp;
