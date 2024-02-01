import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Register() {
  //declare state
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [helper, setHelper] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  let history = useHistory();

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
    if (userInput.name === "") {
      setHelper((prev) => {
        return {
          ...prev,
          name: "Enter name",
        };
      });

      return false;
    }

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
    } else if (userInput.password.length < 8) {
      setHelper((prev) => {
        return {
          ...prev,
          password: "Password length must be at least 8",
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

    setError("");
  }

  function handleClick(event) {
    event.preventDefault();
    return isValid() && callRegister();
  }

  async function callRegister() {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInput.name,
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
      setError(data.error);
      setUserInput({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="register-wrapper">
      <form id="register-form">
        <div className="login-icon">
          <AccountCircleIcon fontSize="large" />
        </div>
        {error !== "" && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          variant="outlined"
          label="Name"
          type="text"
          name="name"
          autoFocus
          onChange={handleInputChange}
          value={userInput.name}
          helperText={helper.name}
          onClick={handleInputClick}
        />
        <TextField
          variant="outlined"
          label="Email"
          type="text"
          name="email"
          onChange={handleInputChange}
          value={userInput.email}
          helperText={helper.email}
          onClick={handleInputClick}
        />
        <TextField
          variant="outlined"
          label="Password"
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
          Register
        </Button>
        <p>
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
