import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Login() {
  //declare state
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [helper, setHelper] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const [isInvalid, setInvalid] = useState(false);

  function handleInputChange(event) {
    const eventCallerName = event.target.name;
    const eventCallerValue = event.target.value;

    setUserInput((prevState) => {
      return {
        ...prevState,
        [eventCallerName]: eventCallerValue,
      };
    });
  }

  function isValid() {
    if (userInput.email === "") {
      setHelper((prev) => {
        return {
          ...prev,
          email: "Enter email",
        };
      });

      return false;
    }

    if (userInput.password === "") {
      setHelper((prev) => {
        return {
          ...prev,
          password: "Enter password",
        };
      });

      return false;
    }

    return true;
  }

  function handleInputClick(event) {
    const eventCallerName = event.target.name;
    setHelper((prev) => {
      return {
        ...prev,
        [eventCallerName]: "",
      };
    });

    setInvalid(false);
  }

  function handleClick(event) {
    event.preventDefault();
    return isValid() && callLogin();
  }

  async function callLogin() {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInput.email,
        password: userInput.password,
      }),
    });

    const data = await response.json();

    if (data.success === true) {
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("isAuthenticated", true);
      history.push("/dashboard");
    } else {
      setInvalid((prev) => !prev);
      setUserInput({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="login-wrapper">
      <form id="login-form">
        <div className="login-icon">
          <AccountCircleIcon fontSize="large" />
        </div>
        {isInvalid && (
          <p style={{ color: "red" }}>Incorrect email or password!</p>
        )}
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          autoFocus
          onChange={handleInputChange}
          value={userInput.email}
          helperText={helper.email}
          onClick={handleInputClick}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={userInput.password}
          helperText={helper.password}
          onClick={handleInputClick}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleClick}
        >
          Login
        </Button>
        <p>
          New User? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
