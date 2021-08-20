import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const url = "http://libretrieve.herokuapp.com/";
  const page = "picks";

  const fetchBooks = useCallback( async() => {
    try {
      const response = await fetch(`${url}${page}`);
      const data = await response.json();
      console.log(data);
      const { books } = data;
      if (books) {
        const bookPicks = books.map((item) => {
          const {
            title,
            author,
            date,
          } = item;

          return {
            title: title,
            author: author,
            date: date,
          }
        })
        setBooks(bookPicks);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.log(error)
    }
  }, [page])

  return( <AppContext.Provider value={{
    books, page
  }}>
    {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
