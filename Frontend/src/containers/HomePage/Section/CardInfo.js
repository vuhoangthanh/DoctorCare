import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import './CardInfo.scss'

class CardInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    render() {
        let { language } = this.props;
        return (
            <div className="row card-info">
                <div className="col-12 card-child">
                    <div className="each-card">
                        <div className="icon-child"><i className="fas fa-hospital"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child1" /></div>
                    </div>
                    <div className="each-card">
                        <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child2" /></div>
                    </div>
                    <div className="each-card">
                        <div className="icon-child"><i className="fas fa-procedures"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child3" /></div>
                    </div>
                    <div className="each-card">
                        <div className="icon-child"><i className="fas fa-flask"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child4" /></div>
                    </div>
                    <div className="each-card">
                        <div className="icon-child"><i className="fas fa-user-md"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child5" /></div>
                    </div>
                    <div className="each-card">
                        <div className="icon-child"><i className="fas fa-briefcase-medical"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child6" /></div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardInfo);
