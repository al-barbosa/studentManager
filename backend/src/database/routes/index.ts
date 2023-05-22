import express from 'express';
import UserController from '../controllers/userController';
import AdminController from '../controllers/adminController';
import CategoriesController from '../controllers/catagoryController';
import RequestsController from '../controllers/requestController';

const router = express.Router();
const userController = new UserController();
const adminController = new AdminController();
const categoriesController = new CategoriesController();
const requestController = new RequestsController();

// Rotas de usuários
router.get('/users', userController.getAll);
router.post('/users', userController.createNewUser);
router.get('/users/:id', userController.getUserById);
router.post('/users/:id', userController.login);

// Rotas de administradores
router.get('/admins', adminController.getAll);
router.get('/admins/:id', adminController.getAdminById);
router.post('/admins/:id', adminController.login);

// Rotas de categorias
router.get('/categories', categoriesController.getAll);

// Rotas de solicitações
router.get('/requests', requestController.getAll);
router.post('/requests', requestController.createNewRequest);
router.delete('/requests/:id', requestController.deleteRequest);
router.post('/requests/:user/:cat', requestController.acceptRequest);

export default router;