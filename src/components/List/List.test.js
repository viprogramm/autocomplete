import React from "react";
import renderer from "react-test-renderer";
import List from "./List";
import data from "../../stub/data";

describe("List", () => {
  test("without any props", () => {
    const tree = renderer.create(<List />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("with simple items and active class name", () => {
    const items = data.map(item => item.name);
    const tree = renderer
      .create(<List className="active" items={items} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("with simple items and item renderer", () => {
    const items = data.map(item => item.name);

    const itemRender = item => {
      return `name: ${item}`;
    };

    const tree = renderer
      .create(<List className="active" items={items} itemRender={itemRender} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with custom item renderer", () => {
    const itemRender = ({ name, value }) => {
      return `${name} (ballance: ${value})`;
    };
    const tree = renderer
      .create(<List items={data} itemRender={itemRender} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
