import React from "react";
import { oneOfType, object, string } from "prop-types";
import getDisplayName from "../helpers/getDisplayName";

const getValue = (value, fieldName) => {
  return fieldName && value[fieldName] !== undefined ? value[fieldName] : value;
};

const withPrepareValueProp = Component => {
  class WithPrepareValueProp extends React.Component {
    constructor(props) {
      super(props);
      const value = getValue(this.props.value, this.props.fieldName);
      this.state = {
        value
      };
    }

    componentWillReceiveProps(nextProps) {
      const nextValue = getValue(nextProps.value, nextProps.fieldName);
      if (nextValue !== this.state.value) {
        this.setState({ value: nextValue });
      }
    }

    onChangeValue = value => {
      this.setState({ value });
    };

    render() {
      return (
        <Component
          {...this.props}
          value={this.state.value}
          onChangeValue={this.onChangeValue}
        />
      );
    }
  }

  WithPrepareValueProp.displayName = `withPrepareValueProp(${getDisplayName(
    Component
  )})`;

  WithPrepareValueProp.propTypes = {
    value: oneOfType([string, object]),
    fieldName: string
  };

  return WithPrepareValueProp;
};

export default withPrepareValueProp;
