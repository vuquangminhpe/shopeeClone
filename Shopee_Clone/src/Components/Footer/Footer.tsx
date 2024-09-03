import icons from 'C:/Users/84979/Desktop/shopeeClone/Shopee_Clone/src/Components/imgs/dvvc.png'
import iconst from 'C:/Users/84979/Desktop/shopeeClone/Shopee_Clone/src/Components/imgs/payment.png'

export default function Footer() {
  return (
    <footer className='  py-16 bg-neutral-100'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex lg:grid-cols-3 gap-4 '>
          <div className='lg:col-span-1 '>
            <div>
              <div className='font-bold'>CHĂM SÓC KHÁCH HÀNG</div>{' '}
              <div className='opacity-50 my-3'>Trung Tâm Trợ Giúp</div>{' '}
              <div className='opacity-50 my-3'>Shopee Blog Shopee Mall</div>{' '}
              <div className='opacity-50 my-3'>Hướng Dẫn Mua Hàng</div>
              <div className='opacity-50 my-3'> Hướng Dẫn Bán Hàng</div>{' '}
              <div className='opacity-50 my-3'>Thanh Toán Shopee Xu</div>{' '}
              <div className='opacity-50 my-3'>Vận Chuyển Trả Hàng & Hoàn Tiền Chăm Sóc</div>
              <div className='opacity-50 my-3'>Khách Hàng Chính Sách Bảo Hành</div>
            </div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              <div className='font-bold'>VỀ SHOPEE</div>{' '}
              <div className='opacity-50 my-3'>Giới Thiệu Về Shopee Việt Nam</div>{' '}
              <div className='opacity-50 my-3'>Tuyển Dụng Điều Khoản Shopee</div>{' '}
              <div className='opacity-50 my-3'>Chính Sách Bảo Mật</div>{' '}
              <div className='opacity-50 my-3'>Chính Hãng Kênh Người Bán Flash Sales</div>
              <div className='opacity-50 my-3'>Chương Trình Tiếp Thị Liên Kết Shopee Liên Hệ Với Truyền Thông</div>
            </div>
          </div>
          <div className='lg:col-span-3'>
            <div>
              <div className='font-bold'>Thanh toán</div>{' '}
              <img className='w-80 h-40 object-contain mb-2' src={icons} alt='DVVC' />
              <img className='w-80 h-40 object-contain' src={iconst} alt='DVVC' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-around'>
        <div className='text-center text-sm mt-10'>© 2024 Shopee. Tất cả các quyền được bảo lưu.</div>
        <div className='text-center text-sm mt-10'>
          Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil | México |
          Colombia | Chile | Đài Loan
        </div>
      </div>
    </footer>
  )
}
