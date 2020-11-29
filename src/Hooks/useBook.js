import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { restApiUrl } from "../../Constants";

export default (bookId) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const state = useContext(UserContext);

  const loadBook = async () => {
    try {
      const result = await axios.get(`${restApiUrl}/api/v1/books/${bookId}`);
      console.log(result.data.data);
      setBook(result.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBook = (bookId) => {
    return axios.delete(`${restApiUrl}/api/v1/books/${bookId}`, {
      headers: {
        Authorization: "Bearer " + state.token,
      },
    });
  };

  useEffect(() => {
    loadBook();
  }, []);

  return [book, error, deleteBook];
};
