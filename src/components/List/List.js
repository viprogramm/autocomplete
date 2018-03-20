import React from "react";

import { func, array } from "prop-types";

const List = props => {
  const { items, onClick, className = "", itemRender: ItemRender } = props;

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
  onClick: func
};

List.defaultProps = {
  items: [],
  onClick: () => () => {}
};

export default List;

{
  /*<div className={className}>*/
}
{
  /*{items.map((item, index) => {*/
}
{
  /*return (*/
}
{
  /*<div key={item.id || index} onClick={onClick(item)}>*/
}
{
  /*{typeof ItemRender === "function" ? (*/
}
{
  /*<ItemRender {...item} />*/
}
{
  /*) : item.name ? (*/
}
{
  /*item.name*/
}
{
  /*) : (*/
}
{
  /*item*/
}
{
  /*)}*/
}
{
  /*</div>*/
}
{
  /*);*/
}
{
  /*})}*/
}
{
  /*</div>*/
}
