import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import './login-input.css';

class LoginInputForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    onSubmitClicked = () => {
        this.props.inputHandle(this.state.email, this.state.password);
    };

    static get propTypes() {
        return {
            inputHandle: PropTypes.func,
            t: PropTypes.func,
        };
    }

    render() {
        const { t } = this.props;

        return (
            <Form size="large">
                <Form.Field>
                    <input
                        placeholder={t('login-input.placeholders.email')}
                        onChange={event => this.setState({ email: event.target.value })}
                    />
                </Form.Field>

                <Form.Field>
                    <input
                        placeholder={t('login-input.placeholders.password')}
                        type="password"
                        onChange={event => this.setState({ password: event.target.value })}
                    />
                </Form.Field>

                <div>
                    <Link to="/registration" className="link-container">
                        {t('login-input.createAccount')}
                    </Link>

                    <Button
                        color="google plus"
                        floated="right"
                        onClick={this.onSubmitClicked}
                    >
                        {t('login-input.nextButton')}
                    </Button>
                </div>
            </Form>
        );
    }
}

export default translate('common')(LoginInputForm);
