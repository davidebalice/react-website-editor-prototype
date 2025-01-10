import React, { forwardRef } from "react";

const Item = forwardRef(({ id, children, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className="draggable">
      {children}
    </div>
  );
});

export default Item;
