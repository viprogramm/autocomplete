import React from "react";
import ReactDOM from "react-dom";

import getDisplayName from "../helpers/getDisplayName";

const withOutsideHandler = Component => {
  class WithOutsideHandler extends React.Component {
    componentDidMount() {
      if (this.componentRef && !this.componentRef.onOutsideClick) {
        throw new Error(
          `Component "${getDisplayName(
            Component
          )}" does not define "onOutsideClick" method.`
        );
      }
      document.addEventListener("click", this.handleOutsideClick, true);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.handleOutsideClick, true);
    }

    handleOutsideClick = e => {
      const componentNode = ReactDOM.findDOMNode(this.componentRef);
      if (componentNode && !componentNode.contains(e.target)) {
        this.componentRef.onOutsideClick(e);
      }
    };

    render() {
      return (
        <Component
          ref={node => {
            this.componentRef = node;
          }}
          {...this.props}
        />
      );
    }
  }

  WithOutsideHandler.displayName = `withOutsideHandler(${getDisplayName(
    Component
  )})`;

  return WithOutsideHandler;
};

export default withOutsideHandler;
