import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { useContext } from 'react'
import { AppContext } from '../../../../Contexts/app.context'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='size-12 flex  flex-shrink-0 rounded-full border border-black/10'>
          <img
            src={
              profile?.picture !== undefined
                ? profile?.picture
                : 'https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
            }
            alt=''
            className='h-full w-full rounded-full object-cover'
          />
          <div className='flex-grow pl-4'>
            <div className='truncate mb-1 font-semibold text-gray-600 flex text-xs'>
              {profile?.name == null ? profile?.email : profile?.name}
            </div>
            <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                />
              </svg>
              <div className='text-gray-400 mt-2 capitalize text-sm  w-[100px]'>Sửa hồ sơ</div>
            </Link>
          </div>
        </Link>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img className='h-full w-full' src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.changePassword} className='mt-4 flex items-center capitalize text-gray-500 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img className='h-full w-full' src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.profile} className=' mt-4 flex items-center capitalize text-gray-500 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img className='h-full w-full' src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}