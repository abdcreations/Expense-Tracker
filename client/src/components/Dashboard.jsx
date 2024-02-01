import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import AddTransaction from "./AddTransaction";
import TransactionCard from "./TransactionCard";
import Balance from "./Balance";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
//below imports for making website design responsive
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

function Dashboard() {
  //declaring state for managing the transactions list
  const [transactionsList, setTransactionsList] = useState([]);
  const [isAuth, setIsAuth] = useState(true);
  const [currDate, setCurrDate] = useState(new Date().toISOString());
  const [balance, setBalance] = useState({
    income: Number(0),
    expense: Number(0),
  });

  //fetching all stored transactions from the backend ( add auth token to request )
  useEffect(() => {
    callGetTransaction();
  }, []);

  async function callGetTransaction() {
    const response = await fetch("/api/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const data = await response.json();

    if (data.success === true) {
      setTransactionsList(data.data);
      setIsAuth(true);
    }
  }

  //months array to display month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //add transaction to the list of transactions
  function addTransaction(newTransaction) {
    callAddTransaction(newTransaction);
  }

  //funtion for calling backend api to post transaction
  async function callAddTransaction(transactionDetails) {
    setOpenAddForm(false);
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        detail: transactionDetails.detail,
        amount: transactionDetails.amount,
        date: transactionDetails.date,
        type: transactionDetails.type,
        category: transactionDetails.category,
      }),
    });
    const data = await response.json();

    if (data.success === true) {
      transactionDetails._id = data.data._id;
      setTransactionsList((prevState) => {
        return [transactionDetails, ...prevState];
      });
      setShowSuccess(true);
    }
  }

  //delete transaction from the list
  function deleteTransaction(idOfTransaction) {
    callDeleteTransaction(idOfTransaction);
  }

  //function for calling backend api to delete transaction
  async function callDeleteTransaction(transactionId) {
    const response = await fetch("/api/transactions/" + transactionId, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const data = await response.json();

    if (data.success === true) {
      setTransactionsList((prevState) => {
        return prevState.filter((transaction) => {
          return transactionId !== transaction._id;
        });
      });
    }
  }

  //function to go to prev month for prev button
  function handlePrev() {
    setCurrDate((prevState) => {
      const d = new Date(prevState);
      d.setMonth(d.getMonth() - 1);
      return d.toISOString();
    });
  }

  //function to go to next month for next button
  function handleNext() {
    setCurrDate((prevState) => {
      const d = new Date(prevState);
      d.setMonth(d.getMonth() + 1);
      return d.toISOString();
    });
  }

  //for mobile devices
  const [openAddForm, setOpenAddForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleAddIconClick() {
    setOpenAddForm(true);
  }

  function handleClose() {
    setOpenAddForm(false);
  }

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="container-dashboard">
        <Grid
          container
          spacing={5}
          direction="row"
          justifyContent="space-evenly"
        >
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <AddTransaction addTransaction={addTransaction} />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={5}>
            <div className="recent-transactions">
              {/* <p>Recent Transactions</p> */}
              <div className="recent-transactions-header">
                <IconButton onClick={handlePrev}>
                  <ChevronLeftIcon />
                </IconButton>
                <p>
                  {months[new Date(currDate).getMonth()]}{" "}
                  {new Date(currDate).getFullYear()}
                </p>
                <IconButton onClick={handleNext}>
                  <ChevronRightIcon />
                </IconButton>
              </div>

              {/* get transactions according to month */}
              {transactionsList
                .filter((transaction) => {
                  return (
                    new Date(transaction.date).getMonth() ===
                      new Date(currDate).getMonth() &&
                    new Date(transaction.date).getFullYear() ===
                      new Date(currDate).getFullYear()
                  );
                })
                .sort((a, b) => {
                  return (
                    new Date(b.date).getDate() - new Date(a.date).getDate()
                  );
                })
                .map((transaction) => {
                  return (
                    <TransactionCard
                      key={transaction._id}
                      transaction={transaction}
                      deleteTransaction={deleteTransaction}
                    />
                  );
                })}
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <Balance balance={balance} />
            </Grid>
          </Hidden>
        </Grid>
        {/*for mobile devices*/}
        <Hidden mdUp>
          <Fab
            color="primary"
            style={{ position: "fixed", right: "30px", bottom: "30px" }}
            onClick={handleAddIconClick}
          >
            <AddIcon />
          </Fab>
          <Dialog open={openAddForm} onClose={handleClose}>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogContent>
              <AddTransaction addTransaction={addTransaction} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              {/* <Button onClick={handleClose} color="primary">
                Subscribe
              </Button> */}
            </DialogActions>
          </Dialog>
        </Hidden>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
          message="Transaction added successfully."
          autoHideDuration={3000}
        />
      </div>
    </div>
  );
}

export default Dashboard;
