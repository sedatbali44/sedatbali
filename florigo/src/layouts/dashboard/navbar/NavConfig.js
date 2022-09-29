import i18n from 'locales/i18n';
import { PATH_MAIN, PATH_MANAGE, PATH_ADMIN, PATH_FLORISTS } from 'routes/paths';
// components

// ----------------------------------------------------------------------

import Iconify from 'components/Iconify';

const getIcon = (name) => <Iconify icon={name} />;

const ICONS = {
  orders: getIcon('bi:bag-dash'),
  search: getIcon('bi:search'),
  transactions: getIcon('icon-park-outline:exchange-three'),
  console: getIcon('carbon:data-table-reference'),
  audits: getIcon('carbon:cloud-auditing'),
  report: getIcon('carbon:report-data'),
  analytics: getIcon('carbon:analytics-reference'),
  florist: getIcon('ph:flower-lotus-light'),
  logs: getIcon('carbon:flow-logs-vpc'),
  group: getIcon('akar-icons:people-group'),
  department: getIcon('carbon:group-access'),
  florists: getIcon('icon-park-outline:geometric-flowers'),
  contacts: getIcon('fluent:contact-card-28-regular'),
  teams: getIcon('fluent:people-team-toolbox-24-regular'),
  access: getIcon('bi:shield-lock'),
  settings: getIcon('simple-line-icons:settings'),
  role: getIcon('carbon:user-role'),
  products: getIcon('ic:round-production-quantity-limits'),
  discount: getIcon('emojione-monotone:money-bag'),
  offdays: getIcon('fontisto:date'),
  daily_reports: getIcon('ph:files-duotone'),
  occasions: getIcon('carbon:license-third-party-draft'),
};

const getTranslate = (key) => i18n.t(`sidebar.${key}`);

const navConfig = [
  {
    subheader: getTranslate('dashboard'),
    items: [
      {
        title: getTranslate('today_orders'),
        path: PATH_MAIN.today_orders,
        icon: ICONS.orders,
        permission: 'ORDER_SEARCH',
      },
      {
        title: getTranslate('daily_reports'),
        path: PATH_MAIN.daily_reports,
        icon: ICONS.daily_reports,
        permission: 'ORDER_SEARCH',
      },
      {
        title: getTranslate('archived_orders'),
        path: PATH_MAIN.archived_orders,
        icon: ICONS.search,
        permission: 'ARCHIVED_SEARCH',
      },
      { title: getTranslate('transactions'), path: PATH_MAIN.transactions, icon: ICONS.transactions, permission: '' },
      // {
      //   title: getTranslate('order_consolidations'),
      //   path: PATH_MAIN.order_consolidations,
      //   icon: ICONS.console,
      //   permission: 'CONSOLIDATION_SEARCH',
      // },
      {
        title: getTranslate('order_audits'),
        path: PATH_MAIN.order_audits,
        icon: ICONS.audits,
        permission: 'AUDITS_SEARCH',
      },
      {
        title: getTranslate('vendor_reports'),
        path: PATH_MAIN.vendor_reports,
        icon: ICONS.report,
        permission: 'VENDOR_SEARCH',
      },
    ],
  },
  {
    subheader: getTranslate('admin'),
    items: [
      {
        title: getTranslate('reports'),
        path: PATH_ADMIN.bank_reports,
        icon: ICONS.analytics,
        permission: 'REPORTS_SEARCH',
        children: [
          { title: getTranslate('bank_reports'), path: PATH_ADMIN.bank_reports, permission: 'REPORTS_BANK_REPORTS' },
          {
            title: getTranslate('ccard_reports'),
            path: PATH_ADMIN.ccard_reports,
            permission: 'REPORTS_CARD_REPORTS',
          },
          {
            title: getTranslate('refund_reports'),
            path: PATH_ADMIN.refund_reports,
            permission: 'REPORTS_REFUND_REPORTS',
          },
          {
            title: getTranslate('sales_by_states'),
            path: PATH_ADMIN.sales_by_states,
            permission: 'REPORTS_SALES_BY_STATES_REPORTS',
          },
          {
            title: getTranslate('sales_agent_reports'),
            path: PATH_ADMIN.sales_agent_reports,
            permission: 'REPORTS_SALES_AGENT_REPORTS',
          },
          {
            title: getTranslate('occasion_reports'),
            path: PATH_ADMIN.occasion_reports,
            permission: 'REPORTS_OCCASION_REPORTS',
          },
          {
            title: getTranslate('recurring_reports'),
            path: PATH_ADMIN.recurring_reports,
            permission: 'REPORTS_RECURRING_REPORTS',
          },
        ],
      },
    ],
  },
  {
    subheader: getTranslate('florist_manage'),
    items: [
      {
        title: getTranslate('florists'),
        path: PATH_FLORISTS.florists,
        icon: ICONS.florist,
        permission: 'FLORIST_SEARCH',
        children: [
          {
            title: getTranslate('florists_manage'),
            path: PATH_FLORISTS.florists_manage,
            permission: 'FLORIST_LIST',
          },
          {
            title: getTranslate('florists_create'),
            path: PATH_FLORISTS.florists_create,
            permission: 'FLORIST_CREATE',
          },
        ],
      },
    ],
  },
  {
    subheader: getTranslate('transactions'),
    items: [
      {
        title: getTranslate('transactions_logs'),
        path: PATH_MANAGE.transactions_logs,
        icon: ICONS.logs,
        permission: 'TRANSACTION_SEARCH',
        children: [
          {
            title: getTranslate('crm_database_logs'),
            path: PATH_MANAGE.crm_database_logs,
            permission: 'DATABASE_SEARCH',
          },
          {
            title: getTranslate('payment_logs'),
            path: PATH_MANAGE.payment_logs,
            permission: 'PAYMENT_SEARCH',
          },
          {
            title: getTranslate('cardtransactions'),
            path: PATH_MANAGE.card_transactions,
            permission: 'CARD_SEARCH',
          },
        ],
      },
    ],
  },
  {
    subheader: getTranslate('management'),
    items: [
      {
        title: getTranslate('employees'),
        path: PATH_MANAGE.employees,
        icon: ICONS.group,
        permission: 'EMPLOYEE_SEARCH',
        children: [
          {
            title: getTranslate('employee_manage'),
            path: PATH_MANAGE.employee_manage,
            permission: 'EMPLOYEE_SEARCH',
          },
          {
            title: getTranslate('employee_create'),
            path: PATH_MANAGE.employee_create,
            permission: 'EMPLOYEE_ADD',
          },
        ],
      },
      {
        title: getTranslate('Occasions'),
        path: PATH_MANAGE.occasions,
        icon: ICONS.occasions,
        permission: 'OCCASION_SEARCH',
        children: [
          {
            title: getTranslate('occasion_manage'),
            path: PATH_MANAGE.occasion_manage,
            permission: 'PRODUCT_SEARCH',
          },
          {
            title: getTranslate('occasion_create'),
            path: PATH_MANAGE.occasion_create,
            permission: 'OCCASION_ADD',
          },
        ],
      },
      {
        title: getTranslate('products'),
        path: PATH_MANAGE.products,
        icon: ICONS.products,
        permission: 'PRODUCT_SEARCH',
        children: [
          {
            title: getTranslate('products_manage'),
            path: PATH_MANAGE.products_manage,
            permission: 'PRODUCT_SEARCH',
          },
          {
            title: getTranslate('category_manage'),
            path: PATH_MANAGE.category_manage,
            permission: 'CATEGORY_SEARCH',
          },
        ],
      },
      {
        title: getTranslate('discounts'),
        path: PATH_MANAGE.discounts,
        icon: ICONS.discount,
        permission: 'DISCOUNT_SEARCH',
        children: [
          {
            title: getTranslate('discount_manage'),
            path: PATH_MANAGE.discount_manage,
            permission: 'DISCOUNT_SEARCH',
          },
          {
            title: getTranslate('discount_create'),
            path: PATH_MANAGE.discount_create,
            permission: 'DISCOUNT_CREATE',
          },
        ],
      },
      {
        title: getTranslate('offdays'),
        path: PATH_MANAGE.offdays,
        icon: ICONS.offdays,
        permission: 'OFFDAYS_SEARCH',
        children: [
          {
            title: getTranslate('offday_manage'),
            path: PATH_MANAGE.offday_manage,
            permission: 'OFFDAYS_SEARCH',
          },
          {
            title: getTranslate('offday_create'),
            path: PATH_MANAGE.offday_create,
            permission: 'OFFDAYS_CREATE',
          },
        ],
      },
      {
        title: getTranslate('departments'),
        path: PATH_MANAGE.departments,
        icon: ICONS.department,
        permission: 'DEPARTMENT_SEARCH',
        children: [
          {
            title: getTranslate('departments_manage'),
            path: PATH_MANAGE.department_manage,
            permission: 'DEPARTMENT_SEARCH',
          },
          {
            title: getTranslate('departments_create'),
            path: PATH_MANAGE.department_create,
            permission: 'DEPARTMENT_CREATE',
          },
        ],
      },
      {
        title: getTranslate('teams'),
        path: PATH_MANAGE.teams,
        icon: ICONS.teams,
        permission: 'TEAMS_SEARCH',
        children: [
          {
            title: getTranslate('teams_manage'),
            path: PATH_MANAGE.teams_manage,
            permission: 'TEAMS_SEARCH',
          },
          {
            title: getTranslate('teams_create'),
            path: PATH_MANAGE.teams_create,
            permission: 'TEAMS_CREATE',
          },
        ],
      },
      {
        title: getTranslate('roles'),
        path: PATH_MANAGE.roles,
        icon: ICONS.role,
        permission: 'ROLES_SEARCH',
        children: [
          {
            title: getTranslate('roles_manage'),
            path: PATH_MANAGE.roles_manage,
            permission: '',
          },
          {
            title: getTranslate('roles_create'),
            path: PATH_MANAGE.roles_create,
            permission: '',
          },
        ],
      },
      {
        title: getTranslate('florists_types'),
        path: PATH_MANAGE.florists_types,
        icon: ICONS.florists,
        permission: '',
        children: [
          {
            title: getTranslate('florists_types_manage'),
            path: PATH_MANAGE.florists_types_manage,
            permission: '',
          },
          {
            title: getTranslate('florists_types_create'),
            path: PATH_MANAGE.florists_types_create,
            permission: '',
          },
        ],
      },
      {
        title: getTranslate('contacts'),
        path: PATH_MANAGE.contacts,
        icon: ICONS.contacts,
        permission: '',
        children: [
          {
            title: getTranslate('contacts_manage'),
            path: PATH_MANAGE.contacts_manage,
            permission: '',
          },
          {
            title: getTranslate('contacts_create'),
            path: PATH_MANAGE.contacts_create,
            permission: '',
          },
          {
            title: getTranslate('contacts_type_manage'),
            path: PATH_MANAGE.contacts_type_manage,
            permission: '',
          },
          {
            title: getTranslate('contacts_type_create'),
            path: PATH_MANAGE.contacts_type_create,
            permission: '',
          },
        ],
      },
      {
        title: getTranslate('permissions'),
        path: PATH_MANAGE.permissions,
        icon: ICONS.access,
        permission: 'PERMISSION_SEARCH',
      },
    ],
  },
  // {
  //   subheader: 'EXAMPLES',
  //   items: [
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
  //       ],
  //     },
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
  //       ],
  //     },

  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },
];

export default navConfig;
