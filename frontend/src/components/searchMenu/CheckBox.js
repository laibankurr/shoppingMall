import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [check, setCheck] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = check.indexOf(value);

    const newCheck = [...check];

    if (currentIndex === -1) {
      newCheck.push(value);
    } else {
      newCheck.splice(currentIndex, 1);
    }
    setCheck(newCheck);
    props.handleOptions(newCheck);
  };

  const showOptions = () =>
    props.sizeOption &&
    props.sizeOption.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={check.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name} </span>{" "}
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Size" key="1">
          {showOptions()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
