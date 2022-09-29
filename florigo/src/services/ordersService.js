import axios from 'utils/axios';

class TeamsService {
  getOrderById = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/orders/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  leaveInOrder = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/orders/clearSocket/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  setOrderMessage = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/orderMessage`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  setOrderUpdate = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/orders/set_status`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  setOrderTag = (orderId, status) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/orders/${orderId}/orderTag?orderTag=${status}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  setOrderTagWithReason = (orderId, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/orders/${orderId}/updateOrderTagWithReason`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateOrderRecipient = (deliveryId, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/deliveries/${deliveryId}`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateOrderFullfill = (detailId, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/orders/detail/${detailId}/fullfill`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  setOrderClaimed = (orderId, id) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/orders/claimedEmployee?employeeId=${id}&orderId=${orderId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getOrderLogs = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/orders/${id}/logs`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateSocketClean = (id, orderId) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/orders/orderLockOpen`, { id, orderId })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateOrderDeliveryDate = (deliveryId, deliveryDate) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/orders/updateOrderDeliveryDate`, {
          deliveryDate,
          deliveryId,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new TeamsService();

export default instance;
