import { purchaseStatus } from '../constants/purchase'
import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'
const URL = 'purchases'
const purchaseApi = {
  AddToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body),
  getPurchases: (params: { status: PurchaseListStatus }) =>
    http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    }),
  buyProducts: (body: { product_id: string; buy_count: number }[]) =>
    http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body),
  updatePurchase: (body: { product_id: string; buy_count: number; status?: number }) =>
    http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body),
  deletePurchase: (purchaseID: string[]) =>
    http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseID
    })
}

export default purchaseApi
