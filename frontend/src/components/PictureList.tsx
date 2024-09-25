import React, { useState, useEffect } from 'react';
import { getPictures,likePicture, followPicture, unfollowPicture } from '../services/pictureServices';

import { RiUserUnfollowFill } from "react-icons/ri";
import { RiUserFollowFill } from "react-icons/ri";
import Loader from './Lodar';



interface Picture {
  _id: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  followers: string[];
}

const PictureList: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [userId] = useState<string>('user1'); // Mock userId for follow/unfollow
  const[loading,setLoading]=useState<boolean>(false)


  useEffect(() => {
  setLoading(true)
    try{
      getPictures()
        .then(response => {
          setPictures(response.data);
          console.log(response.data)
        })
    } catch(error){
      console.error('Error fetching pictures:', error);
    }finally{
setLoading(false)
    }
    // Fetch pictures when the component loads
    
     
  }, []);

  const handleLike = (id: string) => {
    likePicture(id)
      .then(() => {
        // Update UI or state after liking
        setPictures(prev =>
          prev.map(picture => (picture._id === id ? { ...picture, likes: picture.likes + 1 } : picture))
        );
      })
      .catch(error => {
        console.error('Error liking picture:', error);
      });
  };

  const handleFollow = (id: string) => {
    followPicture(id, userId)
      .then(() => {
        // Update UI or state after following
        setPictures(prev =>
          prev.map(picture =>
            picture._id === id ? { ...picture, followers: [...picture.followers, userId] } : picture
          )
        );
      })
      .catch(error => {
        console.error('Error following picture:', error);
      });
  };

  const handleUnfollow = (id: string) => {
    unfollowPicture(id, userId)
      .then(() => {
        // Update UI or state after unfollowing
        setPictures(prev =>
          prev.map(picture =>
            picture._id === id
              ? { ...picture, followers: picture.followers.filter(follower => follower !== userId) }
              : picture
          )
        );
      })
      .catch(error => {
        console.error('Error unfollowing picture:', error);
      });
  };

  return (
    <div className=" w-full  px-4 pb-16 ">
{loading? (<Loader/>):(
  <>

   {/* Pinterest-style Masonry Layout */}
   <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-6 gap-4">
   {pictures.map((picture) => (
     <div
       key={picture._id}
       className="relative mb-4 break-inside-avoid rounded-2xl w-150  hover:shadow-2xl hover:brightness-90  transition-shadow  duration-300 overflow-hidden" 
         >
       {/* Image with object-cover to handle responsiveness */}
       <img
src={picture.imageUrl}
alt={picture.tags.join(', ')}
className="w-full h-auto object-cover rounded-md transition duration-300 "
/>


       {/* Overlay Content */}
       <div className="absolute inset-0 flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
         {/* Like button */}
         <span
           onClick={() => handleLike(picture._id)}
           className="absolute bottom-10 left-2 text-black py-1 px-2 rounded-full bg-white font-bold hover:bg-opacity-75 transition duration-200 cursor-pointer"
         >
           ❤️ {picture.likes}
         </span>

         {/* Tags */}
         <span className="absolute bottom-2 left-2 text-black px-2 flex my-auto  font-bold rounded-full  bg-white hover:bg-opacity-75 transition duration-200">
          #{picture.tags.join(', ')}
         </span>

         {/* Follow/Unfollow button */}
         <span className="absolute top-3 right-3 text-white py-1 px-2 rounded-full  bg-red-500 hover:bg-red-700 cursor-pointer transition duration-200">
           {picture.followers.includes(userId) ? (
             <span
               onClick={() => handleUnfollow(picture._id)}
               className="bg-red-500 hover:bg-red-700"
             >
               <RiUserUnfollowFill className="hover:shadow-2xl" size={20}/>
             </span>
           ) : (
             <span
               onClick={() => handleFollow(picture._id)}
               className="bg-green-500 hover:bg-green-700"
             >
               <RiUserFollowFill className="hover:shadow-2xl"  size={20}/>
             </span>
           )}
         </span>
       </div>
     </div>
   ))}
 </div>
 </>
)}
  
 
  </div>
  
  
  
  
  
  )  
};

export default PictureList;
