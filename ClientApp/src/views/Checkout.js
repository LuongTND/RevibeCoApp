import React, { useEffect, useState } from 'react'
import '../assets/css/Checkout.css'
import axios from 'axios';
import RoutePath from '../routes/RoutePath';
import { Link } from 'react-router-dom';
import authService from '../components/api-authorization/AuthorizeService';
import { toast } from 'react-toastify';
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0); // Khởi tạo discount là null

  const [userData, setUserData] = useState('');

  const [note, setNote] = useState(null);
  const [noteText, setNotext] = useState('');


  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('api/shop');
        setCartItems(response.data);
        const userData = await authService.getUser();
        setUserData(userData)
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, []);

  const handleSubmit = (event) => {
      // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve form field values
    const formData = {
      name: event.target.elements['billing-name'] ? event.target.elements['billing-name'].value : '',
      email: event.target.elements['billing-email-address'] ? event.target.elements['billing-email-address'].value : '',
      phone: event.target.elements['billing-phone'] ? event.target.elements['billing-phone'].value : '',
      address: event.target.elements['billing-address'] ? event.target.elements['billing-address'].value : '',
      city: event.target.elements['billing-city'] ? event.target.elements['billing-city'].value : '',
      country: event.target.elements['billing-country'] ? event.target.elements['billing-country'].value : '',
      zipCode: event.target.elements['zip-code'] ? event.target.elements['zip-code'].value : '',
      paymentMethod: getSelectedPaymentMethod(event) // Lấy phương thức thanh toán được chọn
    };

    // Validate form data (if needed)
    if (formData.name === '' || formData.email === '' || formData.phone === '' || formData.address === '' || formData.city === '' || formData.country === '' || formData.zipCode === '' || formData.paymentMethod === '') {
      // Nếu bất kỳ trường bắt buộc nào còn trống, hiển thị thông báo lỗi
      toast.error('Vui lòng điền đầy đủ thông tin vào các trường bắt buộc.');
      return; // Thoát khỏi hàm sớm
    } else {
      // Nếu tất cả các trường bắt buộc đã được điền, hiển thị thông báo thành công
      toast.success('Form đã được gửi thành công!');
    }

    // Do something with the form data, such as sending it to a server
    setNote(formData);
    console.log(note)
    setNotext("Địa chỉ: " + note.address + "-" + note.city + "-" + note.country + ", Email: " + note.email + ", Điện thoại: " + note.phone + ", Mã bưu điện: " + note.zipCode + ", Phương thức thanh toán: " + note.paymentMethod+", Tổng: " + calculateTotalAfterDiscount);

    // Tuỳ chọn: Bạn có thể reset các trường form sau khi gửi
    // event.target.reset();
  };

  const getSelectedPaymentMethod = (event) => {
    const paymentMethods = document.getElementsByName('pay-method');
    for (let i = 0; i < paymentMethods.length; i++) {
      if (paymentMethods[i].checked) {
        return paymentMethods[i].value;
      }
    }
    return ''; // Trả về chuỗi rỗng nếu không có phương thức thanh toán nào được chọn
  };


  // Function to handle applying coupon
    const applyCoupon = async () => {
        try {
            const response = await axios.get(`api/Coupons/search?code=${couponCode}`);
            if (response.data && response.data.status) {
                // Coupon found and status is true, update the discount
                setDiscount(response.data);
                toast.success('Áp dụng mã giảm giá thành công!');
            } else {
                // Coupon not found or status is false, display an error message
                setDiscount(0);
                toast.error('Mã giảm giá bạn nhập không hợp lệ.');
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };



  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Function to calculate total price after applying discount
  const calculateTotalAfterDiscount = () => {
    let total = calculateTotal();
    if (discount != 0) {
      total = total-((total * discount.discountAmount) / 100);
    }
    return total;
  };


  // Function to handle checkout
  const handleCheckout = async (name, disID, noteText, amount) => {

    if (disID == undefined) {
      disID = '';
    }
    if (noteText == undefined) {
      noteText = '';
    }
      try {
        const response = await axios.post(`https://localhost:44412/api/shop/checkout?username=${name}&couponId=${disID}&note=${noteText}&amount=${amount}`);

        // Chuyển hướng đến trang cảm ơn sau khi thanh toán thành công
        const totalPrice = calculateTotalAfterDiscount(); // Get total price
          const redirectUrl = `${RoutePath.QRCODE.replace(":total", totalPrice)}`;
        window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error during checkout:', error);
      // Hiển thị thông báo lỗi cho người dùng nếu có lỗi trong quá trình thanh toán
      alert('Error during checkout. Please try again later.');
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8">
          <div className="card bg-light">
            <div className="card-body">
              <ol className="activity-checkout mb-0 px-4 mt-3">
                <li className="checkout-item">
                  <div className="avatar checkout-icon p-1">
                    <div className="avatar-title rounded-circle bg-primary">
                      <i className="bx bxs-receipt text-white font-size-20" />
                    </div>
                  </div>
                  <div className="feed-item-list">
                    <div>
                      <h5 className="font-size-16 mb-1">Thông tin đơn hàng</h5>
                      <p className="text-muted text-truncate mb-4">Điền thông tin khách hàng</p>
                      <div className="mb-3">
                        <form onSubmit={handleSubmit}>
                          <div>
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="billing-name">Tên</label>
                                  <input type="text" className="form-control" id="billing-name" placeholder="Nhập tên của bạn" />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="billing-email-address">Email</label>
                                  <input type="email" className="form-control" id="billing-email-address" placeholder="Nhập mail" />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="billing-phone">Số điện thoại</label>
                                  <input type="text" className="form-control" id="billing-phone" placeholder="Nhập số điện thoại" />
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="billing-address">Địa chỉ</label>
                              <textarea className="form-control" id="billing-address" rows={3} placeholder="Nhập địa chỉ ..." defaultValue={""} />
                            </div>
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="mb-4 mb-lg-0">
                                  <label className="form-label">Tỉnh/Thành phố</label>
                                  <select className="form-control form-select" title="Tỉnh/Thành phố" id="billing-country" name="billing-country">
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                    <option value="Hải Phòng">Hải Phòng</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="Hà Giang">Hà Giang</option>
                                    <option value="Cao Bằng">Cao Bằng</option>
                                    <option value="Lai Châu">Lai Châu</option>
                                    <option value="Lào Cai">Lào Cai</option>
                                    <option value="Lạng Sơn">Lạng Sơn</option>
                                    <option value="Quảng Ninh">Quảng Ninh</option>
                                    <option value="Bắc Giang">Bắc Giang</option>
                                    <option value="Bắc Ninh">Bắc Ninh</option>
                                    <option value="Thái Nguyên">Thái Nguyên</option>
                                    <option value="Phú Thọ">Phú Thọ</option>
                                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                    <option value="Bắc Kạn">Bắc Kạn</option>
                                    <option value="Tuyên Quang">Tuyên Quang</option>
                                    <option value="Lào Cai">Lào Cai</option>
                                    <option value="Yên Bái">Yên Bái</option>
                                    <option value="Hà Nam">Hà Nam</option>
                                    <option value="Nam Định">Nam Định</option>
                                    <option value="Thái Bình">Thái Bình</option>
                                    <option value="Ninh Bình">Ninh Bình</option>
                                    <option value="Thanh Hóa">Thanh Hóa</option>
                                    <option value="Nghệ An">Nghệ An</option>
                                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                                    <option value="Quảng Bình">Quảng Bình</option>
                                    <option value="Quảng Trị">Quảng Trị</option>
                                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                    <option value="Quảng Nam">Quảng Nam</option>
                                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                                    <option value="Bình Định">Bình Định</option>
                                    <option value="Phú Yên">Phú Yên</option>
                                    <option value="Khánh Hòa">Khánh Hòa</option>
                                    <option value="Ninh Thuận">Ninh Thuận</option>
                                    <option value="Bình Thuận">Bình Thuận</option>
                                    <option value="Kon Tum">Kon Tum</option>
                                    <option value="Gia Lai">Gia Lai</option>
                                    <option value="Đắk Lắk">Đắk Lắk</option>
                                    <option value="Đắk Nông">Đắk Nông</option>
                                    <option value="Lâm Đồng">Lâm Đồng</option>
                                    <option value="Bình Phước">Bình Phước</option>
                                    <option value="Tây Ninh">Tây Ninh</option>
                                    <option value="Bình Dương">Bình Dương</option>
                                    <option value="Đồng Nai">Đồng Nai</option>
                                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                    <option value="Long An">Long An</option>
                                    <option value="Tiền Giang">Tiền Giang</option>
                                    <option value="Bến Tre">Bến Tre</option>
                                    <option value="Trà Vinh">Trà Vinh</option>
                                    <option value="Vĩnh Long">Vĩnh Long</option>
                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                    <option value="An Giang">An Giang</option>
                                    <option value="Kiên Giang">Kiên Giang</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="Hậu Giang">Hậu Giang</option>
                                    <option value="Sóc Trăng">Sóc Trăng</option>
                                    <option value="Bạc Liêu">Bạc Liêu</option>
                                    <option value="Cà Mau">Cà Mau</option>
                                  </select>

                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-4 mb-lg-0">
                                  <label className="form-label" htmlFor="billing-city">Huyện/Quận</label>
                                  <input type="text" className="form-control" id="billing-city" placeholder="Nhập tên huyện" />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-0">
                                  <label className="form-label" htmlFor="zip-code">Xã/Thị trấn
                                    code</label>
                                  <input type="text" className="form-control" id="zip-code" placeholder="Nhập tên xã/thị trấn" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="avatar checkout-icon p-1">
                            <div className="avatar-title rounded-circle bg-primary">
                              <i className="bx bxs-wallet-alt text-white font-size-20" />
                            </div>
                          </div>
                          <div className="feed-item-list mt-5">
                            <div>
                              <h5 className="font-size-16 mb-1">Thông tin thanh toán</h5>
                              <p className="text-muted text-truncate mb-4">Chọn phương thức thanh toán</p>
                            </div>
                            <div>
                              <h5 className="font-size-14 mb-3">Phương thức thanh toán:</h5>
                              <div className="row">
                                <div className="col-lg-3 col-sm-6">
                                  <div data-bs-toggle="collapse">
                                    <label className="card-radio-label">
                                      <input type="radio" name="pay-method" id="pay-methodoption1" className="card-radio-input"  value="Tín dụng"/>
                                      <span className="card-radio py-3 text-center text-truncate">
                                        <i className="bx bx-credit-card d-block h2 mb-3" />
                                        Thẻ tín dụng
                                      </span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-lg-3 col-sm-6">
                                  <div>
                                    <label className="card-radio-label">
                                      <input type="radio" name="pay-method" id="pay-methodoption3" className="card-radio-input" value={"Momo"} defaultChecked />
                                      <span className="card-radio py-3 text-center text-truncate">
                                        <i className="bx bx-money d-block h2 mb-3" />
                                        <span>Momo</span>
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end mt-5">
                            <button type="submit" className="btn btn-primary">
                              Xác nhận thông tin
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="checkout-item">

                </li>
              </ol>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <Link to={RoutePath.ProductPage}>
                <i className="mdi mdi-arrow-left me-1" /> Tiếp tục mua sắm
              </Link>
            </div>
            <div className="col">
              <div className="text-end mt-2 mt-sm-0">
                              <button className="btn btn-success" onClick={() => handleCheckout(userData.name, discount.id, noteText, calculateTotalAfterDiscount)}>
                  <i className="mdi mdi-cart-outline me-1" /> Tiến hành thanh toán </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card checkout-order-summary bg-light">
            <div className="card-body">
              {/* <div className="p-3 bg-light mb-3">
                <h5 className="font-size-16 mb-0">Order Summary <span className="float-end ms-2">#MN0124</span></h5>
              </div> */}
              <div className="table-responsive">
                <table className="table table-centered mb-0 table-nowrap">
                  <thead>
                    <tr>
                      <th className="border-top-0" style={{ width: 110 }} scope="col">Sản phẩm</th>
                      <th className="border-top-0" scope="col">Thông tin</th>
                      <th className="border-top-0" scope="col">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(
                      item => (
                        <tr key={item.productId}>
                          <th scope="row"><img src={item.imageUrl[0].imageUrl} alt="product-img" title="product-img" className="avatar-lg rounded" /></th>
                          <td>
                            <h5 className="font-size-16 text-truncate"><a href="#" className="text-dark">{item.name}</a></h5>
                            <p className="text-muted mb-0">
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star-half text-warning" />
                            </p>
                            <p className="text-muted mb-0 mt-1">{item.price} {"VNĐ"} x {item.quantity}</p>
                          </td>
                          <td> {(item.quantity * item.price).toFixed(0)} VNĐ</td>
                        </tr>
                      )

                    )}

                    <tr>
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Thành tiền :</h5>
                      </td>
                      <td>
                        {calculateTotal()} VNĐ
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Giảm giá :</h5>
                      </td>
                      <td>
                        {discount == 0 ? "0 %" : `${discount.discountAmount} %`}
                      </td>
                    </tr>
                    {/* <tr>
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Phí vận chuyển :</h5>
                      </td>
                      <td>
                        20,000 VNĐ
                      </td>
                    </tr> */}

                    <tr className="bg-light">
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Tổng:</h5>
                      </td>
                      <td>
                        {calculateTotalAfterDiscount()} VNĐ
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="my-3">
                  <div className="d-flex justify-content-between">
                    <input type="text" className="form-input " id="coupon-code" placeholder="Nhập mã giảm giá" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                    <button className="sec-btn-custom mx-1 text-nowrap" type="button" onClick={applyCoupon}>Áp dụng</button>
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

export default Checkout