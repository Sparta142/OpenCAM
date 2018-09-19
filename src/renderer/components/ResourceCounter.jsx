import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ResourceCounter extends PureComponent {
    render() {
        return (
            <div className="resource-counter">
                <div className="name">{this.props.name}</div>
                <div className="description">
                    <span className="value">{this.props.value}</span>
                    <span className="suffix">{this.props.suffix}</span>
                </div>
            </div>
        );
    }
}

ResourceCounter.defaultProps = {
    suffix: '',
};

ResourceCounter.propTypes = {
    name: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    suffix: PropTypes.any,
};
