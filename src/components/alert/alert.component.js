import React from 'react';
import { Message } from 'semantic-ui-react';
import './alert.css';

export default class AlertTemplate extends React.Component {
    render() {
        const { message, options } = this.props;
        if (options.type === 'error') {
            return (
                <div className="customAlert">
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{message}</p>
                    </Message>
                </div>

            );
        }

        return (
            <div className="customAlert">
                <Message positive>
                    <Message.Header>Success</Message.Header>
                </Message>
            </div>

        );
    }
}
