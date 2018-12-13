import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';
import { withAlert } from 'react-alert';
import queryString from 'query-string';

import './group-table.css';
import {
    Pagination,
    Icon,
    List,
    Segment,
    Input,
} from 'semantic-ui-react';
import SemanticLoader from '../../components/loaders/semantic-loader';

import * as actionCreators from './group-actions';
import Group from './group.component';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Mobile = props => <Responsive {...props} maxWidth={992} />;

class GroupTable extends Component {
    constructor(props) {
        super(props);

        const values = queryString.parse(this.props.location.search)

        this.state = {
            activePage: values.page || 1,
            filter: values.filter || '',
        };
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
            getGroups: PropTypes.func,
            totalPages: PropTypes.number,
            groups: PropTypes.arrayOf(PropTypes.shape({})),
        };
    }

    onElementClick = (obj) => {
        this.setState({ activePage: obj.activePage });
        this.props.getGroups(obj.activePage, this.state.filter, this.props.alert.error, this.props.t);
    };

    componentDidMount() {
        this.props.getGroups(this.state.activePage, this.state.filter, this.props.alert.error, this.props.t);
    }

    filter = () => {
        this.props.getGroups(1, this.state.filter, this.props.alert.error, this.props.t);
    };

    render() {
        const { t } = this.props;

        if (!this.props.groups) {
            return <SemanticLoader />;
        }

        return (
            <div>
                <div className="content-all" >
                    <div className="group-tab background padded ">
                        <Input
                            fluid
                            action={{ color: 'teal', content: t('group.search'), onClick: this.filter }}
                            placeholder='Type user id ...'
                            onChange={(event, obj) => this.setState({ filter: obj.value })}
                            type="number"
                            className="userSearch"
                        />
                        <List verticalAlign='middle'>
                            {
                                this.props.groups
                                    .map(item => <List.Item key ={item.id}>
                                        <Segment>
                                            <Group
                                                group={item}
                                            />
                                        </Segment>
                                    </List.Item>)
                            }
                        </List>
                    </div>
                    {
                        this.props.totalPages > 1 ? (
                            <div className="group-pagination">
                                <Segment>
                                    <Desktop>
                                        <Pagination
                                            defaultActivePage={1}
                                            ellipsisItem={{
                                                content: <Icon name='ellipsis horizontal'/>,
                                                icon: true,
                                            }}
                                            firstItem={{
                                                content: <Icon name='angle double left'/>,
                                                icon: true,
                                            }}
                                            lastItem={{
                                                content: <Icon name='angle double right'/>,
                                                icon: true,
                                            }}
                                            prevItem={{
                                                content: <Icon name='angle left'/>,
                                                icon: true,
                                            }}
                                            nextItem={{
                                                content: <Icon name='angle right'/>,
                                                icon: true,
                                            }}
                                            totalPages={this.props.totalPages}
                                            onPageChange={(event, obj) => this.onElementClick(obj)}
                                        />
                                    </Desktop>
                                    <Mobile>
                                        <Pagination
                                            boundaryRange={0}
                                            defaultActivePage={1}
                                            ellipsisItem={null}
                                            firstItem={{
                                                content: <Icon name='angle double left'/>,
                                                icon: true,
                                            }}
                                            lastItem={{
                                                content: <Icon name='angle double right'/>,
                                                icon: true,
                                            }}
                                            prevItem={null}
                                            nextItem={null}
                                            totalPages={this.props.totalPages}
                                            onPageChange={(event, obj) => this.onElementClick(obj)}
                                        />
                                    </Mobile>
                                </Segment>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    groups: state.group.groups,
    totalPages: state.group.totalPages,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(GroupTable)));
