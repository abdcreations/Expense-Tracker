import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";

function AddTransaction(props) {
  let dateObj = new Date();
  let currDate = dateObj.toISOString().slice(0, 10);

  const [inputTransaction, setInputTransaction] = useState({
    _id: "",
    detail: "",
    amount: "",
    date: currDate,
    type: "expense",
    category: "",
  });

  const [helper, setHelper] = useState({
    detail: "",
    amount: "",
    type: "",
    category: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  let expenseCategories = [
    "Food",
    "Commute",
    "Household",
    "Apparel",
    "Health",
    "Beauty",
    "Education",
    "Gift",
    "Other",
  ];
  let incomeCategories = [
    "Salary",
    "Allowance",
    "Business",
    "Interest",
    "Gift",
    "Other",
  ];

  const [categoryArr, setCategoryArr] = useState(expenseCategories);

  function isValid() {
    if (inputTransaction.detail === "") {
      setHelper((prev) => {
        return {
          ...prev,
          detail: "Enter transaction detail",
        };
      });
      return false;
    }

    if (inputTransaction.amount === "") {
      setHelper((prev) => {
        return {
          ...prev,
          amount: "Enter transaction amount",
        };
      });
      return false;
    }

    if (inputTransaction.type === "") {
      setHelper((prev) => {
        return {
          ...prev,
          type: "Select transaction type",
        };
      });
      return false;
    }

    if (inputTransaction.category === "") {
      setHelper((prev) => {
        return {
          ...prev,
          category: "Select a category",
        };
      });
      return false;
    }

    return true;
  }

  function handleInputChange(event) {
    const eventCallerName = event.target.name;
    const eventCallerValue = event.target.value;

    setInputTransaction((prevState) => {
      return {
        ...prevState,
        [eventCallerName]: eventCallerValue,
      };
    });

    if (eventCallerName === "type") {
      setCategoryArr(
        eventCallerValue === "expense" ? expenseCategories : incomeCategories
      );
    }
  }

  return (
    <div>
      <form id="add" autoComplete="off">
        <FormControl>
          {/* <FormLabel>Type</FormLabel> */}
          <RadioGroup
            row
            name="type"
            value={inputTransaction.type}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="expense"
              control={<Radio color="primary" />}
              label="Expense"
            />
            <FormControlLabel
              value="income"
              control={<Radio color="primary" />}
              label="Income"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          name="detail"
          label="Description"
          onChange={handleInputChange}
          value={inputTransaction.detail}
          helperText={helper.detail}
          onClick={() =>
            setHelper((prev) => {
              return {
                ...prev,
                detail: "",
              };
            })
          }
        />

        <TextField
          name="amount"
          label="Amount"
          type="Number"
          onChange={handleInputChange}
          value={inputTransaction.amount}
          helperText={helper.amount}
          onClick={() =>
            setHelper((prev) => {
              return {
                ...prev,
                amount: "",
              };
            })
          }
        />

        <TextField
          name="date"
          type="date"
          defaultValue={inputTransaction.date}
          value={inputTransaction.date}
          onChange={handleInputChange}
        />

        <FormControl>
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            name="category"
            value={inputTransaction.category}
            onChange={handleInputChange}
            onClick={() =>
              setHelper((prev) => {
                return {
                  ...prev,
                  category: "",
                };
              })
            }
          >
            {categoryArr.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{helper.category}</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          name="submit"
          onClick={(event) => {
            event.preventDefault();

            //add transaction to the list in parent component "App" if non empty inputs
            if (isValid()) {
              props.addTransaction(inputTransaction);

              //clear input field and assign a new id
              setInputTransaction((prevState) => {
                return {
                  _id: "",
                  detail: "",
                  amount: "",
                  date: currDate,
                  type: prevState.type,
                  category: "",
                };
              });

              //show success snackbar
              setShowSuccess(true);
            }
          }}
        >
          Add
        </Button>
      </form>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Transaction added successfully."
        autoHideDuration={3000}
      />
    </div>
  );
}

export default AddTransaction;
