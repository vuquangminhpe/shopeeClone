import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import productApi from '../../api/product.api'
import ProductRating from '../ProductList/Components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from '../../utils/utils'
import InputNumber from '../../Components/InputNumber'
import DOMPurify from 'dompurify'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const product = productDetailData?.data.data
  if (!product) return null
  return (
    <div className='border-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full shadow pt-[100%]'>
                <img src={product.image} alt='' className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%]'>
                      <img src={img} alt='' className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button className='translate-x-3 absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  {' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange text-orange size-4'
                    nonActiveClassName='fill-gray-300 text-gray-300 size-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1[px] bg-gray-300'>
                  <div className='bg-white'>
                    <span>{formatNumberToSocialStyle(product.sold)}</span>
                    <span className='ml-1 text-gray-500'>Đã bán</span>
                  </div>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>đ{formatCurrency(product.price)}</div>
                <div className='ml-3 bg-orange text-white h-4 w-16 text-xs flex justify-center rounded-sm'>
                  {rateSale(product.price_before_discount, product.price)} <span>Giảm</span>
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                  <InputNumber
                    classNameError='hidden'
                    value={1}
                    className=''
                    classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 textsm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'>
                  <img
                    className='px-1 mr-2'
                    alt='icon-add-to-cart'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
                  ></img>
                  Thêm vào giỏ hàng
                </button>
                <button className='bg-orange text-white min-w-[5rem] shadow-sm outline-none hover:bg-orange/90 h-12 flex justify-center items-center rounded-sm ml-5 px-3'>
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-5 mt-12 mb-4 text-sm leading-loose'>
            <div className='' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}>
              {}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
