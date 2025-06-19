import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    AxiosInstance.get(`/api/collections/${slug}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setLoading(false);
          setCategory(response.data.category);
        }
      })
      .catch((error) => {});
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h5>Loading products...</h5>
      </div>
    );
  }

  let displayProduct = [];

  if (product.length) {
    displayProduct = product.map((item) => (
      <div className="col-6 mb-3 px-2" key={item.id}>
        <div className="card">
          <Link to={`/collections/${item.categories.slug}/${item.slug}`}>
            <img
              src={`https://laravel-api-production-1d4a.up.railway.app/${item.image}`}
              className="card-img-top"
              alt={item.name}
              style={{ height: "180px", objectFit: "cover" }}
            />
          </Link>
          <div className="card-body p-2">
            <Link
              className="name text-decoration-none text-dark"
              to={`/collections/${item.categories.slug}/${item.slug}`}
            >
              <h6 className="mb-1">{item.name}</h6>
            </Link>
            <p className="text-muted small">{item.description}</p>
            <span className="small">⭐⭐⭐</span>
          </div>
        </div>
      </div>
    ));
  } else {
    displayProduct = (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5>No product available for this category</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h4>Products</h4>
        </div>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="row">{displayProduct}</div>
        </div>
      </div>
    </div>
  );
};

export default Products;
