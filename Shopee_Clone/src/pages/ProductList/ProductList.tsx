import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './Components/AsideFilter'
import Product from './Components/Product/Product'
import SortProductList from './Components/SortProductList'
import productApi from '../../api/product.api'
import Paginate from '../../Components/Paginate'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from '../../api/category.api'
import useQueryConfig from '../../hooks/useQueryConfig'

export default function ProductList() {
  const queryParamsConfig = useQueryConfig()
  const { data: productData } = useQuery({
    queryKey: ['products', queryParamsConfig],
    queryFn: () => productApi.getProduct(queryParamsConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: Infinity
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
    staleTime: Infinity
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
