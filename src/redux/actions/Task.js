import api from "../../utils/api";
import axios from "axios";


export const getEmp = () => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {

        dispatch({ type: "SET_MODAL", payload: { show: true } })
        console.log(getState().getTask);
        // console.log(`${api.protocol}${api.url}${api.getEmployee}id=${getState().auth.id}`);
        axios.get(`${api.protocol}${api.url}${api.getEmployee}id=${getState().auth.id}`).then((response) => {

            dispatch({ type: "SET_MODAL", payload: { show: false } })
            console.log("employee action" + response.data);
            if (response.status == 200 && response.data.length)
                dispatch({ type: "GET_TEAM", payload: response.data })

        }).catch(err => {

            dispatch({ type: "SET_MODAL", payload: { show: false } })
            reject(err)
        })

    })

}


export const setTaskVal = (data) => async (dispatch, getState) => {

    dispatch({ type: "UPDATE_NEW_TASK", payload: data })
}


export const createTask = (data) => async (dispatch, getState) => {

    return new Promise((resolve, reject) => {


        dispatch({ type: "SET_MODAL", payload: { show: true } })

        console.log( data);
        axios.post(`${api.protocol}${api.url}${api.createTask}`,
            { ...data }).then((response) => {

                dispatch({ type: "SET_MODAL", payload: { show: false } })

                console.log(response.data);
                if (response.status == 200) {
                    resolve("success")
                    console.log("success");
                    dispatch({ type: "INIT_ADD_TASK" })
                }
                // else{
                //     reject("err")


            }).catch(err => {
                console.log(err);
                reject(err)

            })


    })

};

export const deleteTask = (data) => async (dispatch, getState) => {

    return new Promise((resolve, reject) => {


        dispatch({ type: "SET_MODAL", payload: { show: true } })
        axios.get(`${api.protocol}${api.url}${api.deleteActivity}id=${data}`,
        ).then((response) => {

            dispatch({ type: "SET_MODAL", payload: { show: false } })


            if (response.status == 200 && response.data && response.data.status == true) {
                resolve("success")
                dispatch({ type: "DELETE_TASK" })
            }
            else {
                reject("err")

            }
        }).catch(err => {

            reject(err)

        })


    })

};

export const getTask = (type = 1) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {

        // dispatch({ type: "SET_MODAL", payload: { show: true } })
        // console.log(`${api.protocol}${api.url}${api.getTask}id=${getState().auth.id}`);
        axios.get(`${api.protocol}${api.url}${api.getTask}id=${getState().auth.id}`).then((response) => {
            // dispatch({ type: "SET_MODAL", payload: { show: false } })
            // console.log("task"+response.data);
            if (response.status == 200&&response.data&&response.data.length>0 ) {
                if (type == 1)
                    dispatch({ type: "GET_TASK", payload: [...response.data] })
                else
                    dispatch({ type: "EXTEND_TASK", payload: response.data })
                resolve("success")
            }
            
            else {
                reject(404)
            }
        }).catch(err => {

            if(err.response&&err.response.status==404){
                if(type==1)
                dispatch({type:"GET_TASK",payload:[]})
                else
                dispatch({type:"EXTEND_TASK",payload:[]})
             }
                         reject(err)
        })

    })

}

// export const getActivity = (type = 1) => async (dispatch, getState) => {
//     return new Promise((resolve, reject) => {

//         // dispatch({ type: "SET_MODAL", payload: { show: true } })
//         // console.log(`${api.protocol}${api.url}${api.getTask}id=${getState().auth.id}`);
//         axios.get(`${api.protocol}${api.url}${api.getTask}id=${getState().auth.id}`).then((response) => {
//             // dispatch({ type: "SET_MODAL", payload: { show: false } })
//             // console.log("task"+response.data);
//             if (response.status == 200&&response.data&&response.data.length>0 ) {
//                 if (type == 1)
//                     dispatch({ type: "GET_TASK", payload: [...response.data] })
//                 else
//                     dispatch({ type: "EXTEND_TASK", payload: response.data })
//                 resolve("success")
//             }
            
//             else {
//                 reject(404)
//             }
//         }).catch(err => {

//             if(err.response&&err.response.status==404){
//                 if(type==1)
//                 dispatch({type:"GET_TASK",payload:[]})
//                 else
//                 dispatch({type:"EXTEND_TASK",payload:[]})
//              }
//                          reject(err)
//         })

//     })

// }


export const setActivityVal = (data) => async (dispatch, getState) => {

    dispatch({ type: "UPDATE_NEW_ACTIVITY", payload: data })
}


export const createActivity = (data) => async (dispatch, getState) => {

    return new Promise((resolve, reject) => {


        dispatch({ type: "SET_MODAL", payload: { show: true } })

        // console.log("create"+data);
        axios.post(`${api.protocol}${api.url}${api.createActivity}`,
            { ...data }).then((response) => {

                dispatch({ type: "SET_MODAL", payload: { show: false } })

                console.log(response.data);
                if (response.status == 200) {
                    resolve("success")
                    dispatch({ type: "INIT_ADD_ACTIVITY" })
                }
                // else{
                //     reject("err")


            }).catch(err => {
                console.log(err);
                reject(err)

            })


    })

};
