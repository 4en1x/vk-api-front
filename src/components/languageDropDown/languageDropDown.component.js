import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Flag } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import './languageDropDown.css';

class LanguageDropDown extends React.Component {
    static get propTypes() {
        return {
            i18n: PropTypes.shape({}),
            t: PropTypes.func,
        };
    }

    render() {
        const { t, i18n } = this.props;

        return (
            <div className='languageDropDown'>
                <Dropdown text={t('languageDropDown.name')} icon='world' floating labeled button className='icon'>
                    <Dropdown.Menu>
                        <Dropdown.Menu scrolling>
                            <Dropdown.Item onClick={() => i18n.changeLanguage('de')}>
                                <Flag name='de'> de</Flag>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => i18n.changeLanguage('en')}>
                                <Flag name='gb'> en</Flag>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => i18n.changeLanguage('cn')}>
                                <Flag name='cn'> cn</Flag>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default translate('common')(LanguageDropDown);
