import React from "react";
import PropTypes from 'prop-types';
export default function TableRow (props) {
    const {value} = props;
    return (
        <td className="px-6 py-4 whitespace-nowrap">{value}</td>
    )
}
TableRow.propTypes={value:PropTypes.func}