import { useMutation, useQuery } from '@tanstack/react-query'
import purchaseApi from '../../api/purchases.api'
import { purchaseStatus } from '../../constants/purchase'
import { Link, useLocation } from 'react-router-dom'
import path from '../../constants/path'
import { formatCurrency, generateNameId } from '../../utils/utils'
import QuantityController from '../../Components/QuantityController'
import Button from '../../Components/Button'
import React, { useContext, useEffect, useState } from 'react'
import { Purchase } from '../../types/purchase.type'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { AppContext } from '../../Contexts/app.context'
import { toast } from 'react-toastify'
export interface ExtendedPurchases extends Purchase {
  disabled: boolean
  checked: boolean
}
export default function Cart() {
  const location = useLocation()
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  const purchasesInCart = purchaseInCartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const purchasesInCartChecked = extendedPurchases.filter((purchase) => purchase.checked)
  const purchasesInCartCheckedCount = purchasesInCartChecked.length
  const purchasesInCartCheckedSavingPrice = purchasesInCartChecked.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const purchasesInCartCheckedSavingPrice_discount = purchasesInCartChecked.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)
  const dataLocation = location.state?.purchasesId

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const purchaseInCartObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const purchasesIdFromLocation = dataLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: purchasesIdFromLocation || Boolean(purchaseInCartObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart])
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const deleteMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch(),
        toast.success('Xóa đơn hàng thành công', {
          position: 'top-center'
        })
    }
  })
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: () => {
      refetch()
      toast.success('Mua hàng thành công', {
        position: 'top-center'
      })
    }
  })
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleOnType = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchaseId = extendedPurchases[purchaseIndex].product._id
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchaseId, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const productId = extendedPurchases[purchaseIndex]._id
    deleteMutation.mutate([productId])
  }
  const handleDeleteMany = () => {
    const productIds = extendedPurchases?.map((purchase) => purchase._id)
    deleteMutation.mutate(productIds)
  }
  const handleBuyProduct = () => {
    if (purchasesInCartChecked.length > 0) {
      const body = purchasesInCartChecked.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='size-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid text-center grid-cols-5'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='first:mt-0 last:mb-0 grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 mt-5'
                >
                  {' '}
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='size-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleChecked(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home} ${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                            className='size-20 flex-shrink-0'
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`${path.home} ${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>đ{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={Number(purchase.buy_count)}
                          classNameWrapper='flex items-center'
                          disabled={purchase.disabled}
                          onType={handleOnType(index)}
                          onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value >= purchase.product.quantity &&
                                value <= 1 &&
                                value !== (purchasesInCart as Purchase[])[index].buy_count
                            )
                          }
                        />
                      </div>
                      <div className='col-span-1'>
                        <div className='text-orange text-sm'>
                          đ{formatCurrency(purchase.product.price * Number(purchase.buy_count))}
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <button
                          onClick={handleDelete(index)}
                          className='bg-none text-black transition-colors hover:text-orange text-sm'
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky mt-10 bottom-0 z-10 flex sm:items-center flex-col sm:flex-row rounded-sm bg-white p-5 border-gray-100'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <input
              type='checkbox'
              name=''
              className='size-5 accent-orange'
              checked={isAllChecked}
              onChange={handleCheckAll}
            />
          </div>
          <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
            Chọn tất cả ({extendedPurchases.length})
          </button>
          <button className='mx-3 border-none bg-none' onClick={handleDeleteMany}>
            Xóa
          </button>
          <div className='ml-auto flex items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán ({purchasesInCartCheckedCount} sản phẩm)</div>
                <div className='ml-2 text-2xl text-orange'>{formatCurrency(purchasesInCartCheckedSavingPrice)}</div>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>
                  {(purchasesInCartCheckedSavingPrice_discount > 0 &&
                    formatCurrency(purchasesInCartCheckedSavingPrice_discount)) ||
                    'đ0'}
                </div>
              </div>
            </div>
            <Button
              onClick={handleBuyProduct}
              className='sm:ml-4 sm:mt-0 mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600'
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
