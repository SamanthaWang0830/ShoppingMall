import { CategoryPreviewContainer,Title,Preview } from './category-preview.styles'
import ProductCard from '../product-card/product-card.component'
import { FC} from 'react'
import { Link } from 'react-router-dom'
import { ICategoryItem, ICategory} from '..'

interface IProps{
    products:ICategoryItem[],
    title: ICategory['title']
}

const CategoryPreview: FC<IProps> =({title,products})=>{
    return (
        <CategoryPreviewContainer>
            <h2>
                {/* h2是独占一行的，但希望能点击的只是link里的单词 */}
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                        /* index<4的留下 */
                        .filter((_,idx:number)=>idx<4)
                        .map(((product)=> <ProductCard key={product.id} product={product} />))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview