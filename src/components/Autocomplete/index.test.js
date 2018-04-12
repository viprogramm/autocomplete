import React from "react";

import { mount } from "enzyme";
import Autocomplete from "./index";
import List from "../List/List";
import DefaultValueComponent from "../DefaultValueComponent/DefaultValueComponent";

const data = ["etc", "eth", "btc"];

const getItems = value => {
  if (!value) {
    return [];
  }
  return data.filter(v => v.includes(value));
};

jest.useFakeTimers();

describe("Autocomplete component with HOC's", () => {
  test("find and choose currency", () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <Autocomplete getItems={getItems} onChange={onChange} />
    );

    const text = "e";
    wrapper.find("input").simulate("change", { target: { value: text } });

    jest.runAllTimers();

    wrapper.update();

    expect(wrapper.find(List).prop("items")).toEqual([data[0], data[1]]);

    wrapper
      .find(".autocomplete_result .list-item")
      .first()
      .simulate("mousedown");

    wrapper.update();
    expect(onChange).toHaveBeenCalledWith("etc");
    expect(wrapper.find("input").length).toBe(0);
    expect(wrapper.find(DefaultValueComponent).prop("value")).toBe(text);
  });

  test("custom value component", () => {
    const ValueComponent = ({ value }) => value;

    const wrapper = mount(
      <Autocomplete
        getItems={getItems}
        onChange={() => {}}
        valueComponent={ValueComponent}
      />
    );

    expect(wrapper.find(ValueComponent).length).toBe(0);

    const text = "etc";
    wrapper.find("input").simulate("change", { target: { value: text } });

    jest.runAllTimers();
    wrapper.update();

    wrapper
      .find(".autocomplete_result .list-item")
      .first()
      .simulate("mousedown");

    expect(wrapper.find(ValueComponent).length).toBe(1);
    expect(wrapper.find(ValueComponent).prop("value")).toBe(text);
  });

  test("custom item render", done => {
    const data = [
      { id: 1, name: "ETH", value: 20 },
      { id: 2, name: "ETC", value: 2.4 },
      { id: 3, name: "BTC", value: 1.05 }
    ];

    const getItems = query => {
      if (query === "" || query === undefined) {
        return [];
      }
      const regex = new RegExp(query, "i");
      return data.filter(currency => regex.test(currency.name));
    };

    const onChange = jest.fn();

    const ItemRender = ({ name, value }) => (
      <div>
        {name} (ballance: {value})
      </div>
    );

    const wrapper = mount(
      <Autocomplete
        getItems={getItems}
        onChange={onChange}
        itemRender={ItemRender}
      />
    );

    wrapper.find("input").simulate("change", { target: { value: "e" } });

    jest.runAllTimers();

    setImmediate(() => {
      wrapper.update();

      expect(wrapper.find(List).prop("items")).toEqual([data[0], data[1]]);

      expect(
        wrapper
          .find(ItemRender)
          .at(0)
          .props()
      ).toEqual(data[0]);
      expect(
        wrapper
          .find(ItemRender)
          .at(1)
          .props()
      ).toEqual(data[1]);

      wrapper
        .find(".autocomplete_result .list-item")
        .first()
        .simulate("mousedown");

      expect(onChange).toHaveBeenCalledWith(data[0]);

      done();
    });
  });

  test("clear input on blur if can to choose currency in search list", () => {
    const wrapper = mount(
      <Autocomplete getItems={getItems} onChange={() => {}} />
    );

    const text = "e";
    wrapper.find("input").simulate("change", { target: { value: text } });

    jest.runAllTimers();

    wrapper.update();

    expect(wrapper.find("input").prop("value")).toBe(text);
    expect(wrapper.find(List).prop("items")).toEqual([data[0], data[1]]);

    wrapper.find("input").simulate("blur");
    wrapper.update();

    expect(wrapper.find("input").prop("value")).toBe("");
    expect(wrapper.find(List).prop("items")).toEqual([]);
  });

  test("not clear input on blur click if nothing to choose in search list", () => {
    const wrapper = mount(
      <Autocomplete getItems={getItems} onChange={() => {}} />
    );

    const text = "test text";
    wrapper.find("input").simulate("change", { target: { value: text } });

    jest.runAllTimers();

    wrapper.update();

    expect(wrapper.find("input").prop("value")).toBe(text);
    expect(wrapper.find(List).prop("items")).toEqual([]);

    wrapper.find("input").simulate("blur");
    wrapper.update();

    expect(wrapper.find("input").prop("value")).toBe(text);
  });
});
