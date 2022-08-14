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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate=useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect (()=>{
    !user._id && navigate('/');

  },[user])
  return (
    <MainLayout   >
      <Row>
        <h3 className="mt-4">Dashboard</h3>
        <hr />
        {/* form section */}
        <TransactionForm />
        <hr className="mt-5" />

        {/* table section */}
        <TransactionTable />
      </Row>
    </MainLayout>
  );
};

export default Dashboard;
