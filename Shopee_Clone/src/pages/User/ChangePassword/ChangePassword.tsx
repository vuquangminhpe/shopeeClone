import { toast } from 'react-toastify'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema, UserSchema } from '../../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../api/user.api'
import { isAxiosUnprocessableEntityError } from '../../../utils/utils'
import { ErrorResponse } from '../../../types/utils.type'
type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const changePasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema)
  })
  const changePasswordMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => userApi.updateProfile(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data.new_password)

    changePasswordMutation.mutate(
      {
        password: data.password as string,
        new_password: data.new_password as string
      },
      {
        onSuccess: () => {
          toast(`Đổi mật khẩu thành công`)
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
            const formError = error.response?.data.data

            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof FormData, {
                  message: formError[key as keyof FormData],
                  type: 'Server'
                })
              })
            }
          }
        }
      }
    )
  })

  return (
    <div className='rounded-sm bg-white md:px-7 px-2 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'> Hồ sơ của tôi</h1>
        <div className='mt-1 tex-sm text-gray-700'>Quản lí thông tin hồ sơ bảo mật tải khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0 '>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu cũ</div>
            <div className='w-[80%] pl-5 relative'>
              <Controller
                control={control}
                name='password'
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={field.onChange}
                    register={register}
                    errorMessage={errors.password?.message}
                    classNameInput='w-full rounded-sm border border-x-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu mới</div>
            <div className='w-[80%] pl-5 relative'>
              <Controller
                control={control}
                name='new_password'
                render={({ field }) => (
                  <Input
                    type='password'
                    {...field}
                    onChange={field.onChange}
                    register={register}
                    errorMessage={errors.new_password?.message}
                    classNameInput='w-full rounded-sm border border-x-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Nhập lại mật khẩu mới</div>
            <div className='w-[80%] pl-5 relative '>
              <Controller
                control={control}
                name='confirm_password'
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={field.onChange}
                    register={register}
                    errorMessage={errors.confirm_password?.message}
                    classNameInput='w-full rounded-sm border border-x-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='w-[80%] pl-5 relative'>
              <Button className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'>
                Đổi mật khẩu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
