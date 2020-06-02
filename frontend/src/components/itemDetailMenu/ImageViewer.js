import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

const ImageViewer = (props) => {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.infos.images && props.infos.images.length > 0) {
      let images = [];

      props.infos.images.forEach((item) => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        });
      });
      setImages(images);
    }
  }, [props.infos]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
};

export default ImageViewer;
