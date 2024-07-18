import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Pagination, Table } from 'react-bootstrap';

const ProductCrudComponent = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 1,
        information: '',
        status: true,
        productCategoryId: 1
    });
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);
    const [modalAction, setModalAction] = useState('Create');
    const [imageUrlInput, setImageUrlInput] = useState('');
    const pageSize = 10;

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/Products?page=${currentPage}&pageSize=${pageSize}`);
            setProducts(response.data.results);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`/api/ProductCategories`);
            setCategories(response.data.results);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowModalDetail(false);
        setSelectedProduct(null);
        setProduct({
            name: '',
            description: '',
            price: 0,
            quantity: 1,
            information: '',
            status: true,
            productCategoryId: 1
        });
        setImages([]);
        setModalAction('Create');
        setImageUrlInput('');
    };

    const handleShowCreateModal = () => {
        setModalAction('Create');
        setShowModal(true);
    };

    const handleCloseModalDetails = () => {
        setShowModalDetail(false);
        setSelectedProductDetails(null);
    };

    const handleShowModalDetails = (product) => {
        setSelectedProductDetails(product);
        setShowModalDetail(true);
    };

    const handleShowEditModal = (product) => {
        setModalAction('Edit');
        setSelectedProduct(product);
        setProduct({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            information: product.information,
            status: product.status,
            productCategoryId: product.productCategoryId
        });
        setImages(product.images.map(img => img.imageUrl));
        setShowModal(true);
    };

    const handleCreateProduct = async () => {
        try {
            const productData = {
                product,
                images: images.map(url => ({ imageUrl: url }))
            };

            const response = await axios.post('/api/Products', productData);
            console.log('Product created:', response.data);

            handleCloseModal();
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleEditProduct = async () => {
        try {
            const productData = {
                id: selectedProduct.id,
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                information: product.information,
                status: product.status,
                productCategoryId: product.productCategoryId,
                images: images.map(url => ({ imageUrl: url }))
            };

            const response = await axios.put(`/api/Products/${selectedProduct.id}`, productData);
            console.log('Product updated:', response.data);

            handleCloseModal();
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/Products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdateProductStatus = async (productId) => {
        try {
            await axios.patch(`/api/Products/${productId}/status`);
            const updatedProducts = products.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        status: !product.status
                    };
                }
                return product;
            });
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddImageUrl = () => {
        if (imageUrlInput.trim() !== '') {
            setImages([...images, imageUrlInput]);
            setImageUrlInput('');
        }
    };

    return (
        <div className="container">
            <Button variant="primary" onClick={handleShowCreateModal}>
                Create Product
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{modalAction === 'Create' ? 'Create Product' : 'Edit Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter product description"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter product price"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter product quantity"
                                value={product.quantity}
                                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productInformation">
                            <Form.Label>Information</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter product information"
                                value={product.information}
                                onChange={(e) => setProduct({ ...product, information: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={product.productCategoryId}
                                onChange={(e) => setProduct({ ...product, productCategoryId: parseInt(e.target.value) })}
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="productStatus">
                            <Form.Check
                                type="switch"
                                id="productStatusSwitch"
                                label="Status"
                                checked={product.status}
                                onChange={(e) => setProduct({ ...product, status: e.target.checked })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productImages">
                            <Form.Label>Images</Form.Label>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`Product ${index}`} style={{ width: '100px', margin: '10px' }} />
                                </div>
                            ))}
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                value={imageUrlInput}
                                onChange={(e) => setImageUrlInput(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleAddImageUrl}>Add Image</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {modalAction === 'Create' ? (
                        <Button variant="primary" onClick={handleCreateProduct}>
                            Create
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleEditProduct}>
                            Save Changes
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            <Modal show={showModalDetail} onHide={handleCloseModalDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProductDetails && (
                        <div>
                            <p><strong>Name:</strong> {selectedProductDetails.name}</p>
                            <p><strong>Description:</strong> {selectedProductDetails.description}</p>
                            <p><strong>Price:</strong> {selectedProductDetails.price}</p>
                            <p><strong>Quantity:</strong> {selectedProductDetails.quantity}</p>
                            <p><strong>Information:</strong> {selectedProductDetails.information}</p>
                            <p><strong>Status:</strong> {selectedProductDetails.status ? 'Active' : 'Inactive'}</p>
                            <p><strong>Category:</strong> {categories.find(c => c.id === selectedProductDetails.productCategoryId)?.name}</p>
                            <p><strong>Images:</strong></p>
                            {selectedProductDetails.images.map((image, index) => (
                                <img key={index} src={image.imageUrl} alt={`Product ${index}`} style={{ width: '100px', margin: '10px' }} />
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.status ? 'Active' : 'Inactive'}</td>
                            <td>{categories.find(c => c.id === product.productCategoryId)?.name}</td>
                            <td>
                                <Button variant="info" onClick={() => handleShowModalDetails(product)}>View</Button>
                                <Button variant="primary" onClick={() => handleShowEditModal(product)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                                <Button variant="warning" onClick={() => handleUpdateProductStatus(product.id)}>
                                    {product.status ? 'Deactivate' : 'Activate'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, pageIndex) => (
                    <Pagination.Item
                        key={pageIndex + 1}
                        active={pageIndex + 1 === currentPage}
                        onClick={() => handlePageChange(pageIndex + 1)}
                    >
                        {pageIndex + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default ProductCrudComponent;
