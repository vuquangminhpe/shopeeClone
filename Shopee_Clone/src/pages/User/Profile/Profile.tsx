import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Input from '../../../Components/Input'
import { AppContext } from '../../../Contexts/app.context'
import Button from '../../../Components/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '../../../api/user.api'
import { userSchema, UserSchema } from '../../../utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DateSelect from '../../../Components/DateSelect'
import { toast } from 'react-toastify'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from '../../../utils/utils'
import { setProfileFromLS } from '../../../utils/auth'
import { ErrorResponse } from '../../../types/utils.type'
import config from '../../../constants/config'
type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
export default function Profile() {
  const { profile, setProfile } = useContext(AppContext)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const previewImages = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const {
    handleSubmit,
    register,
    watch,
    setError,
    control,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: profile?.name || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      avatar: profile?.avatar || '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileDatas, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile, onSuccess: () => refetch() })
  const updateAvatarProfileMutation = useMutation({ mutationFn: userApi.uploadAvatar, onSuccess: () => refetch() })
  const profileData = profileDatas?.data.data
  useEffect(() => {
    setValue('name', profileData?.name)
    setValue('avatar', profileData?.avatar)
    setValue('date_of_birth', profileData?.date_of_birth ? new Date(profileData?.date_of_birth) : new Date(1990, 0, 1))
    setValue('address', profileData?.address)
    setValue('phone', profileData?.phone)
  }, [profileData, setValue])
  const avatar = watch('avatar')

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarsName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const avatarUpdate = await updateAvatarProfileMutation.mutateAsync(form)
        avatarsName = avatarUpdate.data.data
        setValue('avatar', avatarsName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarsName
      })
      setProfile(res.data.data)
      setProfileFromLS(res.data.data)
      refetch()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const handleUpLoad = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]

    if ((fileFromLocal && fileFromLocal.size >= config.maxSizeFromLocal) || !fileFromLocal?.type.includes('image'))
      toast.error(`Dung lượng file tối đa 1MB Định dạng: .JEPG, .PNG`, {
        position: 'top-center'
      })
    else setFile(fileFromLocal)
    console.log(fileFromLocal)
  }
  return (
    <div className='rounded-sm bg-white md:px-7 px-2 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'> Hồ sơ của tôi</h1>
        <div className='mt-1 tex-sm text-gray-700'>Quản lí thông tin hồ sơ bảo mật tải khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0 '>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>
                {profileData?.email !== null
                  ? profileData?.email
                  : profile?.email || 'bạn đang sử dụng đăng nhập bằng facebook'}
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
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          />

          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='w-[80%] pl-5'>
              <Button
                onClick={() =>
                  toast.success('cập nhật dữ liệu thành công', {
                    position: 'top-center'
                  })
                }
                className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-1'>
          <div className='flex flex-col items-center'>
            <div className='my-2 size-24'>
              <img
                src={previewImages || getAvatarUrl(profile?.avatar)}
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input
              type='file'
              className='hidden'
              accept='.jpg,.jpeg,.png'
              ref={fileInputRef}
              onChange={onFileChange}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(event) => ((event.target as any).value = null)}
            />
            <button
              onClick={handleUpLoad}
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
            >
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
