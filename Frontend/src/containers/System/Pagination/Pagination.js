import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import ReactPaginate from 'react-paginate';
import './Pagination.scss'

class Pagination extends Component {
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
        let { pageCount, handlePageClick } = this.props
        return (
            <div className="col-12 pagination-container">
                <ReactPaginate
                    nextLabel={<i className="fas fa-chevron-right"></i>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={<i className="fas fa-chevron-left"></i>}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
