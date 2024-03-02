import React from "react";
const Disc = ({ size = 24, color = "currentColor" }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke={color}
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<circle cx='12' cy='12' r='10'></circle>
		<circle cx='12' cy='12' r='3'></circle>
	</svg>
);
export default Disc;
