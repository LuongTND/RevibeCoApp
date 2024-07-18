import React from 'react';

const LatestPostItem = ({ title, author, date, imageUrl }) => {
  return (
    <div className="latest-post-aside media">
      <div className="lpa-left media-body">
        <div className="lpa-title">
          <h5><a href="#">{title}</a></h5>
        </div>
        <div className="lpa-meta">
          <a className="name" href="#">
            {author}
          </a>
          <a className="date" href="#">
            {date}
          </a>
        </div>
      </div>
      <div className="lpa-right">
        <a href="#">
          <img src={imageUrl} alt="Latest Post" />
        </a>
      </div>
    </div>
  );
};

export default LatestPostItem;
