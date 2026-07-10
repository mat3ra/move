export default BrillouinZoneImage;
declare class BrillouinZoneImage extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
}
declare namespace BrillouinZoneImage {
    namespace propTypes {
        let latticeType: PropTypes.Validator<string>;
        let imgSrc: PropTypes.Validator<string>;
        let description: PropTypes.Validator<string>;
    }
}
import React from "react";
import PropTypes from "prop-types";
