import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import './wall.css';

import {
    Header,
    List,
    Segment,
} from 'semantic-ui-react';

import SemanticLoader from '../../../components/loaders/semantic-loader';

import * as actionCreators from '../group-actions';
import Post from './post.component';

class Wall extends Component {
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
            getWall: PropTypes.func,
            updateWall: PropTypes.func,
            loadedPage: PropTypes.number,
            posts: PropTypes.arrayOf(PropTypes.shape({})),
            match: PropTypes.shape({
                params: PropTypes.shape({
                    id: PropTypes.string,
                }),
            }),
            location: PropTypes.shape({
                state: PropTypes.shape({
                    groupName: PropTypes.string,
                    groupScreenName: PropTypes.string,
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
                this.props.updateWall(newPage, this.props.match.params.id, this.props.alert.error, this.props.t);
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
        this.props.getWall(1, this.props.match.params.id, this.props.alert.error, this.props.t);
    }

    render() {
        if (!this.props.posts) {
            return <SemanticLoader />;
        }

        return (
            <div>
                <div id='postsList' className="content-all" >
                    <div className="group-tab background padded">
                        <Header size='large' textAlign="center">{this.props.location.state.groupName}</Header>
                        <List verticalAlign='middle'>
                            {
                                this.props.posts
                                    .map(item => <List.Item key ={item.id}>
                                        <Segment>
                                            <Post
                                                post={item}
                                                match={this.props.match}
                                                groupId={this.props.match.params.id}
                                                groupScreenName={this.props.location.state.groupScreenName}
                                            />
                                        </Segment>
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
    posts: state.group.posts,
    loadedPage: state.group.loadedPage,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(Wall)));
