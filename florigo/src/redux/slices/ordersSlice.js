import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { red, green, purple, orange, blue, teal, blueGrey, deepOrange, lime } from '@mui/material/colors';
import { startOfDay, endOfDay } from '@components';

const initialState = {
  allIds: [],
  allOrders: [],
  starttime: startOfDay(new Date()).getTime(),
  endtime: endOfDay(new Date()).getTime(),
  isLoading: false,
  errorMessage: '',
  orders: [],
  activeOrder: null,
  lastorders: [],
  occasions: [
    {
      id: 1,
      title: 'Anniversary',
      options: '{"ftdCode": "ANNIVERSARY", "bloomnetCode": 7}',
      createdAt: '2022-05-29 10:16:54',
      updatedAt: '2022-05-29 10:16:54',
      color: teal,
    },
    {
      id: 2,
      title: 'Birthday',
      options: '{"ftdCode": "BIRTHDAY", "bloomnetCode": 3}',
      createdAt: '2022-05-29 10:16:54',
      updatedAt: '2022-05-29 10:16:54',
      color: deepOrange,
    },
    {
      id: 3,
      title: 'Business',
      options: '{"ftdCode": "BUSINESS", "bloomnetCode": 4}',
      createdAt: '2022-05-29 10:16:54',
      updatedAt: '2022-05-29 10:16:54',
      color: '',
    },
    {
      id: 4,
      title: 'Funeral',
      options: '{"ftdCode": "FUNERAL", "bloomnetCode": 1}',
      createdAt: '2022-05-29 10:16:54',
      updatedAt: '2022-05-29 10:16:54',
      color: red,
    },
    {
      id: 5,
      title: 'Holiday',
      options: '{"ftdCode": "HOLIDAY", "bloomnetCode": 5}',
      createdAt: '2022-05-29 10:16:54',
      updatedAt: '2022-05-29 10:16:54',
      color: lime,
    },
    {
      id: 6,
      title: 'Illness',
      options: '{"ftdCode": "GET_WELL", "bloomnetCode": 2}',
      createdAt: '2022-05-29 10:16:54',
      updatedAt: '2022-05-29 10:16:54',
      color: green,
    },
    {
      id: 7,
      title: 'Others',
      options: '{"ftdCode": "OTHER", "bloomnetCode": 8}',
      createdAt: '2022-05-29 10:16:54',
      updatedAt: '2022-05-29 10:16:54',
      color: blue,
    },
  ],
  tags: [
    {
      id: 4,
      key: 'new_order',
      title: 'New Order',
      desc: 'All orders placed on current date. It could be for same day delivery, next day, or future dated orders.',
      color: red[800],
      icon: 'jam:triangle-danger',
    },
    {
      id: 15,
      key: 'non_delivery',
      title: 'Non Delivery',
      desc: 'Orders that the customer is claiming non delivery and CS is verifying as per protocol. For CS use only.',
      color: red[300],
      icon: 'akar-icons:info',
    },
    {
      id: 3,
      key: 'pending_status',
      title: 'Pending Status',
      desc: 'Order status pending.',
      color: orange[800],
      icon: 'akar-icons:info',
    },
    {
      id: 11,
      key: 'same_week_funural',
      title: 'Same Week Funeral',
      desc: 'Funeral orders to be placed within the week',
      color: blueGrey[500],
      icon: 'akar-icons:info',
    },
    {
      id: 9,
      key: 'funeral_verification',
      title: 'Funeral Verification',
      desc: 'All funeral orders that needs BO/OVT validation.  Orders that need funeral details.',
      color: red[500],
      icon: 'akar-icons:info',
    },
    {
      id: 6,
      key: 'funeral_prio',
      title: 'Funeral Prio',
      desc: 'All funeral orders validated by BO/OVT. Orders with funeral details.',
      color: lime[500],
      icon: 'akar-icons:info',
    },
    {
      id: 5,
      key: 'non_funeral',
      title: 'Non Funeral',
      desc: 'All big non funeral orders',
      color: lime[500],
      icon: 'akar-icons:info',
    },
    {
      id: 2,
      key: 'completed',
      title: 'Completed',
      desc: 'Orders successfully placed with a florist.',
      color: green[800],
      icon: 'akar-icons:info',
    },
    {
      id: 12,
      key: 'cx_more_info',
      title: 'Customer More Info',
      desc: 'Any orders pending details from the customer',
      color: deepOrange[500],
      icon: 'akar-icons:info',
    },
    {
      id: 13,
      key: 'cx_approved',
      title: 'Customer Approved',
      desc: 'Any orders that were in the previous tab that the customer',
      color: green[500],
      icon: 'akar-icons:info',
    },
    {
      id: 1,
      key: 'order_sent',
      title: 'Order Sent',
      desc: 'Order sent need more description',
      color: purple[500],
      icon: 'akar-icons:info',
    },
    {
      id: 14,
      key: 'future_order',
      title: 'Future Order',
      desc: 'Orders with a delivery date 2+ weeks in the future.',
      color: blueGrey[500],
      icon: 'akar-icons:info',
    },
    {
      id: 10,
      key: 'holiday',
      title: 'Holiday',
      desc: 'Holiday orders like Vday, Mother’s day, Thanksgiving, etc',
      color: blueGrey[500],
      icon: 'akar-icons:info',
    },
    {
      id: 16,
      key: 'inquires',
      title: 'Inquires',
      desc: 'This tab will ONLY be used for inquiries, ask messages, questions from florists via FTD and Bloomnet.',
      color: green[500],
      icon: 'akar-icons:info',
    },
    {
      id: 22,
      key: 'chargeback',
      title: 'Chargeback',
      desc: 'Order Chargeback',
      color: blue[500],
      icon: 'akar-icons:info',
    },
    {
      id: 21,
      key: 'fraud',
      title: 'Fraud',
      desc: 'Orders we need validation from operations if its fraud.',
      color: red[900],
      icon: 'akar-icons:info',
    },

    {
      id: 7,
      key: 'fs_pending_1',
      title: 'FS Pending 1',
      desc: 'Previously que tab. House all orders worked by Kim’s team members. Orders that were worked on by agents with NDD or FDD. Waiting florist confirmation that they can take the order.',
      color: blue[500],
      icon: 'akar-icons:info',
    },
    {
      id: 8,
      key: 'fs_pending_2',
      title: 'FS Pending 2',
      desc: 'House all orders worked by Jayson’s team members. Orders that were worked on by agents with NDD or FDD. Waiting florist confirmation that they can take the order.',
      color: teal[500],
      icon: 'akar-icons:info',
    },

    {
      id: 17,
      key: 'fs_approved_1',
      title: 'FS Approved 1',
      desc: 'Need description this tab.',
      color: green[500],
      icon: 'akar-icons:info',
    },
    {
      id: 18,
      key: 'fs_approved_2',
      title: 'FS Approved 2',
      desc: 'Need tdescription this tab.',
      color: green[500],
      icon: 'akar-icons:info',
    },
    {
      id: 18,
      key: 'refund',
      title: 'Refund',
      desc: 'Service Price Refunded',
      color: red[500],
      icon: 'akar-icons:info',
    },
    {
      id: 19,
      key: 'rejection',
      title: 'Rejection',
      decs: 'Orders which need additional information like funeral visitation and time, address validation. ',
      color: red[500],
      icon: 'akar-icons:info',
    },
    {
      id: 23,
      key: 'cancelled',
      title: 'Cancelled',
      desc: 'Order cancelled',
      color: red[500],
      icon: 'akar-icons:info',
    },
  ],
  banks: [
    { title: 'TD Bank', total: 30000 },
    { title: 'TD Bank 2', total: 8000 },
    { title: 'ESQUIRE Bank', total: 8000 },
    { title: 'CHASE Bank', total: 8000 },
  ],
  vendors: [
    {
      title: 'FTD',
      total: 1892.5,
    },
    {
      title: 'BLOOMNET',
      total: 1159,
    },
    {
      title: 'LOCAL',
      total: 800,
    },
  ],
  states: [
    {
      id: 1,
      code: 'AL',
      title: 'Alabama',
      timezone: 'Central Time Zone',
    },
    {
      id: 2,
      code: 'AK',
      title: 'Alaska',
      timezone: 'Alaska Time Zone Hawaii-Aleutian Time Zone',
    },
    {
      id: 3,
      code: 'AZ',
      title: 'Arizona',
      timezone: 'Mountain Time Zone',
    },
    {
      id: 4,
      code: 'AR',
      title: 'Arkansas',
      timezone: 'Central Time Zone',
    },
    {
      id: 5,
      code: 'CA',
      title: 'California',
      timezone: 'Pacific Time Zone',
    },
    {
      id: 6,
      code: 'CO',
      title: 'Colorado',
      timezone: 'Mountain Time Zone',
    },
    {
      id: 7,
      code: 'CT',
      title: 'Connecticut',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 8,
      code: 'DE',
      title: 'Delaware',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 9,
      code: 'FL',
      title: 'Florida',
      timezone: 'Eastern Time Zone Central Time Zone',
    },
    {
      id: 10,
      code: 'GA',
      title: 'Georgia',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 11,
      code: 'HI',
      title: 'Hawaii',
      timezone: 'Hawaii-Aleutian Time Zone',
    },
    {
      id: 12,
      code: 'ID',
      title: 'Idaho',
      timezone: 'Mountain Time Zone Pacific Time Zone',
    },
    {
      id: 13,
      code: 'IL',
      title: 'Illinois',
      timezone: 'Central Time Zone',
    },
    {
      id: 14,
      code: 'IN',
      title: 'Indiana',
      timezone: 'Eastern Time Zone Central Time Zone',
    },
    {
      id: 15,
      code: 'IA',
      title: 'Iowa',
      timezone: 'Central Time Zone',
    },
    {
      id: 16,
      code: 'KS',
      title: 'Kansas',
      timezone: 'Central Time Zone Mountain Time Zone',
    },
    {
      id: 17,
      code: 'KY',
      title: 'Kentucky',
      timezone: 'Eastern Time Zone Central Time Zone',
    },
    {
      id: 18,
      code: 'LA',
      title: 'Louisiana',
      timezone: 'Central Time Zone',
    },
    {
      id: 19,
      code: 'ME',
      title: 'Maine',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 20,
      code: 'MD',
      title: 'Maryland',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 21,
      code: 'MA',
      title: 'Massachusetts',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 22,
      code: 'MI',
      title: 'Michigan',
      timezone: 'Eastern Time Zone Central Time Zone',
    },
    {
      id: 23,
      code: 'MN',
      title: 'Minnesota',
      timezone: 'Central Time Zone',
    },
    {
      id: 24,
      code: 'MS',
      title: 'Mississippi',
      timezone: 'Central Time Zone',
    },
    {
      id: 25,
      code: 'MO',
      title: 'Missouri',
      timezone: 'Central Time Zone',
    },
    {
      id: 26,
      code: 'MT',
      title: 'Montana',
      timezone: 'Mountain Time Zone',
    },
    {
      id: 27,
      code: 'NE',
      title: 'Nebraska',
      timezone: 'Central Time Zone Mountain Time Zone',
    },
    {
      id: 28,
      code: 'NV',
      title: 'Nevada',
      timezone: 'Pacific Time Zone Mountain Time Zone',
    },
    {
      id: 29,
      code: 'NH',
      title: 'New Hampshire',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 30,
      code: 'NJ',
      title: 'New Jersey',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 31,
      code: 'NM',
      title: 'New Mexico',
      timezone: 'Mountain Time Zone',
    },
    {
      id: 32,
      code: 'NY',
      title: 'New York',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 33,
      code: 'NC',
      title: 'North Carolina',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 34,
      code: 'ND',
      title: 'North Dakota',
      timezone: 'Central Time Zone Mountain Time Zone',
    },
    {
      id: 35,
      code: 'OH',
      title: 'Ohio',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 36,
      code: 'OK',
      title: 'Oklahoma',
      timezone: 'Central Time Zone',
    },
    {
      id: 37,
      code: 'OR',
      title: 'Oregon',
      timezone: 'Pacific Time Zone Mountain Time Zone',
    },
    {
      id: 38,
      code: 'PA',
      title: 'Pennsylvania',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 39,
      code: 'RI',
      title: 'Rhode Island',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 40,
      code: 'SC',
      title: 'South Carolina',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 41,
      code: 'SD',
      title: 'South Dakota',
      timezone: 'Central Time Zone Mountain Time Zone',
    },
    {
      id: 42,
      code: 'TN',
      title: 'Tennessee',
      timezone: 'Eastern Time Zone Central Time Zone',
    },
    {
      id: 43,
      code: 'TX',
      title: 'Texas',
      timezone: 'Central Time Zone Mountain Time Zone',
    },
    {
      id: 44,
      code: 'UT',
      title: 'Utah',
      timezone: 'Mountain Time Zone',
    },
    {
      id: 45,
      code: 'VT',
      title: 'Vermont',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 46,
      code: 'VA',
      title: 'Virginia',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 47,
      code: 'WA',
      title: 'Washington',
      timezone: 'Pacific Time Zone',
    },
    {
      id: 48,
      code: 'WV',
      title: 'West Virginia',
      timezone: 'Eastern Time Zone',
    },
    {
      id: 49,
      code: 'WI',
      title: 'Wisconsin',
      timezone: 'Central Time Zone',
    },
    {
      id: 50,
      code: 'WY',
      title: 'Wyoming',
      timezone: 'Mountain Time Zone',
    },
  ],
  timezones: [
    'Central Time Zone',
    'Alaska Time Zone Hawaii-Aleutian Time Zone',
    'Mountain Time Zone',
    'Pacific Time Zone',
    'Eastern Time Zone',
    'Eastern Time Zone Central Time Zone',
    'Hawaii-Aleutian Time Zone',
    'Mountain Time Zone Pacific Time Zone',
    'Central Time Zone Mountain Time Zone',
    'Pacific Time Zone Mountain Time Zone',
  ],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    setOrders: (state, action) => {
      const obj = [...action.payload];
      state.orders = [];
      state.allIds = [];
      obj.map((item) => {
        const y = { ...item };
        y.price = item.details?.total_price;
        y.recipient_list = [];
        y.delivery_date = [];
        y.delivery_date_arr = [];
        y.fullname = `${item.customer?.firstname} ${item.customer?.lastname}`;
        y.order_details.map((x) => {
          y.recipient_list.push(`${x.delivery?.firstname} ${x.delivery?.lastname}`);
          y.delivery_date_arr.push(x.delivery_date);
          y.delivery_date.push(format(new Date(x.delivery_date * 1000), 'MM-dd-yyyy'));
          return x;
        });
        state.allIds.push(y.id);
        state.orders.push(y);
        return y;
      });
    },
    setIsloading: (state, { payload }) => {
      state.isLoading = payload;
    },
    deleteOnList: (state, action) => {
      const index = state.allIds.indexOf(action.payload.id);
      if (index !== -1) {
        state.orders.splice(index, 1);
        state.allIds.splice(index, 1);
      }
    },
    updateOrderTag: (state, action) => {
      const index = state.allIds.indexOf(action.payload.id);
      if (index !== -1) {
        state.orders[index].order_tag = action.payload.tag;
      }
    },
    updateOrderSocket: (state, action) => {
      const index = state.allIds.indexOf(action.payload.id);
      if (index !== -1) {
        state.orders[index].lock_socket_id = action.payload.socket_id;
        state.orders[index].active_user = action.payload.active_user;
      }
    },
    updateOrderClaimed: (state, action) => {
      const index = state.allIds.indexOf(action.payload.id);
      state.orders[index].details = { ...state.orders[index].details, claimedBy: action.payload.claimedBy };
    },
    setStartTime(state, action) {
      state.starttime = action.payload;
    },
    setEndTime(state, action) {
      state.endtime = action.payload;
    },
    addedNewOrder(state, action) {
      // eslint-disable-next-line
      const orders = state.orders;
      if (!orders.some((item) => item.id === action.payload.id)) {
        const order = action.payload;
        order.price = order.details?.total_price;
        order.recipient_list = [];
        order.delivery_date = [];
        order.delivery_date_arr = [];
        order.fullname = `${order.customer?.firstname} ${order.customer?.lastname}`;
        order.order_details.map((x) => {
          order.recipient_list.push(`${x.delivery?.firstname} ${x.delivery?.lastname}`);
          order.delivery_date_arr.push(order.delivery_date);
          order.delivery_date.push(format(new Date(order.delivery_date * 1000), 'MM-dd-yyyy'));

          return x;
        });
        state.allIds.push(order.id);
        orders.push(order);
      }
      state.orders = orders;
    },
    setLastOrders(state, action) {
      if (state.lastorders.length < 10) {
        state.lastorders.push(action.payload);
      } else {
        state.lastorders.shift();
        state.lastorders.push(action.payload);
      }
    },
  },
});

export default orderSlice.reducer;

export const {
  setOrders,
  updateOrderTag,
  updateOrderSocket,
  setActiveOrder,
  updateOrderClaimed,
  deleteOnList,
  setStartTime,
  setEndTime,
  addedNewOrder,
  setLastOrders,
} = orderSlice.actions; // dispatch(setIsLoading())
