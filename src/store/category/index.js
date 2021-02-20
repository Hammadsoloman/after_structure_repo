import superagent from 'superagent';
import axios from 'axios';

let initialState = {
  categories: [],
  activeCategory: '',
  activeSubCategory: '',
  newCategory: [],
  sub: [],
};

// reducer : switch case
export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    // let activeSubCategory = state.categories.subCategory.filter(
    //   cat => cat.subName === payload,
    // )[0]['subName'];
    // return { categories: state.categories, activeSubCategory };

    case 'CHANGEACTIVECATEGORY':
      console.log('payload in CHANGEACTIVECATEGORY', payload);

      let activeCategory = state.categories.filter(
        cat => cat.displayName === payload,
      )[0]['displayName'];
      return { categories: state.categories, activeCategory };

    case 'GETCATEGORIES':
      console.log('payload in GETCATEGORIES', payload);
      state.categories = payload;
      return { ...state };

    case 'GETSUBCATEGORIES':
      console.log('payload in GET SUB CATEGORIES', payload);

      state.sub = payload;
      return { ...state };

    case 'NEW Category':
      console.log('payload in NEW Category', payload);
      return { ...state, newCategory: payload || {} };

    case 'NEW SUB':
      console.log('payload in NEW sub', payload);
      return { ...state, sub: payload || {} };

    case 'CHANGEACTIVESUBCATEGORY':
      console.log('payload in CHANGE ACTIVE Sub CATEGORY', payload);
      console.log(
        'state.categories in CHANGE ACTIVE Sub CATEGORY',
        state.categories,
      );
      var activeSubCategory = '';
      let catTemp = state.categories;
      for (let i = 0; i < catTemp.length; i++) {
        console.log('payload in for', catTemp[i]);
        const temp = catTemp[i].subCategory.filter(
          subC => subC.subName === payload,
        );
        console.log('temp in for', temp);

        if (temp.length !== 0) {
          activeSubCategory = temp[0].subName;
          /*return {
            //...element,
            subCategory: catTemp[i].subCategory.filter(
              subC => subC.subName === payload,
            ),
          };*/
        }
      }
      console.log('activeSubCategoryTest', JSON.stringify(activeSubCategory));
      return { categories: state.categories, activeSubCategory };

    // it should return one subCategory not array of subCategory
    // if(activeSubCategory.subCategory.length>0)(
    //   // const finalResult=subCategory.subname
    //   )

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export const getRemoteCategories = () => dispatch => {
  let api = 'https://main-server-hammad.herokuapp.com/categories';
  return superagent.get(api).then(data => {
    console.log('data from getRemoteCategories', data);
    dispatch(getCatrgoriesAction(data.body));
  });
};

export const newCategory = category => dispatch => {
  let api = 'https://main-server-hammad.herokuapp.com/categories';
  axios.post(api, category).then(data => {
    console.log('data in newCategory', data);
    dispatch(newCategoryAction(data.data));
  });
};

export const newSubCategory = (id, product) => dispatch => {
  console.log('product,id in add new', id, product);
  axios
    .post(`https://main-server-hammad.herokuapp.com/categories/${id}`, product)
    .then(data => {
      console.log('data in res add new', data);
      dispatch(newSubCategoryAction(data.data));
    });
};
/******************************************************************** */

export const changeActiveCategory = name => {
  console.log('name in changeActiveCategory', name);
  return {
    type: 'CHANGEACTIVECATEGORY',
    payload: name,
  };
};

export const changeActiveSubCategory = subName => {
  console.log('name in changeActiveSUBCategory', subName);
  return {
    type: 'CHANGEACTIVESUBCATEGORY',
    payload: subName,
  };
};

export const getCatrgoriesAction = dataFromApi => {
  console.log('dataFromApi in getCatrgoriesAction', dataFromApi);
  return {
    type: 'GETCATEGORIES',
    payload: dataFromApi,
  };
};

export const getSubCatrgoriesAction = dataFromApi => {
  console.log('dataFromApi in getCatrgoriesAction', dataFromApi);
  return {
    type: 'GETSUBCATEGORIES',
    payload: dataFromApi,
  };
};

export const newCategoryAction = payload => {
  console.log('name in newCategoryAction', payload);
  return {
    type: 'NEW Category',
    payload: payload,
  };
};

export const newSubCategoryAction = payload => {
  console.log('payload in NEW sub action', payload);

  return {
    type: 'NEW SUB',
    payload: payload,
  };
};
