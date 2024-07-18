import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import RoutePath from '../routes/RoutePath';
import { CartContext } from '../context/CartContext';

export class NavMenu extends Component {
    static contextType = CartContext;
    constructor(props) {
        super(props);

        this.state = {
            isScrolled: false,
            isMenuOpen: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.context.fetchCartItems();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollTop = window.scrollY;
        const isCurrentlyScrolled = scrollTop > 0;
        this.setState({
            isScrolled: isCurrentlyScrolled
        });
    };

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    };

    render() {
        const { isScrolled, isMenuOpen } = this.state;
        const { cartItemCount } = this.context;
        const headerClassName = isScrolled ? 'site-header sticky_head' : 'site-header';

        const menuItems = [
            { id: 1, name: 'Trang chủ', link: RoutePath.HOME },
            { id: 2, name: 'Mua sắm', link: RoutePath.ProductPage },
            { id: 3, name: 'Bài viết', link: RoutePath.BlogPage },
            { id: 4, name: 'Liên hệ', link: RoutePath.CONTACTPage },
        ];

        return (
            <header className={headerClassName}>
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="d-flex align-items-center">
                                <Link to={'/'}>
                                    <img src="/logo.png" style={{
                                        width: "300px",
                                        maxWidth: "100%"
                                    }} alt="Logo" />
                                </Link>
                                <h2 className='' style={{ color: "#9D6330", textWrap: "nowrap" }}>RevibeCo.</h2>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="main-navigation">
                                <button className="menu-toggle" onClick={this.toggleMenu}><span /><span /></button>
                                <nav className={`header-menu ${isMenuOpen ? 'open' : ''}`}>
                                    <ul className="menu food-nav-menu">
                                        {menuItems.map((item) => (
                                            <li key={item.id} >
                                                <Link to={item.link} onClick={this.toggleMenu} className='fw-bold'>{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <div className="header-right">
                                    <form action="#" className="header-search-form for-des">
                                        <input type="search" className="form-input" placeholder="Tìm kiếm..." />
                                        <button type="submit">
                                            <i className="bi bi-search" style={{color:'#9D6330'}}></i>
                                        </button>
                                    </form>
                                    <Link to={RoutePath.CARDPRODUCT} className="header-btn header-cart">
                                        <i className="bi bi-bag-check-fill " style={{color:'#9D6330'}}></i>
                                        <span className="cart-number text-danger">{cartItemCount}</span>
                                    </Link>
                                    {/* <Link to={'/'} className="header-btn">
                                        <i className="bi bi-chat-dots-fill text-success"></i>
                                    </Link> */}
                                    <LoginMenu className='d-flex' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default NavMenu;
