import React from 'react';

const LatestTags = ({ tags }) => {
  return (
    <div className="widget widget-tags">
      <div className="widget-title">
        <h3>Latest Tags</h3>
      </div>
      <div className="widget-body">
        <div className="nav tag-cloud">
          {tags.map((tag, index) => (
            <a key={index} href="#" className='text-decoration-none'>{tag}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestTags;
