import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './Footer.scss'
import { Link, withRouter } from 'react-router-dom';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentYear: moment().format('YYYY')
        }
    }

    componentDidMount() {
        // You can fetch footer data here if needed
    }

    render() {
        const { language } = this.props;
        const { currentYear } = this.state;

        return (
            <footer className="patient-footer">
                <div className="patient-footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 footer-brand">
                                <div className="footer-logo">
                                    <h2>DoctorsCare</h2>
                                </div>
                                <p className="brand-description">
                                    <FormattedMessage
                                        id="patient.footer.description"
                                        defaultMessage="The easiest way to book medical appointments with trusted doctors and healthcare specialists in your area."
                                    />
                                </p>
                                <div className="app-downloads">
                                    <a href="#" className="app-button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/800px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" />
                                    </a>
                                    <a href="#" className="app-button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/800px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" />
                                    </a>
                                </div>
                            </div>

                            <div className="col-md-2 footer-links">
                                <h3 className="footer-heading">
                                    <FormattedMessage id="patient.footer.forPatients" defaultMessage="For Patients" />
                                </h3>
                                <ul>
                                    <li>
                                        <Link to="/specialty">
                                            <FormattedMessage id="patient.footer.findDoctor" defaultMessage="Find a Doctor" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/clinic">
                                            <FormattedMessage id="patient.footer.specialties" defaultMessage="Medical Specialties" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/all-doctor">
                                            <FormattedMessage id="patient.footer.clinics" defaultMessage="Clinics & Hospitals" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/handbook">
                                            <FormattedMessage id="patient.footer.appointments" defaultMessage="My Appointments" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/health-blog">
                                            <FormattedMessage id="patient.footer.healthBlog" defaultMessage="Health Blog" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-2 footer-links">
                                <h3 className="footer-heading">
                                    <FormattedMessage id="patient.footer.forDoctors" defaultMessage="For Doctors" />
                                </h3>
                                <ul>
                                    <li>
                                        <Link to="/specialty">
                                            <FormattedMessage id="patient.footer.joinNetwork" defaultMessage="Join Our Network" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/clinic">
                                            <FormattedMessage id="patient.footer.doctorLogin" defaultMessage="Doctor Login" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/doctor">
                                            <FormattedMessage id="patient.footer.resources" defaultMessage="Doctor Resources" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/handbook">
                                            <FormattedMessage id="patient.footer.faq" defaultMessage="FAQ" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-4 footer-contact">
                                <h3 className="footer-heading">
                                    <FormattedMessage id="patient.footer.contact" defaultMessage="Contact Us" />
                                </h3>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <p>197 Phú Diễn, Bắc Từ Liêm, Hà Nội</p>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-phone-alt"></i>
                                        <p>+84 (0) 969921549</p>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-envelope"></i>
                                        <p>support@doctorscare.com</p>
                                    </div>
                                </div>
                                <div className="social-media">
                                    <a href="#" className="social-icon" aria-label="Facebook">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="social-icon" aria-label="Twitter">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="social-icon" aria-label="Instagram">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" className="social-icon" aria-label="LinkedIn">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="patient-footer-bottom">
                    <div className="container">
                        <div className="footer-bottom-content">
                            <div className="copyright">
                                <p>
                                    © {currentYear} DoctorsCare. <FormattedMessage id="patient.footer.rights" defaultMessage="All rights reserved." />
                                </p>
                            </div>

                            <div className="footer-nav">
                                <Link to="/terms">
                                    <FormattedMessage id="patient.footer.terms" defaultMessage="Terms of Service" />
                                </Link>
                                <Link to="/privacy">
                                    <FormattedMessage id="patient.footer.privacy" defaultMessage="Privacy Policy" />
                                </Link>
                                <Link to="/cookies">
                                    <FormattedMessage id="patient.footer.cookies" defaultMessage="Cookie Policy" />
                                </Link>
                                <Link to="/accessibility">
                                    <FormattedMessage id="patient.footer.accessibility" defaultMessage="Accessibility" />
                                </Link>
                            </div>

                            <div className="language-selector">
                                <select
                                    value={language}
                                    onChange={(e) => {
                                        // Logic to change language
                                        console.log('Selected language:', e.target.value);
                                    }}
                                >
                                    <option value="en">English</option>
                                    <option value="vi">Tiếng Việt</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
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
