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

    const dispatch=useDispatch()
    useEffect(()=>{
        const getCategoriesMap = async () => {
          const categoriesMap = await getCategoriesAndDocuments();
          console.log('===你好你好===');
          console.log(categoriesMap);
          console.log('===你好你好===');
          dispatch(setCategoriesMap(categoriesMap));
        };
    
        getCategoriesMap();
    },[])

    const categoriesMap=useSelector((state: RootState) => state.categories.categoriesMap)
    const [products,setProducts]= useState<ICategoryItem[]>([])

    //如果category或者categoriesMap变了，就重新加载页面
    useEffect(() => {
        const realcategory= categoriesMap.filter((singlecategory)=>singlecategory.title ==category)
        if(realcategory[0]){
            const realProducts= realcategory[0]["items"];
            console.log(realProducts);
            setProducts(realProducts);
        }
    }, [category, categoriesMap]);

    console.log('以下是products内容');
    console.log(products);
    console.log('以上是内容');

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