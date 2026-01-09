import { describe, it, expect, vi } from "vitest";

import {OrderService} from './order.service';
import {PaymentService} from './payment.service';
import { Order } from '../models/order.model';
import {PaymentMethod} from '../models/payment.model';

type PartialUndefined<T> = { [K in keyof T]?: T[K] };

const generateOrderData = (data?: PartialUndefined<Order>) => {
    return {
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
        couponId:'1',
        ...data
    }
}

describe("OrrderService.process" , () => {
    const paymentMethod = new PaymentService()
    const service = new OrderService(paymentMethod);
    
    it("throws error when order has no items", async () => {
        const data = generateOrderData({
            items: [],
        });
        
        await expect(service.process(data))
            .rejects
            .toThrow("Order items are required");
    });

    it("throws error when has item price <= 0" , async () => {
        const data = generateOrderData({
            items: [
                {
                    id: 'item-1',
                    productId: 'p1',
                    price: 0,
                    quantity: 1,
                }
            ]
        })

        await expect(service.process(data))
            .rejects
            .toThrow('Order items are invalid')
    })

    it("throws error when has item quality <= 0" , async () => {
        const data = generateOrderData({
            items: [
                {
                    id: 'item-1',
                    productId: 'p1',
                    price: 100,
                    quantity: 0,
                }
            ]
        })

        await expect(service.process(data))
            .rejects
            .toThrow('Order items are invalid')
    })

    it("throws error when coupon invalid", async () => {
        const data = generateOrderData({
            couponId: '999',
        })

        await expect(service.process(data))
        .rejects.toThrow('Invalid coupon')
    })

    it("calls paymentService when order is valid", async () => {
        const buildSpy = vi
          .spyOn(paymentMethod, 'buildPaymentMethod')
          .mockReturnValue(`${PaymentMethod.CREDIT},${PaymentMethod.PAYPAY}`);
      
        const payLinkSpy = vi
          .spyOn(paymentMethod, 'payViaLink')
          .mockResolvedValue(undefined);
      
        const data = generateOrderData();
      
        await service.process(data);
      
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(payLinkSpy).toHaveBeenCalledTimes(1);
    });

    it('processes valid order successfully', async () => {
        const data = generateOrderData({
          items: [
            { id:'', productId:'', price: 100, quantity: 2 },
            { id:'', productId:'', price: 50, quantity: 1 },
          ],
        })
      
        await expect(service.process(data)).resolves.not.toThrow()
    })
})