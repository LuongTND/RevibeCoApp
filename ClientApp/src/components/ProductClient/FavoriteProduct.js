import React from 'react'
import { Link } from 'react-router-dom'
import RoutePath from '../../routes/RoutePath'
export default function FavoriteProduct() {
    return (
        <div className="container mb-5">
            <div className="row bootstrap snippets">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="col-lg-12 col-sm-12 text-center mb-3">
                        <h2 className="title">Favorite product</h2>
                    </div>
                    <div className="col-lg-12 col-sm-12 hero-feature">
                        <div className="table-responsive">
                            <table className="table table-bordered tbl-cart">
                                <thead>
                                    <tr>
                                        <td className="hidden-xs">Image</td>
                                        <td>Product Name</td>
                                        <td>Size</td>
                                        <td>Color</td>
                                        <td className="td-qty">Quantity</td>
                                        <td>Unit Price</td>
                                        <td>Sub Total</td>
                                        <td>Remove</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="hidden-xs">
                                            <a href="#">
                                                <img src="https://www.bootdey.com/image/200x200/" alt="Age Of Wisdom Tan Graphic Tee" title width={47} height={47} />
                                            </a>
                                        </td>
                                        <td><a href="#">Age Of Wisdom Tan Graphic Tee</a>
                                        </td>
                                        <td>
                                            <select name>
                                                <option value selected="selected">S</option>
                                                <option value>M</option>
                                            </select>
                                        </td>
                                        <td>-</td>
                                        <td>
                                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button className="btn btn-default bootstrap-touchspin-down" type="button">-</button></span><span className="input-group-addon bootstrap-touchspin-prefix" style={{ display: 'none' }} /><input type="text" name defaultValue={1} className="input-qty form-control text-center" style={{ display: 'block' }} /><span className="input-group-addon bootstrap-touchspin-postfix" style={{ display: 'none' }} /><span className="input-group-btn"><button className="btn btn-default bootstrap-touchspin-up" type="button">+</button></span></div>
                                        </td>
                                        <td className="price">$ 122.21</td>
                                        <td>$ 122.21</td>
                                        <td className="text-center">
                                            <Link to={''} className="remove_cart" rel={2}>
                                                <i class="bi bi-trash3-fill"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="hidden-xs">
                                            <a href="#">
                                                <img src="https://www.bootdey.com/image/200x200/" alt="Adidas Men Red Printed T-shirt" title width={47} height={47} />
                                            </a>
                                        </td>
                                        <td><a href="#">Adidas Men Red Printed T-shirt</a>
                                        </td>
                                        <td>
                                            <select name>
                                                <option value>S</option>
                                                <option value selected="selected">M</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select name>
                                                <option value selected="selected">Red</option>
                                                <option value>Blue</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button className="btn btn-default bootstrap-touchspin-down" type="button">-</button></span><span className="input-group-addon bootstrap-touchspin-prefix" style={{ display: 'none' }} /><input type="text" name defaultValue={2} className="input-qty form-control text-center" style={{ display: 'block' }} /><span className="input-group-addon bootstrap-touchspin-postfix" style={{ display: 'none' }} /><span className="input-group-btn"><button className="btn btn-default bootstrap-touchspin-up" type="button">+</button></span></div>
                                        </td>
                                        <td className="price">$ 20.63</td>
                                        <td>$ 41.26</td>
                                        <td className="text-center">
                                            <Link to={''} className="remove_cart" rel={2}>
                                                <i class="bi bi-trash3-fill"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} align="right">Total</td>
                                        <td className="total" colSpan={2}><b>$ 163.47</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="btn-group btns-cart">
                            <Link to={RoutePath.ProductPage} className="btn btn-primary"><i className="fa fa-arrow-circle-left" /> Continue
                                Shopping</Link>
                            <button type="button" className="btn btn-primary">Update Cart</button>
                            <Link to={RoutePath.ProductPage} className="btn btn-primary">Checkout <i className="fa fa-arrow-circle-right" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
