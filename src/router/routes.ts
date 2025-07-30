import { RouteRecordRaw } from 'vue-router'
import auth from 'src/middlewares/auth.middleware'
import * as Meta from 'src/common/constants/meta.constant'

const routes: RouteRecordRaw[] = [
  {
    path: '/authentication',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/authentication/LoginPage.vue'),
        name: 'authentication',
        meta: {},
      },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { middlewares: [auth], title: '' },
      },
      {
        path: '/dashboard',
        children: [
          {
            path: '',
            component: () => import('pages/DashboardPage.vue'),
            name: 'dashboard',
            meta: {
              middlewares: [auth],
              title: 'Dashboard',
              t: 'dashboard',
            },
          },
        ],
      },

      {
        path: Meta.VendorShipment.name,
        meta: {
          middlewares: [auth],
          t: 'list',
        },
        children: [
          {
            path: '',
            component: () => import('pages/vendor-shipment/ListPage.vue'),
            name: `${Meta.VendorShipment.name}-list`,
            meta: {
              middlewares: [auth],
            },
          },
          {
            path: 'form',
            component: () => import('pages/vendor-shipment/FormPage.vue'),
            name: `${Meta.VendorShipment.name}-form-create`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
          {
            path: 'form/:id',
            component: () => import('pages/vendor-shipment/FormPage.vue'),
            name: `${Meta.VendorShipment.name}-form-update`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
        ],
      },
      {
        path: Meta.TransferItem.name,
        meta: {
          middlewares: [auth],
          t: 'list',
        },
        children: [
          {
            path: '',
            component: () => import('pages/transfer-item/ListPage.vue'),
            name: `${Meta.TransferItem.name}-list`,
            meta: {
              middlewares: [auth],
            },
          },
          {
            path: 'form',
            component: () => import('pages/transfer-item/FormPage.vue'),
            name: `${Meta.TransferItem.name}-form-create`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
          {
            path: 'form/:id',
            component: () => import('pages/transfer-item/FormPage.vue'),
            name: `${Meta.TransferItem.name}-form-update`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
        ],
      },
      {
        path: Meta.ReceiveItem.name,
        meta: {
          middlewares: [auth],
          t: 'list',
        },
        children: [
          {
            path: '',
            component: () => import('pages/receive-item/ListPage.vue'),
            name: `${Meta.ReceiveItem.name}-list`,
            meta: {
              middlewares: [auth],
            },
          },
          {
            path: 'form',
            component: () => import('pages/receive-item/FormPage.vue'),
            name: `${Meta.ReceiveItem.name}-form-create`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
          {
            path: 'form/:id',
            component: () => import('pages/receive-item/FormPage.vue'),
            name: `${Meta.ReceiveItem.name}-form-update`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
        ],
      },
      {
        path: Meta.InventoryStock.name,
        meta: {
          middlewares: [auth],
          t: 'list',
        },
        children: [
          {
            path: '',
            component: () => import('pages/inventory-stock/ListPage.vue'),
            name: `${Meta.InventoryStock.name}-list`,
            meta: {
              middlewares: [auth],
            },
          },
          {
            path: 'form',
            component: () => import('pages/inventory-stock/FormPage.vue'),
            name: `${Meta.InventoryStock.name}-form-create`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
          {
            path: 'form/:id',
            component: () => import('pages/inventory-stock/FormPage.vue'),
            name: `${Meta.InventoryStock.name}-form-update`,
            meta: {
              middlewares: [auth],
              t: 'form',
            },
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
