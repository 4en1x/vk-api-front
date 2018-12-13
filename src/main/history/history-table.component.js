import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import {
    Icon,
    List,
    Pagination,
    Header,
    Segment,
} from 'semantic-ui-react';

import Responsive from 'react-responsive';
import SemanticLoader from '../../components/loaders/semantic-loader';

import * as actionCreators from './history-actions';
import Friend from '../friends/friend.component';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Mobile = props => <Responsive {...props} maxWidth={992} />;

class HistoryTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            isLoading: false,
        };
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
            getHistory: PropTypes.func,
            totalPages: PropTypes.number,
            history: PropTypes.arrayOf(PropTypes.shape({})),
        };
    }

    onElementClick = (obj) => {
        this.setState({ activePage: obj.activePage });
        this.props.getHistory(obj.activePage, this.props.alert.error, this.props.t);
    };

    componentDidMount() {
        this.props.getHistory(this.state.activePage, this.props.alert.error, this.props.t);
    }

    render() {
        const { t } = this.props;

        if (!this.props.history) {
            return <SemanticLoader />;
        }

        return (
            <div>
                <div id='postsList' className="content-all" >
                    <Header as='h1' textAlign='center' className='paddingTopElement'>{t('history.name')}</Header>
                    <div className="group-tab background padded">
                        <List verticalAlign='middle'>
                            {
                                this.props.history
                                    .map(item => <List.Item key ={item.id}>
                                        <Friend
                                            friend={item}
                                        />
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
    history: state.history.history,
    totalPages: state.history.totalPages,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(HistoryTable)));
