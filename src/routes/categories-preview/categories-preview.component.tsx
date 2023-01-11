import {useEffect,Fragment} from 'react';
//import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import { useSelector,useDispatch} from "react-redux";
import { setCategoriesMap } from '../../store/categoriesSlide';
import type { RootState } from "../../store/store";




const CategoriesPreview = () => {
  const dispatch=useDispatch()
  //const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap=useSelector((state: RootState) => state.categories.categoriesMap)
  useEffect(()=>{
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      dispatch(setCategoriesMap(categoryMap));
    };

    getCategoriesMap();
  },[])

  return (
    <Fragment>
      {/* one line return (),  mutiple line return {} */}
      {Object.keys(categoriesMap).map((title) => {
        const products= categoriesMap[title].items 
        const name= categoriesMap[title].title
        return (
          <CategoryPreview key={name} title={name} products={products}/>
        )
      })}
    </Fragment>
  );
};

export default CategoriesPreview;