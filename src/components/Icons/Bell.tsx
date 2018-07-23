import React from "react";

const Bell = (props: React.SVGAttributes<SVGElement>) => (
  <svg width={14} height={18} {...props}>
    <path d="M13.63 14a7.209 7.209 0 0 1-.63-1.92V9c0-3.78-1.97-6.44-5-6.92V1a1 1 0 0 0-2 0v1.08C2.97 2.56 1 5.22 1 9v2.9A8.06 8.06 0 0 1 .38 14H0v2h5v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1h5v-2h-.37zm-11.1 0a10.029 10.029 0 0 0 .46-1.89L3 9c0-2.42 1.05-5 4-5s4 2.58 4 5v3.16l.01.15a9.737 9.737 0 0 0 .43 1.69H2.53z" />
  </svg>
);

export default Bell;
