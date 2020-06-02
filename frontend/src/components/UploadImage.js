import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import styled from "styled-components";
import { Button } from "antd";

/* const UploadButton = styled.div`
  width: 80px;
  height: 30px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
`; */

const ViewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  overflow-x: scroll;
`;

const UploadImage = (props) => {
  const [images, setImages] = useState([]);

  const dropHandle = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/fomr-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...images, response.data.filePath]);
        props.refreshFunction([...images, response.data.filePath]);
      } else {
        alert("Failed to save file.");
      }
    });
  };

  const deleteHandle = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ViewBox>
        {images.map((image, index) => (
          <div onClick={() => deleteHandle(image)} key={index}>
            <img
              style={{
                minWidth: "300px",
                width: "300px",
                cursor: "pointer",
              }}
              src={`http://localhost:5000/${image}`}
              alt="img"
            />
          </div>
        ))}
      </ViewBox>
      <br />
      <br />
      <Dropzone onDrop={dropHandle}>
        {({ getRootProps, getInputProps }) => (
          <Button
            type="primary"
            className="login-form-button"
            style={{ width: "40%" }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            Upload File
          </Button>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadImage;
