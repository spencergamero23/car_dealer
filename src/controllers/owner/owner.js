import { createVehicle, deleteVehicle } from '../../models/inventory/vehicles.js';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../models/categories/categories.js';
import { getAllUsers, updateUserRole } from '../../models/users/users.js';


const showOwnerDashboard = (req, res) => {
    res.render('owner/dashboard', { title: 'Owner Dashboard' });
};

const showAddVehicleForm = async (req, res) => {
    const categories = await getAllCategories();
    res.render('owner/vehicle-new', { title: 'Add Vehicle', categories });
};

const processAddVehicle = async (req, res) => {
    const { slug, categoryName, make, model, year, price, mileage, image, description, engine, transmission, drivetrain } = req.body;

    await createVehicle({ slug, categoryName, make, model, year, price, mileage, image, description, engine, transmission, drivetrain });

    res.redirect('/employee/vehicles');
};

const processDeleteVehicle = async (req, res) => {
    await deleteVehicle(req.params.slug);
    res.redirect('/employee/vehicles');
};

const showCategoryList = async (req, res) => {
    const categories = await getAllCategories();
    res.render('owner/categories', { title: 'Manage Categories', categories });
};

const processAddCategory = async (req, res) => {
    await createCategory(req.body.name);
    res.redirect('/owner/categories');
};

const processEditCategory = async (req, res) => {
    await updateCategory(req.params.id, req.body.name);
    res.redirect('/owner/categories');
};

const processDeleteCategory = async (req, res) => {
    await deleteCategory(req.params.id);
    res.redirect('/owner/categories');
};

const showAllUsersPage = async (req, res) => {
    const users = await getAllUsers();
    res.render('owner/users', { title: 'All Users', users });
};

const processUpdateUserRole = async (req, res) => {
    const targetUserId = parseInt(req.params.id);

    if (targetUserId === req.session.user.id) {
        return res.redirect('/owner/users');
    }

    await updateUserRole(targetUserId, req.body.role);

    res.redirect('/owner/users');
};

export {
    showOwnerDashboard,
    showAddVehicleForm, processAddVehicle, processDeleteVehicle,
    showCategoryList, processAddCategory, processEditCategory, processDeleteCategory,
    showAllUsersPage, processUpdateUserRole
};