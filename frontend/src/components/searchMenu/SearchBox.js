import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchBox(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandle = (event) => {
    setSearchTerm(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandle}
        style={{ width: 200 }}
        value={searchTerm}
      />
    </div>
  );
}

export default SearchBox;
