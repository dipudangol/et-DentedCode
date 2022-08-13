import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

export const TransactionTable = ({ transactions, handleOnDelete }) => {
  const total = transactions.reduce((acc, { type, amount }) => {
    return type === "income" ? acc + amount : acc - amount;
  }, 0);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Title</th>
            <th>Expenses</th>
            <th>Income</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.title}</td>
                <td className="text-danger">
                  {item.type === "expenses" && "- " + item.amount}
                </td>
                <td className="text-success">
                  {item.type === "income" && item.amount}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleOnDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="text-end fw-bold">Balance: ${total}</div>
    </>
  );
};
