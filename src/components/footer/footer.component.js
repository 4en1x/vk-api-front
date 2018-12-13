import React from 'react';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';
import './footer.css';
import { translate } from 'react-i18next';

class Footer extends React.Component {
    static get propTypes() {
        return {
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
        };
    }

    render() {
        return (
            <footer className="footer-distributed">
                <div className="footer-right">
                    <a href="https://www.linkedin.com/in/5en1x"><i className="fa fa-linkedin"/></a>
                    <a href="https://vk.com/5en1x"><i className="fa fa-vk"/></a>
                    <a href="https://t.me/f3_3d"><i className="fa fa-plane"/></a>
                    <a href="https://github.com/4en1x"><i className="fa fa-github"/></a>
                </div>

                <div className="footer-left">
                    <footer name="page-footer" >
                        Project by <a href="mailto:freeplayercot@gmail.com">Kanstantsin Stsefanovich</a>
                    </footer>
                </div>
            </footer>

        );
    }
}

export default withAlert(translate('common')(Footer));
