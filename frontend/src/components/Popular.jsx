import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

const Popular = () => {

      const [products, setProducts] = useState([]);

      //getall products
      const getAllProducts = async () => {
            try {
                  const { data } = await axios.get("/api/v1/product/get-product");
                  setProducts(data.products);
            } catch (error) {
                  console.log(error);
                  // toast.error("Someething Went Wrong");
            }
      };


      //lifecycle method
      useEffect(() => {
            getAllProducts();
      }, []);

  return (
      <>
      <div className='container py-5'>
              <div className='row'>
                    <h5 className='text-center text-md-start text-lg-'>Popular Products</h5>
              </div>
              
              <div className='row row-cols-2 row-cols-lg-4 mt-3'>
              
                 
                    {products?.map((p) => (
                        <Link
                        key={p._id}
                        to={`/product/${p.slug}`}
                        className="display-block text-decoration-none"
                      >
                          <div className='col mb-4'>
                                <div class="pro-card">
                                      <div className='img-box d-flex justify-content-center'>
                                            <img alt={p.name} src={`/api/v1/product/product-photo/${p._id}`} class="" />
                                      </div>

                                      <div class="card-body">
                                            <h6 class="con-card-title">{p.productname}</h6>
                                            <div class="con-card-details">
                                                  <div>Brand: {p.brandname.brandname}</div>
                                                
                                            </div>

                                      </div>
                                </div>
                          </div>

                          </Link>
                    ))}

              </div>
              <div className="row">
                    <div className="text-center">
                          <Link className='text-deoration-none btn btn-primary font-weight-bold' to={'/products'}>All Products</Link>
                    </div>
              </div>
        </div>
      </>
  )
}

export default Popular;