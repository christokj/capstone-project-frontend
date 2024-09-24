import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'

function OrdersPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (orders.length === 0) {

      axiosInstance({
        url: '/user/show-orders',
        method: 'GET'
      }).then((response) => {
        console.log(response.data.orderHistory);
        setOrders(response.data.orderHistory)
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, [orders]);
console.log(orders)
  if (!orders) {
    return ''
  }

  return (
    <>
      <div className="container mx-auto my-10">
        <h1 className="text-3xl font-bold mb-5 text-center">Order History</h1>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <div className="flex items-center space-x-1">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={order.productId.image[0]} alt={order.productName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{order.productId.title} ({order.quantity})</div>
                      </div>
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className={`badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-warning'
                        }`}
                    >
                      <h3>Shipped</h3>
                    </span>
                  </td>
                  <td>{Math.round(order.productId.price * order.quantity * 83)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      );
    </>
  )
}

export default OrdersPage