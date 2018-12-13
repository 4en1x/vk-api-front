import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withAlert } from 'react-alert';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/header/header.components';
import Footer from '../../components/footer/footer.component';
import GroupTable from '../group/group-table.component';
import HistoryTable from '../history/history-table.component';
import FriendTable from '../friends/friend-table.component';
import Wall from '../group/wall/wall.component';

import store from '../../index';
import { logout } from '../auth/auth-actions';
import './App.css';

class App extends Component {
    itemSelected = () => {
        store.dispatch(logout(this.props.alert.error, this.props.t));
    };

    static get propTypes() {
        return {
            user: PropTypes.shape({
                login: PropTypes.string,
                role: PropTypes.string,
            }),
            alert: PropTypes.shape({
                error: PropTypes.func,
            }),
        };
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <Header
                    user={{ username: user.username, role: user.role }}
                    itemSelected={this.itemSelected}
                />
                <div className="full-height">
                    <Switch>
                        <Route path="/history" component={HistoryTable} />
                        <Route path="/friends" component={FriendTable} />
                        <Route path="/groups/:id" component={Wall} />
                        <Route path="/" component={GroupTable} />
                    </Switch>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default withAlert(App);
