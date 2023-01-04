import { createContext, useState,useEffect } from "react";
import SHOP_DATA from '../shop-data.js'
import { addCollectionAndDocuments ,getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext= createContext({
    categoriesMap:{},
})


export const CategoriesProvider= ({children})=>{
    const [categoriesMap, setCategoriesMap] = useState({})

    //用useEffect--->只一次
    //把数据传给firebase，正常情况下是由后端传
    /* useEffect(()=>{
        addCollectionAndDocuments('categories',SHOP_DATA)
    },[]) */
    useEffect(()=>{
        const getCategoriesMap= async()=>{
            const categoryMap =await getCategoriesAndDocuments('categories')
            console.log(categoryMap);
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    },[])

    const value={categoriesMap}
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}