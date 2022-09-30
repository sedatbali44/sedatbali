import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
// import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    // manage Routes
    {
      path: 'management',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'transactions_logs'} replace />, index: true },
        {
          path: 'profile',
          element: <Profile></Profile>,
        },
        {
          path: 'transactions_logs',
          children: [
            { path: 'crm_database_logs', element: <CrmDatabaseLogs /> },
            { path: 'payment_logs', element: <PaymentLogs /> },
            { path: 'card_transactions', element: <CardTransactions /> },
          ],
        },
        {
          path: 'employees',
          element: <Employees />,
          children: [
            { element: <Navigate to="/management/employees/employee_manage" replace />, index: true },
            { path: 'employee_manage', element: <EmployeesManage /> },
            { path: 'employee_create', element: <EmployeesCreate /> },
            { path: 'employee_update', element: <EmployeesUpdate /> },
          ],
        },
        {
          path: 'occasions',
          element: <Occasion />,
          children: [
            { element: <Navigate to="/management/occasions/occasion_manage" replace />, index: true },
            { path: 'occasion_manage', element: <OccasionManage /> },
            { path: 'occasion_create', element: <OccasionCreate /> },
            { path: 'occasion_update', element: <OccasionUpdate /> },
          ],
        },
        {
          path: 'products',

          element: <Products />,
          children: [
            { element: <Navigate to="/management/products/products_manage" replace />, index: true },
            { path: 'products_manage', element: <ProductsManage /> },
            { path: 'products_create', element: <ProductCreate /> },
            { path: 'products_update', element: <ProductUpdate /> },
            { path: 'category_manage', element: <CategoryManage /> },
          ],
        },
        {
          path: 'discounts',

          element: <Discounts />,
          children: [
            { element: <Navigate to="/management/discounts/discount_manage" replace />, index: true },
            { path: 'discount_manage', element: <DiscountsManage /> },
            { path: 'discount_create', element: <DiscountsCreate /> },
            { path: 'discount_update', element: <DiscountsUpdate /> },
          ],
        },
        {
          path: 'offdays',

          element: <OffDays />,
          children: [
            { element: <Navigate to="/management/offdays/offday_manage" replace />, index: true },
            { path: 'offday_manage', element: <OffDaysManage /> },
            { path: 'offday_create', element: <OffDaysCreate /> },
          ],
        },
        {
          path: 'departments',

          element: <Department />,
          children: [
            { element: <Navigate to="/management/departments/departments_manage" replace />, index: true },
            { path: 'departments_manage', element: <DepartmentManage /> },
            { path: 'departments_create', element: <DepartmentCreate /> },
            { path: 'departments_update', element: <DepartmentUpdate /> },
          ],
        },
        {
          path: 'teams',
          element: <Teams />,
          children: [
            { element: <Navigate to="/management/teams/teams_manage" replace />, index: true },
            { path: 'teams_manage', element: <TeamsManage /> },
            { path: 'teams_create', element: <TeamsCreate /> },
            { path: 'teams_update', element: <TeamsUpdate /> },
          ],
        },
        {
          path: 'roles',
          element: <Roles />,
          children: [
            { element: <Navigate to="/management/roles/roles_manage" replace />, index: true },
            { path: 'roles_manage', element: <RolesManage /> },
            { path: 'roles_create', element: <RoleCreate /> },
            { path: 'roles_update', element: <RoleUpdate /> },
          ],
        },
        {
          path: 'florists_types',
          element: <BlankPage />,
          children: [
            { path: 'florists_types_manage', element: <BlankPage /> },
            { path: 'florists_types_create', element: <BlankPage /> },
          ],
        },
        {
          path: 'contacts',
          element: <BlankPage />,
          children: [
            { path: 'contacts_manage', element: <BlankPage /> },
            { path: 'contacts_create', element: <BlankPage /> },
            { path: 'contacts_type_manage', element: <BlankPage /> },
            { path: 'contacts_type_create', element: <BlankPage /> },
          ],
        },
        {
          path: 'permissions',
          element: <Permissions />,
        },
      ],
    },

    // reports Routes
    {
      path: 'admin',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'/reports/bank_reports'} replace />, index: true },
        {
          path: 'reports',

          children: [
            { path: 'bank_reports', element: <BankReports /> },
            { path: 'ccard_reports', element: <CreditCardReports /> },
            { path: 'refund_reports', element: <RefundReports /> },
            { path: 'occasion_reports', element: <OccasionReports /> },
            { path: 'sales_by_states', element: <SalesByStates /> },
            { path: 'sales_agent_reports', element: <SalesAgentReports /> },
            { path: 'recurring_reports', element: <RecurringReports /> },
          ],
        },
      ],
    },
    // reports Routes
    {
      path: 'florists',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'/florists/florists_manage'} replace />, index: true },
        {
          path: 'florists',
          children: [
            { path: 'florists_manage', element: <FloristsManage /> },
            { path: 'florists_create', element: <FloristCreate /> },
            { path: 'florists_update', element: <FloristCreate /> },
          ],
        },
      ],
    },

    // examples Routes
    {
      path: 'main',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'/main/orders'} replace />, index: true },
        {
          path: 'orders',
          element: <Orders />,
          children: [
            { element: <Navigate to={'/main/orders/order_list'} replace />, index: true },
            { path: 'order_list', element: <OrderList></OrderList> },
            { path: 'daily_reports', element: <OrderReports></OrderReports> },
            { path: 'order/:id', element: <Order></Order> },
          ],
        },
        { path: 'archived_orders', element: <AchivedOrders /> },
        { path: 'transactions', element: <BlankPage /> },
        { path: 'order_consolidations', element: <OrderConsolidations /> },
        { path: 'order_audits', element: <OrderAudits /> },
        { path: 'vendor_reports', element: <VendorReports /> },
        { path: 'daily_reports', element: <DailyReports /> },
      ],
    },
    // examples Routes
    {
      path: 'example',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'/example/dashboard'} replace />, index: true },
        { path: 'blank', element: <BlankPage /> },
        {
          path: 'e-commerce',
          children: [{ element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true }],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/example/user/profile" replace />, index: true },
            { path: 'profile', element: <Profile /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'new-post', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [{ element: <Navigate to="/dashboard/mail/all" replace />, index: true }],
        },
        {
          path: 'chat',
          children: [],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS ne bekliyorduk ne oldu :D abi bi arayayım

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// Dashboard
const Employees = Loadable(lazy(() => import('../pages/dashboard/Employees')));
const EmployeesManage = Loadable(lazy(() => import('../pages/dashboard/Employees/EmployeeManage')));
const EmployeesCreate = Loadable(lazy(() => import('../pages/dashboard/Employees/EmployeeCreate')));
const EmployeesUpdate = Loadable(lazy(() => import('../pages/dashboard/Employees/EmployeeUpdate')));

const Occasion = Loadable(lazy(() => import('../pages/dashboard/Occasions/Occasion')));
const OccasionManage = Loadable(lazy(() => import('../pages/dashboard/Occasions/OccasionManage')));
const OccasionCreate = Loadable(lazy(() => import('../pages/dashboard/Occasions/OccasionCreate')));
const OccasionUpdate = Loadable(lazy(() => import('../pages/dashboard/Occasions/OccasionUpdate')));

const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

const Permissions = Loadable(lazy(() => import('../pages/dashboard/Permissions')));

const FloristsManage = Loadable(lazy(() => import('pages/dashboard/Florists/FloristsManage')));
const FloristCreate = Loadable(lazy(() => import('pages/dashboard/Florists/FloristCreate')));

const Teams = Loadable(lazy(() => import('../pages/dashboard/Teams')));
const TeamsManage = Loadable(lazy(() => import('../pages/dashboard/Teams/TeamsManage')));
const TeamsCreate = Loadable(lazy(() => import('../pages/dashboard/Teams/TeamsCreate')));
const TeamsUpdate = Loadable(lazy(() => import('../pages/dashboard/Teams/TeamsUpdate')));

const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

const Profile = Loadable(lazy(() => import('../pages/dashboard/Profile')));

const Department = Loadable(lazy(() => import('../pages/dashboard/Departments/Departments')));
const Products = Loadable(lazy(() => import('../pages/dashboard/Products/Products')));
const ProductsManage = Loadable(lazy(() => import('../pages/dashboard/Products/ProductsManage')));
const ProductCreate = Loadable(lazy(() => import('../pages/dashboard/Products/ProductCreate')));
const ProductUpdate = Loadable(lazy(() => import('../pages/dashboard/Products/ProductUpdate')));
const CategoryManage = Loadable(lazy(() => import('../pages/dashboard/Products/CategoryManage')));

const Discounts = Loadable(lazy(() => import('../pages/dashboard/Discounts/Discounts')));
const DiscountsManage = Loadable(lazy(() => import('../pages/dashboard/Discounts/DiscountsManage')));
const DiscountsCreate = Loadable(lazy(() => import('../pages/dashboard/Discounts/DiscountsCreate')));
const DiscountsUpdate = Loadable(lazy(() => import('../pages/dashboard/Discounts/DiscountsUpdate')));

const OffDays = Loadable(lazy(() => import('../pages/dashboard/OffDays/OffDays')));
const OffDaysManage = Loadable(lazy(() => import('../pages/dashboard/OffDays/OffDaysManage')));
const OffDaysCreate = Loadable(lazy(() => import('../pages/dashboard/OffDays/OffDaysCreate')));

const DepartmentManage = Loadable(lazy(() => import('../pages/dashboard/Departments/DepartmentManage')));
const DepartmentUpdate = Loadable(lazy(() => import('../pages/dashboard/Departments/DepartmentUpdate')));
const DepartmentCreate = Loadable(lazy(() => import('../pages/dashboard/Departments/DepartmentCreate')));

const Roles = Loadable(lazy(() => import('../pages/dashboard/Roles/Roles')));
const RolesManage = Loadable(lazy(() => import('../pages/dashboard/Roles/RolesManage')));
const RoleCreate = Loadable(lazy(() => import('../pages/dashboard/Roles/RoleCreate')));
const RoleUpdate = Loadable(lazy(() => import('../pages/dashboard/Roles/RoleUpdate')));

// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

const Orders = Loadable(lazy(() => import('../pages/dashboard/Orders')));
const Order = Loadable(lazy(() => import('../pages/dashboard/Orders/Order')));
const OrderList = Loadable(lazy(() => import('../pages/dashboard/Orders/OrderList')));
const OrderReports = Loadable(lazy(() => import('../pages/dashboard/Orders/OrderReports')));

const AchivedOrders = Loadable(lazy(() => import('../pages/dashboard/ArchivedOrders')));
const OrderConsolidations = Loadable(lazy(() => import('../pages/dashboard/OrderConsolidations')));
const OrderAudits = Loadable(lazy(() => import('../pages/dashboard/OrderAudits')));
const VendorReports = Loadable(lazy(() => import('../pages/dashboard/VendorReports')));
const BankReports = Loadable(lazy(() => import('../pages/adminMenuReports/BankReports')));
const DailyReports = Loadable(lazy(() => import('../pages/dashboard/DailyReports')));
const CreditCardReports = Loadable(lazy(() => import('../pages/adminMenuReports/CreditCardReports')));
const OccasionReports = Loadable(lazy(() => import('../pages/adminMenuReports/OccasionReports')));
const RecurringReports = Loadable(lazy(() => import('../pages/adminMenuReports/RecurringReports')));
const RefundReports = Loadable(lazy(() => import('../pages/adminMenuReports/RefundReports')));
const SalesByStates = Loadable(lazy(() => import('../pages/adminMenuReports/SalesByStates')));
const SalesAgentReports = Loadable(lazy(() => import('../pages/adminMenuReports/SalesAgentReports')));
const CrmDatabaseLogs = Loadable(lazy(() => import('../pages/management/TransactionLogs/CrmDatabaseLogs')));
const PaymentLogs = Loadable(lazy(() => import('../pages/management/TransactionLogs/PaymentLogs')));
const CardTransactions = Loadable(lazy(() => import('../pages/management/TransactionLogs/CardTransactions')));
