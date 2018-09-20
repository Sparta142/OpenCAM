import React, { Component } from 'react';
import ResourceCounterList from './ResourceCounterList';
import Slider from './Slider';

export default class App extends Component {
    render() {
        return (
            <div>
                <ResourceCounterList />

                <div className="sliders">
                    <Slider
                        title="Set fan speed"
                        suffix="%"
                        min={30}
                        max={100}
                        initialValue={100}
                        settingName="fanSetpoint"
                    />
                    <Slider
                        title="Set pump speed"
                        suffix="%"
                        min={30}
                        max={100}
                        initialValue={100}
                        settingName="pumpSetpoint"
                    />
                </div>
            </div>
        );
    }
}
