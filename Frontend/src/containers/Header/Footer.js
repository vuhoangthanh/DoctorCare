import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import './Footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentYear: moment().format('YYYY')
        }
    }

    async componentDidMount() {
        // You can fetch additional footer data here if needed
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // Handle component updates if needed
    }

    render() {
        let { language } = this.props;
        const { currentYear } = this.state;

        return (
            <div className="admin-footer">
                <div className="admin-footer-container">
                    <div className="footer-top">
                        <div className="footer-info">
                            <div className="company-info">
                                <h3 className="footer-title">
                                    <FormattedMessage id="footer.company" defaultMessage="Company" />
                                </h3>
                                <ul>
                                    <li><a href="#"><FormattedMessage id="footer.about" defaultMessage="About Us" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.team" defaultMessage="Our Team" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.careers" defaultMessage="Careers" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.contact" defaultMessage="Contact Us" /></a></li>
                                </ul>
                            </div>

                            <div className="resources">
                                <h3 className="footer-title">
                                    <FormattedMessage id="footer.resources" defaultMessage="Resources" />
                                </h3>
                                <ul>
                                    <li><a href="#"><FormattedMessage id="footer.documentation" defaultMessage="Documentation" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.faq" defaultMessage="FAQ" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.api" defaultMessage="API Guide" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.support" defaultMessage="Support" /></a></li>
                                </ul>
                            </div>

                            <div className="legal">
                                <h3 className="footer-title">
                                    <FormattedMessage id="footer.legal" defaultMessage="Legal" />
                                </h3>
                                <ul>
                                    <li><a href="#"><FormattedMessage id="footer.terms" defaultMessage="Terms of Service" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.privacy" defaultMessage="Privacy Policy" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.security" defaultMessage="Security" /></a></li>
                                    <li><a href="#"><FormattedMessage id="footer.compliance" defaultMessage="Compliance" /></a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer-contact">
                            <div className="newsletter">
                                <h3 className="footer-title">
                                    <FormattedMessage id="footer.newsletter" defaultMessage="Newsletter" />
                                </h3>
                                <p><FormattedMessage id="footer.subscribe" defaultMessage="Subscribe to receive updates" /></p>
                                <div className="newsletter-form">
                                    <input type="email" placeholder="Email address" />
                                    <button type="submit">
                                        <FormattedMessage id="footer.submit" defaultMessage="Subscribe" />
                                    </button>
                                </div>
                            </div>

                            <div className="social-media">
                                <h3 className="footer-title">
                                    <FormattedMessage id="footer.follow" defaultMessage="Follow Us" />
                                </h3>
                                <div className="social-icons">
                                    <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="social-icon linkedin"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="social-icon youtube"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-divider"></div>

                    <div className="footer-bottom">
                        <div className="copyright">
                            <p>
                                © {currentYear} <FormattedMessage id="footer.rights" defaultMessage="Company Name. All rights reserved." />
                            </p>
                        </div>



                        <div className="admin-info">
                            <span>
                                <FormattedMessage
                                    id="footer.version"
                                    defaultMessage="Version {version}"
                                    values={{ version: '2.5.0' }}
                                />
                            </span>
                            <span className="separator">|</span>
                            <span>
                                <FormattedMessage
                                    id="footer.lastUpdated"
                                    defaultMessage="Last Updated: {date}"
                                    values={{ date: moment().format('DD/MM/YYYY') }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Add dispatch actions here if needed
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);