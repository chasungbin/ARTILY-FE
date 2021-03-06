import React from "react";

function Edit(props) {
  const { color, size } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 19.5H5.6L17.725 7.375L17.175 6.825L16.625 6.275L4.5 18.4V19.5ZM3 21V17.8L17.7 3.1C17.9833 2.81667 18.3375 2.67917 18.7625 2.6875C19.1875 2.69583 19.5417 2.84167 19.825 3.125L20.9 4.2C21.1833 4.48333 21.325 4.83333 21.325 5.25C21.325 5.66667 21.1833 6.01667 20.9 6.3L6.2 21H3ZM19.75 5.225L18.725 4.2L19.75 5.225ZM17.725 7.375L17.175 6.825L16.625 6.275L17.725 7.375Z"
        fill={color ? color : "black"}
      />
    </svg>
  );
}

export default Edit;
