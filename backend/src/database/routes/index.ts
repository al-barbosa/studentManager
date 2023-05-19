import express from 'express';
import UserController from '../controllers/userController';
import AdminController from '../controllers/adminController';
import CategoriesController from '../controllers/catagoryController';

const router = express.Router();
const userController = new UserController();
const adminController = new AdminController();
const categoriesController = new CategoriesController();

router.get('/users', userController.getAll);
router.post('/users', userController.createNewUser);
router.get('/users/:id', userController.getUserById)
router.post('/users/:id', userController.login)

router.get('/admins', adminController.getAll);
router.get('/admins/:id', adminController.getAdminById)
router.post('/admins/:id', adminController.login)

router.get('/categories', categoriesController.getAll);


export default router;
