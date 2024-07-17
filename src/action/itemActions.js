import axios from 'axios';

export const listItems = () => async (dispatch) => {
  try {
    dispatch({ type: 'ITEM_LIST_REQUEST' });

    const { data } = await axios.get('https://fakestoreapi.com/products');

    dispatch({
      type: 'ITEM_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ITEM_LIST_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listItemDetails = (id) => async (dispatch, getState) => {
  const { itemDetails: { item } } = getState();

  if (item.id !== id) {
    try {
      dispatch({ type: 'ITEM_DETAILS_REQUEST' });

      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

      dispatch({
        type: 'ITEM_DETAILS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'ITEM_DETAILS_FAIL',
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  }
};
