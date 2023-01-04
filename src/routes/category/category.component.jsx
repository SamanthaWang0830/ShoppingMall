import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { useContext ,useState, useEffect,Fragment} from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'


const Category=()=>{
    const {category}=useParams()
    const {categoriesMap}=useContext(CategoriesContext)
    const [products,setProducts]= useState(categoriesMap[category])
    //如果category或者categoriesMap变了，就重新加载页面
    useEffect(()=>{
        /* 第一次试图call category from an empty object 所以失败  categoriesMap还是{} */
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

    return (
    <Fragment>
        <h2 className='title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
            
            {/* 如果有component依赖于async，就需要一个safeguard that only render the component if the actual data is present */}
            {/* 如果products是undefined，就不render，只有products有值，再往下渲染 */}
            { products&&
                products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>))
            }
        </div>
    </Fragment>
    )
}

export default Category