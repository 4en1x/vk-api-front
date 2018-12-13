import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import DropDownTrigger from './dropDownTrigger/dropDownTrigger.components';

import images from '../../assets/images';
import './header.css';

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
        };
    }

    static get propTypes() {
        return {
            user: PropTypes.shape({}),
            itemSelected: PropTypes.func,
        };
    }

    render() {
        const { user } = this.props;

        return (
            <div className="header-component sticky-header">
                <div className="header-content">
                    <div className="header-content-left">
                        <Link to="/" className="logo-container">
                            <Image className="logo" src={images.logo1} />
                        </Link>
                    </div>
                    <DropDownTrigger user={user} itemSelected={this.props.itemSelected} />
                </div>
            </div>
        );
    }
}
