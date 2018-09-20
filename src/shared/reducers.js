import {
    UPDATE_RESOURCES,
    REMOVE_RESOURCE,
    CHANGE_SETTING,
 } from './actions';

export function resources(state = {}, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_RESOURCES: {
            const newState = { ...state };

            // Merge the updates into each key provided in the payload
            Object.keys(payload).forEach((key) => {
                newState[key] = { ...newState[key], ...payload[key] };
            });

            return newState;
        }
        case REMOVE_RESOURCE: {
            const newState = { ...state };
            delete newState[payload];

            return newState;
        }
        default:
            return state;
    }
}

export function settings(state = {}, action) {
    switch (action.type) {
        case CHANGE_SETTING: {
            const { settingName, settingValue } = action.payload;
            const newState = { ...state };
            newState[settingName] = settingValue;

            return newState;
        }
        default:
            return state;
    }
}
