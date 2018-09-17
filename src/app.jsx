import React, { Component } from 'react';

class ResourceCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <div className="resource-counter">
        <span className="title">{this.props.title}</span>
        <div className="description">
          <span className="value">{this.state.value}</span>
          <span className="unit">{this.props.unit}</span>
        </div>
      </div>
    );
  }
}

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || 0,
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
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="slider">
        <label>
          <div className="labels">
            <span className="title">{this.props.title}</span>
            <span className="value">{this.state.value}{this.props.unit}</span>
          </div>

          <input
            type="range"
            min={this.props.min}
            max={this.props.max}
            value={this.state.value}
            onChange={this.handleChange}
            style={{ background: this.background }} />
        </label>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="resource-counters">
          <ResourceCounter title="Fan speed" unit="RPM" />
          <ResourceCounter title="Pump speed" unit="RPM" />

          <ResourceCounter title="Liquid temperature" unit="°C" />
          <ResourceCounter title="CPU temperature" unit="°C" />
        </div>

        <div className="sliders">
          <Slider title="Set fan speed" unit="%" min={30} max={100} defaultValue={100} />
          <Slider title="Set pump speed" unit="%" min={30} max={100} defaultValue={100} />
        </div>
      </div>
    );
  }
}
