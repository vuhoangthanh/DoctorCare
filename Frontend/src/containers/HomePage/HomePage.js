import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import CardInfo from './Section/CardInfo';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 300) {
            this.setState({ visible: true });
        } else {
            this.setState({ visible: false });
        }
    };

    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <CardInfo />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />

                {/* Nút Back to Top */}
                <button
                    className="back-to-top show"
                    // className={`back-to-top ${this.state.visible ? "show" : ""}`}
                    onClick={this.scrollToTop} // ✅ Đúng cú pháp
                >
                    ⬆
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

export default connect(mapStateToProps)(HomePage);
