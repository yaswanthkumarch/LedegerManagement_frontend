import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/InputForm.css";

const InputForm = () => {
  const [transaction, setTransaction] = useState({
    type: "Tobacco Mastri", // Default transaction type
    date: "",
    description: "",
    amount: 0,
    quantity: 0,
    price: 0,
    karalu: 0,
    typeOfTobaccoKotulu: "", // For Tobacco Kotulu type
    barnType: "",  // New field for Barn Type
    numberOfKarra: 0,  // New field for number of Karra (ok)
  });

  const [transactionAdded, setTransactionAdded] = useState(false); // State to track if transaction was added
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset optional fields when type changes
    if (name === "type") {
      setTransaction({
        type: value,
        date: transaction.date,
        description: transaction.description,
        amount: 0,
        quantity: 0,
        price: 0,
        karalu: 0,
        typeOfTobaccoKotulu: "",
        barnType: "", // Reset barn type
        numberOfKarra: 0, // Reset number of Karra
      });
    } else {
      setTransaction({ ...transaction, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!transaction.date || !transaction.description || (transaction.amount === 0 && transaction.type !== "Sell Tobacco" && transaction.type !== "Sell Chenega" && transaction.type !== "Sell Tobacco Nursery")) {
      alert("Please fill in all required fields.");
      return;
    }

    // Send the data to the backend
    axios
      .post("https://ledegermanagement-backend.onrender.com/api/add-transaction", transaction)
      .then((response) => {
        console.log("Transaction response:", response.data);
        alert(response.data.message); // Show success message
        setTransactionAdded(true); // Update state when transaction is added
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting transaction. Please try again.");
      });

    // Optionally, reset the form after submission
    setTransaction({
      type: "Tobacco Mastri",
      date: "",
      description: "",
      amount: 0,
      quantity: 0,
      price: 0,
      karalu: 0,
      typeOfTobaccoKotulu: "",
      barnType: "", // Reset barn type
      numberOfKarra: 0, // Reset number of Karra
    });
  };

  // Navigate to summary page when 'View Records' button is clicked
  const handleViewRecords = () => {
    navigate("/summary"); // Navigate to Summary.js
  };

  return (
    <div className="input-form-container">
      <h2>Investment Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Transaction Type */}
        <div>
          <label>Transaction Type</label>
          <select
            name="type"
            value={transaction.type}
            onChange={handleChange}
          >
            <option value="Chenega Investment">Chenega Investment</option>
            <option value="Tobacco Investment">Tobacco Investment</option>
            <option value="Tobacco Nursery Investment">Tobacco Nursery Investment</option>
            <option value="Tobacco Mastri">Tobacco Mastri</option>
            <option value="Cows Adduluu Araka">Cows Adduluu Araka</option>
            <option value="Sell Tobacco">Sell Tobacco</option>
            <option value="Sell Chenega">Sell Chenega</option>
            <option value="Sell Tobacco Nursery">Sell Tobacco Nursery</option>
            <option value="Barnee Karra Tobacco">Barnee Karra Tobacco</option>
          </select>
        </div>

        {/* Common Fields: Date and Description */}
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={transaction.description}
            onChange={handleChange}
          />
        </div>

        {/* Conditional Fields for "Barnee Karra Tobacco" */}
        {transaction.type === "Barnee Karra Tobacco" && (
          <>
            <div>
              <label>Barn Type</label>
              <select
                name="barnType"
                value={transaction.barnType}
                onChange={handleChange}
              >
                <option value="">Select Barn Type</option>
                <option value="Old">Old</option>
                <option value="New">New</option>
                <option value="Setam">Setam</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label>Number of Karra</label>
              <input
                type="number"
                name="numberOfKarra"
                value={transaction.numberOfKarra}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Conditional Fields for Specific Types */}
        {transaction.type !== "Sell Tobacco" &&
        transaction.type !== "Sell Chenega" &&
        transaction.type !== "Sell Tobacco Nursery" && (
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Fields for "Sell" Types */}
        {(transaction.type === "Sell Tobacco" ||
          transaction.type === "Sell Chenega" ||
          transaction.type === "Sell Tobacco Nursery") && (
          <>
            <div>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={transaction.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={transaction.price}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button type="submit">Add Transaction</button>
      </form>

      {/* Display 'View Records' button after successful transaction */}
      {transactionAdded && (
        <button onClick={handleViewRecords}>View Records</button>
      )}
    </div>
  );
};

export default InputForm;
