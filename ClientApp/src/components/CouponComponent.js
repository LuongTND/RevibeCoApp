import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import authService from './api-authorization/AuthorizeService';

const CouponComponent = () => {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discountAmount: 0,
        expiryDate: '',
        status: false
    });
    const [editCoupon, setEditCoupon] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        checkAdminRole();
    }, [currentPage]);

    useEffect(() => {
        if (isAdmin) {
            fetchData();
        } 
    }, [isAdmin, currentPage]);


    const fetchData = async () => {
            try {
                const response = await axios.get('/api/Coupons', {
                    params: {
                        page: currentPage + 1,
                        pageSize: 10
                    }
                });
                setCoupons(response.data.results);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
    };

    const checkAdminRole = async () => {
        try {
            const isAdmin = await authService.isinRole('Admin');
            setIsAdmin(isAdmin);
            if (!isAdmin) {
                window.location.href = '/Identity/Account/AccessDenied';
            }
        } catch (error) {
            console.error('Error checking admin role:', error);
        }
    };


    const handleSaveCoupon = async () => {
        try {
            if (editCoupon) {
                await axios.put(`/api/Coupons/${editCoupon.id}`, editCoupon);

                const updatedCoupons = coupons.map(coupon =>
                    coupon.id === editCoupon.id ? editCoupon : coupon
                );

                setCoupons(updatedCoupons);
            } else {
                const response = await axios.post('/api/Coupons', newCoupon);
                setCoupons([...coupons, response.data]);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error saving coupon:', error);
        }
    };

    const handleEditCoupon = (coupon) => {
        setEditCoupon(coupon);
        handleShowModal();
    };

    const handleDeleteCoupon = async (couponId) => {
        try {
            await axios.delete(`/api/Coupons/${couponId}`);
            setCoupons(coupons.filter(coupon => coupon.id !== couponId));
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    const handleCloseModal = () => {
        setNewCoupon({
            code: '',
            discountAmount: 0,
            expiryDate: '',
            status: false
        });
        setEditCoupon(null);
        setShowModal(false);
    };

    const handleShowModal = () => {
        if (isAdmin) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <div>
            <h2>Coupons</h2>
            <Button color="primary" onClick={handleShowModal}>Add Coupon</Button>
            <Modal isOpen={showModal} toggle={handleCloseModal}>
                <ModalHeader toggle={handleCloseModal}>{editCoupon ? 'Edit Coupon' : 'Add New Coupon'}</ModalHeader>
                <ModalBody>
                    <input
                        type="text"
                        placeholder="Code"
                        value={editCoupon ? editCoupon.code : newCoupon.code}
                        onChange={(e) => editCoupon ? setEditCoupon({ ...editCoupon, code: e.target.value }) : setNewCoupon({ ...newCoupon, code: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Discount Amount"
                        value={editCoupon ? editCoupon.discountAmount : newCoupon.discountAmount}
                        onChange={(e) => editCoupon ? setEditCoupon({ ...editCoupon, discountAmount: parseFloat(e.target.value) }) : setNewCoupon({ ...newCoupon, discountAmount: parseFloat(e.target.value) })}
                    />
                    <input
                        type="date"
                        placeholder="Expiry Date"
                        value={editCoupon ? editCoupon.expiryDate : newCoupon.expiryDate}
                        onChange={(e) => editCoupon ? setEditCoupon({ ...editCoupon, expiryDate: e.target.value }) : setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={editCoupon ? editCoupon.status : newCoupon.status}
                            onChange={(e) => editCoupon ? setEditCoupon({ ...editCoupon, status: e.target.checked }) : setNewCoupon({ ...newCoupon, status: e.target.checked })}
                        />
                        Active
                    </label>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button color="primary" onClick={handleSaveCoupon}>{editCoupon ? 'Update Coupon' : 'Save Coupon'}</Button>
                </ModalFooter>
            </Modal>
            <table className="table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount Amount (%)</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id}>
                            <td>{coupon.code}</td>
                            <td>{coupon.discountAmount}</td>
                            <td>{coupon.expiryDate}</td>
                            <td>{coupon.status ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button onClick={() => handleEditCoupon(coupon)}>Edit</button>
                                {coupon.status && (
                                    <>
                                        <button onClick={() => handleDeleteCoupon(coupon.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLinkClassName="page-link"
            />
        </div>
    );
};

export default CouponComponent;

