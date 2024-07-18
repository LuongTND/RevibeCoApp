import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const menuItems = [
        { id: 1, name: 'Home', link: '/' },
        { id: 2, name: 'About', link: '/' },
        { id: 3, name: 'Shop', link: '/' },
        { id: 4, name: 'Blog', link: '/' },
        { id: 5, name: 'Contact', link: '/' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const isCurrentlyScrolled = scrollTop > 0;
            setIsScrolled(isCurrentlyScrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const headerClassName = isScrolled ? 'site-header sticky_head' : 'site-header';

    return (
        <header>
            <div className="container p-0">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="d-flex align-items-center">
                            <Link to={'/'}>
                                <img src="/img/logo.png" width={60} alt="Logo" />
                            </Link>
                            <h2 className='text-success'>RevibeCO</h2>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="main-navigation">
                            <button className="menu-toggle"><span /><span /></button>
                            <nav className="header-menu">
                                <ul className="menu food-nav-menu">
                                    {menuItems.map((item) => (
                                        <li key={item.id}>
                                            <Link to={item.link}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="header-right">
                                <form action="#" className="header-search-form for-des">
                                    <input type="search" className="form-input" placeholder="Search Here..." />
                                    <button type="submit">
                                        <i class="bi bi-search text-success"></i>
                                    </button>
                                </form>
                                <Link to={'/'} className="header-btn header-cart">
                                    <i class="bi bi-bag-check-fill text-success"></i>
                                    <span className="cart-number text-success">3</span>
                                </Link>

                                <div className="dropdown" style={{ width: '40px', marginRight: '15px' }}>
                                    <button className="border-0 header-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-person-circle text-success"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-effect" aria-labelledby="dropdownMenuButton1">
                                        <li><Link className="dropdown-item" to={'/'}>Profile</Link></li>
                                        <li><Link className="dropdown-item" to={'/'}>Admin</Link></li>
                                        <li><Link className="dropdown-item" to={'/'}>Sign in</Link></li>
                                        <li><Link className="dropdown-item" to={'/'}>Sign out ㅤ<i class="bi bi-box-arrow-right"></i></Link></li>
                                    </ul>
                                </div>
                                <Link to={'/'} className="header-btn">
                                    <i class="bi bi-chat-dots-fill text-success"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default memo(Header);