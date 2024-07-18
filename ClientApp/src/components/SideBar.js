import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RoutePath from '../routes/RoutePath';

export default class SideBar extends Component {
    render() {
        console.log('sidebar render')
        return (
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white shadow">
                <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">

                    <h1>RevibeCO</h1>
                </a>
                <div className="list-group list-group-flush border-bottom scrollarea">
                    <Link to={RoutePath.DASHBOARD} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='dashboard-icon' src='/icon/dashboard.gif' width={40} />
                        <strong className="mb-1">DashBoard</strong>
                    </Link>
                    <Link to={RoutePath.USER} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='user-icon' src='/icon/user.gif' width={40} />
                        <strong className="mb-1">User management</strong>
                    </Link>
                    <Link to={RoutePath.PRODUCT} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='product-icon' src='/icon/product.gif' width={40} />
                        <strong className="mb-1">Product management</strong>
                    </Link>
                    <Link to={RoutePath.CATEGORIES} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='categories-icon' src='/icon/category.gif' width={40} />
                        <strong className="mb-1">Categories management</strong>
                    </Link>
                    <Link to={RoutePath.BLOGPOST} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='blog-icon' src='/icon/blogPost.gif' width={40} />
                        <strong className="mb-1">Blog management</strong>
                    </Link>
                    <Link to={RoutePath.ORDER} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='order-icon' src='/icon/order.gif' width={40} />
                        <strong className="mb-1">Order management</strong>
                    </Link>
                    <Link to={RoutePath.BLOG} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='blogType-icon' src='/icon/blog.gif' width={40} />
                        <strong className="mb-1">Type blog management</strong>
                    </Link>
                    <Link to={RoutePath.COUPON} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='coupon-icon' src='/icon/coupon.gif' width={40} />
                        <strong className="mb-1">Coupon management</strong>
                    </Link>
                    <Link to={RoutePath.CHAT} className="list-group-item list-group-item-action py-3 lh-tight">
                        <img alt='chat-icon' src='/icon/chat.gif' width={40} />
                        <strong className="mb-1">Fetch chat</strong>
                    </Link>
                </div>
            </div>
        );
    }
}
