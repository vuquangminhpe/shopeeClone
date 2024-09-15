import { createSearchParams, Link } from 'react-router-dom'
import useQueryParams from '../../../hooks/useQueryParams'
import path from '../../../constants/path'
import { purchaseStatus } from '../../../constants/purchase'
import classNames from 'classnames'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import purchaseApi from '../../../api/purchases.api'
import { PurchaseListStatus } from '../../../types/purchase.type'
import { formatCurrency, generateNameId } from '../../../utils/utils'
import icon from '../../../assets/nonesp.webp'

const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgress, name: 'Đang giao' },
  { status: purchaseStatus.delivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã hủy' }
]
export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchase', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus }),
    placeholderData: keepPreviousData
  })

  const purchaseInCart = purchaseInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-gray-400 text-black': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          {' '}
          <div className=' top-0 rounded-sm flex shadow-sm'>{purchaseTabsLink}</div>
          {purchaseInCart?.length !== 0 ? (
            <div>
              {purchaseInCart?.map((purchase) => (
                <div
                  key={purchase._id}
                  className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'
                >
                  <Link
                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                    className='flex'
                  >
                    <div className='flex-shrink-0'>
                      <img src={purchase.product.image} alt='' className='size-20 object-cover' />
                    </div>
                    <div className='ml-3 flex-grow overflow-hidden'>
                      <div className='truncate'>{purchase.product.name}</div>
                      <div className='mt-3'>số lượng: {purchase.buy_count}</div>
                    </div>
                    <div className='ml-3 flex-shrink-0'>
                      <span className='truncate text-gray-500 line-through text-sm'>
                        đ{formatCurrency(purchase.product.price_before_discount)}
                      </span>
                      <span className='ml-4 truncate text-orange text-xl'>
                        đ{formatCurrency(purchase.product.price)}
                      </span>
                    </div>
                  </Link>
                  <div className='flex justify-end'>
                    <div>
                      <span>Tổng giá tiền</span>
                      <span className='ml-4 text-xl text-orange'>
                        đ{formatCurrency(purchase.product.price * purchase.buy_count)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-9 bg-white border-gray-100 border flex flex-col justify-center items-center'>
              <img src={icon} className='size-52 mb-1 rounded-full' alt='' />
              <div className='uppercase text-center text-xs text-gray-500'>Chưa có sản phẩm</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
