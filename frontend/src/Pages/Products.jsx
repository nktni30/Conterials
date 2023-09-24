import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { BsFunnelFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [Checked, setChecked] = useState([]);


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

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get all cat
  const getAllBrand = async () => {
    try {
      const { data } = await axios.get("/api/v1/brand/get-brand");
      if (data?.success) {
        setBrands(data?.brand);
      }
    } catch (error) {
      console.log(error);

    }
  };

  // filterby cat
  const HandleFilter = (value, id) => {
    let all = [...Checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all);
  };



  //lifecycle method 
  useEffect(() => {
    getAllBrand();
    getAllCategory();
  }, []);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, { Checked })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!Checked.length) getAllProducts();
  }, [Checked.length])

  useEffect(() => {
    if (Checked.length) filterProduct();
    // eslint-disable-next-line
  }, [Checked])

  return (
    <>
      <div className="container-fluid bg-blue-grad py-5">
        <h2 className='h2 text-center pt-5 text-white'>
          Our Products
        </h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 col-lg-6 d-flex justify-content-start align-items-center">
            <label className="label">Sort </label>
            <select className="sort-products" type="select">
              <option value="Relevance">Relevance</option>
              <option value="Products">New Products</option>
              <option value="Old Products">Old Products</option>
            </select>
          </div>
          <div className="col-6 col-lg-6 d-flex justify-content-end align-items-center my-5">
            <label className="label">Filter </label>
            <span className="">
              <BsFunnelFill onClick={() => setShow(!show)} />
            </span>
          </div>

          {/* products alll */}

          <div className="row"></div>
        </div>
      </div>
      <div className="container-fluid px-md-5 px-0 px-lg-5">
        <div className="row mx-0 mx-md-5 mx-lg-5">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2 col-sm-12 col-lg-2">
                {/* prodyct filter */}
                <div className='product-filter'>
                  <div className='filter-body'>
                    <div className='row'>
                      <h6 className=''>Categories</h6>
                      <div className='row-cols-auto'>
                        {categories?.map((c) => (
                          <div className='filter-categories cat'>
                            <label>
                              <input type='checkbox' key={c._id} onChange={(e) => HandleFilter(e.target.checked, c._id)} /><span>{c.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>

                    </div>
                    <hr />
                    <div className='row'>
                      <h6 className=''>Brands</h6>
                      <div className='row-cols-auto'>
                        {brands?.map((b) => (
                          <div className='filter-categories cat'>
                            <label>
                              <input type='checkbox' key={b._id} onChange={(e) => HandleFilter(e.target.checked, b._id)} /><span>{b.brandname}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr />
                    {/* <div className='row'>
                      <h6 className=''>Color</h6>
                      <div className='color-select-'></div>
                    </div>
                    <hr /> */}
                    {/* <div className='row d-flex justify-content-evenly'>
                      <div className='col'>
                        <button type='button' className='btn btn-outline-primary'>Clear</button>
                      </div>
                      <div className='col d-flex justify-content-end'>
                        <button className='btn btn-primary'>Apply</button>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* filter end */}
              </div>
              <div className="col-md-10 col-lg-10 col-sm-12 col-12">
                <div className="row">
                  {products?.map((p) => (

                    <div onClick={() => navigate(`/product/${p.slug}`)} className="col-md-3 col-lg-3 col-sm-12 mb-3">

                      <div className="card px-md-3 py-lg-4 py-2 rounded-0 border-0">
                        <div className="row">
                          <div className="col-lg-12 col-5">
                            <div className="prod-img d-flex justify-content-center align-items-center">
                              <img
                                className="img-fluid"
                                src={`/api/v1/product/product-photo/${p._id}`}
                                alt={p.name}
                              />
                            </div>
                          </div>
                          <div className="col-7 col-lg-12 justify-content-start">
                            <div className="product-name my-3">{p.productname}</div>
                            <div className="offer-tag my-2 py-2 px-3">ON OFFER</div>
                            <div className="product-details mt-3">
                              {p.productdetails}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
