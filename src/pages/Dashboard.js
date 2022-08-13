import React, { useEffect, useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { Row } from "react-bootstrap";
import { TransactionForm } from "../components/form/TransactionForm";
import { TransactionTable } from "../components/transaction-table/TransactionTable";
import {
  deleteTransaction,
  getTransactions,
  postTransaction,
} from "../helpers/axiosHelper";
import { toast } from "react-toastify";

const Dashboard = ({ isLogedIn }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { status, message, trans } = await getTransactions();
    status === "success" && setTransactions(trans);
  };

  const postData = async (form) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const userId = user._id;
    const { status, message } = await postTransaction({ ...form, userId });
    toast[status](message);

    status === "success" && fetchData();
  };

  const handleOnDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delet it?")) {
      return;
    }
    const { status, message } = await deleteTransaction(_id);
    console.log(status, message);
    toast[status](message);

    status === "success" && fetchData();
  };
  return (
    <MainLayout isLogedIn={isLogedIn}>
      <Row>
        <h3 className="mt-4">Dashboard</h3>
        <hr />
        {/* form section */}
        <TransactionForm postData={postData} />
        <hr className="mt-5" />

        {/* table section */}
        <TransactionTable
          transactions={transactions}
          handleOnDelete={handleOnDelete}
        />
      </Row>
    </MainLayout>
  );
};

export default Dashboard;
