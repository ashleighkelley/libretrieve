import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Books({ title, author, date}) {
  return (
    <div className='cocktail'>
      <Table striped bordered hover size="med">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          
        </Table>
    </div>
  )
};
