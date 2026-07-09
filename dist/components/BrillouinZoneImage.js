import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React from "react";
// eslint-disable-next-line react/prefer-stateless-function
class BrillouinZoneImage extends React.Component {
    render() {
        const { latticeType, imgSrc, description } = this.props;
        return (_jsx("div", { id: "brillouin-zone", className: "row", children: _jsxs("div", { className: "col-xs-12", children: [_jsx("div", { className: "m-t-10", children: _jsxs("p", { children: ["Brillouin zone: ", latticeType] }) }), _jsx("div", { className: "text-center m-t-10 m-b-10", children: _jsx("img", { style: { maxHeight: "300px" }, src: imgSrc }) }), description] }) }));
    }
}
BrillouinZoneImage.propTypes = {
    latticeType: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
export default BrillouinZoneImage;
