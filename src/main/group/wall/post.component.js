import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import './wall.css';
import {
    Divider,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import groupService from '../../../service/group-service';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            liked: this.props.post.likes.user_likes,
        };
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            groupScreenName: PropTypes.string,
            groupId: PropTypes.string,
            post: PropTypes.shape({
                text: PropTypes.string,
                id: PropTypes.number,
                likes: PropTypes.shape({
                    user_likes: PropTypes.number,
                    count: PropTypes.number,
                }),
                views: PropTypes.shape({
                    count: PropTypes.number,
                }),
                comments: PropTypes.shape({
                    count: PropTypes.number,
                }),
                attachments: PropTypes.arrayOf(PropTypes.shape({})),
            }),
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
            match: PropTypes.shape({
                params: PropTypes.shape({
                    id: PropTypes.string,
                }),
            }),
        };
    }

    like = (id) => {
        groupService.like(this.props.match.params.id, id, this.state.liked)
            .then(
                (data) => {
                    this.props.alert.success(data.toString());
                },
            )
            .catch((error) => {
                if (error.response) {
                    this.props.alert.error(this.props.t(`error.${error.response.status}`));
                } else {
                    this.props.alert.error(error.message);
                }
            });
        this.setState(oldState => ({ liked: !oldState.liked }));
    };

    render() {
        const text = this.props.post.text.replace(/(https:\/\/[^\s]+)/g, "<a href='$1'>$1</a>");
        const link = `https://vk.com/${this.props.groupScreenName}?w=wall-${this.props.groupId}_${this.props.post.id}`
        return (
            <div>
                <Header size='medium' textAlign="left"><a href={link}>Post id: {this.props.post.id}</a></Header>
                <Segment basic>
                    <p className='publicDescription' dangerouslySetInnerHTML={{ __html: text }}/>
                </Segment>
                <Divider section />
                {
                    this.props.post.attachments
                        .map(item => <Image
                            as='a'
                            href={item.photo.sizes[4].url}
                            key ={item.photo.sizes[4].url}
                            src={item.photo.sizes[4].url}
                            size='medium'
                        />)
                }
                {
                    this.props.post.attachments.length ? (
                        <Divider section />
                    ) : null
                }

                <div className="post-icons">
                    {
                        this.state.liked ? (
                            <a onClick={() => this.like(this.props.post.id)} >
                                <i className="fa fa-heart liked"/>
                            </a>
                        ) : (
                            <a onClick={() => this.like(this.props.post.id)}>
                                <i className="fa fa-heart"/>
                            </a>
                        )
                    }
                     : {this.props.post.likes.count}
                    {
                        this.props.post.views ? (
                            <a><i className="fa fa-eye"/></a>
                        ) : null
                    }
                    {
                        this.props.post.views ? (
                            `: ${this.props.post.views.count}`
                        ) : null
                    }
                    <a><i className="fa fa-comments"/></a> : {this.props.post.comments.count}
                </div>
            </div>
        );
    }
}

export default withAlert(translate('common')(Post));
