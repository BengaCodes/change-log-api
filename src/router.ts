import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products'
import { deleteUpdate, getOneUpdate, getUpdates, updateUpdate, createUpdate } from './handlers/update'
import { handleInputErrors } from './modules/middleware'
const router = Router()

const validateUpdates = [body('title').exists().isString(), body('body').exists().isString(), body('productID').exists().isString()]
const validateUpdatesPut = [body('title').optional(), body('body').optional(), body('status').optional(), body('version').optional(), body('asset').optional(), body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'])]

const runUpdatesValidation = (arr) => {
  arr.forEach(fn => fn())
}


// Product
router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.put('/products/:id', body('name').isString(), handleInputErrors, updateProduct)
router.delete('/products/:id', deleteProduct)
router.post('/products', body('name').isString().isLength({ min: 4 }), handleInputErrors, createProduct)

// Updates
router.get('/updates', () => getUpdates)
router.get('/updates/:id', getOneUpdate)
router.put('/updates/:id', () => runUpdatesValidation(validateUpdatesPut), updateUpdate)
router.delete('/updates/:id', deleteUpdate)
router.post('/updates', () => runUpdatesValidation(validateUpdates), createUpdate)

// Update Points
router.get('/updatepoints', () => {})
router.get('/updatepoints/:id', () => {})
router.put('/updatepoints/:id', body('name').optional().isString(), body('description').optional().isString(), () => {})
router.delete('/updatepoints/:id', () => {})
router.post('/updatepoints', body('name').exists().isString(), body('description').exists().isString(), () => {})

// router.use((err, req, res, next) => {

// })

export default router