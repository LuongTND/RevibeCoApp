import React from 'react';
import '../assets/css/HeroComponent.css';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const HeroComponent = () => {
    const [text] = useTypewriter({
        words: ['RevibeCo.'],
        loop: {},
        deleteSpeed: 200,
        typeSpeed: 100,
    });

    return (
        <section className="main-banner" id="home">
            <div className='shape-img'>
                <div className="banner-shape-1 w-100" data-depth="0.30">
                    <img src="/img/berry.png" alt='' />
                </div>
                <div className="banner-shape-2 w-100" data-depth="0.25">
                    <img src="/img/leaf.png" alt='' />
                </div>
            </div>
            <div className="sec-wp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="banner-text">
                                <h1 className="h1-title">
                                    Welcome to <br />
                                    <span className='' style={{
                                        color: "#9D6330"
                                    }} >{text}<Cursor /></span>
                                    {'\n'}
                                </h1>
                                <p style={{
                                    fontSize:'17px'
                                }}><span className="cursor-span">
                                    <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Discover the Art of Fragrance</span>
                                </span><br />
                                    Chào mừng bạn đến với ReVibe Co, nơi bạn sẽ tìm thấy những sản phẩm nến thơm và phụ kiện quà tặng tinh tế nhất.<br />
                                    Mỗi sản phẩm của chúng tôi không chỉ mang lại hương thơm dễ chịu mà còn góp phần trang trí không gian sống của bạn trở nên ấm áp và sang trọng.</p>
                                <div className="banner-btn mt-4">
                                    <Link to={'https://localhost:44412/productpage'} className="sec-btn fw-bold">Check our Product</Link>
                                </div>
                            </div>

                            <div className="banner-text d-flex justify-content-between mt-5" style={{
                                paddingTop: '60px'
                            }}>
                                <div className='row'>
                                    <h1 className='col-md-3' ><i class="bi bi-alarm"></i></h1>
                                    <div className='col-md-9 d-flex flex-column align-items-start'>
                                        <span>Time</span>
                                        <p className='text-nowrap text-black'>Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <h1 className='col-md-3'><i class="bi bi-envelope"></i></h1>
                                    <div className='col-md-9 d-flex flex-column align-items-start'>
                                        <span>Mail</span>
                                        <a className='text-nowrap text-black'>revibeco2002@gmail.com</a>
                                    </div>
                                </div>
                                <div className='row'>
                                    <h1 className='col-md-3'><i class="bi bi-facebook"></i></h1>
                                    <div className='col-md-9 d-flex flex-column align-items-start'>
                                        <span>Facebook</span>
                                        <a href='https://www.facebook.com/ReVibe.Co.VN' target='https://www.instagram.com/revibe_co_vn/?fbclid=IwZXh0bgNhZW0CMTAAAR0rMMX5MD88T5WUjFKTPllDNwVtAwM7-lCLzmoCHS3J9LTmXtUJMF7p4fQ_aem_AbILUfMisOSVa6eb1nIdveyqxRv1M5Ozw6Wv7Y-KXLG1ee3HyXd8ZqXpVAJHzUw2KilGnniRAuRusPz4xwDtN955' className='text-nowrap text-black'>Revibe Co</a>
                                    </div>
                                </div>
                                <div className='row'>
                                    <h1 className='col-md-3'><i class="bi bi-instagram"></i></h1>
                                    <div className='col-md-9 d-flex flex-column align-items-start'>
                                        <span>Instagram</span>
                                        <a href='https://www.instagram.com/revibe_co_vn' target='https://www.facebook.com/ReVibe.Co.VN' className='text-nowrap text-black'>revibe_co_vn</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {/* <div className="banner-img-wp">
                                <div className="banner-img" style={{ backgroundImage: 'url(/PRODUCT/HOMEPage/HomePage1.jpg)' }}>
                                </div>
                            </div> */}
                            <div className="banner-img-text mt-4 m-auto">
                                {/* <h5 className="h5-title">Lamp</h5>
                                <p>this is Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroComponent;
