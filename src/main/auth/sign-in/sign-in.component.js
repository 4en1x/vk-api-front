import React from 'react';
import { Image } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';
import * as actionCreators from '../auth-actions';
import logos from '../../../assets/images';
import InputForm from '../components/login-input';
import LanguageDropDown from '../../../components/languageDropDown/languageDropDown.component';
import './sign-in.css';
import { translate } from 'react-i18next';

class SignInComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    inputHandle = (email, password) => {
        this.email = email;
        this.password = password;

        this.setState({
            isLoading: true,
        });

        this.props.login({ email: this.email, password: this.password }, this.props.alert.error, this.props.t);
    };

    static get propTypes() {
        return {
            t: PropTypes.func,
            login: PropTypes.func,
            auth: PropTypes.shape({
                isAuthError: PropTypes.bool,
            }),
            alert: PropTypes.shape({
                error: PropTypes.func,
            }),
        };
    }

    render() {
        if (!this.props.auth.isAuthError) {
            return <Redirect to={{ pathname: '/' }}/>;
        }

        return (
            <div className="auth-container parent-size">
                <LanguageDropDown/>
                <div className="auth-form">
                    <div className="auth-form-header">
                        <Image src={logos.logo1} height="40px" verticalAlign="bottom" />
                    </div>
                    <InputForm inputHandle={this.inputHandle} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(SignInComponent)));
