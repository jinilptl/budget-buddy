import React, { useContext, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {TransactionList } from "../components/TransactionList"; // tumhara apna component
import TransactionReportPDF from "../components/TransactionReportPDF"; // naya PDF component
import { TransactionContext } from "../context/TransactionContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const History = () => {

  const {  Transactions } = useContext(TransactionContext);
  console.log("all transactions in history page ", Transactions);
  let transactions=Transactions
  
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get week number of month
  const getWeekOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDay.getDay()) / 7);
  };

  // Filters
  const filterByMonthYearWeek = (txn) => {
    const txnDate = new Date(txn.transactionDate);
    if (selectedMonth !== "" && txnDate.getMonth() !== parseInt(selectedMonth))
      return false;
    if (selectedYear !== "" && txnDate.getFullYear() !== parseInt(selectedYear))
      return false;
    if (
      selectedWeek !== "" &&
      getWeekOfMonth(txnDate) !== parseInt(selectedWeek)
    )
      return false;
    return true;
  };

  const filterByDateRange = (txn) => {
    const txnDate = new Date(txn.transactionDate).toISOString().split("T")[0];
    if (startDate && txnDate < startDate) return false;
    if (endDate && txnDate > endDate) return false;
    return true;
  };

  const filteredData = transactions.filter(
    (txn) => filterByDateRange(txn) && filterByMonthYearWeek(txn)
  );
console.log("filter data is ",filteredData);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          className="border rounded p-2"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option value="">All Weeks</option>
          {[1, 2, 3, 4, 5].map((w) => (
            <option key={w} value={w}>
              Week {w}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Transactions List */}
      <TransactionList transactions={filteredData} />

      {/* Download PDF */}
      <div className="mt-6">
        <PDFDownloadLink
          document={
            <TransactionReportPDF
              transactions={filteredData}
              filters={{
                startDate,
                endDate,
                selectedMonth:
                  selectedMonth !== "" ? months[selectedMonth] : "",
                selectedYear,
                selectedWeek,
              }}
            />
          }
          fileName="transactions.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Preparing PDF...
              </button>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default History;
