import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Navbar() {
  let history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="navwrapper">
      <nav>
        <div>
          <img
            className="main-icon"
            src={"/images/icons/wallet.png"}
            alt="main-icon"
            width="35px"
            height="35px"
          />
          <h1>Expense Tracker</h1>
        </div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AccountCircleIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
