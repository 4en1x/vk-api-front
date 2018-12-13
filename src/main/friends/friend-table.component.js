import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import './friend.css';

import {
    Header,
    List,
} from 'semantic-ui-react';

import SemanticLoader from '../../components/loaders/semantic-loader';

import * as actionCreators from './friend-actions';
import Friend from './friend.component';

class FriendTable extends Component {
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
            getFriends: PropTypes.func,
            updateFriends: PropTypes.func,
            loadedPage: PropTypes.number,
            friends: PropTypes.arrayOf(PropTypes.shape({})),
            match: PropTypes.shape({
                params: PropTypes.shape({
                    id: PropTypes.string,
                }),
            }),
        };
    }

    handleScroll = () => {
        if (!document.getElementById('postsList')) {
            return;
        }

        if ((window.innerHeight + window.scrollY) >= (document.getElementById('postsList').offsetHeight - 10)) {
            if (!this.state.isLoading) {
                this.setState({ isLoading: true });
                const newPage = this.state.activePage + 1;
                this.setState({ activePage: newPage });
                this.props.updateFriends(newPage, this.props.alert.error, this.props.t);
            }
            window.removeEventListener('scroll', this.handleScroll);
            setTimeout(() => {
                window.addEventListener('scroll', this.handleScroll);
            }, 1000);
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (state.isLoading && state.activePage === props.loadedPage) {
            return {
                isLoading: false,
            };
        }

        return null;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.props.getFriends(1, this.props.alert.error, this.props.t);
    }

    render() {
        const { t } = this.props;

        if (!this.props.friends) {
            return <SemanticLoader />;
        }

        return (
            <div>
                <div id='postsList' className="content-all" >
                    <Header as='h1' textAlign='center' className='paddingTopElement'>{t('friend.name')}</Header>
                    <div className="group-tab background padded">
                        <List verticalAlign='middle'>
                            {
                                this.props.friends
                                    .map(item => <List.Item key ={item.id}>
                                        <Friend
                                            friend={item}
                                        />
                                    </List.Item>)
                            }
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    friends: state.friend.friends,
    loadedPage: state.friend.loadedPage,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(FriendTable)));
