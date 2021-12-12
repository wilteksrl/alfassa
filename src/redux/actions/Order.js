import api from "../../utils/api";
import axios from "axios";


export const setCustomer = (data) => async (dispatch, getState) => {

   dispatch({ type: "SELECT_CUSTOMER", payload: data })


}
export const setRemark = (data) => async (dispatch, getState) => {

   dispatch({ type: "SELECT_REMARK", payload: data })


}

export const setPlant = (plant) => async (dispatch, getState) => {

   dispatch({ type: "SET_PLANT", payload: plant })
   dispatch({ type: "CLEAR_CART" })


}

export const getPlants = (data) => async (dispatch, getState) => {
   return new Promise((resolve, reject) => {
      console.log(`${api.protocol}${api.url}${api.getPlants}?id=${getState().auth.id}`);
      axios.get(`${api.protocol}${api.url}${api.getPlants}?id=${getState().auth.id}`).then((response) => {

         dispatch({ type: "GET_PLANTS", payload: response.data })

         resolve(response.data)

      }).catch(err => {
         if (err.response && err.response.status == 404) {
            dispatch({ type: "GET_PLANTS", payload: [] })
         }
         reject(err)
      })

   })






}





export const getOrders = (type = 1) => async (dispatch, getState) => {
   return new Promise((resolve, reject) => {


      axios.get(`${api.protocol}${api.url}${api.getOrders}id=${getState().auth.id}&limit=40&offset=${type == 1 ? 0 : getState().order.allOrders.length}`).then((response) => {


console.log("order"+response.data);
         if (type == 1)
            dispatch({ type: "GET_ORDERS", payload: response.data })
         else
            dispatch({ type: "EXTEND_ORDERS", payload: response.data })
         resolve(response.data)

      }).catch(err => {

         if (err.response && err.response.status == 404) {
            if (type == 1)
               dispatch({ type: "GET_ORDERS", payload: [] })
            else
               dispatch({ type: "EXTEND_ORDERS", payload: [] })
         }
         dispatch({ type: "SET_MODAL", payload: { show: false } })
         reject(err)
      })

   })

}



export const getProducts = (data) => async (dispatch, getState) => {
   return new Promise((resolve, reject) => {
      console.log(`${api.protocol}${api.url}${api.getStocks}?id=${getState().auth.id}`)
      axios.get(`${api.protocol}${api.url}${api.getStocks}?id=${getState().auth.id}`).then((response) => {

         //     console.log(response.data)
         dispatch({ type: "GET_STOCKS", payload: response.data })
         resolve(response.data)

      }).catch(err => {
         if (err.response && err.response.status == 404) {
            dispatch({ type: "GET_STOCKS", payload: [] })
         }
         reject(err)
      })

   })

}


export const addCartProduct = (data) => async (dispatch, getState) => {

   let products = getState().order.products

   products.push(data)

   dispatch({ type: "UPDATE_PRODUTS", payload: products })

}





export const updateCartProduct = (id, val) => async (dispatch, getState) => {

   let products = getState().order.products

   let np = products.findIndex(product => product.SKU_ID == id)
   if (val > 0)
      products[np].Qty = val
   else
      products.splice(np, 1)


   dispatch({ type: "UPDATE_PRODUTS", payload: products })

}




export const reinit = () => async (dispatch, getState) => {
   dispatch({ type: "REINITORDER" })
}


export const createOrder = () => async (dispatch, getState) => {
   return new Promise((resolve, reject) => {


      dispatch({ type: "SET_MODAL", payload: { show: true } })

      let details = getState().order

      let SKU_ID = []
      let SKU_QUANTITY = []
      let TOTAL_SKU_VALUE = []
      let total = 0

      details.products.map((product => {

         SKU_ID.push(product.SKU_ID)
         SKU_QUANTITY.push(product.Qty)
         TOTAL_SKU_VALUE.push(Number(product.Qty) * Number(product.FACTOR) * Number(product.PRICE))


      }))

      TOTAL_SKU_VALUE.map(item => {
         total = total + item
      })

// console.log(details.remarks);
      let payload = {
         // "ORDER_ID": new Date().getTime(),
         "CUSTOMER_ID": details.customer.CUSTOMER_ID,
         "CUST_TYPE_CODE": details.customer.TYPE_CODE,
         "PLANT_ID": details.plant.PLANT_ID,
         "TOTAL_ORDER_VALUE": total,
         "REMARKS": details.remarks,
         "SKU_ID": SKU_ID,
         "SKU_QUANTITY": SKU_QUANTITY,
         "TOTAL_SKU_VALUE": TOTAL_SKU_VALUE
      }


      axios.post(`${api.protocol}${api.url}${api.createOrder}id=${getState().auth.id}`, payload).then((response) => {



         dispatch({ type: "SET_MODAL", payload: { show: false } })
         dispatch({ type: "REINITORDER" })
         resolve("success")

      }).catch(err => {

         dispatch({ type: "SET_MODAL", payload: { show: false } })
         reject(err)
      })

   })
}