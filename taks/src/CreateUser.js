import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateUser = () => {
  const userUrl = "https://react-4d791-default-rtdb.firebaseio.com/books.json";

  // Add User (POST)
  const addUser = async () => {
    const title = prompt("Enter title:");
    const author = prompt("Enter author:");

    if (title && author) {
      try {
        const response = await axios.post(userUrl, { name: title });
        const respons2 = await axios.post(userUrl, { author: author });

        console.log("User created:", response.data);
        alert(`User ${response.data.name} added successfully!`);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div>
      <h1>Book Management</h1>
      {/* Add User */}
      <button
        style={{
          background: "green",
          width: "200px",
          height: "100px",
          fontSize: "2rem",
        }}
        onClick={addUser}
      >
        Add Book
      </button>
    </div>
  );
};

export default CreateUser;
