import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert';

import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import RegistrationForm from './registration-form.component';
import { register } from '../auth-actions';


class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            complete: false,
        };
    }

    onSubmit = (data) => {
        this.props.register(data, this.props.alert.error, this.props.t);
        this.setState({ complete: true });
    };

    static get propTypes() {
        return {
            t: PropTypes.func,
            register: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
            }),
            auth: PropTypes.shape({
                isRegisterError: PropTypes.bool,
            }),
        };
    }

    render() {
        if (!this.props.auth.isRegisterError && this.state.complete) {
            this.setState({ complete: false });
            return <Redirect to={'/vkAuth'} />;
        }

        return (
            <RegistrationForm onSubmit={this.onSubmit}/>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default withAlert(connect(mapStateToProps, { register })(translate('common')(RegistrationComponent)));
