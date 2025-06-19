import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { slug } = useParams();
  const productCount = product.length;

  useEffect(() => {
    AxiosInstance.get(`/api/collections/${slug}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setLoading(false);
          setCategory(response.data.category);
        }
      })

      .catch((error) => {
        // console.log(slug);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h5>Loading products...</h5>
      </div>
    );
  } else {
    var displayProduct = [];
    if (productCount) {
      displayProduct = product.map((item) => {
        return (
          <div className="row col-md-6 productimage" key={item.id}>
            <div className="card m-3">
              <Link to={`/collections/${item.categories.slug}/${item.slug}`}>
                <img
                  src={`https://laravel-api-production-1878.up.railway.app/${item.image}`}
                  className="product-image"
                />
              </Link>
              <div className="card-body">
                <Link
                  className="name"
                  to={`/collections/${item.categories.slug}/${item.slug}`}
                >
                  <h5>{item.name}</h5>
                </Link>
                <span className="textx">{item.description}</span>
              </div>
              <span className="p-3">⭐⭐⭐</span>
            </div>
          </div>
        );
      });
    } else {
      displayProduct = (
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h5>no product available for this category</h5>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h4>Products</h4>
        </div>
      </div>
      <div className="py-4 displayProduct">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-align gap-2">
            {displayProduct}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
