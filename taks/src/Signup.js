import { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCY6Ux1JWo6CgfyEy4lszb0FPUNRqxSzkQ",
  authDomain: "react-4d791.firebaseapp.com",
  projectId: "react-4d791",
  storageBucket: "react-4d791.firebasestorage.app",
  messagingSenderId: "555963653065",
  appId: "1:555963653065:web:1f3eab4544f300b26e6618",
  measurementId: "G-3D01WBF2ES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Check if user is signed in
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Sign Up Function
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      alert(`✅ Welcome, ${name}!`);
    } catch (error) {
      setError(error.message);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp} className="form">
        <h2>{user ? `Welcome, ${name}` : "Sign Up"}</h2>

        {!user && (
          <>
            <label className="label">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </label>
            <label className="label">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </label>
            <label className="label">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </label>
            <label className="label">
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="button">
              Sign Up
            </button>
          </>
        )}

        {/* Show Logout Button if user is logged in */}
        {user && (
          <button onClick={handleLogout} className="button">
            Log Out
          </button>
        )}
      </form>
    </div>
  );
}

export default Signup;
