import React from "react";
import { func } from "prop-types";
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

      this.setState({ prevResponse: response });
    };

    render() {
      return (
        <Component
          {...this.props}
          items={this.state.items}
          getItems={this.getItems}
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
