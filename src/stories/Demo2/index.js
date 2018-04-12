import React from "react";

import Autocomplete from "../../components/Autocomplete";
import { search } from "../../api";

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
          itemRender={({ name, value }) => {
            return `${name} (ballance: ${value})`;
          }}
        />
      </div>
    );
  }
}

export default Demo;
