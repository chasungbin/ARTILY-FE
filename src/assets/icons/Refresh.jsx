import React from "react";

function Refresh({ onClick }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M13.2469 4.07754L9.05625 8.15507L7.93125 7.06043L10.1531 4.89852H9C6.99375 4.89852 5.27344 5.59635 3.83906 6.99202C2.40469 8.38769 1.6875 10.0616 1.6875 12.0137C1.6875 12.5428 1.73906 13.0445 1.84219 13.5188C1.94531 13.9932 2.07187 14.4401 2.22187 14.8597L1.0125 16.0365C0.6375 15.3797 0.375 14.7184 0.225 14.0525C0.0749998 13.3865 0 12.707 0 12.0137C0 9.62372 0.885938 7.5667 2.65781 5.84265C4.42969 4.11859 6.54375 3.25656 9 3.25656H10.2094L7.95937 1.06727L9.05625 0L13.2469 4.07754ZM4.69688 19.9225L8.8875 15.8449L9.98437 16.9122L7.73437 19.1015H9C11.0062 19.1015 12.7266 18.4036 14.1609 17.008C15.5953 15.6123 16.3125 13.9384 16.3125 11.9863C16.3125 11.4572 16.2656 10.9555 16.1719 10.4812C16.0781 10.0068 15.9375 9.55986 15.75 9.14025L16.9594 7.96351C17.3344 8.6203 17.6016 9.28164 17.7609 9.94755C17.9203 10.6135 18 11.293 18 11.9863C18 14.3763 17.1141 16.4333 15.3422 18.1574C13.5703 19.8814 11.4562 20.7434 9 20.7434H7.73437L9.98437 22.9327L8.8875 24L4.69688 19.9225Z"
        fill="black"
      />
    </svg>
  );
}

export default Refresh;
