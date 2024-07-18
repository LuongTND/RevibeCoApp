import React, { Component } from 'react'
import '../assets/css/Acording.css'
export default class Acrording extends Component {
    render() {
        return (
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-lg-0">
                        <div className="mx-auto text-center">
                            <img src="/PRODUCT/ChinhSachMuaHang/chinhsachmuahang.png" className="rounded" alt="..." />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="ps-lg-6 ps-xl-10 w-lg-90">
                            <div className="mb-4">
                                <h2 className="w-90">Chính sách và quyền lợi của khách hàng</h2>
                            </div>
                            <p className="mb-4">
                                Đây là những chính sách và quyền lợi của khách hàng mà chúng tôi cam kết đem đến cho quý khách hàng. Chúng tôi luôn lắng nghe và cải thiện để mang lại trải nghiệm tốt nhất cho khách hàng.

                            </p>
                            <div id="accordion" className="accordion-style">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Chính Sách Giao Hàng</button>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-bs-parent="#accordion" style={{}}>
                                        <div className="card-body position-relative">
                                            <ul>
                                                <li>Phạm Vi Giao Hàng: Chúng tôi cung cấp dịch vụ giao hàng toàn quốc.</li>
                                                <li>Thời Gian Giao Hàng: Thời gian giao hàng từ 3-7 ngày làm việc tùy thuộc vào địa chỉ của khách hàng. </li>
                                                <li>Phí Giao Hàng: Phí giao hàng sẽ được tính tùy thuộc vào khu vực.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Chính Sách Bảo Hành</button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            <ul>
                                                <li>Sản phẩm lỗi do nhà sản xuất sẽ được bảo hành. </li>
                                                <li>Không áp dụng bảo hành đối với sản phẩm hư hỏng do sử dụng không đúng cách hoặc do tác động bên ngoài.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> Chương Trình Khuyến Mãi và Ưu Đãi
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            <ul>
                                                <li>Ưu Đãi Đặc Biệt: Khách hàng sẽ nhận được ưu đãi đặc biệt vào các dịp lễ, sinh nhật và những ngày kỷ niệm.</li>
                                                <li> Chương Trình Khách Hàng Thân Thiết: Tham gia chương trình khách hàng thân thiết để nhận được những ưu đãi độc quyền và tích lũy điểm thưởng. </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingFour">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"> Dịch Vụ Khách Hàng</button>
                                        </h5>
                                    </div>
                                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            <ul>
                                                <li>Hỗ Trợ Tận Tình: Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn 24/7.</li>
                                                <li>Tư Vấn Chuyên Nghiệp: Chúng tôi cung cấp dịch vụ tư vấn để giúp bạn lựa chọn sản phẩm phù hợp nhất với nhu cầu của mình.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingFive">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"> Bảo Mật Thông Tin</button>
                                        </h5>
                                    </div>
                                    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-bs-parent="#accordion">
                                        <div className="card-body position-relative">
                                            <ul>
                                                <li>Chính Sách Bảo Mật: Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Thông tin của bạn chỉ được sử dụng cho mục đích xử lý đơn hàng và cải thiện dịch vụ.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
