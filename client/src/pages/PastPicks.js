import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import '../App.css'

export default function PastPicks() {
  
  const [books, setBooks] = useState([]);

  const url = "https://libretrieve.herokuapp.com/picks";

  useEffect(() => {
    const getBooks = async () => {
      console.log("Getting books...");
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.rows);
    }

    getBooks();
  }, []);

  return (
    <main>
      <Table bordered hover size="med" className="table">
        <thead className="table-header">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
          </tr>

          {books.map && books.map((item) => {
            return (<tr>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.date}</td>
            </tr>)
          })}
        </thead>
        
      </Table>
    </main>
  )
}