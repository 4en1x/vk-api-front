import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

class SemanticLoader extends React.Component {
    render() {
        return (
            <Dimmer as={Segment} active inverted>
                <Loader size="massive">Loading</Loader>
            </Dimmer>
        );
    }
}

export default SemanticLoader;
