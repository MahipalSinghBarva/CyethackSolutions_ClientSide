import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listItems } from '../action/itemActions';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const ItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert()
  const { items, loading, error } = useSelector((state) => state.itemList);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  const handleView = (id) => {
    if (!isAuthenticated) {
      navigate('/login');
      alert.success("You need to login first")
    } else {
      sessionStorage.setItem('item_id', id);
      navigate('/item');
    }
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-10 md:px-10">
      <div className="flex justify-between mb-4">
        <form className="flex items-center max-w-full">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 border" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
              </svg>
            </div> */}
            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 md:px-96 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4 bg-transparent" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New</button>
      </div>

      {loading ? (
        <p className="text-yellow-600 place-content-center grid text-3xl mt-5">Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className='text-sm'>
                <th scope="col" className="px-6 py-3 text-blue-600">Product name</th>
                <th scope="col" className="px-6 py-3 text-blue-600">Rating</th>
                <th scope="col" className="px-6 py-3 text-blue-600">Category</th>
                <th scope="col" className="px-6 py-3 text-blue-600">Price</th>
                <th scope="col" className="px-6 py-3 text-blue-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.title}
                  </th>
                  <td className="px-6 py-4">{item?.rating?.rate}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleView(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
