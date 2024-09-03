import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './Components/AsideFilter'
import Product from './Components/Product/Product'
import SortProductList from './Components/SortProductList'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../api/product.api'
import Paginate from '../../Components/Paginate'
import { ProductListConfig } from '../../types/product.type'
import { isUndefined, omitBy } from 'lodash'
import categoryApi from '../../api/category.api'
export type queryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryParams: queryConfig = useQueryParams()
  const queryParamsConfig: queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 10,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  )
  const { data: productData } = useQuery({
    queryKey: ['products', queryParamsConfig],
    queryFn: () => productApi.getProduct(queryParamsConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryParamsConfig={queryParamsConfig} categories={categoryData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList
                pageSize={productData.data.data.pagination.page_size}
                queryParamsConfig={queryParamsConfig}
              />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productData?.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Paginate pageSize={productData.data.data.pagination.page_size} queryParamsConfig={queryParamsConfig} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
