import React, { Component } from "react";
import axios from "axios";
import "../assets/css/DashBoard.css"
import { Bar, Pie } from "react-chartjs-2";
import authService from './api-authorization/AuthorizeService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

class DashBoard extends Component {
    state = {
        productSales: {},
        prevProductSales: {},
        loading: true,
        error: null,
        selectedDate: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
        selectedPrevMonthDate: this.calculateFirstDayOfPreviousMonth(), // First day of previous month in YYYY-MM-DD format
        totalQuantitySold: 0,
        totalRevenue: 0,
        uniqueUsersCount: 0,
    };

    async componentDidMount() {
        try {
            const token = await authService.getAccessToken();
            const roles = await authService.isinRole('Admin');
            if (roles) {
                const { selectedDate, selectedPrevMonthDate } = this.state;
                this.fetchData(selectedDate, selectedPrevMonthDate);
                this.fetchSalesStatistics();
            } else {
                window.location.href = '/Identity/Account/AccessDenied';
            }
        } catch (error) {
            console.error('Error during authentication or data fetching:', error);
            // Handle the error appropriately (e.g., show an error message, log out the user, etc.)
        }
    }

    calculateFirstDayOfPreviousMonth() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // current month (0-11)

        // Calculate previous month's first day
        const firstDayOfPrevMonth = new Date(year, month - 1, 1);

        // Adjust if the current month is January
        if (month === 0) {
            firstDayOfPrevMonth.setFullYear(year - 1);
            firstDayOfPrevMonth.setMonth(11); // December (month 11)
        }

        // Format the date as YYYY-MM-DD
        const formattedPrevMonthDate = firstDayOfPrevMonth.toISOString().slice(0, 10);

        return formattedPrevMonthDate;
    }

    fetchData(date, prevDate) {
        axios
            .all([
                axios.get(`api/statis/GetProductSalesByMonth?date=${date}`),
                axios.get(`api/statis/GetProductSalesByMonth?date=${prevDate}`),
            ])
            .then(
                axios.spread((currentMonthResponse, prevMonthResponse) => {
                    this.setState({
                        productSales: currentMonthResponse.data,
                        prevProductSales: prevMonthResponse.data,
                        loading: false,
                    });
                })
            )
            .catch((error) => {
                this.setState({
                    error: error.message,
                    loading: false,
                });
            });
    }

    fetchSalesStatistics() {
        axios
            .get(`api/statis/GetSalesStatistics`)
            .then((response) => {
                const { totalQuantitySold, totalRevenue, uniqueUsersCount } = response.data;
                this.setState({
                    totalQuantitySold: totalQuantitySold,
                    totalRevenue: totalRevenue.toFixed(0), // Ensure revenue is formatted to two decimal places
                    uniqueUsersCount: uniqueUsersCount,
                });
            })
            .catch((error) => {
                console.error("Error fetching sales statistics:", error);
            });
    }

    handleDateChange = (event, type) => {
        const date = event.target.value;
        if (type === "selectedDate") {
            this.setState(
                {
                    selectedDate: date,
                },
                () => {
                    this.fetchData(this.state.selectedDate, this.state.selectedPrevMonthDate);
                }
            );
        } else if (type === "selectedPrevMonthDate") {
            this.setState(
                {
                    selectedPrevMonthDate: date,
                },
                () => {
                    this.fetchData(this.state.selectedDate, this.state.selectedPrevMonthDate);
                }
            );
        }
        this.setState({
            loading: true,
        });
    };

    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    formatCurrency(number) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(number);
    }

    render() {
        const {
            productSales,
            prevProductSales,
            loading,
            error,
            selectedDate,
            selectedPrevMonthDate,
            totalQuantitySold,
            totalRevenue,
            uniqueUsersCount,
        } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        const labels = Object.keys(productSales);
        const currentDataValues = Object.values(productSales);
        const prevDataValues = Object.values(prevProductSales); // Data for previous month

        const backgroundColors = labels.map(() => this.getRandomColor());
        const borderColors = backgroundColors.map((color) =>
            color.replace(/[^,]+(?=\))/, "1")
        ); // Set alpha to 1 for border color

        const barData = {
            labels: labels,
            datasets: [
                {
                    label: "Quantity Sold - Current Month",
                    data: currentDataValues,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
                {
                    label: "Quantity Sold - Previous Month",
                    data: prevDataValues,
                    backgroundColor: backgroundColors.map((color) =>
                        color.replace(/[^,]+(?=\))/, "0.4")
                    ), // Lighter color for previous month's data
                    borderColor: borderColors.map((color) =>
                        color.replace(/[^,]+(?=\))/, "0.4")
                    ), // Lighter color for previous month's data
                    borderWidth: 1,
                },
            ],
        };

        const pieData = {
            labels: labels,
            datasets: [
                {
                    label: "Quantity Sold",
                    data: currentDataValues,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Product Sales for Selected Month",
                },
            },
        };

        return (
            <div className="container-fluid p-0">
                <div class="row">
                    <div class="col-xxl-3 col-sm-6 col-12">
                        <div class="stats-tile">
                            <div class="sale-icon shade-red">
                                <i class="bi bi-pie-chart"></i>
                            </div>
                            <div class="sale-details">
                                <h3 class="text-red">{this.formatCurrency(totalRevenue*60/100)}</h3>
                                <p>Cost</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-sm-6 col-12">
                        <div class="stats-tile">
                            <div class="sale-icon shade-blue">
                                <i class="bi bi-emoji-smile"></i>
                            </div>
                            <div class="sale-details">
                                <h3 class="text-blue"> {uniqueUsersCount.toLocaleString("vi-VN")}</h3>
                                <p>Customers</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-sm-6 col-12">
                        <div class="stats-tile">
                            <div class="sale-icon shade-yellow">
                                <i class="bi bi-box-seam"></i>
                            </div>
                            <div class="sale-details">
                                <h3 class="text-yellow"> {totalQuantitySold.toLocaleString("vi-VN")}</h3>
                                <p>Products</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-sm-6 col-12">
                        <div class="stats-tile">
                            <div class="sale-icon shade-green">
                                <i class="bi bi-handbag"></i>
                            </div>
                            <div class="sale-details">
                                <h3 class="text-green">{this.formatCurrency(totalRevenue)}</h3>
                                <p>Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            <label htmlFor="dateInput">Select Date:</label>
                            <input
                                type="date"
                                id="dateInput"
                                value={selectedDate}
                                onChange={(e) => this.handleDateChange(e, "selectedDate")}
                            />
                        </div>
                        <div>
                            <label htmlFor="prevDateInput">Select Previous Month:</label>
                            <input
                                type="date"
                                id="prevDateInput"
                                value={selectedPrevMonthDate}
                                onChange={(e) => this.handleDateChange(e, "selectedPrevMonthDate")}
                            />
                        </div>
                        <Bar data={barData} options={options} />
                    </div>
                    <div className="col-md-4">
                        <Pie data={pieData} options={options} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DashBoard;
