import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/BlogDetail.css';
import axios from 'axios';

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/BlogPosts/${blogId}`);
        setBlog(response.data);
        setLoading(false);
        console.log(blog)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-8 m-15px-tb">
            <article className="article">
              <div className="article-img">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {blog.blogPostImages.map((image, index) => (
                      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <img
                          src={image.imageUrl}
                          className="d-block w-100"
                          style={{ objectFit: 'cover', maxHeight: '400px' }}
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

              </div>
              <div className="article-title">
                <h2>{blog.title}</h2>
                <div className="media">
                  <div className="avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" title alt />
                  </div>
                  <div className="media-body">
                    <label>RevibeCO</label>
                    <span>{blog.postedOn}</span>
                  </div>
                </div>
              </div>
              <div className="article-content">
                {blog.content}
              </div>
              <div className="nav tag-cloud">
                <a href="#">Design</a>
                <a href="#">Development</a>
                <a href="#">Travel</a>
                <a href="#">Web Design</a>
                <a href="#">Marketing</a>
                <a href="#">Research</a>
                <a href="#">Managment</a>
              </div>
            </article>
            <div className="contact-form article-comment">
              <h4>Leave a Reply</h4>
              <form id="contact-form" method="POST">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input name="Name" id="name" placeholder="Name *" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input name="Email" id="email" placeholder="Email *" className="form-control" type="email" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea name="message" id="message" placeholder="Your message *" rows={4} className="form-control" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="send">
                      <button className="px-btn theme"><span>Submit</span> <i className="arrow" /></button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4 m-15px-tb blog-aside">
            <div className="widget widget-author">
              <div className="widget-title">
                <h3>Author</h3>
              </div>
              <div className="widget-body">
                <div className="media align-items-center">
                  <div className="avatar">
                    <img src="/logo.png" title alt />
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
              </div>
            </div>
            <div className="widget widget-latest-post">
              <div className="widget-title">
                <h3>Latest Post</h3>
              </div>
              <div className="widget-body">
                <div className="latest-post-aside media">
                  <div className="lpa-left media-body">
                    <div className="lpa-title">
                      <h5><a href="#">Nến Thơm Từ Nguyên Liệu Tự Nhiên: Sự Lựa Chọn Cho Sức Khỏe</a></h5>
                    </div>
                    <div className="lpa-meta">
                      <a className="name" href="#">
                        RevibeCO
                      </a>
                      <a className="date" href="#">
                        {blog.postedOn}
                      </a>
                    </div>
                  </div>
                  <div className="lpa-right">
                    <a href="#">
                      <img src="https://www.bootdey.com/image/400x200/FFB6C1/000000" title alt />
                    </a>
                  </div>
                </div>
                <div className="latest-post-aside media">
                  <div className="lpa-left media-body">
                    <div className="lpa-title">
                      <h5><a href="#">Câu Chuyện Khởi Nghiệp Của ReVibe Co.</a></h5>
                    </div>
                    <div className="lpa-meta">
                      <a className="name" href="#">
                        Rachel Roth
                      </a>
                      <a className="date" href="#">
                        26 FEB 2020
                      </a>
                    </div>
                  </div>
                  <div className="lpa-right">
                    <a href="#">
                      <img src="https://www.bootdey.com/image/400x200/FFB6C1/000000" title alt />
                    </a>
                  </div>
                </div>
                <div className="latest-post-aside media">
                  <div className="lpa-left media-body">
                    <div className="lpa-title">
                      <h5><a href="#">Từ Những Cảm Hứng Ban Đầu...</a></h5>
                    </div>
                    <div className="lpa-meta">
                      <a className="name" href="#">
                        Rachel Roth
                      </a>
                      <a className="date" href="#">
                        26 FEB 2020
                      </a>
                    </div>
                  </div>
                  <div className="lpa-right">
                    <a href="#">
                      <img src="https://www.bootdey.com/image/400x200/FFB6C1/000000" title alt />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget widget-tags">
              <div className="widget-title">
                <h3>Latest Tags</h3>
              </div>
              <div className="widget-body">
                <div className="nav tag-cloud">
                  <a href="#">Design</a>
                  <a href="#">Development</a>
                  <a href="#">Travel</a>
                  <a href="#">Web Design</a>
                  <a href="#">Marketing</a>
                  <a href="#">Research</a>
                  <a href="#">Managment</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default BlogDetail;
