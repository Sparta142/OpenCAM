import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ResourceCounter from './ResourceCounter';

class ResourceCounterList extends PureComponent {
    render() {
        const { resources } = this.props;
        const counters = Object.keys(resources).map(key => (
            <ResourceCounter
                name={resources[key].name}
                value={resources[key].value}
                suffix={resources[key].suffix}
                key={key}
            />
        ));

        return (
            <div className="resource-counters">
                {counters}
            </div>
        );
    }
}

ResourceCounterList.propTypes = {
    resources: PropTypes.object,
};

ResourceCounterList.defaultProps = {
    resources: {},
};

function mapStateToProps(state) {
    return { resources: state.resources };
}

export default connect(mapStateToProps)(ResourceCounterList);
