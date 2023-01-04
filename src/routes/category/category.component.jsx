import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { useContext ,useState, useEffect,Fragment} from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'
import { gql,  useQuery} from '@apollo/client';


const GET_CATEGORY = gql`
query ($title: String) {
  getCollectionsByTitle(title: $title) {
    title
    id
    items {
      id
      name
      price
      imageUrl
    }
  }
}
`;

const Category=()=>{
    const {category}=useParams()
    //const {categoriesMap}=useContext(CategoriesContext)
    const {loading, error, data}=useQuery(GET_CATEGORY, {
        variables:{title:category}
    })
    const [products,setProducts]= useState([])
    //如果category或者categoriesMap变了，就重新加载页面
    useEffect(()=>{
        if(data){
            //双重destructure
            const {getCollectionsByTitle:{items}}=data
            setProducts(items)
        }
    },[category,data])

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