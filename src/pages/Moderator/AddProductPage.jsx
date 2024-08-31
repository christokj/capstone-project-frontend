import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import PhotosUploader from '../../components/Moderator/PhotosUploader';
import { useNavigate, useParams } from 'react-router-dom';

const AddProductPage = () => {

  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [shopName, setShopName] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
        return;
    }
    axios.get('/places/' + id).then(response => {
        const { data } = response;
        setTitle(data.title);
        setDescription(data.description);
        setAddedPhotos(data.photos);
        setCategory(data.perks);
        setPrice(data.price);
        setShopName(data.shopName);
        console.log(data);
    });
}, [id]);
  
  async function saveProduct(ev) {
    ev.preventDefault();
    const productData = {
      title,
      description,
      price,
      category,
      shopName,
      image: addedPhotos,
    }
    if (id) {
      // update
      await axios.put('/places', {
          id, ...placeData
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
    <form onSubmit={saveProduct} className="space-y-6 max-w-lg mx-auto p-6 mb-20 bg-gray-50 rounded-lg shadow-md">
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
          <span className="label-text">Price</span>
        </label>
        <input 
          name="price" 
          type="number" 
          value={price}
          placeholder='Price'
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
        <label htmlFor="shopName" className="label">
          <span className="label-text">Shop Name</span>
        </label>
        <input 
          name="shopName" 
          type="text" 
          value={shopName}
          placeholder='Shop Name'
          className="input input-bordered" 
          onChange={ev => setShopName(ev.target.value)}
        />
      </div>
      <div className="form-control">
      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
      </div>
      <button type="submit" className="btn bg-main w-full">
        Add Product
      </button>
    </form>
  );
};

export default AddProductPage;
