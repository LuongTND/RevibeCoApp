import React, { Component } from 'react';
import BlogCard from '../components/BlogCard';
import '../assets/css/Blog.css';
import LatestPostItem from '../components/LatestPostItem';
import LatestTags from '../components/LatestTags';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      latestTags: [],
      pageCount: 0,
      currentPage: 0
    };
  }

  fetchData = (selectedPage) => {
    const apiUrl = `api/BlogPosts?page=${selectedPage + 1}&pageSize=4`; // Note: page number is 1-based
    axios.get(apiUrl)
      .then(response => {
        const { results, totalPages } = response.data;
        localStorage.setItem('blogs_totalPages', totalPages);
        localStorage.setItem('blogs_currentPage', selectedPage + 1);
        localStorage.setItem('blogs', JSON.stringify(results));
        this.setState({
          blogs: results,
          pageCount: totalPages,
          currentPage: selectedPage
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  componentDidMount() {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs'));
    const savedTotalPages = localStorage.getItem('blogs_totalPages');
    const savedCurrentPage = localStorage.getItem('blogs_currentPage');
    if (savedBlogs && savedTotalPages && savedCurrentPage) {
      this.setState({
        blogs: savedBlogs,
        pageCount: parseInt(savedTotalPages),
        currentPage: parseInt(savedCurrentPage) - 1,
        loading: false
      });
    } else {
      this.fetchData(0);
    }
  }


  handlePageClick = (selectedPage) => {
    this.fetchData(selectedPage.selected);
  }

  render() {
    const { blogs, latestTags, pageCount } = this.state;

    return (
      <section className="blog-listing">
        <div className="container">
          <div className="row align-items-start">

            <div className="col-lg-4 m-15px-tb blog-aside">
              <div className="widget widget-author">
                <div className="widget-title">
                  <h3>Author</h3>
                </div>
                <div className="widget-body">
                  <div className="media align-items-center">
                    <div className="avatar">
                      <img src="/logo.png" alt="Author" />
                    </div>
                    <div className="media-body">
                      <h6>RevibeCo. chào bạn!<br /> </h6>
                    </div>
                  </div>
                  <p>Hãy cùng RevibeCo. khám phá thế giới phong cách và thư giãn, nơi bạn có thể tìm thấy đa dạng sản phẩm từ nến thơm, sáp thơm đến scrunchies, bandana và hairclip, mang đến cho bạn không gian sống và phong cách cá nhân độc đáo.</p>
                </div>
              </div>
              <div className="widget widget-post">
                <div className="widget-title">
                  <h3>Trending Now</h3>
                </div>
                <div className="widget-body">
                  <LatestPostItem
                    title="Hương Thơm và Sự Thư Giãn: Khám Phá Văn Phòng và Nhà Của Bạn"
                    author="RevibeCo"
                    date="26 FEB 2024"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Tạo Phong Cách với Scrunchies, Bandana và Kẹp Tóc!"
                    author="RevibeCo"
                    date="24 FEB 2024"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Hương Thơm: Sự Tinh Tế Trong Cuộc Sống Hàng Ngày"
                    author="RevibeCo"
                    date="22 FEB 2024"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                </div>
              </div>
              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3>Latest Post</h3>
                </div>
                <div className="widget-body">
                  <LatestPostItem
                    title="Ý Nghĩa của Những Món Quà Nhỏ Bé: Sự Chăm Sóc và Ý Thức Tình Yêu"
                    author="RevibeCo"
                    date="20 FEB 2024"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Sức Mạnh Của Những Phụ Kiện Nhỏ: Kẹp Tóc, Bandana, Scrunchies Và Ảnh Hưởng Đến Vẻ Ngoài Của Bạn"
                    author="RevibeCo"
                    date="18 FEB 2024"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Tại Sao Nến Thơm Là Món Quà Hoàn Hảo Để Tặng Người Yêu"
                    author="RevibeCo"
                    date="16 FEB 2024"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                </div>
              </div>
              <LatestTags tags={latestTags} />
            </div>
            <div className="col-lg-8 m-15px-tb">
              <div className="row">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    id={blog.id}
                    date={blog.postedOn}
                    content={blog.content}
                    title={blog.title}
                    image={blog.blogPostImages[0].imageUrl}
                  />
                ))}

                <div className="col-12">
                  <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    activeClassName={'active'}
                    subContainerClassName={'pages pagination'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLinkClassName="page-link"
                    forcePage={this.state.currentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
