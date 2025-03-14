import React, { useEffect, useState } from "react";
import { Card, Button, Spin } from "antd";
import "./FetchData.css"; 

const FetchData = ({ onDone }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 50;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handlePageChange = (page) => {
    if (page === 2) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(2);
        setLoading(false);
      }, 3000);
    } else {
      setCurrentPage(1);
    }
  };

  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="fetch-data-container">
      <h2 className="fetch-data-title">Fetched Data</h2>

      <div className="fetch-data-page-buttons">
        <Button type={currentPage === 1 ? "primary" : "default"} onClick={() => handlePageChange(1)}>
          Page 1
        </Button>
        <Button type={currentPage === 2 ? "primary" : "default"} onClick={() => handlePageChange(2)}>
          Page 2
        </Button>
        <Button onClick={onDone}>Done Watching</Button>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <div className="fetch-data-card-container">
          {currentData.map((item) => (
            <Card key={item.id} className="fetch-data-card">
              <h3 className="fetch-data-card-title">{item.title}</h3>
              <p className="fetch-data-card-body">{item.body}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchData;
