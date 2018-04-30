import React from "react";
import _debounce from "lodash/debounce";
import { string, func, array } from "prop-types";
import List from "../List/List";
import DefaultValueComponent from "../DefaultValueComponent/DefaultValueComponent";

import "./style.css";

class Autocomplete extends React.Component {
  state = {
    editMode: true,
    canClearInput: false
  };

  debounceGetItems = _debounce(this.props.getItems, 200);

  componentDidMount() {
    this.props.getItems(this.props.value);
  }

  turnOnEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  turnOffEditMode = () => {
    this.setState({
      editMode: false
    });
  };

  clearInput() {
    this.props.onChangeValue("");
  }

  hideResultsList() {
    this.props.getItems("");
  }

  onBlur = () => {
    if (this.state.canClearInput && this.props.items.length === 0) {
      this.clearInput();
      this.hideResultsList();
    }
  };

  onSelectItem = item => e => {
    this.setState({ canClearInput: false });
    this.hideResultsList();
    this.turnOffEditMode();
    this.props.onChange(item);
  };

  onChange = e => {
    const { value } = e.target;
    if (!this.state.canClearInput) {
      this.setState({ canClearInput: true });
    }
    this.props.onChangeValue(value);
    this.debounceGetItems(value);
  };

  renderValueComponent() {
    const { editMode } = this.state;
    const { value, valueComponent: ValueComponent } = this.props;
    return editMode ? (
      <input
        type="text"
        value={value}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    ) : (
      <div style={{ display: "inline-block" }} onClick={this.turnOnEditMode}>
        <ValueComponent value={value} />
      </div>
    );
  }

  render() {
    const { className, items, itemRender } = this.props;
    return (
      <div className={`autocomplete ${className}`}>
        {this.renderValueComponent()}
        <List
          className="autocomplete_result"
          items={items}
          onMouseDown={this.onSelectItem}
          itemRender={itemRender}
        />
      </div>
    );
  }
}

Autocomplete.propTypes = {
  className: string,

  onChange: func.isRequired,

  value: string,
  valueComponent: func,
  onChangeValue: func.isRequired,

  items: array,
  getItems: func.isRequired,
  itemRender: func
};

Autocomplete.defaultProps = {
  value: "",
  className: "",
  valueComponent: DefaultValueComponent,
  items: []
};

export default Autocomplete;
