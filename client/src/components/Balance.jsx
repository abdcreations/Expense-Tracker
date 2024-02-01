import React from "react";

function Balance(props) {
  return (
    <div className="balance">
      <div className="balance-expense">
        <p>Expense</p>
        <h1>
          <span style={{ color: "rgb(136, 133, 133)" }}>&#x20b9;</span>{" "}
          {props.balance.expense}
        </h1>
      </div>
      <div className="balance-income">
        <p>Income</p>
        <h1>
          <span style={{ color: "rgb(136, 133, 133)" }}>&#x20b9;</span>{" "}
          {props.balance.income}
        </h1>
      </div>
      <div className="balance-remaining">
        <p>Balance</p>
        <h1>
          <span style={{ color: "rgb(136, 133, 133)" }}>&#x20b9;</span>{" "}
          {props.balance.income - props.balance.expense}
        </h1>
      </div>
    </div>
  );
}

export default Balance;
