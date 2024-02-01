import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Avatar } from "@material-ui/core";

function TransactionCard({ transaction, deleteTransaction }) {
  return (
    <div className="transaction-card">
      <div className="transaction-card-category">
        <Avatar>
          <img
            src={"/images/icons/" + transaction.category + ".png"}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Avatar>
        <p className="category-text">{transaction.category}</p>
      </div>
      <div className="transaction-card-text">
        <p className="main-text">
          {transaction.detail.slice(0, 40)}
          <span>{transaction.detail.length > 40 ? "..." : " "}</span>
        </p>
        <p className="sub-text">{new Date(transaction.date).toDateString()}</p>
      </div>
      <h3 className={transaction.type}>&#x20b9; {transaction.amount}</h3>

      <div className="delete-btn">
        <IconButton
          onClick={() => {
            deleteTransaction(transaction._id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TransactionCard;
