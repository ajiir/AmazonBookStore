import React, { useState, useEffect } from "react";
import axios from "axios";

export default (categoryID, searchText, refreshCategory, setRefresh) => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchBook = (searchValue) => {
    console.log(searchValue + "Tulhuur ugeer hailt ehellee....");
  };

  useEffect(() => {
    let limit = 30;
    let search = "";

    if (searchText) {
      limit = 50;
      search = `&search=${searchText}`;
    }

    setLoading(true);

    axios
      .get(
        `http://192.168.1.40:8000/api/v1/categories/${categoryID}/books?limit=${limit}${search}`
      )
      .then((result) => {
        console.log("Номнуудыг амжилттай хүлээж авлаа...");

        setBooks(result.data.data);
        setErrorMessage(null);
        setLoading(false);
        setRefresh(false);
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сервер дээр энэ өгөгдөл байхгүй байна!!!";
        else if (message === "Network Error")
          message =
            "Сервер ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу?";
        setErrorMessage(message);
        setLoading(false);
      });
  }, [categoryID, searchText, refreshCategory]);

  return [books, errorMessage, searchBook, loading];
};
