/*
 * Action types
 */

export const UPDATE_RESOURCES = 'UPDATE_RESOURCES';
export const REMOVE_RESOURCE = 'REMOVE_RESOURCE';

/*
 * Action creators
 */

export function updateResource(name, value) {
    return {
        type: UPDATE_RESOURCES,
        payload: {
            name: value,
        },
    };
}

export function removeResource(name) {
    return {
        type: REMOVE_RESOURCE,
        payload: name,
    };
}
