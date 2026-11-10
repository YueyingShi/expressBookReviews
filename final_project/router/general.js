const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!doesExist(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const book = books[req.params.isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(
    (book) => book.author === author,
  );
  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }
  return res.status(200).json(booksByAuthor);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(
    (book) => book.title === title,
  );
  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "No books found for this title" });
  }
  return res.status(200).json(booksByTitle);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const book = books[req.params.isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!book.reviews || Object.keys(book.reviews).length === 0) {
    return res.status(404).json({ message: "No reviews found for this book" });
  }
  return res.status(200).json(book.reviews);
});

// ============================================================================
// ASYNC/AWAIT METHODS - Retrieve books with Axios
// ============================================================================

// Get all books using async/await
async function getAllBooksAsync() {
  try {
    const response = await axios.get("http://localhost:5000/");
    console.log("All books retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving all books:", error.message);
  }
}

// Get book by ISBN using async/await
async function getBookByISBNAsync(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log(`Book details for ISBN ${isbn}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving book by ISBN ${isbn}:`, error.message);
  }
}

// Get books by author using async/await
async function getBooksByAuthorAsync(author) {
  try {
    const response = await axios.get(
      `http://localhost:5000/author/${encodeURIComponent(author)}`
    );
    console.log(`Books by author ${author}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error retrieving books by author ${author}:`,
      error.message
    );
  }
}

// Get books by title using async/await
async function getBooksByTitleAsync(title) {
  try {
    const response = await axios.get(
      `http://localhost:5000/title/${encodeURIComponent(title)}`
    );
    console.log(`Books with title ${title}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error retrieving books by title ${title}:`,
      error.message
    );
  }
}

// Get book reviews using async/await
async function getBookReviewAsync(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/review/${isbn}`);
    console.log(`Reviews for ISBN ${isbn}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving reviews for ISBN ${isbn}:`, error.message);
  }
}

// ============================================================================
// PROMISE CALLBACK METHODS - Retrieve books with Axios
// ============================================================================

// Get all books using promise callbacks
function getAllBooksCallback() {
  axios
    .get("http://localhost:5000/")
    .then((response) => {
      console.log("All books retrieved:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving all books:", error.message);
    });
}

// Get book by ISBN using promise callbacks
function getBookByISBNCallback(isbn) {
  axios
    .get(`http://localhost:5000/isbn/${isbn}`)
    .then((response) => {
      console.log(`Book details for ISBN ${isbn}:`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error retrieving book by ISBN ${isbn}:`, error.message);
    });
}

// Get books by author using promise callbacks
function getBooksByAuthorCallback(author) {
  axios
    .get(`http://localhost:5000/author/${encodeURIComponent(author)}`)
    .then((response) => {
      console.log(`Books by author ${author}:`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Error retrieving books by author ${author}:`,
        error.message
      );
    });
}

// Get books by title using promise callbacks
function getBooksByTitleCallback(title) {
  axios
    .get(`http://localhost:5000/title/${encodeURIComponent(title)}`)
    .then((response) => {
      console.log(`Books with title ${title}:`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Error retrieving books by title ${title}:`,
        error.message
      );
    });
}

// Get book reviews using promise callbacks
function getBookReviewCallback(isbn) {
  axios
    .get(`http://localhost:5000/review/${isbn}`)
    .then((response) => {
      console.log(`Reviews for ISBN ${isbn}:`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error retrieving reviews for ISBN ${isbn}:`, error.message);
    });
}

module.exports.general = public_users;
module.exports.getAllBooksAsync = getAllBooksAsync;
module.exports.getBookByISBNAsync = getBookByISBNAsync;
module.exports.getBooksByAuthorAsync = getBooksByAuthorAsync;
module.exports.getBooksByTitleAsync = getBooksByTitleAsync;
module.exports.getBookReviewAsync = getBookReviewAsync;
module.exports.getAllBooksCallback = getAllBooksCallback;
module.exports.getBookByISBNCallback = getBookByISBNCallback;
module.exports.getBooksByAuthorCallback = getBooksByAuthorCallback;
module.exports.getBooksByTitleCallback = getBooksByTitleCallback;
module.exports.getBookReviewCallback = getBookReviewCallback;
