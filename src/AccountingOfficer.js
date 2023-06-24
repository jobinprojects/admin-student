import React from 'react';
import './AccountingOfficer.css';

const AccountingOfficer = ({ officer }) => {
  return (
    <div className="accounting-officer-container">
      <h1 className="accounting-officer-title">Accounting Officer</h1>
      <div className="accounting-officer-details">
        <p><strong>Name:</strong> {officer.name}</p>
        <p><strong>Email:</strong> <a href={`mailto:${officer.email}`} className="accounting-officer-email">{officer.email}</a></p>
      </div>
    </div>
  );
};

export default AccountingOfficer;

