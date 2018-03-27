import React from "react";

import "./style.css";

import debounce from "lodash/debounce";
import { oneOfType, object, string, func } from "prop-types";
import List from "../List/List";
import withOutsideHandler from "../../hocs/withOutsideHandler";

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    const { fieldName, value } = this.props;
    const text =
      fieldName && value[fieldName] !== undefined ? value[fieldName] : value;
    this.state = { text, items: [] };
  }

  componentDidMount() {
    this.getItems(this.state.text);
  }

  componentWillReceiveProps(nextProps) {
    const { fieldName, value } = nextProps;
    const nextText =
      fieldName && value[fieldName] !== undefined ? value[fieldName] : value;
    if (nextText !== this.state.text) {
      this.setState({ text: nextText });
    }
  }

  async getItems(text) {
    try {
      const items = await this.props.getItems(text);
      this.setState({ items });
    } catch (e) {
      console.error("Search error:", e.message);
    }
  }

  debouncedGetItems = debounce(value => {
    this.getItems(value);
  }, 200);

  shouldShowList() {
    return this.state.items.length > 0;
  }

  onChange = e => {
    const value = e.target.value;
    this.setState({ text: value });
    this.debouncedGetItems(value);
  };

  onChooseItem = item => e => {
    this.hideResultsList();
    this.props.onChange(item);
  };

  onOutsideClick = () => {
    if (this.shouldShowList()) {
      this.clearAutocomplete();
    }
  };

  clearAutocomplete = () => {
    this.clearInput();
    this.hideResultsList();
  };

  clearInput() {
    this.setState({ text: "" });
  }

  hideResultsList() {
    this.setState({ items: [] });
  }

  render() {
    const { className = "" } = this.props;
    const { text, items } = this.state;
    return (
      <div className={`autocomplete ${className}`}>
        <input type="text" value={text} onChange={this.onChange} />
        {this.shouldShowList() && (
          <List
            className="autocomplete_result"
            items={items}
            onClick={this.onChooseItem}
            itemRender={this.props.itemRender}
          />
        )}
      </div>
    );
  }
}

Autocomplete.propTypes = {
  value: oneOfType([string, object]),
  fieldName: string,
  onChange: func.isRequired,
  getItems: func.isRequired
};

Autocomplete.defaultProps = {
  value: "",
  fieldName: ""
};

export default withOutsideHandler(Autocomplete);
