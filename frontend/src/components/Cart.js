import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getItem, deleteItem, purchase } from "../_actions/actions";
import { Empty, Result } from "antd";
import styled from "styled-components";
//import Paypal from "../../utils/Paypal";

const Cart = (props) => {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItems = [];

    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getItem(cartItems, props.user.userData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  let deleteFromCart = (itemId) => {
    dispatch(deleteItem(itemId)).then((response) => {
      if (response.payload.itemInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const transactionSuccess = (data) => {
    dispatch(
      purchase({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
      }
    });
  };

  const showItemImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const showItemInfo = () =>
    props.user.cartDetail &&
    props.user.cartDetail.map((item, index) => (
      <tr key={index}>
        <TD>
          <img
            style={{ width: "70px" }}
            alt="item"
            src={showItemImage(item.images)}
          />
        </TD>
        <TD>{item.quantity} EA</TD>
        <TD>$ {item.price}</TD>
        <TD>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => deleteFromCart(item._id)}
          >
            Remove
          </button>
        </TD>
      </tr>
    ));

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>Current Cart</h1>
      <div>
        <Table>
          <thead>
            <tr>
              <TH>Image</TH>
              <TH>Quantity</TH>
              <TH>Price</TH>
              <TH>Remove</TH>
            </tr>
          </thead>
          <tbody>{showItemInfo()}</tbody>
        </Table>
      </div>

      {ShowTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>TotaL Price: $ {Total}</h2>
        </div>
      ) : ShowSuccess ? (
        <Result status="success" title="Purchase was successful." />
      ) : (
        <>
          <br />
          <Empty description={false} />
        </>
      )}
    </div>
  );
};

export default Cart;

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
