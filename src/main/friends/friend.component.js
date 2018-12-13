import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import './friend.css';
import {
    Header, Image, Segment, Label, Button,
} from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { Redirect } from 'react-router-dom';

class Friend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingGroups: false,
        };
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            friend: PropTypes.shape({
                id: PropTypes.number,
                first_name: PropTypes.string,
                last_name: PropTypes.string,
                online: PropTypes.number,
                sex: PropTypes.number,
                photo_50: PropTypes.string,
            }),
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
        };
    }


    render() {
        const { t } = this.props;

        if (this.state.loadingGroups) {
            return <Redirect to={`/?filter=${this.props.friend.id}`} />;
        }

        const link = `https://vk.com/id${this.props.friend.id}`;
        return (
            <Segment color={this.props.friend.sex !== 1
                ? 'teal'
                : 'pink'
            }>
                <div className="friendContainer">
                    <div className="friendImageContainer">
                        <Image
                            as='a'
                            href={link}
                            className="friendImage"
                            src={this.props.friend.photo_50}
                            size='small'
                            floated='left'
                        />
                        <Label className="onlineStatus" circular color={this.props.friend.online
                            ? 'green'
                            : 'red'
                        } empty/>
                    </div>

                    <Header className="friendName" size='medium' textAlign="left">
                        {this.props.friend.first_name} {this.props.friend.last_name}
                    </Header>

                    <Button
                        className="checkGroupsButton"
                        color='blue'
                        size='small'
                        floated='right'
                        onClick={() => this.setState({ loadingGroups: true })}
                    >
                        {t('friend.groupsButton')}
                    </Button>
                </div>
            </Segment>
        );
    }
}

export default withAlert(translate('common')(Friend));
