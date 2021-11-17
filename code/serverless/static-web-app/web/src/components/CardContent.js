import React from "react";

const CardContent = ({ name, description, price }) => (
  <div className="card-content">
    <div className="content">
      <div className="name">{name}</div>
      <div className="description">{description}</div>
      <div className="price">${price}</div>
    </div>
  </div>
);

export default CardContent;
