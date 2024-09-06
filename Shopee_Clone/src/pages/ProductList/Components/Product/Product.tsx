import { Link } from 'react-router-dom'
import { Product as Products } from '../../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId, rateSale } from '../../../../utils/utils'
import ProductRating from '../ProductRating'
import path from '../../../../constants/path'

interface Props {
  product: Products
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='relative hover:-translate-y-1 hover:shadow-md duration-100 transition-transform '>
        <div className='bg-yellow-300 w-[45px] absolute right-0 top-0'>
          <p className='text-orange p-1'>{rateSale(product.price_before_discount, product.price)}</p>
          <div className='text-white'>Giảm</div>
        </div>
        <div className='overflow-hidden ml-3 mb-4'>
          <img className='h-[200px] w-full' src={product.image} alt='' />
          <div className='bg-white p-4 '>
            <div className='line-clamp-2 text-[11px]'>{product.name}</div>
            <div className='mt-1 text-[11px]'>
              <span className='text-white bg-yellow-300 p-[1px] mr-[5px]'>giảm {}k </span>
              <span className=' border-2 text-orange border-orange p-[0.5px]'>mua kèm deal sốc</span>
            </div>
            <div className=' flex mt-2 justify-between'>
              <div className='text-gray-400 text-sm line-through'>{formatCurrency(product.price_before_discount)}đ</div>{' '}
              <div className='text-orange text-sm ml-1'>{formatCurrency(product.price)}đ</div>
            </div>
            <ul className='my-3'>
              <li className='py-1 list-none'>
                <div className='flex items-center text-sm'>
                  <ProductRating rating={product.rating} />
                  <span className='text-xs ml-3'>{formatNumberToSocialStyle(product.sold)} đã bán</span>
                </div>
              </li>
            </ul>
            <div className='text-xs'>Hà Nội</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
