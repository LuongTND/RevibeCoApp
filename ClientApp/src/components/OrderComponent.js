import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import authService from './api-authorization/AuthorizeService';

function OrderComponent() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [orderBy, setOrderBy] = useState('OrderDate');
    const [descending, setDescending] = useState(false);

    const ordersPerPage = 10; // số đơn hàng trên mỗi trang

    useEffect(() => {
        fetchOrders();
    }, [currentPage, orderBy, descending]);

    const fetchOrders = async () => {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');
        if (roles) {
            try {
                const response = await axios.get('/api/orders', {
                    params: {
                        page: currentPage + 1,
                        pageSize: ordersPerPage,
                        orderBy: orderBy,
                        descending: descending
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data.results);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    };

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const calculateTotalAmount = (orderDetails) => {
        return orderDetails.reduce((total, detail) => total + detail.quantity * detail.unitPrice, 0);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleSortChange = (sortBy) => {
        if (sortBy === orderBy) {
            setDescending(!descending);
        } else {
            setOrderBy(sortBy);
            setDescending(false); // Default to ascending when changing sort criteria
        }
        setCurrentPage(0); // Reset to the first page when changing sorting criteria
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = await authService.getAccessToken();
            const response = await axios.patch(`/api/orders/${orderId}/status`, `"${newStatus}"`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            fetchOrders();
        } catch (err) {
            setError(err.message);
        }
    };

    const statusOptions = [
        { value: 'Pending', label: "Pending" },
        { value: 'Processing', label: "Processing" },
        { value: 'Delivering', label: "Delivering" },
        { value: 'Completed', label: "Completed" },
        { value: 'Cancelled', label: "Cancelled" },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Orders</h1>

            <div className="sort-options d-flex gap-2 mb-2">
                <DropdownButton id="dropdown-basic-button" title={`Sort by ${orderBy}`}>
                    <Dropdown.Item onClick={() => handleSortChange('Id')}>Id</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('OrderDate')}>Order Date</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('Status')}>Status</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('Username')}>Username</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('CouponCode')}>Coupon Code</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-basic-button" title={`Order ${descending ? 'Descending' : 'Ascending'}`}>
                    <Dropdown.Item onClick={() => setDescending(false)}>Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => setDescending(true)}>Descending</Dropdown.Item>
                </DropdownButton>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Coupon</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>{order.user ? order.user.userName : 'N/A'}</td>
                            <td>{order.coupon ? order.coupon.code : 'N/A'}</td>
                            <td>
                                <Button variant="info" onClick={() => handleShowModal(order)}>
                                    Order Details
                                </Button>
                                <DropdownButton
                                    id="dropdown-status-button"
                                    title="Update Status"
                                    onSelect={(eventKey) => handleUpdateOrderStatus(order.id, eventKey)}
                                >
                                    {statusOptions.map(option => (
                                        <Dropdown.Item key={option.value} eventKey={option.value}>
                                            {option.label}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLinkClassName="page-link"
            />

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <div>
                            <h4>Order ID: {selectedOrder.id}</h4>
                            <p>Order Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                            <p>Status: {selectedOrder.status}</p>
                            <p>User: {selectedOrder.user ? selectedOrder.user.userName : 'N/A'}</p>
                            <p>Coupon: {selectedOrder.coupon ? selectedOrder.coupon.code : 'N/A'}</p>
                            <h5>Order Details:</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.orderDetails.map(detail => (
                                        <tr key={detail.id}>
                                            <td>{detail.product.id}</td>
                                            <td>{detail.product.name}</td>
                                            <td>{detail.quantity}</td>
                                            <td>{detail.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                            <td>{(detail.quantity * detail.unitPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <p><strong>Total Amount:</strong> {calculateTotalAmount(selectedOrder.orderDetails).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OrderComponent;
