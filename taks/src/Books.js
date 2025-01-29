import React, { useState, useEffect } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]); // Store Firebase data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [addBooks, setAddBooks] = useState(0); // Error state

  // ✅ Fetch data from Firebase using axios
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://react-4d791-default-rtdb.firebaseio.com/books.json"
        );

        if (response.data) {
          // Convert Firebase object to array
          const booksArray = Object.entries(response.data).map(
            ([id, book]) => ({
              id,
              ...book,
            })
          );
          setBooks(booksArray);
        } else {
          setBooks([]); // No data available
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBooks();
  }, []);


  return (



    <div style={styles.container}>


      {loading ? (
        <h2>Loading books...</h2>
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : books.length === 0 ? (
        <h2>No books available.</h2>
      ) : (
        books.map((book) => (
          <div key={book.id} style={styles.card}>
            <h2>ID: {book.id}</h2>
            <h3 style={styles.title}>Title: {book.title}</h3>
            <p style={styles.author}>Author: {book.author}</p>

           
          </div>
        ))
      )}
    </div>
  );
};

// ✅ CSS Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    margin: "40px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    width: "250px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  },
  title: {
    color: "#007bff",
  },
  author: {
    color: "#000",
  },
};

export default Books;

