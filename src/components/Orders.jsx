import React, {useState, useEffect} from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
   const[orders, setOrders] =useState({});
   const[loading, setLoading] = useState(true);
   const[error, setError] = useState(null);

   Const fetchOrders= async()=> {
    setLoading(true);
    setError(null);

    try{
      const response = await fetch ('${BASE_URL}/Orders');
      if(!response.ok){
        throw new Error('Error fetching orders:$ {response.statusText}');
      }
      const data = await response.json();
      setOrders(data);
    }catch(err){
      ServiceWorkerRegistration(err.message);
    } finally {
      setLoading(false);
    }

    useEffect(()=>{
      fetchOrders();
    }, []);

  }

    

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        
        {/* Display loading, error, or no orders message*/}
        {loading &&<p>Loading orders...</p>}
        {errror && <p className="red">{error}</p>}
        {!loading && ! error &&orders.length ===0&&<p>No orders found</p>}

        {!loading && !error && orders.length>0&&(
          <table className="w-100">
            <thread>
              <tr>
                <th className="t1 pv2">Order ID</th>
                <th className="t1 pv2">Buyer Email</th>
                <th className="t1 pv2">Products</th>
                <th className="t1 pv2">Status</th>
              </tr>
              </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="tl pv2">{order._id}</td>
                  <td className="tl pv2">{order.buyerEmail}</td>
                  <td className="tl pv2">
                    {Array.isArray(order.products)
                      ? order.products.join(', ')
                      : 'No products'}
                  </td>
                  <td className="tl pv2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;