import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listItemDetails } from '../action/itemActions';
import { useNavigate } from 'react-router-dom';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemId = sessionStorage.getItem('item_id');

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      if (!item.id || item.id !== itemId) {
        dispatch(listItemDetails(itemId));
      }
    } else {
      sessionStorage.removeItem('item_id')
      navigate('/login');
    }
  }, [dispatch, itemId, item.id, user, navigate]);

  return (
    <div className="mt-10 md:px-10">
      {loading ? (
        <p className="text-yellow-600 place-content-center grid text-3xl mt-5">Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="max-w-auto mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-5xl border md:max-h-screen md:py-10 md:px-20">
          <div className="md:flex">
            <div className="md:flex-shrink-0 w-auto">
              <img className="h-auto w-96 object-cover md:w-96" src={item.image} alt={item.title} />
            </div>
            <div className="p-8">
              <h1 className="block mt-1 text-3xl leading-tight font-medium text-blue-700 ">{item.title}</h1>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.category}</div>
              <p className="mt-2 text-gray-500">{item.description}</p>
              <p className="mt-2 text-green-900 font-bold">Price ${item.price}</p>
              <div className="mt-2">
                <span className="text-yellow-500">Rating: {item?.rating?.rate} <br /> Total Count: {item?.rating?.count}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
