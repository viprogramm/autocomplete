import React from "react";
import { shallow } from "enzyme";
import withGetItems from "./withGetItems";

describe("withGetItems component", () => {
  test("getItems and clear items", () => {
    const value = "TEST TEXT";
    const getItems = value => (value ? value.split(" ") : []);

    const Component = value => value;
    const WrappedComponent = withGetItems(Component);
    const wrapper = shallow(<WrappedComponent getItems={getItems} />);

    wrapper
      .find(Component)
      .props()
      .getItems(value);

    wrapper.update();

    expect(wrapper.find(Component).prop("items")).toEqual(["TEST", "TEXT"]);

    wrapper
      .find(Component)
      .props()
      .getItems("");

    wrapper.update();

    expect(wrapper.find(Component).prop("items")).toEqual([]);
  });
});
