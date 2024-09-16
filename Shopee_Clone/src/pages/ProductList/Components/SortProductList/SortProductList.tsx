import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import classNames from 'classnames'
import { order, sortBy } from '../../../../constants/product'
import { ProductListConfig } from '../../../../types/product.type'
import omit from 'lodash/omit'
import { queryConfig } from '../../../../hooks/useQueryConfig'

interface Props {
  queryParamsConfig: queryConfig
  pageSize: number
}

export default function SortProductList({ queryParamsConfig, pageSize }: Props) {
  const page = Number(queryParamsConfig.page)
  const navigate = useNavigate()
  const { sort_by = sortBy.createdAt } = queryParamsConfig

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryParamsConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryParamsConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            onClick={() => handleSortBy(sortBy.view)}
            className={classNames('h-8 px-4 capitalize text-sm text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSortBy(sortBy.createdAt)}
            className={classNames('h-8 px-4 capitalize text-sm text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
          >
            {' '}
            Mới nhất
          </button>
          <button
            onClick={() => handleSortBy(sortBy.sold)}
            className={classNames('h-8 px-4 capitalize text-sm text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
          >
            {' '}
            Bán chạy
          </button>
          <select
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
            className={classNames('h-8 px-4 capitalize text-sm  text-left', {
              'bg-orange text-white': isActiveSortBy(sortBy.price),
              'bg-white text-black': !isActiveSortBy(sortBy.price)
            })}
          >
            <option className='bg-white text-black' value='' disabled>
              Giá
            </option>
            <option value={order.acs} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={order.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryParamsConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className={classNames(
                'px-3 h-8 rounded-tl-sm bg-white/60 hover:bg-slate-200 border-r-2 border-slate-300 flex items-center justify-center',
                {
                  'pointer-events-none opacity-50': page === 1,
                  'pointer-events-auto': page !== 1
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className={'size-4 '}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </Link>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryParamsConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className={classNames(
                'px-3 h-8 rounded-tl-sm bg-white/60 hover:bg-slate-200 border-r-2 border-slate-300 flex items-center justify-center',
                {
                  'pointer-events-none opacity-50': page === pageSize,
                  'pointer-events-auto': page !== pageSize
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
