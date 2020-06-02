import React, { useState } from "react";
import { Form, Input } from "antd";
import UploadImage from "./UploadImage";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const { TextArea } = Input;

const Sizes = [
  { key: 1, value: "XS" },
  { key: 2, value: "S" },
  { key: 3, value: "M" },
  { key: 4, value: "L" },
  { key: 5, value: "XL" },
  { key: 6, value: "XXL" },
  { key: 7, value: "XXXL" },
];

const UploadItem = (props) => {
  const [itemInfo, setItemInfo] = useState({
    title: "",
    description: "",
    price: 0,
    size: 1,
  });

  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItemInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandle = (event) => {
    event.preventDefault();

    if (
      !itemInfo.title ||
      !itemInfo.description ||
      !itemInfo.price ||
      !itemInfo.size ||
      !images
    ) {
      return alert(" You have to put a value on all the items..");
    }

    const body = {
      writer: props.user._id,
      title: itemInfo.title,
      description: itemInfo.description,
      price: itemInfo.price,
      images: images,
      size: itemInfo.size,
    };

    Axios.post("/api/item", body).then((response) => {
      if (response.data.success) {
        alert("Product upload was successful");
        props.history.push("/");
      } else {
        alert("Failed to upload file.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Product Upload</h2>
      </div>
      <Form onSubmit={submitHandle}>
        <UploadImage refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input name="title" onChange={handleChange} value={itemInfo.title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          name="description"
          onChange={handleChange}
          value={itemInfo.description}
        />
        <br />
        <br />
        <label>Price($)</label>
        <Input
          name="price"
          type="number"
          onChange={handleChange}
          value={itemInfo.price}
        />
        <br />
        <br />
        <select name="size" onChange={handleChange}>
          {Sizes.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit" onClick={submitHandle}>
          Confirm
        </button>
      </Form>
    </div>
  );
};

export default withRouter(UploadItem);
