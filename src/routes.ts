import { Router } from 'express';
import multer from 'multer';


import { CreateUserController } from './controllers/user/CreateUserController'

import { AuthUserController } from './controllers/user/AuthUserController'

import { DetailuserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController';

import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'

import {  ListByCategoryController  } from './controllers/product/ListByCategoryController'

import { CreateOrderController } from './controllers/order/CreateOrderController'

import { RemoveOrdercontroller } from './controllers/order/RemoveOrderController'

import { addItemcontroller} from './controllers/order/AddItemcontroller'

import {RemoveItemController} from './controllers/order/RemoveItemController'

import { SendOrderController} from './controllers/order/SendOrderController'

import {ListOrdersController} from './controllers/order/ListOrdersController'

import {DetailOrderController} from './controllers/order/DetailOrderController'

import {FinishOrderController} from './controllers/order/FinishOrderController'



import {isAuthenticaded} from './middlewares/isAuthenticaded'
import uploadConfig from './config/multer'




const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

//routes user

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticaded, new DetailuserController().handle  )

//routes category

router.post('/category', isAuthenticaded, new CreateCategoryController().handle )
router.get('/category', isAuthenticaded, new ListCategoryController().handle)


//routes product

router.post('/product', isAuthenticaded, upload.single('file'), new CreateProductController().handle )
router.get('/category/product', isAuthenticaded, new ListByCategoryController().handle)

//rotas order


router.post('/order', isAuthenticaded, new CreateOrderController().handle )
router.delete('/order', isAuthenticaded, new RemoveOrdercontroller().handle )
router.post('/order/add', isAuthenticaded, new addItemcontroller().handle)
router.delete('/order/remove', isAuthenticaded, new RemoveItemController().handle)
router.put('/order/send', isAuthenticaded, new SendOrderController().handle)
router.get('/orders', isAuthenticaded, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticaded, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticaded, new FinishOrderController().handle)



export { router };