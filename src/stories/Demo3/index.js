import React from "react";

import Autocomplete from "../../components/Autocomplete/Autocomplete";
import { search } from "../../api";

let letters = "";

function makeUnique(str) {
  return String.prototype.concat(...new Set(str));
}

const customValueComponent = ({ value, onChange }) => {
  letters = makeUnique(letters + value);

  return (
    <div>
      <div>All uniq symbols that was written on input: {letters}</div>
      <input value={value} onChange={onChange} />
    </div>
  );
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
