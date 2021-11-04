import React from "react";
import PropTypes from 'prop-types';
export default function Tabletittle (props) {
    const {value} = props;
    return (
        <th scope="col" 
        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{value}</th>
    )
}
Tabletittle.propTypes={value:PropTypes.func}