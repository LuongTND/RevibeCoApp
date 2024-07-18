import React from 'react';
import { Link } from 'react-router-dom';
import RoutePath from '../routes/RoutePath';
import '../assets/css/BlogCard.css'; // Import file for styling

const BlogCard = React.memo(({ id, date, title, content, image }) => {
    const truncatedTitle = truncateContent(title, 2); // Giới hạn số dòng của title là 2
    const truncatedContent = truncateContent(content, 3); // Giới hạn số dòng của content là 3

    return (
        <div className='col-md-6'>
            <Link to={RoutePath.BlogPage}>
                <div className="blog-box">
                    <div className="blog-img back-img" style={{ backgroundImage: `url(${image})` }} />
                    <div className="blog-text text-black">
                        <p className="blog-date">{date}</p>
                        <Link to={RoutePath.BLOG} className="h4-title">{truncatedTitle}</Link>
                        <p className="content">{truncatedContent}</p>
                        <Link to={`${RoutePath.BLOGDETAIL.replace(":blogId", id)}`} className="sec-btn">Read More</Link>
                    </div>
                </div>
            </Link>
        </div>
    );
});

function truncateContent(text, lineLimit) {
    const lines = text.split('\n');
    if (lines.length > lineLimit) {
        return lines.slice(0, lineLimit).join('\n') + '...';
    }
    return text;
}

export default BlogCard;
