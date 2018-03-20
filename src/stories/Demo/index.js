import React from "react";

import Autocomplete from "../../components/Autocomplete/Autocomplete";
import { search } from "../../api";

const ItemRender = ({ value, name, ...props }) => (
  <div {...props}>
    {name} ({value})
  </div>
);

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
          itemRender={ItemRender}
        />
      </div>
    );
  }
}

export default Demo;
