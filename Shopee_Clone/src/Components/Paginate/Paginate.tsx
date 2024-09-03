import classNames from 'classnames'
import { queryConfig } from '../../pages/ProductList/ProductList'
import { createSearchParams, Link } from 'react-router-dom'
import path from '../../constants/path'

interface Props {
  queryParamsConfig: queryConfig
  pageSize: number
}
const RANGE = 2

export default function Paginate({ pageSize, queryParamsConfig }: Props) {
  const page = Number(queryParamsConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && page > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryParamsConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-500 text-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryParamsConfig,
            page: (page - 1).toString()
          }).toString()
        }}
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 border', {
          'pointer-events-none opacity-50': page === 1,
          'cursor-pointer': page !== 1
        })}
      >
        Prev
      </Link>
      {renderPagination()}
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryParamsConfig,
            page: (page + 1).toString()
          }).toString()
        }}
        className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2  border', {
          'pointer-events-none opacity-50': page === pageSize,
          'cursor-pointer': page !== pageSize
        })}
      >
        Next
      </Link>
    </div>
  )
}
