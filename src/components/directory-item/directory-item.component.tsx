import {BackgroundImage,Body,DirectoryItemContainer} from './directory-item.styles'
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { ICategories } from '../directory/directory.component';

interface IProps{
  category:ICategories
}

const DirectoryItem :FC<IProps>= ({ category }) => {
  const { imageUrl, title,route } = category;
  const navigate= useNavigate()
  const onNavigateHandler= ()=>navigate(route)
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      {/* imageUrl作为一个prop传入 */}
      <BackgroundImage imageUrl={imageUrl}/>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;