import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import PhotosUploader from '../../components/Moderator/PhotosUploader';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../../components/Context/Context';

const AddProductPage = () => {

  const location = useLocation();
  const { id } = location.state || {};

  const {value} = useContext(MyContext)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [category, setCategory] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      return;
    }
    axiosInstance.get('/moderator/show-product/' + id)
      .then(response => {
        const { data } = response;
        setTitle(data.product.title);
        setDescription(data.product.description);
        setAddedPhotos(data.product.image);
        setCategory(data.product.category);
        setPrice(Math.round(data.product.price * 83));
      })
      .catch(error => {
        toast.error('Failed to fetch product details'+ error);
      });
  }, [id]);
  async function saveProduct(ev) {
    ev.preventDefault();
    const productData = {
      title,
      description,
      price : price/83,
      category,
      image: addedPhotos,
    }
    if (id) {
      // update
      await axiosInstance.put('/moderator/update-product', {
        id, ...productData
      });
      toast.success('Product updated successfully');
      navigate('/moderator', { replace: true });
    } else {
      // new product    
      await axiosInstance({
        url: "moderator/add-product",
        method: "POST",
        data: productData,
      })
      toast.success('Product added successfully');
      navigate('/moderator', { replace: true });
    }
  }

  return (
    <form onSubmit={saveProduct} className={`mt-28 space-y-6 max-w-lg mx-auto p-6 mb-20 ${value ? "bg-gray-900" : "bg-gray-50"} bg-gray-50 rounded-lg shadow-md`}>
      <div className="form-control">
        <label htmlFor="title" className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          name="title"
          type="text"
          value={title}
          placeholder='Title'
          className="input input-bordered"
          onChange={ev => setTitle(ev.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="description" className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          name="description"
          type="text"
          value={description}
          placeholder='Description'
          className="input input-bordered"
          onChange={ev => setDescription(ev.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="price" className="label">
          <span className="label-text">Price </span>
        </label>
        <input
          name="price"
          type="text"
          value={price}
          className="input input-bordered"
          onChange={ev => setPrice(ev.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="category" className="label">
          <span className="label-text">Category</span>
        </label>
        <input
          name="category"
          type="text"
          value={category}
          placeholder='Category'
          className="input input-bordered"
          onChange={ev => setCategory(ev.target.value)}
        />
      </div>
      <div className="form-control">
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
      </div>
      <button type="submit" className="btn bg-main text-black w-full">
        Save Product
      </button>
    </form>
  );
};

export default AddProductPage;
