const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();
const jwtSecret = "fingerprint_customer";

let users = [];

//chekcing if the username is not used by any existing user
//returns true if the username is valid and not already taken
const isValid = (username) => {
  //returns boolean
  return (
    typeof username === "string" &&
    username.trim().length > 0 &&
    !users.some((user) => user.username === username)
  );
};

//checking if the username and password match an existing user
//returns true if the user is authenticated
const authenticatedUser = (username, password) => {
  //returns boolean
  return users.some(
    (user) => user.username === username && user.password === password,
  );
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
  req.session.authorization = { accessToken, username };
  // Store the access token and username in the session for authenticated requests
  return res
    .status(200)
    .json({ message: "User successfully logged in", accessToken });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  const { review } = req.body;

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (typeof review !== "string" || review.trim().length === 0) {
    return res.status(400).json({ message: "A review is required" });
  }

  book.reviews[req.user.username] = review.trim();
  return res.status(200).json({ message: "Review added successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  delete book.reviews[req.user.username];
  return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.jwtSecret = jwtSecret;
