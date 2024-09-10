import { Link, useNavigate } from 'react-router-dom'
import path from '../../constants/path'
import Popover from '../Popover'
import { useContext } from 'react'
import { AppContext } from '../../Contexts/app.context'
import { clearLocalStorage } from '../../utils/auth'
import { purchaseStatus } from '../../constants/purchase'
import { useQueryClient } from '@tanstack/react-query'

export default function NavHeader() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { profile, isAuthenticated, setIsAuthenticated, setProfile } = useContext(AppContext)
  const handleLogout = () => {
    queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    setIsAuthenticated(false)
    clearLocalStorage()
    setProfile(null)
    navigate(path.home)
  }
  return (
    <div className='flex justify-end'>
      <Popover
        renderPopover={
          <div className='bg-white relative  rounded-sm border border-gray-200 shadow-md'>
            <div className='flex flex-col py-2 px-2 pr-28'>
              <div className=' py-2 px-3 hover:text-orange'>Tiếng Việt</div>
              <div className=' py-2 px-3 hover:text-orange'>English</div>
            </div>
          </div>
        }
        children={
          <div className='flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5 '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5 '
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </div>
        }
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
      ></Popover>
      <Popover
        authentication={isAuthenticated}
        className='flex items-center py-1  cursor-pointer ml-6 mr-1 -translate-y-1'
        children={
          <div>
            {isAuthenticated && (
              <div className='flex items-center py-1 cursor-pointer ml-6'>
                <div className='w-6 h-6 mr-2 flex-shrink-0'>
                  <img
                    src={
                      profile?.picture !== undefined
                        ? profile?.picture
                        : 'https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                    }
                    alt=''
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div className='text-white hover:text-gray-300 text-sm'>
                  {profile?.name == null ? profile?.email : profile?.name}
                </div>
              </div>
            )}
            {!isAuthenticated && (
              <div className='flex items-center py-1 cursor-pointer ml-6'>
                <Link className='text-sm' to={path.register}>
                  Đăng Ký
                </Link>
                <p className='mx-1 '>|</p>
                <Link className='text-sm' to={path.login}>
                  Đăng Nhập
                </Link>
              </div>
            )}
          </div>
        }
        renderPopover={
          <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
            <div className='flex flex-col py-2 '>
              <Link to={path.profile} className='py-2 px-3 hover:text-[#40E0D0] hover:bg-gray-100'>
                Tài khoản của tôi
              </Link>
              <Link to={path.home} className='py-2 px-3 hover:text-[#40E0D0] hover:bg-gray-100'>
                Đơn mua
              </Link>
              <button onClick={handleLogout} className='text-start py-2 px-3 hover:text-[#40E0D0] hover:bg-gray-100'>
                Đăng xuất
              </button>
            </div>
          </div>
        }
      ></Popover>
    </div>
  )
}
