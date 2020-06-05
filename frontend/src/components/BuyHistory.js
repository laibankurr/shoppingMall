import React from "react";
import styled from "styled-components";

const HistoryPage = (props) => {
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Purchase History</h1>
      </div>
      <br />

      <Table>
        <thead>
          <tr>
            <TH>Payment Id</TH>
            <TH>Price($)</TH>
            <TH>Quantity</TH>
            <TH>Date of Purchase</TH>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history &&
            props.user.userData.history.map((item) => (
              <tr key={item.id}>
                <TD>{item.id}</TD>
                <TD>{item.price}</TD>
                <TD>{item.quantity}</TD>
                <TD>{item.dateOfPurchase}</TD>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HistoryPage;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const TD = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const TH = styled.th`
  border: 1px solid #ffffff;
  text-align: left;
  padding: 8px;
  background-color: #dddddd;
`;
