import React from "react";
import { func } from "prop-types";
import debounce from "lodash/debounce";
import getDisplayName from "../helpers/getDisplayName";

const withGetItems = Component => {
  class WithGetItems extends React.Component {
    state = {
      items: [],
      prevResponse: {}
    };

    getItems = value => {
      const { prevResponse } = this.state;

      if (typeof prevResponse.abort === "function") {
        prevResponse.abort();
      }

      const response = this.props.getItems(value);

      if (response instanceof Promise) {
        response
          .then(items => {
            this.setState({ items });
          })
          .catch(console.log);
      } else {
        this.setState({ items: response });
      }

      this.setState({ prevResponse: response, value });
    };

    debouncedGetItems = debounce(value => {
      this.getItems(value);
    }, 200);

    clearItems = () => {
      this.setState({ items: [] });
    };

    render() {
      return (
        <Component
          {...this.props}
          items={this.state.items}
          clearItems={this.clearItems}
          getItems={this.debouncedGetItems}
        />
      );
    }
  }

  WithGetItems.displayName = `withGetItems(${getDisplayName(Component)})`;

  WithGetItems.propTypes = {
    getItems: func.isRequired
  };

  return WithGetItems;
};

export default withGetItems;
