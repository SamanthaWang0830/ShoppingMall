import {useEffect,Fragment} from 'react';
//import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/categort-preview.component';
import { getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import { useSelector,useDispatch} from "react-redux";
import { selectCategoriesMap,setCategoriesMap } from '../../store/categoriesSlide';

const CategoriesPreview = () => {
  const dispatch=useDispatch()
  //const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap=useSelector(selectCategoriesMap)
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
        const products= categoriesMap[title]
        return (
          <CategoryPreview key={title} title={title} products={products}/>
        )
      })}
    </Fragment>
  );
};

export default CategoriesPreview;