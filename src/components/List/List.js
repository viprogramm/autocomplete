import React from "react";
import classNames from "classnames";

import { func, array, string } from "prop-types";

const List = ({ items, onMouseDown, className, itemRender: ItemRender }) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <div className={classNames("list", className)}>
      {items.map((item, index) => {
        return (
          <div
            className="list-item"
            key={item.id || index}
            onMouseDown={onMouseDown(item)}
          >
            {typeof item === "object" ? (
              typeof ItemRender === "function" ? (
                <ItemRender {...item} />
              ) : (
                item.name
              )
            ) : typeof ItemRender === "function" ? (
              <ItemRender item={item} />
            ) : (
              item
            )}
          </div>
        );
      })}
    </div>
  );
};

List.propTypes = {
  items: array,
  onMouseDown: func,
  className: string,
  itemRender: func
};

List.defaultProps = {
  items: [],
  onMouseDown: () => () => {},
  className: ""
};

export default List;
