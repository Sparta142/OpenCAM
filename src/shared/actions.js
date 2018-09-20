/*
 * Action types
 */

export const UPDATE_RESOURCES = 'UPDATE_RESOURCES';
export const REMOVE_RESOURCE = 'REMOVE_RESOURCE';
export const CHANGE_SETTING = 'CHANGE_SETTING';

/*
 * Action creators
 */

export function updateResources(resources) {
    return {
        type: UPDATE_RESOURCES,
        payload: resources,
    };
}

export function removeResource(name) {
    return {
        type: REMOVE_RESOURCE,
        payload: name,
    };
}

export function changeSetting(name, value) {
    return {
        type: CHANGE_SETTING,
        payload: {
            settingName: name,
            settingValue: value,
        },
    };
}
