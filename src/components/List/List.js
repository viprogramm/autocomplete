import React from "react";

import { func, array, string } from "prop-types";

const List = ({ items, onClick, className, itemRender: ItemRender }) => {
  return (
    <div className={className}>
      {items.map((item, index) => {
        return (
          <div key={item.id || index} onClick={onClick(item)}>
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
  onClick: func,
  className: string,
  itemRender: func
};

List.defaultProps = {
  items: [],
  onClick: () => () => {},
  className: ""
};

export default List;
