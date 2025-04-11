import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment from 'moment'
import { FormattedMessage } from 'react-intl';
import "./Dashboard.scss"
import { getAllStatistic } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import Pagination from '../Pagination/Pagination';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statistic: [],
            totalRevenueVi: '',
            totalRevenueEn: '',
            totalBookings: '',
            totalComplete: '',
            totalCanceled: '',
            allData: [],
            monthlyData: [],
            showChart: true,
            revenueData: [],
            totalRevenueWeek: '',

            page_empty: '',
            page: '',
            size: 3,
            pageCount: 0,
        }
    }

    async componentDidMount() {
        this.getAllStatistic();
        this.handleBuildDataChart();
        this.handleBuildMonthlyDataChart();
        this.handleBuildRevenueChart();
        this.handleCallForTable();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.getAllStatistic();
            this.handleBuildRevenueChart();
        }

    }

    getAllStatistic = async () => {
        let response = await getAllStatistic({
            page: this.state.page_empty,
            size: this.state.page_empty
        });
        // let { statistic } = this.state;
        let { language } = this.props;
        let totalRevenueVi = '', totalRevenueEn = '', totalBookings = '', totalComplete = '', totalCanceled = '';
        let statistic = [];
        if (response && response.error === null) {
            statistic = response.data.result;
            if (statistic.length > 0) {
                statistic.map(item => {
                    totalRevenueVi = +totalRevenueVi + item.revenueVi
                    totalRevenueEn = +totalRevenueEn + item.revenueEn
                    totalBookings = +totalBookings + item.totalBookings
                    totalComplete = +totalComplete + item.completedBookings
                    totalCanceled = +totalCanceled + item.cancelledBookings

                })
            }
        }
        this.setState({
            totalRevenueEn: totalRevenueEn,
            totalRevenueVi: totalRevenueVi,
            totalBookings: totalBookings,
            totalComplete: totalComplete,
            totalCanceled: totalCanceled
        })
    }
    handleBuildDataChart = async () => {
        let response = await getAllStatistic({
            page: this.state.page_empty,
            size: this.state.page_empty
        });
        let allData = [];
        let statistic = [];
        let data = {};

        if (response && response.error === null) {
            statistic = response.data.result;
            if (statistic.length > 0) {
                statistic.map(item => {
                    data = {
                        // name: moment(item.date).format('DD/MM/YYYY'),
                        name: moment.unix(item.date / 1000).format('DD/MM/YYYY'),
                        all: item.totalBookings,
                        complete: item.completedBookings,
                        cancel: item.cancelledBookings,
                    }
                    allData.push(data)
                })
            }
        }
        this.setState({
            allData: allData
        })
    }

    handleBuildMonthlyDataChart = async () => {
        let response = await getAllStatistic({
            page: this.state.page_empty,
            size: this.state.page_empty
        });
        let monthlyData = {};
        let dataByMonth = [];

        if (response && response.error === null) {
            let statistic = response.data.result;

            statistic.forEach(item => {
                let month = moment.unix(item.date / 1000).format('MM/YYYY'); // Lấy tháng và năm (VD: "2024-03")

                if (!monthlyData[month]) {
                    monthlyData[month] = {
                        name: month,
                        all: 0,
                        complete: 0,
                        cancel: 0
                    };
                }

                monthlyData[month].all += item.totalBookings;
                monthlyData[month].complete += item.completedBookings;
                monthlyData[month].cancel += item.cancelledBookings;
            });

            // Convert object to array
            dataByMonth = Object.values(monthlyData);
        }

        this.setState({ monthlyData: dataByMonth });
    }
    handleOnclickDay = () => {
        this.setState({
            showChart: true
        })
    }
    handleOnclickMonth = () => {
        this.setState({
            showChart: false
        })
    }


    handleBuildRevenueChart = async () => {
        let { language } = this.props;
        let labelsEn = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        let labelsVi = ['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Cn'];
        let labels = language === LANGUAGES.VI ? labelsVi : labelsEn;

        try {
            let response = await getAllStatistic();
            if (response && response.error === null) {
                let today = new Date();
                let startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
                let endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);

                let revenueByDay = labels.reduce((acc, day) => ({ ...acc, [day]: { revenueVi: 0, revenueEn: 0 } }), {});
                let totalRevenueVi = 0;
                let totalRevenueEn = 0;

                response.data.result.forEach(item => {
                    let itemDate = new Date(Number(item.date));
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
                        let dayName = labels[itemDate.getDay() === 0 ? 6 : itemDate.getDay() - 1];
                        revenueByDay[dayName].revenueVi += item.revenueVi;
                        revenueByDay[dayName].revenueEn += item.revenueEn;

                        // Cộng vào tổng doanh thu tuần
                        totalRevenueVi += item.revenueVi;
                        totalRevenueEn += item.revenueEn;
                    }
                });

                let formattedData = labels.map(day => ({
                    name: day,
                    revenue: language === LANGUAGES.VI ? revenueByDay[day].revenueVi : revenueByDay[day].revenueEn
                }));

                this.setState({
                    revenueData: formattedData,
                    totalRevenueWeek: language === LANGUAGES.VI ? totalRevenueVi : totalRevenueEn // Lưu tổng doanh thu tuần
                });
            }
        } catch (error) {
            console.error("Error fetching revenue data:", error);
        }
    };

    handleCallForTable = async () => {
        let response = await getAllStatistic(
            {
                page: this.state.page,
                size: this.state.size
            }
        );
        if (response && response.error === null) {
            this.setState({
                statistic: response.data.result,
                pageCount: response.data.meta.pages
            })
        }
    }
    handlePageClick = async (event) => {
        this.setState({
            page: +event.selected + 1
        }, () => {
            this.handleCallForTable();
        }
        )

    };
    render() {
        let { language } = this.props;
        let { totalRevenueVi, totalRevenueEn, totalBookings, totalComplete, totalCanceled, allData, revenueData, totalRevenueWeek, statistic, pageCount } = this.state
        let data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
        console.log("revenue", statistic)
        const CustomTooltip = ({ active, payload, label }) => {
            if (active && payload && payload.length >= 3) { // Đảm bảo có đủ phần tử trong payload
                return (
                    <div style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "6px", border: "1px solid #ddd", boxShadow: "0px 2px 4px rgba(0,0,0,0.2)" }}>
                        <p style={{ fontSize: "13px", marginBottom: "5px", color: "black" }}>{label}</p>

                        <p style={{ display: "flex", alignItems: "center", margin: "2px 0", fontSize: "12px", color: "black" }}>
                            <span style={{ width: "10px", height: "10px", backgroundColor: "#1890ff", borderRadius: "50%", display: "inline-block", marginRight: "8px" }} />
                            <span>Tổng lịch đặt: <strong>{payload[0]?.value || 0}</strong></span>
                        </p>

                        <p style={{ display: "flex", alignItems: "center", margin: "2px 0", fontSize: "12px", color: "black" }}>
                            <span style={{ width: "10px", height: "10px", backgroundColor: "#52c41a", borderRadius: "50%", display: "inline-block", marginRight: "8px" }} />
                            <span>Tổng lịch hoàn thành: <strong>{payload[1]?.value || 0}</strong></span>
                        </p>

                        <p style={{ display: "flex", alignItems: "center", margin: "2px 0", fontSize: "12px", color: "black" }}>
                            <span style={{ width: "10px", height: "10px", backgroundColor: "#C70039", borderRadius: "50%", display: "inline-block", marginRight: "8px" }} />
                            <span>Tổng lịch hủy: <strong>{payload[2]?.value || 0}</strong></span>
                        </p>
                    </div>
                );
            }
            return null;
        };

        const CustomLegend = ({ payload }) => {
            return (
                <div style={{ display: "flex", justifyContent: "center", gap: "15px", fontSize: "13px" }}>
                    {payload.map((entry, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", color: "black", fontFamily: "Arial" }}>
                            <span
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: entry.color,
                                    display: "inline-block",
                                    borderRadius: "50%",
                                    marginRight: "6px",
                                }}
                            />
                            <span>{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        };

        const CustomTooltipBar = ({ active, payload, label }) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{
                        background: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        color: "black",
                        fontFamily: "Arial"
                    }}>
                        <p style={{ margin: 0, color: "#333", fontSize: "14px" }}>{label}</p>
                        <p style={{ margin: 0, color: "#20C9C9", fontSize: "12px" }}>
                            Doanh thu: {payload[0].value}
                        </p>
                    </div>
                );
            }
            return null;
        };


        return (
            <div className="dashboard-container">
                <div className="dashboard-body container">
                    <div className="content-up row">
                        <div className="col-12 cards">
                            <div className="card">
                                <div className="title-card"><span>Tổng doanh thu</span></div>
                                <div className="value-card"><span>
                                    <NumberFormat
                                        className="currency"
                                        value={language === LANGUAGES.VI ? totalRevenueVi : totalRevenueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={language === LANGUAGES.VI ? ' VND' : ' $'} /></span>
                                </div>
                            </div>
                            <div className="card">
                                <div className="title-card"><span>Tổng lượt đặt lịch</span></div>
                                <div className="value-card"><span>{totalBookings}</span></div>
                            </div>
                            <div className="card">
                                <div className="title-card"><span>Tổng lịch hoàn thành</span></div>
                                <div className="value-card"><span>{totalComplete}</span></div>
                            </div>
                            <div className="card">
                                <div className="title-card"><span>Tổng lịch hủy</span></div>
                                <div className="value-card"><span>{totalCanceled}</span></div>
                            </div>
                        </div>

                    </div>
                    <div className="row content-down">
                        <div className="col-12 charts">
                            <div className="out-side-left">
                                <div className="line-btn">
                                    <div className="title-chart">
                                        <span>Thống kế lượng đặt lịch</span>
                                    </div>
                                    <div className="btn-change-chart">
                                        <button onClick={() => this.handleOnclickDay()} className={this.state.showChart === true ? "active" : ""}>Ngày</button>
                                        <button onClick={() => this.handleOnclickMonth()} className={this.state.showChart === false ? "active" : ""}>Tháng</button>
                                    </div>
                                </div>
                                <div className="chart-left">

                                    {
                                        <LineChart className={this.state.showChart === true ? "active line-chart" : "line-chart"} width={900} height={350} data={allData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                            <Line type="monotone" dataKey="all" stroke="#1890ff" strokeWidth={1} name="Tổng lịch đặt" />
                                            <Line type="monotone" dataKey="complete" stroke="#52c41a" strokeWidth={1} name="Tổng lịch hoàn thành" />
                                            <Line type="monotone" dataKey="cancel" stroke="#C70039" strokeWidth={1} name="Tổng lịch hủy" />

                                            {/* Lưới nền: Chỉ có đường dọc, không có đường ngang */}
                                            <CartesianGrid stroke="#eaf1f8" strokeWidth={1} vertical={false} horizontal={true} />

                                            {/* Ẩn trục Ox và Oy */}
                                            <XAxis
                                                dataKey="name"
                                                axisLine={{ stroke: "black", strokeWidth: 0.5 }}
                                                tickLine={{ stroke: "black", strokeWidth: 0.5 }}
                                                tick={{ fill: "black", fontSize: 12, fontWeight: "400", fontFamily: "Arial" }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: "#666", fontSize: 12, fontWeight: "400", fontFamily: "Arial" }} />

                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend
                                                content={<CustomLegend />} />
                                        </LineChart>
                                    }

                                    {
                                        <LineChart className={this.state.showChart === false ? "active line-chart" : "line-chart"} width={900} height={350} data={this.state.monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                            <Line type="monotone" dataKey="all" stroke="#1890ff" strokeWidth={1} name="Tổng lịch đặt" />
                                            <Line type="monotone" dataKey="complete" stroke="#52c41a" strokeWidth={1} name="Tổng lịch hoàn thành" />
                                            <Line type="monotone" dataKey="cancel" stroke="#C70039" strokeWidth={1} name="Tổng lịch hủy" />

                                            <CartesianGrid stroke="#eaf1f8" strokeWidth={1} vertical={false} horizontal={true} />

                                            <XAxis
                                                dataKey="name"
                                                axisLine={{ stroke: "black", strokeWidth: 0.5 }}
                                                tickLine={{ stroke: "black", strokeWidth: 0.5 }}
                                                tick={{ fill: "black", fontSize: 12, fontWeight: "400", fontFamily: "Arial" }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: "#666", fontSize: 12, fontWeight: "400", fontFamily: "Arial" }} />

                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend
                                                content={<CustomLegend />} />
                                        </LineChart>
                                    }

                                </div>
                            </div>
                            <div className="chart-right">
                                <div className="text-revenue">
                                    <span className="text-up">Doanh thu tuần này</span>
                                    <span className="text-down">
                                        <NumberFormat
                                            className="currency"
                                            value={totalRevenueWeek}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={language === LANGUAGES.VI ? ' VND' : ' $'}
                                        />

                                    </span>
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart width={600} height={300} data={revenueData}>
                                        <XAxis dataKey="name"
                                            tickLine={false}
                                            tick={{ fill: "black", fontSize: 12, fontFamily: "Arial" }} />
                                        <YAxis axisLine={false}
                                            tickLine={false}
                                            tick={false} />
                                        <Tooltip content={<CustomTooltipBar />} />
                                        <Bar
                                            dataKey="revenue"
                                            fill="#20C9C9"
                                            barSize={25}
                                            radius={[10, 10, 0, 0]}
                                            label={{ position: 'top', fill: 'transparent' }}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="row content-table">
                        <div className="col-12">
                            <table className="table table-bordered table-hover  table-rounded">
                                <thead className="table-light">
                                    <tr>
                                        <th className="first col1"><FormattedMessage id="admin.dashboard.no" /></th>
                                        <th className="col2"><FormattedMessage id="admin.dashboard.date" /></th>
                                        <th className="col3"><FormattedMessage id="admin.dashboard.total-bookings" /></th>
                                        <th className="col4"><FormattedMessage id="admin.dashboard.complete-bookings" /></th>
                                        <th className="col5"><FormattedMessage id="admin.dashboard.cancelled-bookings" /></th>
                                        <th className="col6"><FormattedMessage id="admin.dashboard.total-revenue" /></th>
                                        <th className="col7"><FormattedMessage id="admin.dashboard.created-at" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statistic && statistic.length > 0 ?
                                        statistic.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{moment.unix(+item.date / 1000).format('DD/MM/YYYY')}</td>
                                                    <td>{item.totalBookings}</td>
                                                    <td>{item.completedBookings}</td>
                                                    <td>{item.cancelledBookings}</td>
                                                    <td>{language === LANGUAGES.VI ? item.revenueVi : item.revenueEn}</td>
                                                    <td>{moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        "no data"
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            pageCount={pageCount}
                            handlePageClick={this.handlePageClick} // Không cần arrow function
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
