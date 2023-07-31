import React from "react";

const CustomButton = ({ onClick, children, className }) => {
  return <button onClick={onClick} className={className} children={children} />;
};

export default CustomButton;
