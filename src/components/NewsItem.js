import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div className="d-flex position-absolute right-0 justify-content-end" style={{ right: '0' }}>
          <span className="badge rounded-pill bg-danger">
            {author} <span className="visually-hidden">unread messages</span>
          </span>
        </div>
        <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/19/04/week-in-review/-952x498w6/gsmarena_007.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()})</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
