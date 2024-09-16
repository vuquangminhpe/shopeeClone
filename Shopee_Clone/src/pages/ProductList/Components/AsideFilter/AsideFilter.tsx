/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import Button from '../../../../Components/Button'

import { Category } from '../../../../types/category.type'
import classNames from 'classnames'
import InputNumber from '../../../../Components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import RatingStars from '../../../RatingStars'
import { omit } from 'lodash'
import { queryConfig } from '../../../../hooks/useQueryConfig'

interface Props {
  categories: Category[]
  queryParamsConfig: queryConfig
}
type FormData = Pick<Schema, 'price_max' | 'price_min'>
const priceSchema = schema.pick(['price_min', 'price_max'])
const removeUndefinedFields = (obj: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== ''))
}
export default function AsideFilter({ categories, queryParamsConfig }: Props) {
  const { category } = queryParamsConfig
  const navigate = useNavigate()
  const {
    control,
    watch,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const onSubmit = handleSubmit(
    () => {},
    () => {}
  )
  const valueForm = watch()
  const handleSortPrice = () => {
    const cleanedQueryParams = removeUndefinedFields({
      ...queryParamsConfig,
      price_min: valueForm.price_min,
      price_max: valueForm.price_max
    })

    navigate({
      pathname: path.home,
      search: createSearchParams(cleanedQueryParams).toString()
    })
  }

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryParamsConfig, ['price_min', 'price_max', 'rating_filter', 'category'])
      ).toString()
    })
  }
  const handleErrorPrice = () => {
    toast.error(errors.price_min?.message)
  }
  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='size-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>{' '}
            </g>
          </g>
        </svg>{' '}
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li key={categoryItem._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryParamsConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2 font-semibold', {
                  'text-orange': isActive,
                  '': !isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7 ' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='mt-8 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <polygon
            fill='none'
            points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit={10}
          />
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />

      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameError='hidden'
                    placeholder='TỪ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />

            <div className='mx-2 mt-1 shrink-0 '>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='ĐẾN'
                    classNameError='hidden'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />
          </div>

          <Button
            onClick={() => {
              handleSortPrice()
              handleErrorPrice()
            }}
            className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange flex justify-center items-center mt-2'
          >
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />

      <div className='text-sm'>đánh giá</div>
      <RatingStars queryConfig={queryParamsConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        onClick={() => handleRemoveAll()}
        className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange flex justify-center items-center'
      >
        Xóa tất cả{' '}
      </Button>
    </div>
  )
}
