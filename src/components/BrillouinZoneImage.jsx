/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React from "react";

// eslint-disable-next-line react/prefer-stateless-function
class BrillouinZoneImage extends React.Component {
    render() {
        const { latticeType, imgSrc, description } = this.props;
        return (
            <div id="brillouin-zone" className="row">
                <div className="col-xs-12">
                    <div className="m-t-10">
                        <p>Brillouin zone: {latticeType}</p>
                    </div>
                    <div className="text-center m-t-10 m-b-10">
                        <img style={{ maxHeight: "300px" }} src={imgSrc} />
                    </div>
                    {description}
                </div>
            </div>
        );
    }
}

BrillouinZoneImage.propTypes = {
    latticeType: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default BrillouinZoneImage;
