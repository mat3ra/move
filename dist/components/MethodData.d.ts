export default MethodData;
declare class MethodData extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
}
declare namespace MethodData {
    namespace propTypes {
        let editable: PropTypes.Requireable<boolean>;
        let adjustable: PropTypes.Requireable<boolean>;
        let subworkflow: PropTypes.Requireable<object>;
        let materials: PropTypes.Requireable<any[]>;
        let onUpdate: PropTypes.Requireable<(...args: any[]) => any>;
        let isLoading: PropTypes.Requireable<boolean>;
        let onLoading: PropTypes.Requireable<(...args: any[]) => any>;
        let methodData: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        function onLoading(): void;
    }
}
import React from "react";
import PropTypes from "prop-types";
