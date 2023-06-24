import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountingOfficer from './AccountingOfficer';
import './FeeStatusModule.css';

const FeeStatusModule = ({ officer }) => {
  const [students, setStudents] = useState([]);
  const [sortColumn, setSortColumn] = useState('enrollmentNo');
  const [sortDirection, setSortDirection] = useState('asc');

  const getColumnValue = (student, column) => {
    switch (column) {
      case 'enrollmentNo':
        return student.enrollmentNo;
      case 'fullName':
        return student.fullName;
      case 'email':
        return student.email;
      case 'mobile':
        return student.mobile;
      case 'year':
        return student.year;
      case 'modeOfPayment':
        return student.paymentMode;
      case 'amount':
        return student.Amount;
      case 'feeStatus':
        return student.feeStatus;
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/students');
        const data = response.data;
        setStudents(data);
      } catch (error) {
        console.error(error);
        // Handle error cases
      }
    };

    fetchData();
  }, []);

  const handleFeeStatusUpdate = (studentId, action, value = '') => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        if (action === 'accept') {
          student.feeStatus = 'Paid';
          student.remarks = 'accept';
        } else if (action === 'reject') {
          student.feeStatus = 'Rejected';
          student.remarks = 'reject';
          student.reason = value || '';
        } else {
          // Custom action (e.g., update remarks)
          student.remarks = value || '';
        }
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const downloadProofOfPayment = (proofOfPaymentUrl, filename) => {
    // Handle the download logic here (e.g., opening a new window or triggering a file download)

    // Example placeholder code:
    const link = document.createElement('a');
    link.href = proofOfPaymentUrl;
    link.download = filename;
    link.target = '_blank';
    link.click();
  };

  const sortedStudents = [...students].sort((a, b) => {
    const valueA = getColumnValue(a, sortColumn);
    const valueB = getColumnValue(b, sortColumn);

    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleKeyPress = (event, studentId) => {
    if (event.key === 'Enter') {
      const inputField = event.target;
      handleFeeStatusUpdate(studentId, 'remarks', inputField.value);
      inputField.blur(); // Remove focus from input field
    }
  };

  return (
    <div className="fee-status-module">
     <div className="hero-image">
        <a href="#" title="Home">
          <img
            src="http://www.bvicam.in/sites/default/files/BVICAM%20red%20logo_2.png"
            alt="Home"
            style={{ width: '190px' }}
          />
        </a>
        <div>
          <img
            id="logo-image"
            src="https://bharatividyapeethfees.com/college/sitedata/images/pay_right.png"
            alt="Logo"
            style={{ width: '110px' }}
          />
        </div>
      </div>
      <div id="site-name">
        <strong>
          <a>
            <div id="website_name">
              Bharati Vidyapeeth's Institute of <br></br>Computer Applications and Management (BVICAM)<br />MCA | BA(JMC)
            </div>
          </a>
        </strong>
      </div>
      <AccountingOfficer officer={officer} />
      <marquee>
        <h2>Fee Status</h2>
      </marquee>
      <table className="student-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('enrollmentNo')}>
              Enrollment No. {sortColumn === 'enrollmentNo' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('fullName')}>
              Full Name {sortColumn === 'fullName' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('mobile')}>
              Mobile {sortColumn === 'mobile' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('year')}>
              Year {sortColumn === 'year' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('modeOfPayment')}>
              Mode of Payment {sortColumn === 'modeOfPayment' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('amount')}>
              Amount {sortColumn === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('feeStatus')}>
              Fee Status {sortColumn === 'feeStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th>Action</th>
            <th>Remarks</th>
            <th>Download Proof</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.enrollmentNo}</td>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.mobile}</td>
              <td>{student.year}</td>
              <td>{student.paymentMode}</td>
              <td>{student.Amount}</td>
              <td>{student.feeStatus}</td>
              <td className="select-action">
                <select
                  value={student.remarks || ''}
                  onChange={(e) => handleFeeStatusUpdate(student.id, e.target.value)}
                >
                  <option value="">Select Action</option>
                  <option value="accept">Accept</option>
                  <option value="reject">Reject</option>
                </select>
                {student.remarks === 'reject' && (
                  <input
                    type="text"
                    value={student.reason || ''}
                    onChange={(e) => handleFeeStatusUpdate(student.id, 'reject', e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, student.id)}
                    placeholder="Reason for rejection"
                  />
                )}
              </td>
              <td>{student.remarks}</td>
              <td>
                {student.proofOfPayment && (
                  <button
                    onClick={() => downloadProofOfPayment(student.proofOfPayment, `${student.fullName}_ProofOfPayment`)}
                    className="download-button"
                  >
                    Download
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeStatusModule;
