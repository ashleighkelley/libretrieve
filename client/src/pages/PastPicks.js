import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import '../App.css'
import Moment from 'moment';

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
      <Table hover size="med">
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
              <td>{Moment(item.date).format('MMM YYYY')}</td>
              </tr>)
            })}
        </thead>
        
      </Table>
    </main>
  )
}