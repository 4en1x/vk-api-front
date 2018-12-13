import React from 'react';
import {
    Form, Button, Checkbox, Header, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import LanguageDropDown from '../../../components/languageDropDown/languageDropDown.component';
import './registration.css';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            averageRating: 0,
            subjects: [],
            submitting: true,
            errorSubmittingMessage: '',
            errorSubmittingMessagePasswords: this.props.t('registration.errorSubmittingMessagePasswords'),
            errorSubmittingMessageTerms: this.props.t('registration.errorSubmittingMessageTerms'),
            errorSubmittingMessagePasswordLength: this.props.t('registration.errorSubmittingMessagePasswordLength'),
            currentLanguage: this.props.i18n.language,
        };
    }

    static get propTypes() {
        return {
            onSubmit: PropTypes.func,
            t: PropTypes.func,
            i18n: PropTypes.shape({
                language: PropTypes.string,
            }),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentLanguage !== prevProps.i18n.language) {
            let newErrorSubmittingMessage = this.props.t('registration.errorSubmittingMessagePasswords');

            if (prevState.errorSubmittingMessage === prevState.errorSubmittingMessageTerms) {
                newErrorSubmittingMessage = this.props.t('registration.errorSubmittingMessageTerms');
            }

            if (prevState.errorSubmittingMessage === prevState.errorSubmittingMessagePasswordLength) {
                newErrorSubmittingMessage = this.props.t('registration.errorSubmittingMessagePasswordLength');
            }

            this.setState({
                errorSubmittingMessage: newErrorSubmittingMessage,
                errorSubmittingMessagePasswords: this.props.t('registration.errorSubmittingMessagePasswords'),
                errorSubmittingMessageTerms: this.props.t('registration.errorSubmittingMessageTerms'),
                errorSubmittingMessagePasswordLength: this.props.t('registration.errorSubmittingMessagePasswordLength'),
                currentLanguage: prevProps.i18n.language,
            });
        }
    }

    prepareData = () => {
        if (this.state.password !== this.state.repeated_password) {
            this.setState({ submitting: false, errorSubmittingMessage: this.state.errorSubmittingMessagePasswords });
            return;
        }

        if (this.state.password.length < 8 || this.state.password.length > 20) {
            this.setState({
                submitting: false,
                errorSubmittingMessage: this.state.errorSubmittingMessagePasswordLength,
            });
            return;
        }

        if (!this.state.terms) {
            this.setState({ submitting: false, errorSubmittingMessage: this.state.errorSubmittingMessageTerms });
            return;
        }

        this.setState({ submitting: true });

        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        };

        this.props.onSubmit(data);
    };

    render() {
        const { t } = this.props;

        return (
            <div className="registration-container parent-size">
                <LanguageDropDown/>
                <div className="registration-form">
                    <Form size="large" onSubmit={this.prepareData}>
                        <Header size='huge' textAlign="center">{t('registration.name')}</Header>

                        <Form.Input
                            type='email'
                            label={t('registration.labels.email')}
                            placeholder={t('registration.placeholders.email')}
                            width={16}
                            onChange={(event, obj) => this.setState({ email: obj.value })}
                            required
                        />

                        <Form.Input
                            type='username'
                            label={t('registration.labels.username')}
                            placeholder={t('registration.placeholders.username')}
                            width={16}
                            onChange={(event, obj) => this.setState({ username: obj.value })}
                            required
                        />

                        <Form.Group>
                            <Form.Input
                                label={t('registration.labels.password')}
                                type='password'
                                placeholder={t('registration.placeholders.password')}
                                width={8}
                                onChange={(event, obj) => this.setState({ password: obj.value })}
                                required
                            />

                            <Form.Input
                                label={t('registration.labels.repeatPassword')}
                                type='password'
                                placeholder={t('registration.placeholders.repeatPassword')}
                                width={8}
                                onChange={(event, obj) => this.setState({ repeated_password: obj.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Field
                            control={Checkbox}
                            label={{ children: t('registration.agreeCheckbox') }}
                            width={13}
                            onChange={(event, obj) => this.setState({ terms: obj.checked })}
                            required
                        />

                        <Message
                            error = {this.state.submitting}
                            header={t('registration.errorMessage')}
                            content={this.state.errorSubmittingMessage}
                        />

                        <Button color="google plus" type="submit" floated ="right">
                            <Icon name='checkmark' /> {t('registration.registerButton')}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default reduxForm({ form: 'RegistrationForm' })(translate('common')(RegistrationForm));
