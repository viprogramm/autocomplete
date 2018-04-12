import React from "react";

import sinon from "sinon";
import { shallow } from "enzyme";

import withPrepareValueProp from "./withPrepareValueProp";

describe("withPrepareValueProp component", () => {
  test("simple value", () => {
    const value = "test";

    const Component = value => value;
    const WrappedComponent = withPrepareValueProp(Component);
    const wrapper = shallow(<WrappedComponent value={value} />);

    expect(wrapper.find(Component).prop("value")).toBe(value);
  });

  test("object value", () => {
    const value = { test: "test" };

    const Component = value => value;
    const WrappedComponent = withPrepareValueProp(Component);
    const wrapper = shallow(<WrappedComponent value={value} />);

    expect(wrapper.find(Component).prop("value")).toBe(value);
  });

  test("object value with field name", () => {
    const fieldName = "name";
    const value = { [fieldName]: "test" };

    const Component = value => value;
    const WrappedComponent = withPrepareValueProp(Component);
    const wrapper = shallow(
      <WrappedComponent value={value} fieldName={fieldName} />
    );

    expect(wrapper.find(Component).prop("value")).toBe(value[fieldName]);
  });

  test("change value", () => {
    const value = "test";
    const newValue = "test test";

    const Component = value => value;
    const WrappedComponent = withPrepareValueProp(Component);
    const wrapper = shallow(<WrappedComponent value={value} />);

    wrapper.props().onChangeValue(newValue);
    wrapper.update();

    expect(wrapper.find(Component).prop("value")).toBe(newValue);

    wrapper.props().onChangeValue("");
    wrapper.update();

    expect(wrapper.find(Component).prop("value")).toBe("");
  });
});
