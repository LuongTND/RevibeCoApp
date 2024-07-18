import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import authService from './api-authorization/AuthorizeService';

const CategoriesComponent = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdminRole();
    }, [currentPage]);

    useEffect(() => {
        if (isAdmin) {
            fetchCategories();
        }
    }, [isAdmin, currentPage]);

    const fetchCategories = async () => {
        if (isAdmin) {
            try {
                const response = await axios.get('/api/ProductCategories', {
                    params: {
                        page: currentPage + 1,
                        pageSize: 10
                    }
                });
                setCategories(response.data.results);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        } else {
                window.location.href = '/Identity/Account/AccessDenied';
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

    const handleSaveCategory = async () => {
        try {
            if (editCategoryId) {
                const payload = {
                    id: editCategoryId,
                    name: editCategoryName,
                };
                console.log('Payload:', payload);

                await axios.put(`/api/ProductCategories/${editCategoryId}`, payload);

                const updatedCategories = categories.map(category =>
                    category.id === editCategoryId ? { ...category, name: editCategoryName } : category
                );

                setCategories(updatedCategories);
            } else {
                const response = await axios.post('/api/ProductCategories', {
                    name: newCategoryName,
                });
                setCategories([...categories, response.data]);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error saving category:', error);
            console.log(error.response?.data);
        }
    };

    const handleEditCategory = (categoryId, categoryName) => {
        setEditCategoryId(categoryId);
        setEditCategoryName(categoryName);
        handleShowModal();
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`/api/ProductCategories/${categoryId}`);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleCloseModal = () => {
        setNewCategoryName('');
        setEditCategoryId(null);
        setEditCategoryName('');
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
            <h2>Categories</h2>
            <Button color="success" className='my-2' onClick={handleShowModal}>Add Category</Button>
            <Modal isOpen={showModal} toggle={handleCloseModal}>
                <ModalHeader toggle={handleCloseModal}>{editCategoryId ? 'Edit Category' : 'Add New Category'}</ModalHeader>
                <ModalBody>
                    <input
                        type="text"
                        value={editCategoryId ? editCategoryName : newCategoryName}
                        onChange={(e) => editCategoryId ? setEditCategoryName(e.target.value) : setNewCategoryName(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button color="primary" onClick={handleSaveCategory}>{editCategoryId ? 'Update Category' : 'Save Category'}</Button>
                </ModalFooter>
            </Modal>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td className='d-flex gap-2'>
                                <button className='btn btn-info' onClick={() => handleEditCategory(category.id, category.name)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDeleteCategory(category.id)}>Delete</button>
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

export default CategoriesComponent;
