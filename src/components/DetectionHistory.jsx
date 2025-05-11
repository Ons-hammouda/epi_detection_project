import React from 'react';

const DetectionHistory = ({ history }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Résultat</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => (
          <tr key={index}>
            <td><img src={item.imageUrl} alt="historique" style={{ width: '50px' }} /></td>
            <td>{item.result}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetectionHistory;
