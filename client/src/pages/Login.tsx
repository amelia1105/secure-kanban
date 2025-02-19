import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";

const Login = () => {
  // State to hold login form data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // State to hold error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes and update state
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    try {
      // Attempt to login with provided credentials
      const data = await login(loginData);
      // If successful, store the authentication token
      Auth.login(data.token);
    } catch (err) {
      // If login fails, set an error message
      setErrorMessage("Invalid username or password. Please try again.");
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username || ""}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password || ""}
          onChange={handleChange}
        />

        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Login;
