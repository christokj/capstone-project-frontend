import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import iconPlus from '../../assets/icons8-plus.json';
import iconTrash from '../../assets/delete.json';
import Image from '../Moderator/Image';
import { axiosInstance } from '../../config/axiosInstance';

function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axiosInstance({
            url: '/moderator/upload-link',
            method: 'POST',
            data: { link: photoLink },
        })
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axiosInstance({
            url: '/moderator/upload',
            method: 'post',
            data,
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        });
    }
    function removePhoto(ev, filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }

    return (
        <>
            <div className='flex gap-2'>
                <input value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                    type="text" placeholder={'Add using a link .....jpg'} />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl h-10 mt-2'>Add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid grid-cols-3 gap-2'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className='h-32 w-40 flex relative' key={link}>
                        <Image className='rounded-2xl w-full  object-cover' src={link} alt="Added photos" />
                        <button onClick={ev => removePhoto(ev, link)} className='absolute bottom-1 right-1'>
                            <Lottie className='w-5' animationData={iconTrash} />
                        </button>
                    </div>
                ))}
                <label className=' w-40  h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2' >
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                    <div>
                        <Lottie className='w-8 ' animationData={iconPlus} />
                    </div>
                    <span className='mt-1'>Upload</span>
                </label>
            </div>
        </>
    );
}

export default PhotosUploader;