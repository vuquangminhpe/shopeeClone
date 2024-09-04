import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import productApi from '../../api/product.api'
import { formatCurrency } from '../../utils/utils'
export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  console.log('product', productDetailData)
  console.log('productssssssss', product)

  return (
    <div className='border-gray-300 py-5'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-4'>
            <img src={product?.image} className='h-[500px] object-fill w-full' alt='' />
          </div>
          <div className='col-span-8'>
            <div>
              <span className='w-[15px] bg-orange text-white text-xs p-1'>Preferred</span>
              {product?.name}
            </div>
            <div className='flex relative mt-2'>
              <div className='border-b-2 border-orange w-6 mr-1 text-orange'>{product?.rating} </div>
              {Array(5)
                .fill(0)
                .map((productItemDetail: string) => (
                  <span key={productItemDetail}>
                    {' '}
                    <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4'>
                      <defs>
                        <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                          <stop offset={0} stopColor='#ffca11' />
                          <stop offset={1} stopColor='#ffad27' />
                        </linearGradient>
                        <polygon
                          id='ratingStar'
                          points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                        />
                      </defs>
                      <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                        <g transform='translate(-876 -1270)'>
                          <g transform='translate(155 992)'>
                            <g transform='translate(600 29)'>
                              <g transform='translate(10 239)'>
                                <g transform='translate(101 10)'>
                                  <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                ))}
              <div className='border-l-[1px] border-gray-400 mx-2'></div>
              <div>{product?.view} đánh giá</div>
              <div className='absolute right-0 opacity-50'>Báo Cáo</div>
            </div>
            <div className='bg-orange mt-2 flex justify-between pr-1'>
              <img
                className='p-3'
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/dea74facf15efdbdb982.svg'
                alt=''
              />
              <div className='flex'>
                <img
                  alt='icon clock'
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/db37ab11d87a41f61b7d.svg'
                  height='17'
                  width='17'
                  className='-translate-y-[2px] mr-1 object-contain'
                ></img>
                <div className='leading-10 text-white'>Kết thúc trong </div>
              </div>
            </div>
            <div className=' flex mt-2 bg-gray-100/5'>
              <div className='text-gray-400 leading-7 text-sm mr-4 line-through'>
                {formatCurrency(product?.price_before_discount)}đ
              </div>{' '}
              <div className='text-orange text-xl ml-1'>{formatCurrency(product?.price)}đ</div>
              <p className='bg-orange ml-3 text-white rounded-md p-1'>
                {Math.floor((product.price / product.price_before_discount) * 100)}% giảm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
