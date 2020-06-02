import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageViewer from "./itemDetailMenu/ImageViewer";
import ItemDescriptions from "./itemDetailMenu/ItemDescriptions";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";

const ItemInfo = (props) => {
  const itemId = props.match.params.itemId;
  const [Item, setItem] = useState({});

  useEffect(() => {
    axios
      .get(`/api/itemsbyid?id=${itemId}&type=single`)
      .then((response) => {
        setItem(response.data[0]);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Item.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ImageViewer infos={Item} />
        </Col>
        <Col lg={12} sm={24}>
          <ItemDescriptions infos={Item} />
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(ItemInfo);
