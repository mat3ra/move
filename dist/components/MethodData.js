import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import PropTypes from "prop-types";
import React from "react";
// eslint-disable-next-line react/prefer-stateless-function
class MethodData extends React.Component {
    // override in children
    render() {
        return _jsx("div", { className: "hidden" });
    }
}
MethodData.propTypes = {
    editable: PropTypes.bool,
    adjustable: PropTypes.bool,
    subworkflow: PropTypes.object,
    materials: PropTypes.array,
    onUpdate: PropTypes.func,
    isLoading: PropTypes.bool,
    onLoading: PropTypes.func,
    methodData: PropTypes.object,
};
MethodData.defaultProps = {
    onLoading() { },
};
export default MethodData;
