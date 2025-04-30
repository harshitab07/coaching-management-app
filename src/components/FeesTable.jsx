import React, { useEffect, useState } from 'react';
import FetchStudentFeesApi from '../utils/students/FetchStudentFeesApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import UpdateStudentFeesApi from '../utils/students/UpdateStudentFessApi';
import Spinner from './Spinner';

const allMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function FeesTable({ joinMonth }) {
  const params = useParams();
  const startIndex = allMonths.findIndex(m => m.toLowerCase() === joinMonth.toLowerCase());

  const [fees, setFees] = useState(Array(12).fill(''));
  const [editingIndex, setEditingIndex] = useState(null);
  const [orderedMonths, setOrderedMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Generate orderedMonths based on startIndex
  useEffect(() => {
    const newOrderedMonths = [...allMonths.slice(startIndex), ...allMonths.slice(0, startIndex)];
    setOrderedMonths(newOrderedMonths);
  }, [startIndex]);

  const fetchStudentFees = async () => {
    try {
      const id = params.id;
      const res = await FetchStudentFeesApi(id);
      if (!res.data.success) toast.error(res.data.message);
      else {
        const fees = res.data.data.fees;
        const orderedFeeValues = orderedMonths.map(month => fees[month] || '');
        setFees(orderedFeeValues);
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

  const updateStudentFees = async (month, fee) => {
    try {
      const id = params.id;
      const res = await UpdateStudentFeesApi(id, month, fee);
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

  const getCellClass = (index) => {
    const feeEntered = fees[index];
    if (feeEntered) return 'fee-paid';
  
    const rowMonthIndex = (startIndex + index) % 12;
    const currentMonthIndex = new Date().getMonth();

    const hasMonthPassed = (
      (startIndex <= currentMonthIndex &&
        rowMonthIndex < currentMonthIndex &&
        rowMonthIndex >= startIndex)
      ||
      (startIndex > currentMonthIndex &&
        (rowMonthIndex >= startIndex || rowMonthIndex < currentMonthIndex))
    );
  
    if (hasMonthPassed) return 'fee-missing';
  
    return '';
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
          </tr>
        </thead>
        <tbody>
          {orderedMonths.map((month, index) => (
            <tr key={month}>
              <td>{month}</td>
              <td
                className={getCellClass(index)}
                onClick={() => {
                  if (fees[index] === '') {
                    const newFees = [...fees];
                    newFees[index] = '';
                    setFees(newFees);
                  }
                  setEditingIndex(index);
                }}
              >
                {editingIndex === index ? (
                  <input
                    type="number"
                    min={0}
                    value={fees[index]}
                    onChange={(e) => handleFeeChange(index, e.target.value)}
                    onBlur={() => {
                      setEditingIndex(null);
                      const month = orderedMonths[index];
                      const fee = fees[index];
                      if (fee !== '') updateStudentFees(month, fee);
                    }}
                    autoFocus
                  />
                ) : (
                  fees[index] || 'Click to enter fee'
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
