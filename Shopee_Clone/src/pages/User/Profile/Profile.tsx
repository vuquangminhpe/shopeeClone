import { useContext, useEffect } from 'react'
import Input from '../../../Components/Input'
import { AppContext } from '../../../Contexts/app.context'
import Button from '../../../Components/Button'
import { useQuery } from '@tanstack/react-query'
import userApi from '../../../api/user.api'
import { userSchema, UserSchema } from '../../../utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
export default function Profile() {
  const { profile } = useContext(AppContext)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: profile?.name || '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: userProfileData } = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getProfile
  })
  const profileData = userProfileData?.data.data
  console.log(profileData)
  useEffect(() => {
    if (profileData) {
      setValue('name', profileData?.name)
      setValue('phone', profileData?.phone)
      setValue('address', profileData?.address)
      setValue('avatar', profileData?.avatar)
      setValue('date_of_birth', profileData?.date_of_birth ? new Date(profileData.date_of_birth) : new Date())
    }
  }, [profileData, setValue])
  return (
    <div className='rounded-sm bg-white md:px-7 px-2 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'> Hồ sơ của tôi</h1>
        <div className='mt-1 tex-sm text-gray-700'>Quản lí thông tin hồ sơ bảo mật tải khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0 '>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>
                {profile?.email !== null ? profile?.email : 'bạn đang sử dụng đăng nhập bằng facebook'}
              </div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='name'
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={field.onChange}
                    register={register}
                    errorMessage={errors.name?.message}
                    classNameInput='w-full rounded-sm border border-x-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={field.onChange}
                    register={register}
                    errorMessage={errors.phone?.message}
                    classNameInput='w-full rounded-sm border border-x-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='address'
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={field.onChange}
                    register={register}
                    errorMessage={errors.address?.message}
                    classNameInput='w-full rounded-sm border border-x-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
            <div className='w-[80%] pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='w-[80%] pl-5'>
              <Button className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-1'>
          <div className='flex flex-col items-center'>
            <div className='my-2 size-24'>
              <img
                src={
                  profile?.picture !== undefined
                    ? profile?.picture
                    : 'https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                }
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' name='' className='hidden' id='' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng: .JEPG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
