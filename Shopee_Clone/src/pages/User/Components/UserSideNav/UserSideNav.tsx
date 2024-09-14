import { Link, NavLink } from 'react-router-dom'
import path from '../../../../constants/path'
import { useContext } from 'react'
import { AppContext } from '../../../../Contexts/app.context'
import { getAvatarUrl } from '../../../../utils/utils'
import classNames from 'classnames'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='flex items-center p-2 rounded-lg hover:bg-gray-100'>
          <div className='w-12 h-12 flex-shrink-0'>
            <img
              src={getAvatarUrl(profile?.avatar)}
              alt={profile?.name || 'User avatar'}
              className='w-full h-full rounded-full object-cover border border-gray-200'
            />
          </div>
          <div className='ml-3 flex-grow'>
            <div className='text-sm font-semibold text-gray-700 truncate'>
              {profile?.name || profile?.email || 'Anonymous User'}
            </div>
            <div className='flex items-center text-xs text-gray-500 mt-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4 mr-1'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                />
              </svg>
              Sửa hồ sơ
            </div>
          </div>
        </Link>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center mt-3 capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-500': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img className='h-full w-full' src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('flex items-center mt-3 capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-500': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img className='h-full w-full' src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('flex items-center mt-3 capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-500': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img className='h-full w-full' src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
