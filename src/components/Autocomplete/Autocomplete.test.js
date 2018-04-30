import React from "react";
import { shallow } from "enzyme";
import Autocomplete from "./Autocomplete";

import sinon from "sinon";
import List from "../List/List";
import DefaultValueComponent from "../DefaultValueComponent/DefaultValueComponent";

jest.useFakeTimers();

describe("Autocomplete component", () => {
  test("change input's value", () => {
    const onChangeValue = sinon.spy();
    const onGetItems = sinon.spy();

    const wrapper = shallow(
      <Autocomplete
        getItems={onGetItems}
        onChange={() => {}}
        onChangeValue={onChangeValue}
      />
    );

    const text = "e";
    wrapper.find("input").simulate("change", { target: { value: text } });

    wrapper.update();
    jest.runAllTimers();

    expect(onChangeValue.calledWith(text)).toBeTruthy();
    expect(onGetItems.calledWith(text)).toBeTruthy();
  });

  test("select search item and click on value component", () => {
    const onChange = sinon.spy();
    const onGetItems = sinon.spy();

    const items = ["foo", "bar", "baz"];

    const wrapper = shallow(
      <Autocomplete
        getItems={onGetItems}
        onChange={onChange}
        onChangeValue={() => {}}
        items={items}
      />
    );

    expect(wrapper.find(List).prop("items")).toBe(items);
    expect(wrapper.find("input").length).toBe(1);
    expect(wrapper.find(DefaultValueComponent).length).toBe(0);

    wrapper
      .find(List)
      .dive()
      .find(".list.autocomplete_result .list-item")
      .first()
      .simulate("mousedown");

    wrapper.update();

    expect(onChange.calledWith(items[0])).toBeTruthy();
    expect(onGetItems.calledWith("")).toBeTruthy();

    expect(wrapper.find("input").length).toBe(0);
    expect(wrapper.find(DefaultValueComponent).length).toBe(1);

    wrapper
      .find(".autocomplete > div")
      .first()
      .simulate("click");

    wrapper.update();

    expect(wrapper.find("input").length).toBe(1);
    expect(wrapper.find(DefaultValueComponent).length).toBe(0);
  });

  test("not clear input on blur if can to choose currency in search list", () => {
    const onChangeValue = sinon.spy();
    const onGetItems = sinon.spy();

    const items = ["foo", "bar", "baz"];
    const text = "test text";

    const wrapper = shallow(
      <Autocomplete
        getItems={onGetItems}
        onChange={() => {}}
        onChangeValue={onChangeValue}
        items={items}
        value={text}
      />
    );

    expect(wrapper.find("input").prop("value")).toBe(text);
    expect(wrapper.find(List).prop("items")).toEqual(items);

    wrapper.find("input").simulate("blur");
    wrapper.update();

    expect(onGetItems.calledWith("")).toBeFalsy();
    expect(onChangeValue.calledWith("")).toBeFalsy();
  });

  test("clear input on blur click if nothing to choose in search list", () => {
    const onChangeValue = sinon.spy();
    const onGetItems = sinon.spy();

    const text = "test text";

    const wrapper = shallow(
      <Autocomplete
        getItems={onGetItems}
        onChange={() => {}}
        onChangeValue={onChangeValue}
        value={text}
      />
    );

    wrapper.find("input").simulate("change", { target: { value: text } });
    wrapper.update();

    expect(wrapper.find("input").prop("value")).toBe(text);
    expect(wrapper.find(List).prop("items")).toEqual([]);

    wrapper.find("input").simulate("blur");
    wrapper.update();

    expect(onGetItems.calledWith("")).toBeTruthy();
    expect(onChangeValue.calledWith("")).toBeTruthy();
  });

  test("not clear input on blur click if input was not changed and nothing to choose in search list", () => {
    const onChangeValue = sinon.spy();
    const onGetItems = sinon.spy();

    const text = "test text";

    const wrapper = shallow(
      <Autocomplete
        getItems={onGetItems}
        onChange={() => {}}
        onChangeValue={onChangeValue}
        value={text}
      />
    );

    expect(wrapper.find("input").prop("value")).toBe(text);
    expect(wrapper.find(List).prop("items")).toEqual([]);

    wrapper.find("input").simulate("blur");
    wrapper.update();

    expect(onGetItems.calledWith("")).toBeFalsy();
    expect(onChangeValue.calledWith("")).toBeFalsy();
  });
});
