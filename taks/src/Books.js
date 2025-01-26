import React from "react";

const Books = () => {
  const book1 = {
    id: 1,
    title: "مقدمة ابن خلدون ",
    author: "ابن خلدون ",
    isbn: "1289499030",
  };
  const book2 = {
    id: 2,
    title: "الحاوي في الطب ",
    author: "ابو بكر الرازي ",
    isbn: "893847239479",
  };
   const book3 = {
        id: 3,
        title: "كتاب سيبويه",
        author: "سيبويه",
        isbn: "1234567890",
      };
      const book4 = {
        id: 4,
        title: "تفسير الطبري",
        author: "الطبري",
        isbn: "0987654321",
      };
    
  const books = [book1, book2, book3, book4];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        margin: "40px",
      }}
    >
      {books.map((book) => (
        <div

          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            width: "250px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h1 >
           ID: {book.id}
          </h1>
          <h3>
          Title:  {book.title}
          </h3>
          <p >
            Author: {book.author}
          </p>
          <p >ISBN: {book.isbn}</p>
        </div>
      ))}
    </div>
  );
};

export default Books;
