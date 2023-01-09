import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect,Fragment} from 'react'
//import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'
import { getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import { useSelector,useDispatch} from "react-redux";
import { setCategoriesMap} from '../../store/categoriesSlide';
import type { RootState } from "../../store/store";
import { ICategoryItem } from '../../components';

const Category=()=>{
    const {category}=useParams()
    //const {categoriesMap}=useContext(CategoriesContext)
    const categoriesMap=useSelector((state: RootState) => state.categories.categoriesMap)
    const dispatch=useDispatch()
    useEffect(()=>{
        const getCategoriesMap = async () => {
          const categoryMap = await getCategoriesAndDocuments();
          console.log(categoryMap);
          dispatch(setCategoriesMap(categoryMap));
        };
    
        getCategoriesMap();
    },[])
    const [products,setProducts]= useState([])

    //如果category或者categoriesMap变了，就重新加载页面
    useEffect(() => {
        setProducts(categoriesMap[category!]);
    }, [category, categoriesMap]);

    return (
    <Fragment>
        <h2 className='title'>{category!.toUpperCase()}</h2>
        <div className='category-container'>
            
            {/* 如果有component依赖于async，就需要一个safeguard that only render the component if the actual data is present */}
            {/* 如果products是undefined，就不render，只有products有值，再往下渲染 */}
            { products&&
                products.map((product:ICategoryItem)=>(
                    <ProductCard key={product.id} product={product}/>))
            }
        </div>
    </Fragment>
    )
}

export default Category