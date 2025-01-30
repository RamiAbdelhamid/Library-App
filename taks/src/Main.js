import React from "react";
import Books from "./Books";
import CreateUser from "./CreateUser"

const Main = () => {
  return (
    <main style={{ padding: "20px", minHeight: "calc(100vh - 120px)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Our Collection
      </h2>
      <Books />
      <CreateUser/>
    </main>
  );
};

export default Main;
