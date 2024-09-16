import ProductRating from '../ProductList/Components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '../../utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import productApi from '../../api/product.api'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Product as Products, ProductListConfig } from '../../types/product.type'
import DOMPurify from 'dompurify'
import Product from '../ProductList/Components/Product'
import QuantityController from '../../Components/QuantityController'
import purchaseApi from '../../api/purchases.api'
import { toast } from 'react-toastify'
import { purchaseStatus } from '../../constants/purchase'
import { AppContext } from '../../Contexts/app.context'
import path from '../../constants/path'
export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const id = getIdFromNameId(nameId as string)
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const { isAuthenticated, profile } = useContext(AppContext)
  const product = productData?.data.data
  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImages, setActiveImages] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (product) {
      setActiveImages(product.image)
    }
  }, [product])
  const { data: productsData } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => productApi.getProduct(queryConfig),
    enabled: Boolean(product),
    staleTime: Infinity
  })
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  const mouseImages = (img: string) => {
    setActiveImages(img)
  }
  const prev = () => {
    console.log(currentIndexImages[0])

    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.AddToCart(body),
    onSuccess: () => {}
  })
  const next = () => {
    console.log(currentIndexImages[1])

    if (currentIndexImages[1] < (product as Products)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    //cách 1 : khi xử lí được bubble event
    // const { offsetX, offsetY } = event.nativeEvent
    //cách 2: Khi không xử lí được bubble event\
    const offsetX = event.pageX - (rect.x - window.scrollX)
    const offsetY = event.pageY - (rect.y - window.scrollY)
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, {
            position: 'top-center'
          })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
      }
    )
  }
  const buyNow = async () => {
    if (profile) {
      const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
      const purchasesId = res.data.data
      navigate(path.cart, {
        state: {
          purchasesId: purchasesId._id
        }
      })
    } else {
      navigate('/login')
    }
  }
  if (!product) return null
  return (
    <div className='border-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full shadow pt-[100%] overflow-hidden'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImages}
                  alt=''
                  className='absolute pointer-events-none  top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
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
                {currentImages.map((img) => {
                  const isActive = img === activeImages
                  return (
                    <div className='relative w-full pt-[100%]' onMouseEnter={() => mouseImages(img)} key={img}>
                      <img src={img} alt='' className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button
                  className='translate-x-3 absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
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
                <QuantityController
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  max={product.quantity}
                  value={buyCount}
                />
                <div className='ml-6 textsm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={() => (isAuthenticated ? handleAddToCart() : navigate(path.login))}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                >
                  <img
                    className='px-1 mr-2'
                    alt='icon-add-to-cart'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
                  ></img>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='bg-orange text-white min-w-[5rem] shadow-sm outline-none hover:bg-orange/90 h-12 flex justify-center items-center rounded-sm ml-5 px-3'
                >
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
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 py-6'>
        <div className='container'>
          <div className='text-black'>Sản phẩm yêu thích</div>
          <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {productsData?.data.data.products.map((product) => (
              <div className='col-span-1' key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
