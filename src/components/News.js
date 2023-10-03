import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
//import PropTypes from 'react';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    };

    const fetchMoreData = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsJunkey`;
        updateNews();
    }, []);

    return (
        <>
            <h1 className="text-center" style={{ margin: '40px 0px', marginTop : '90px' }}>NewsJunkey - Top {capitalizeFirstLetter(props.category)} headlines !!</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length != totalResults}
                loader={<Spinner />}>

                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}

export default News;

/* News.defaultProps = {
        country : 'in',
        pageSize : '8',
        category : 'general'
    };

    News.propTypes = {
        country : PropTypes.String,
        pageSize : PropTypes.Number,
        category : PropTypes.String
    }; */

    /* const handlePrev = async () => {
        setPage(page -1);
        updateNews();
    };

    const handleNext = async () => {
        setPage(page +1);
        updateNews();   
    }; */

     {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" onClick={handlePrev} className="btn btn-dark my-2">&#8592;Previous</button>
                    <button disabled={state.page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" onClick={handleNext} className="btn btn-dark my-2">Next&#8594;</button>
                </div> */}
