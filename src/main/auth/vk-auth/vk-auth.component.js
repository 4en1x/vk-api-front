import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withAlert } from 'react-alert';
import {
    Button, Form, Header, Icon,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { sendToken } from '../auth-actions';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import LanguageDropDown from '../../../components/languageDropDown/languageDropDown.component';


class VkAuthComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ifLinkOpen: false,
            token: '',
            complete: false,
        };
    }

    static get propTypes() {
        return {
            auth: PropTypes.shape({
                vkAuthLink: PropTypes.string,
                userId: PropTypes.number,
            }),
            sendToken: PropTypes.func,
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
            }),
        };
    }

    send = () => {
        this.props.sendToken(
            Object.assign({}, {
                id: this.props.auth.userId,
                code: this.state.token,
            }),
            this.props.alert.error,
            this.props.t,
        );
        this.setState({ complete: true });
    };

    render() {
        if (this.state.complete) {
            return <Redirect to={'/login'} />;
        }

        const { t } = this.props;

        if (!this.props.auth.vkAuthLink) {
            return <SemanticLoader />;
        }

        if (!this.state.ifLinkOpen) {
            window.open(this.props.auth.vkAuthLink, '_blank');
            this.setState({ ifLinkOpen: true });
        }

        return (
            <div className="registration-container parent-size">
                <LanguageDropDown/>
                <div className="registration-form">
                    <Form size="large" onSubmit={this.send}>
                        <Header size='huge' textAlign="center">{t('auth.name')}</Header>

                        <Form.Input
                            label={t('auth.labels.link')}
                            placeholder={t('auth.placeholders.link')}
                            width={16}
                            onChange={(event, obj) => this.setState({ token: obj.value })}
                            required
                        />


                        <Button color="google plus" type="submit" floated ="right">
                            <Icon name='checkmark' /> {t('auth.authButton')}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default withAlert(connect(mapStateToProps, { sendToken })(translate('common')(VkAuthComponent)));
