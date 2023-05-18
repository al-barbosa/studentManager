import express from 'express';
import UserController from '../controllers/userController';
import AdminController from '../controllers/adminController';

const router = express.Router();
const userController = new UserController();
const adminController = new AdminController();

router.get('/users', userController.getAll);
router.get('/users/:id', userController.getUserById)
router.post('/users/:id', userController.login)

router.get('/admins', adminController.getAll);
router.get('/admins/:id', adminController.getAdminById)
router.post('/admins/:id', adminController.login)


export default router;
