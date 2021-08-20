import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalContext } from '../context'

export default function Books() {
const { books } = useGlobalContext();

  return (
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
  )
};
