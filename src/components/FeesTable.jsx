import React, { useEffect, useState } from "react";
import FetchStudentFeesApi from "../utils/students/FetchStudentFeesApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import UpdateStudentFeesApi from "../utils/students/UpdateStudentFessApi";
import Spinner from "./Spinner";

const allMonths = [
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

function FeesTable({ joinMonth }) {
  const params = useParams();
  const startIndex = allMonths.findIndex(
    (m) => m.toLowerCase() === joinMonth.toLowerCase()
  );

  const [fees, setFees] = useState(Array(12).fill(""));
  const [paymentDates, setPaymentDates] = useState(Array(12).fill(""));
  const [editingIndex, setEditingIndex] = useState(null);
  const [orderedMonths, setOrderedMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newOrderedMonths = [
      ...allMonths.slice(startIndex),
      ...allMonths.slice(0, startIndex),
    ];
    setOrderedMonths(newOrderedMonths);
  }, [startIndex]);

  const fetchStudentFees = async () => {
    try {
      const id = params.id;
      const res = await FetchStudentFeesApi(id);
      if (!res.data.success) toast.error(res.data.message);
      else {
        const { fees, paymentDates } = res.data.data;
        const orderedFeeValues = orderedMonths.map(
          (month) => fees[month] || ""
        );
        // const orderedDateValues = orderedMonths.map(month => (paymentDates?.[month]) || '');
        const orderedDateValues = orderedMonths.map((month) => {
          const rawDate = paymentDates?.[month];
          if (!rawDate) return "";
          const parsedDate = new Date(rawDate);
          // If it's a valid date, format to yyyy-MM-dd
          return isNaN(parsedDate)
            ? ""
            : parsedDate.toISOString().split("T")[0];
        });

        setFees(orderedFeeValues);
        setPaymentDates(orderedDateValues);
      }
    } catch (error) {
      console.log("Student Fees fetching failed", { error });
      toast.error("Failed to fetch student's fees");
    }
  };

  useEffect(() => {
    if (orderedMonths.length > 0) {
      fetchStudentFees();
      setLoading(false);
    }
  }, [orderedMonths]);

  const updateStudentFees = async (month, value, type = "fee") => {
    try {
      const id = params.id;
      const feeValue = fees[orderedMonths.indexOf(month)]; // Get the current fee value

      let payload;
      if (type === "fee") {
        payload = { id, month, fee: value };
      } else if (type === "date") {
        payload = { id, month, date: value, fee: feeValue }; // When updating date, include the fee value
      } else if (type === "both") {
        payload = { id, month, fee: value.fee, date: value.date }; // When updating both
      }

      const res = await UpdateStudentFeesApi(
        payload.id,
        payload.month,
        type === "fee" ? payload.fee : payload.date,
        type,
        payload.fee // send current fee for "date" type
      );      
      if (!res.data.success) toast.error(res.data.message);
    } catch (error) {
      console.log("Student Fees update failed", { error });
      toast.error("Failed to update student's fees");
    }
  };

  const handleFeeChange = (index, value) => {
    const newFees = [...fees];
    newFees[index] = value;
    setFees(newFees);
  };

  const handleDateChange = (index, value) => {
    const newDates = [...paymentDates];
    newDates[index] = value;
    setPaymentDates(newDates);
  };

  const getCellClass = (index) => {
    const feeEntered = fees[index];
    if (feeEntered) return "fee-paid";

    const rowMonthIndex = (startIndex + index) % 12;
    const currentMonthIndex = new Date().getMonth();

    const hasMonthPassed =
      (startIndex <= currentMonthIndex &&
        rowMonthIndex < currentMonthIndex &&
        rowMonthIndex >= startIndex) ||
      (startIndex > currentMonthIndex &&
        (rowMonthIndex >= startIndex || rowMonthIndex < currentMonthIndex));

    if (hasMonthPassed) return "fee-missing";

    return "";
  };

  return loading ? (
    <Spinner message="Loading fees data..." />
  ) : (
    <div className="fees-table-component">
      <h3>Student Fees Table</h3>
      <table className="fees-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Fees</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orderedMonths.map((month, index) => (
            <tr key={month}>
              <td>{month}</td>

              {/* Fee Cell */}
              <td
                className={getCellClass(index)}
                onClick={() => setEditingIndex(`fee-${index}`)}
              >
                {editingIndex === `fee-${index}` ? (
                  <input
                    type="number"
                    min={0}
                    value={fees[index]}
                    onChange={(e) => handleFeeChange(index, e.target.value)}
                    onBlur={() => {
                      setEditingIndex(null);
                      if (fees[index] !== "")
                        updateStudentFees(month, fees[index], "fee");
                    }}
                    autoFocus
                  />
                ) : (
                  fees[index] || "Click to enter fee"
                )}
              </td>

              {/* Date Cell */}
              <td onClick={() => setEditingIndex(`date-${index}`)}>
                {editingIndex === `date-${index}` ? (
                  <input
                    type="date"
                    value={paymentDates[index]}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value) updateStudentFees(month, value, "date");
                      setEditingIndex(null);
                    }}
                    autoFocus
                  />
                ) : (
                  paymentDates[index] || "Add Date"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeesTable;
