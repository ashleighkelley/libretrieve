import React from 'react';
import Table from 'react-bootstrap/Table';

const Books = ({ items }) => {
  return (
    <div>
      {items.map((book) => {
        const {title, author, date} = book;
        return (
            <body>
                <Table striped bordered hover size="med">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{title}</td>
                        <td>{author}</td>
                        <td>{date}</td>
                    </tr>
                    </tbody>
            </Table>
          </body>
        );
      })}
    </div>
  );
};

export default Books;
