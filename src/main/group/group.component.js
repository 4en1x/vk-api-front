import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import './group-table.css';
import {
    Header,
    Divider,
    Label,
    Image,
    Segment,
    Button,
} from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { Redirect } from 'react-router-dom';
import Responsive from 'react-responsive';
import groupService from '../../service/group-service';

const Mobile = props => <Responsive {...props} maxWidth={992} />;

class Group extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ifSubscribe: this.props.group.is_member,
            loading: false,
            wallId: undefined,
        };
    }

    static getDerivedStateFromProps(props) {
        return {
            ifSubscribe: props.group.is_member,
        };
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            group: PropTypes.shape({
                name: PropTypes.string,
                status: PropTypes.string,
                description: PropTypes.string,
                link: PropTypes.string,
                screen_name: PropTypes.string,
                photo_200: PropTypes.string,
                id: PropTypes.number,
                members_count: PropTypes.number,
                is_member: PropTypes.number,
            }),
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
        };
    }

    subscribe = (id) => {
        this.setState({ loading: true });
        groupService.subscribe(id)
            .then(
                (data) => {
                    this.props.alert.success(data.toString());
                    this.setState({ loading: false, ifSubscribe: 1 });
                },
            )
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response) {
                    this.props.alert.error(this.props.t(`error.${error.response.status}`));
                } else {
                    this.props.alert.error(error.message);
                }
            });
    };

    unsubscribe = (id) => {
        this.setState({ loading: true });
        groupService.unsubscribe(id)
            .then(
                (data) => {
                    this.props.alert.success(data.toString());
                    this.setState({ loading: false, ifSubscribe: 0 });
                },
            )
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response) {
                    this.props.alert.error(this.props.t(`error.${error.response.status}`));
                } else {
                    this.props.alert.error(error.message);
                }
            });
    };

    wall = (id) => {
        this.setState({ wallId: id });
    };

    render() {
        if (this.state.wallId) {
            return <Redirect to={{
                pathname: `/groups/${this.state.wallId}`,
                state: {
                    groupName: this.props.group.name,
                    groupScreenName: this.props.group.screen_name,
                },
            }} />;
        }

        const { t } = this.props;

        let description = '';
        if (this.props.group.description) {
            description = this.props.group.description.replace(/(https:\/\/[^\s]+)/g, "<a href='$1'>$1</a>");
        }

        return (
            <div>
                <Header size='medium' textAlign="left">{this.props.group.name}</Header>
                <Divider section />
                <div className="publicBody">
                    <Segment className='publicDescriptionSegment' basic>
                        <Image
                            as='a'
                            href={this.props.group.link}
                            className="publicImage"
                            src={this.props.group.photo_200}
                            size='small'
                            floated='left'
                        />
                        <h3 className='ui header'>{this.props.group.status}</h3>
                        <p className='publicDescription' dangerouslySetInnerHTML={{ __html: description }}/>
                    </Segment>
                </div>
                <Divider section />

                <Header className="countTable" as='h4' color='green'>
                    {t('group.table.usersCountPart1')}
                    <Label className="membersCount">
                        {this.props.group.members_count}
                    </Label>
                    {t('group.table.usersCountPart2')}
                </Header>

                <Mobile>
                    <Divider section/>
                </Mobile>

                <Button
                    className="unsubscribeButton"
                    color='blue'
                    size='mini'
                    floated='right'
                    onClick={() => this.wall(this.props.group.id)}
                >
                    {t('group.table.wallButton')}
                </Button>

                {
                    this.state.loading
                        ? <Button className="unsubscribeButton" floated='right' loading>Loading</Button>
                        : this.state.ifSubscribe
                            ? (
                                <Button
                                    className="unsubscribeButton"
                                    color='google plus'
                                    size='mini'
                                    floated='right'
                                    onClick={() => this.unsubscribe(this.props.group.id)}
                                >
                                    {t('group.table.unsubscribeButton')}
                                </Button>
                            ) : (
                                <Button
                                    className="unsubscribeButton"
                                    color='green'
                                    size='mini'
                                    floated='right'
                                    onClick={() => this.subscribe(this.props.group.id)}
                                >
                                    {t('group.table.subscribeButton')}
                                </Button>
                            )
                }

                <Mobile>
                    <br/>
                </Mobile>
            </div>
        );
    }
}

export default withAlert(translate('common')(Group));
