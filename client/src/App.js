import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <header className="App">
        <h1>Creature Club Book Club</h1>
      </header>

      <body>
        <h3>Past Book Choices</h3>

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
              <td>Blankets</td>
              <td>Craig Thompson</td>
              <td>March 2021</td>
            </tr>
          </tbody>
        </Table>
      </body>
    </>
  );
}

export default App;
