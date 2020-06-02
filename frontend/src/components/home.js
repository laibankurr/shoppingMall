import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import Checkbox from "./searchMenu/CheckBox";
import Radiobox from "./searchMenu/RadioBox";
import Searchbox from "./searchMenu/SearchBox";
import { size, price } from "./searchMenu/options";

const Home = (props) => {
  const [items, setItems] = useState([]);
  const [skips, setSkip] = useState(0);
  const limits = 8;
  //const [limits, setLimit] = useState(8);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [Options, setOptions] = useState({
    size: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: skips,
      limit: limits,
    };
    getItems(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItems = (body) => {
    axios.post("/api/items", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setItems([...items, ...response.data.itemInfo]);
        } else {
          setItems(response.data.itemInfo);
        }
        setItemQuantity(response.data.itemQuantity);
      } else {
        alert(" Failed to get items.");
      }
    });
  };

  const handleMore = () => {
    let newSkip = skips + limits;
    let body = {
      skip: newSkip,
      limit: limits,
      loadMore: true,
    };
    getItems(body);
    setSkip(newSkip);
  };

  const showResults = (options) => {
    let body = {
      skip: 0,
      limit: limits,
      options: options,
    };

    getItems(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleOptions = (options, category) => {
    const newOptions = { ...Options };

    newOptions[category] = options;

    if (category === "price") {
      let priceValues = handlePrice(options);
      newOptions[category] = priceValues;
    }
    showResults(newOptions);
    setOptions(newOptions);
  };

  const handleSearch = (newSearchTerm) => {
    let term = SearchTerm;
    term = newSearchTerm;
    let body = {
      skip: 0,
      limit: limits,
      optins: Options,
      searchTerm: term,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getItems(body);
  };

  const showItems = items.map((item, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/${item._id}`}>
              <div>
                <Carousel autoplay>
                  {item.images.map((image, index) => (
                    <div key={index}>
                      <img
                        style={{ width: "100%" }}
                        src={`http://localhost:5000/${image}`}
                        alt={"img"}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </a>
          }
        >
          <Meta title={item.title} description={`$${item.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>Second-hand Clothing Trade </h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <Checkbox
            sizeOption={size}
            handleOptions={(options) => handleOptions(options, "size")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <Radiobox
            priceOption={price}
            handleOptions={(options) => handleOptions(options, "price")}
          />
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <Searchbox refreshFunction={handleSearch} />
      </div>

      <Row gutter={[16, 16]}>{showItems}</Row>

      <br />

      {itemQuantity >= limits && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleMore}>More Item</button>
        </div>
      )}
    </div>
  );
};

export default withRouter(Home);
