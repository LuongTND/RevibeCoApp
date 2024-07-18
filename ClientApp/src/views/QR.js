import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Checkout.js';

const QR = () => {
    const [isPaid, setIsPaid] = useState(false);
    const { total } = useParams();

    // Example data
    const bankId = 'MBBank';
    const accountNo = '0399918513';
    const template = 'compact2';
    const description = 'Vui lòng kiểm tra thông tin trước khi thanh toán';
    const accountName = 'Trần Văn Tuấn';

    // Generate QR code URL based on provided data
    const generateQuickLinkUrl = (bankId, accountNo, template, total, description, accountName) => {
        const encodedDescription = encodeURIComponent(description);
        const encodedAccountName = encodeURIComponent(accountName);
        return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${total}&accountName=${encodedAccountName}`;
    };

    const quickLinkUrl = generateQuickLinkUrl(bankId, accountNo, template, total, description, accountName);

    // Handle payment confirmation
    const handlePayment = () => {
        // Simulate payment success
        setIsPaid(true);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body text-center">
                            {!isPaid ? (
                                <div>
                                    <h2 className="card-title">Thông tin thanh toán</h2>
                                    <p className="card-text">Số tiền cần thanh toán: {total} VNĐ</p>
                                    <p className="card-text">Mô tả: {description}</p>
                                    <p className="card-text">Tên tài khoản: {accountName}</p>
                                    <img src={quickLinkUrl} className="img-fluid" alt="QR Code" />
                                </div>
                            ) : (
                                <div>
                                    <h2 className="card-title">Thanh toán thành công!</h2>
                                    <p className="card-text">Cảm ơn bạn đã thanh toán thành công.</p>
                                    {/* You can add a button or link here to redirect to another page */}
                                </div>
                            )}
                        </div>
                        {!isPaid && (
                            <div className="card-footer d-flex justify-content-center">
                                <button className="btn btn-success" onClick={handlePayment}>
                                    Xác nhận thanh toán
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QR;
