import React from "react";

import Autocomplete from "../../components/Autocomplete";
import { search } from "../../api";
const styles = {
  width: "200px",
  border: "1px solid red",
  cursor: "pointer",
  height: "27px",
  padding: "4px",
  boxSizing: "border-box"
};
const customValueComponent = ({ value }) => {
  return <div style={styles}>You choosen {value}!!!</div>;
};

class Demo extends React.Component {
  state = { value: { name: "" } };

  chooseValue = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        Available currencies ETH, ETC, BTC
        <Autocomplete
          value={this.state.value}
          fieldName="name"
          getItems={search}
          onChange={this.chooseValue}
          valueComponent={customValueComponent}
        />
      </div>
    );
  }
}

export default Demo;
