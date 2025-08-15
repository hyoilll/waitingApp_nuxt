import type { Service } from "../types/Service"

/** お店側のスクショ */
export const serviceShopItems: Service = {
  id: 1,
  title: 'Service 1',
  contents: [
    {
      image: 'dashboard/top',
      anchor: 'top',
      type: 'jpeg',
      title: 'services.admin.card1.title',
      description: 'services.admin.card1.description',
    },
    {
      image: 'dashboard/qrcode',
      anchor: 'qrcode',
      type: 'jpeg',
      title: 'services.admin.card2.title',
      description: 'services.admin.card2.description',
    },
    {
      image: 'dashboard/waiting_5',
      anchor: 'waiting_1',
      type: 'jpeg',
      title: 'services.admin.card3.title',
      description: 'services.admin.card3.description',
    },
    {
      image: 'dashboard/waiting_2',
      anchor: 'waiting_2',
      type: 'jpeg',
      title: 'services.admin.card4.title',
      description: 'services.admin.card4.description',
    },
    {
      image: 'dashboard/waiting_3',
      anchor: 'waiting_3',
      type: 'jpeg',
      title: 'services.admin.card5.title',
      description: 'services.admin.card5.description',
      isSupportText: true,
    },
    {
      image: 'dashboard/waiting_4',
      anchor: 'waiting_4',
      type: 'jpeg',
      title: 'services.admin.card6.title',
      description: 'services.admin.card6.description',
    },
  ]
}

/** お客様側のスクショ */
export const serviceCustomerItems = {
  id: 1,
  title: 'Service 1',
  contents: [
    {
      image: 'dashboard/customer_1',
      title: 'services.customer.card1.title',
      anchor: 'customer_1',
      type: 'jpg',
      description: 'services.customer.card1.description',
      
    },
    {
      image: 'dashboard/customer_2_1',
      anchor: 'customer_2_1',
      type: 'jpg',
      title: 'services.customer.card2.title',
      description: 'services.customer.card2.description',
    },
    {
      image: 'dashboard/customer_2_2',
      anchor: 'customer_2_2',
      type: 'jpg',
      title: 'services.customer.card3.title',
      description: 'services.customer.card3.description',
    },
    {
      image: 'dashboard/customer_3',
      anchor: 'customer_3',
      type: 'jpg',
      title: 'services.customer.card4.title',
      description: 'services.customer.card4.description',
    },
  ]
}
