import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Table striped bordered hover size="med">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
            </tr>

            {books.map((item) => {
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