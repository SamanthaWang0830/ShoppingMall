import { createContext, useState,useEffect } from "react";
import SHOP_DATA from '../shop-data.js'
import { addCollectionAndDocuments ,getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
import { gql, useQuery } from '@apollo/client';
import { Title } from "../components/category-preview/category-preview.styles.jsx";
import { ItemDetails } from "../components/cart-item/cart-item.styles.jsx";


export const CategoriesContext= createContext({
    categoriesMap:{},
})


const COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;


export const CategoriesProvider= ({children})=>{
    const [categoriesMap, setCategoriesMap] = useState({})

    const { loading, error, data } = useQuery(COLLECTIONS);

    //用useEffect--->只一次
    //把数据传给firebase，正常情况下是由后端传
    /* useEffect(()=>{
        addCollectionAndDocuments('categories',SHOP_DATA)
    },[]) */
    useEffect(()=>{
        if(data){
            const {collections}=data
            const collectionsMap=collections.reduce((acc,collection)=>{
                const { title, items } = collection;
                acc[title.toLowerCase()]=items;
                return acc
            },{})
            setCategoriesMap(collectionsMap)
        }
    },[data])

    const value={categoriesMap,loading, error}
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}