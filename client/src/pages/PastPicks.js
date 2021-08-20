import React, {useState} from 'react'
import Table from 'react-bootstrap/Table';

export default function PastPicks() {
  
  const [books, setBooks] = useState([]);

  const url = "http://libretrieve.herokuapp.com/picks";

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const books = data.rows;
  }

  return (
    <main>
      <div className='cocktail'>
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
      </div>
    </main>
  )
}