import { isUndefined, omitBy } from 'lodash'
import { ProductListConfig } from '../types/product.type'
import useQueryParams from './useQueryParams'

export type queryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
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
  return queryParamsConfig
}
