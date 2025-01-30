import React, { useState, useEffect } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]); // Store Firebase data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const bookUrl = "https://react-4d791-default-rtdb.firebaseio.com/books"; // Firebase base URL

  // ✅ Fetch data from Firebase using axios
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${bookUrl}.json`);

        if (response.data) {
          // Convert Firebase object to array and filter out deleted books
          const booksArray = Object.entries(response.data)
            .map(([id, book]) => ({ id, ...book }))
            .filter((book) => !book.deleted); // Exclude deleted books

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

  // ✅ Soft Delete Function
  const softDeleteBook = async (bookId) => {
    try {
      await axios.patch(`${bookUrl}/${bookId}.json`, { deleted: true });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId)); // Remove from UI
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book.");
    }
  };

  // ✅ Update Book Function
  const updateBook = async (bookId, currentTitle, currentAuthor) => {
    const newTitle = prompt("Enter new title:", currentTitle);
    const newAuthor = prompt("Enter new author:", currentAuthor);

    if (newTitle && newAuthor) {
      try {
        await axios.patch(`${bookUrl}/${bookId}.json`, {
          title: newTitle,
          author: newAuthor,
        });
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId
              ? { ...book, title: newTitle, author: newAuthor }
              : book
          )
        );
      } catch (err) {
        console.error("Error updating book:", err);
        alert("Failed to update book.");
      }
    }
  };

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
            <button
              style={styles.deleteButton}
              onClick={() => softDeleteBook(book.id)}
            >
              Delete
            </button>
            <button
              style={styles.updateButton}
              onClick={() => updateBook(book.id, book.title, book.author)}
            >
              Update
            </button>
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
  deleteButton: {
    marginTop: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    marginRight: "5px",
  },
  updateButton: {
    marginTop: "10px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Books;
