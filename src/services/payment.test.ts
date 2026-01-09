import { describe, it, expect, vi,beforeEach } from "vitest";
import { PaymentService } from "./payment.service";
import {PaymentMethod} from '../models/payment.model';

const DATA_ORDER_DEFAULT = {
    id: 'order-1',
    totalPrice: 100,
    items: [
        {
        id: 'item-1',
        productId: 'p1',
        price: 100,
        quantity: 1
        }
    ],
    paymentMethod: PaymentMethod.AUPAY,
}

describe("PaymentService.buildPaymentMethod" , () => {
        
    const paymentService = new PaymentService
    it("removes PAYPAY and AUPAY when totalPrice > 500000" , () => {
        const data = 500_001
    
        expect(paymentService.buildPaymentMethod(data)).toBe(`${PaymentMethod.CREDIT}`)
    })

    it("removes AUPAY when totalPrice > 300_000", () => {
        const data = 300_001

        expect(paymentService.buildPaymentMethod(data)).toBe(`${PaymentMethod.CREDIT},${PaymentMethod.PAYPAY}`)
    })

    it("returns all payment methods when totalPrice is small",() => {
        const data = 300_000

        expect(paymentService.buildPaymentMethod(data)).toBe(`${PaymentMethod.CREDIT},${PaymentMethod.PAYPAY},${PaymentMethod.AUPAY}`)
    })
}) 

describe("PaymentService.payViaLink", () => {
    const paymentService = new PaymentService
    const orderIdMock = 'order-123'

    beforeEach(() => {
      vi.spyOn(window, 'open').mockImplementation(() => null)
    })

    it('opens payment link in new tab with correct orderId', async () => {
      const order = {
        id: orderIdMock,
      } as any
  
      await paymentService.payViaLink(order)
  
      expect(window.open).toHaveBeenCalledWith(
        `https://payment.example.com/pay?orderId=${orderIdMock}`,
        '_blank'
      )
    })
})

// describe('payViaLink', () => {
//     beforeEach(() => {
//       vi.spyOn(window, 'open').mockImplementation(() => null)
//     })
  
//     it('opens payment link in new tab with correct orderId', async () => {
//       const order = {
//         id: 'order-123',
//       } as any
  
//       await service.payViaLink(order)
  
//       expect(window.open).toHaveBeenCalledWith(
//         'https://payment.example.com/pay?orderId=order-123',
//         '_blank'
//       )
//     })
//   })