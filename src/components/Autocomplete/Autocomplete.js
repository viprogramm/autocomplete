import React from "react";

import "./style.css";

import { string, func, array } from "prop-types";
import List from "../List/List";
import DefaultValueComponent from "../DefaultValueComponent/DefaultValueComponent";
import withOutsideHandler from "../../hocs/withOutsideHandler";
import withPrepareValueProp from "../../hocs/withPrepareValueProp";
import withGetItems from "../../hocs/withGetItems";

class Autocomplete extends React.Component {
  componentDidMount() {
    this.props.getItems(this.props.value);
  }

  shouldShowList() {
    return this.props.items.length > 0;
  }

  clearInput() {
    this.props.clearValue();
  }

  hideResultsList() {
    this.props.clearItems();
  }

  clearAutocomplete = () => {
    this.clearInput();
    this.hideResultsList();
  };

  onChooseItem = item => e => {
    this.hideResultsList();
    this.props.onChange(item);
  };

  onOutsideClick = () => {
    const isListShown = this.shouldShowList();
    if (isListShown) {
      this.clearAutocomplete();
    }
  };

  onChangeValue = e => {
    const { value } = e.target;
    this.props.changeValue(value);
    this.props.getItems(value);
  };

  render() {
    const {
      className,
      valueComponent: ValueComponent,
      value,
      items,
      itemRender
    } = this.props;
    return (
      <div className={`autocomplete ${className}`}>
        <ValueComponent value={value} onChange={this.onChangeValue} />
        {this.shouldShowList() && (
          <List
            className="autocomplete_result"
            items={items}
            onClick={this.onChooseItem}
            itemRender={itemRender}
          />
        )}
      </div>
    );
  }
}

Autocomplete.propTypes = {
  items: array,
  value: string,
  className: string,
  onChange: func.isRequired,
  getItems: func.isRequired,
  valueComponent: func
};

Autocomplete.defaultProps = {
  value: "",
  className: "",
  valueComponent: DefaultValueComponent,
  items: []
};

export default withPrepareValueProp(
  withGetItems(withOutsideHandler(Autocomplete))
);
