import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhotosUploader from '../../components/Moderator/PhotosUploader';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

function AddCategoryPage() {

  const location = useLocation();
  const [categoryId, setCategoryId] = useState(null);
  const [role, setRole] = useState('moderator')
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);

  useEffect(() => {

    if (categoryId) {
      axiosInstance.get(`/${role}/product-category/${categoryId}`)
        .then((response) => {
          setCategory(response.data.category.name);
          setAddedPhotos(response.data.category.image);

        })
        .catch((error) => {
          toast.error('Failed to load category data');
        });
    }

    if (location.state && location.state.id) {

      //  const { id } = location.state;
      setCategoryId(location.state.id)
    }
    if (location.state && location.state.role) {

      // const { role } = location.state;
      setRole(location.state.role)
    }

  }, [categoryId, role])

  async function saveProduct(ev) {
    ev.preventDefault();
    if (!categoryId) {

      const categoryData = {
        category,
        image: addedPhotos,
      }
      await axiosInstance({
        url: `/${role}/add-category`,
        method: "POST",
        data: categoryData,
      })
    }
    if (categoryId) {
      const categoryData = {
        id: categoryId,
        category,
        image: addedPhotos,
      }
      await axiosInstance({
        url: `/moderator/update-category`,
        method: "PUT",
        data: categoryData,
      })
    }
    toast.success('Category saved successfully');
    navigate(`/${role}`, { replace: true });

  }

  return (
    <form onSubmit={saveProduct} className="space-y-6 max-w-lg mx-auto p-6 mb-20 bg-gray-50 rounded-lg shadow-md">

      <div className="form-control">
        <label htmlFor="category" className="label">
          <span className="label-text">Category Name</span>
        </label>
        <input
          name="category"
          type="text"
          value={category}
          placeholder='Category name'
          className="input input-bordered"
          onChange={ev => setCategory(ev.target.value)}
        />
      </div>

      <div className="form-control">
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
      </div>
      <button type="submit" className="btn bg-main w-full">
        Save Product
      </button>
    </form>
  );
}

export default AddCategoryPage;