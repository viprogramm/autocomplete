import React from "react";

import { mount } from "enzyme";
import Autocomplete from "./Autocomplete";

const data = ["etc", "eth", "btc"];

const getItems = value => {
  if (!value) {
    return [];
  }
  return data.filter(v => v.includes(value));
};

describe("Autocomplete component", () => {
  beforeAll(() => {
    const div = document.createElement("div");
    div.setAttribute("id", "app");
    document.body.appendChild(div);
  });

  test("find and choose currency", done => {
    const chooseValue = jest.fn();

    const wrapper = mount(
      <div>
        <Autocomplete getItems={getItems} onChange={chooseValue} />
      </div>,
      { attachTo: document.querySelector("#app") }
    );

    wrapper.find("input").simulate("change", { target: { value: "e" } });

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.html()).toMatch(
        /<div class="autocomplete_result"><div>etc<\/div><div>eth<\/div><\/div>/
      );

      wrapper
        .find("div.autocomplete_result > div")
        .first(1)
        .simulate("click");

      expect(chooseValue).toHaveBeenCalledWith("etc");

      expect(wrapper.html()).not.toMatch(
        /<div class="autocomplete_result"><div>etc<\/div><div>eth<\/div><\/div>/
      );

      wrapper.detach();
      done();
    });
  });

  test("custom item render", done => {
    const getItems = query => {
      if (query === "" || query === undefined) {
        return [];
      }
      const data = [
        { id: 1, name: "ETH", value: 20 },
        { id: 2, name: "ETC", value: 2.4 },
        { id: 3, name: "BTC", value: 1.05 }
      ];
      const regex = new RegExp(query, "i");
      return data.filter(currency => regex.test(currency.name));
    };

    const ItemRender = ({ name, value }) => `${name} (ballance: ${value})`;

    const wrapper = mount(
      <div>
        <Autocomplete
          getItems={getItems}
          onChange={() => {}}
          itemRender={ItemRender}
        />
      </div>,
      { attachTo: document.querySelector("#app") }
    );

    wrapper.find("input").simulate("change", { target: { value: "e" } });

    setImmediate(() => {
      wrapper.update();

      expect(wrapper.html()).toMatch(
        /<div class="autocomplete_result"><div>ETH \(ballance: 20\)<\/div><div>ETC \(ballance: 2.4\)<\/div><\/div>/
      );

      wrapper.detach();
      done();
    });
  });

  test("clear input on outside click", () => {
    const wrapper = mount(
      <div>
        <Autocomplete getItems={getItems} onChange={() => {}} />
        <div className="target">!</div>
      </div>,
      { attachTo: document.querySelector("#app") }
    );

    const text = "test text";
    wrapper.find("input").simulate("change", { target: { value: text } });

    expect(wrapper.find("input").get(0).props.value).toBe(text);

    document
      .querySelector(".target")
      .dispatchEvent(new window.MouseEvent("click"));
    wrapper.update();

    expect(wrapper.find("input").get(0).props.value).toBe("test text");
  });
});
