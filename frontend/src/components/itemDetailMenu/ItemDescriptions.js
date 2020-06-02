import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../_actions/actions";
import { Descriptions, Button } from "antd";

const ItemDescriptions = (props) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState("");

  const handleClick = () => {
    dispatch(addToCart(props.infos._id));
  };

  useEffect(() => {
    SizeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.infos]);

  const SizeCheck = () => {
    switch (props.infos.size) {
      case 1:
        setSize("XS");
        break;
      case 2:
        setSize("S");
        break;
      case 3:
        setSize("M");
        break;
      case 4:
        setSize("L");
        break;
      case 5:
        setSize("XL");
        break;
      case 6:
        setSize("XXL");
        break;
      case 7:
        setSize("XXXL");
        break;
      default:
        setSize("");
    }
  };

  return (
    <div>
      <div>
        <Descriptions title="Item Info" bordered layout="vertical">
          <Descriptions.Item label="PRICE ($)">
            {props.infos.price}
          </Descriptions.Item>
          <Descriptions.Item label="SOLD">{props.infos.sold}</Descriptions.Item>
          <Descriptions.Item label="SIZE">{size}</Descriptions.Item>
          <Descriptions.Item label="DESCRIPTION">
            {props.infos.description}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" type="primary" onClick={handleClick}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptions;
