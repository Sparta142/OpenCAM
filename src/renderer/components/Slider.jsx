import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    get background() {
        const { min, max } = this.props;
        const value = 100 * ((this.state.value - min) / (max - min));

        return (
            `linear-gradient(
                to right,
                var(--enabled-color),
                var(--enabled-color) ${value}%,
                var(--disabled-color) ${value}%,
                var(--disabled-color)
        )`);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    render() {
        return (
            <div className="slider">
                <label>
                    <div className="labels">
                        <span className="title">{this.props.title}</span>
                        <span className="value">{this.state.value}{this.props.suffix}</span>
                    </div>

                    <input
                        type="range"
                        min={this.props.min}
                        max={this.props.max}
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{ background: this.background }}
                    />
                </label>
            </div>
        );
    }
}

Slider.defaultProps = {
    suffix: '',
    min: 0,
    max: 100,
};

Slider.propTypes = {
    title: PropTypes.string.isRequired,
    initialValue: PropTypes.number.isRequired,
    suffix: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
};
