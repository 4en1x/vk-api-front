import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function checkAuth(Component) {
    class Authorization extends React.Component {
        static get propTypes() {
            return {
                auth: PropTypes.shape({
                    isAuthError: PropTypes.bool,
                }),
            };
        }

        render() {
            const user = this.props.auth;
            if (user.isAuthError) return <Redirect to="/login" />;
            return <Component {...this.props} user={user} />;
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth,
        };
    }

    return connect(mapStateToProps, {})(Authorization);
}
