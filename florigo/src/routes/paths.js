// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/example';
const ROOTS_MAIN = '/main';
const ROOTS_MANAGE = '/management';
const ROOT_ADMIN = '/admin';
const ROOT_FLORIST = '/florists';

// ----------------------------------------------------------------------

export const PATH_FLORISTS = {
  root: ROOT_FLORIST,
  florists: path(ROOT_FLORIST, '/florists'),
  florists_manage: path(ROOT_FLORIST, '/florists/florists_manage'),
  florists_create: path(ROOT_FLORIST, '/florists/florists_create'),
  florists_update: path(ROOT_FLORIST, '/florists/florist_update'),
};

export const PATH_ADMIN = {
  root: ROOT_ADMIN,
  bank_reports: path(ROOT_ADMIN, '/reports/bank_reports'),
  ccard_reports: path(ROOT_ADMIN, '/reports/ccard_reports'),
  refund_reports: path(ROOT_ADMIN, '/reports/refund_reports'),
  sales_by_states: path(ROOT_ADMIN, '/reports/sales_by_states'),
  sales_agent_reports: path(ROOT_ADMIN, '/reports/sales_agent_reports'),
  occasion_reports: path(ROOT_ADMIN, '/reports/occasion_reports'),
  recurring_reports: path(ROOT_ADMIN, '/reports/recurring_reports'),
};

export const PATH_MANAGE = {
  root: ROOTS_MANAGE,
  transactions_logs: path(ROOTS_MANAGE, '/transactions_logs'),
  crm_database_logs: path(ROOTS_MANAGE, '/transactions_logs/crm_database_logs'),
  payment_logs: path(ROOTS_MANAGE, '/transactions_logs/payment_logs'),
  card_transactions: path(ROOTS_MANAGE, '/transactions_logs/card_transactions'),
  report: path(ROOTS_MANAGE, '/report'),
  employees: path(ROOTS_MANAGE, '/employees'),
  employee_manage: path(ROOTS_MANAGE, '/employees/employee_manage'),
  employee_create: path(ROOTS_MANAGE, '/employees/employee_create'), // example/user/new
  employee_update: path(ROOTS_MANAGE, '/employees/employee_update'),
  occasions: path(ROOTS_MANAGE, '/occasions'),
  occasion_manage: path(ROOTS_MANAGE, '/occasions/occasion_manage'),
  occasion_create: path(ROOTS_MANAGE, '/occasions/occasion_create'), // example/user/new
  occasion_update: path(ROOTS_MANAGE, '/occasions/occasion_update'),
  products: path(ROOTS_MANAGE, '/products'),
  products_manage: path(ROOTS_MANAGE, '/products/products_manage'),
  products_create: path(ROOTS_MANAGE, '/products/products_create'),
  products_update: path(ROOTS_MANAGE, '/products/products_update'),
  category_manage: path(ROOTS_MANAGE, '/products/category_manage'),
  discounts: path(ROOTS_MANAGE, '/discounts'),
  discount_manage: path(ROOTS_MANAGE, '/discounts/discount_manage'),
  discount_create: path(ROOTS_MANAGE, '/discounts/discount_create'),
  discount_update: path(ROOTS_MANAGE, '/discounts/discount_update'),
  offdays: path(ROOTS_MANAGE, '/offdays'),
  offday_manage: path(ROOTS_MANAGE, '/offdays/offday_manage'),
  offday_create: path(ROOTS_MANAGE, '/offdays/offday_create'),
  departments: path(ROOTS_MANAGE, '/departments'),
  department_manage: path(ROOTS_MANAGE, '/departments/departments_manage'),
  department_create: path(ROOTS_MANAGE, '/departments/departments_create'),
  department_update: path(ROOTS_MANAGE, '/departments/departments_update'),
  teams: path(ROOTS_MANAGE, '/teams'),
  teams_manage: path(ROOTS_MANAGE, '/teams/teams_manage'),
  teams_create: path(ROOTS_MANAGE, '/teams/teams_create'),
  teams_update: path(ROOTS_MANAGE, '/teams/teams_update'),
  roles: path(ROOTS_MANAGE, '/roles'),
  roles_manage: path(ROOTS_MANAGE, '/roles/roles_manage'),
  roles_create: path(ROOTS_MANAGE, '/roles/roles_create'),
  roles_update: path(ROOTS_MANAGE, '/roles/roles_update'),
  florists_types: path(ROOTS_MANAGE, '/florists_types'),
  florists_types_create: path(ROOTS_MANAGE, '/florists_types/florists_types_create'),
  florists_types_manage: path(ROOTS_MANAGE, '/florists_types/florists_types_manage'),
  contacts: path(ROOTS_MANAGE, '/contacts'),
  contacts_manage: path(ROOTS_MANAGE, '/contacts/contacts_manage'),
  contacts_create: path(ROOTS_MANAGE, '/contacts/contacts_create'),
  contacts_type_manage: path(ROOTS_MANAGE, '/contacts/contacts_type_manage'),
  contacts_type_create: path(ROOTS_MANAGE, '/contacts/contacts_type_create'),
  example_page: path(ROOTS_MANAGE, '/example/example_page'),
  permissions: path(ROOTS_MANAGE, '/permissions'),
  profile: path(ROOTS_MANAGE, '/profile'),
};

export const PATH_MAIN = {
  root: ROOTS_MAIN,
  today_orders: path(ROOTS_MAIN, '/orders'),
  daily_reports: path(ROOTS_MAIN, '/daily_reports'),
  archived_orders: path(ROOTS_MAIN, '/archived_orders'),
  transactions: path(ROOTS_MAIN, '/transactions'),
  order_consolidations: path(ROOTS_MAIN, '/order_consolidations'),
  order_audits: path(ROOTS_MAIN, '/order_audits'),
  vendor_reports: path(ROOTS_MAIN, '/vendor_reports'),
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/dashboard'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    blank: path(ROOTS_DASHBOARD, '/blank'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey'),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
