module.exports = {

    protocol: "http://",
    url: "192.168.43.123/suprsales_api/",
    getCustomers: "Customer/getCustomerByEmpIdMob.php?",
    getRegion: "Region",
    getState: "State",
    getDistrict: "Area/getArea.php?",
    createFarmer: "Customer/create-farmer-mob.php",
    createDistributor: "Customer/create-distributor-mob.php",
    createRetails: "Customer/create-retailer-mob.php",

    empLogin: "Employee/loginMob.php",  //post
    getClaims: "Claim/getClaimByLimit.php?",
    getClaimCycle: "Claim/getClaimCycle.php?",
    zeroClaim: "Claim/markNoClaimMob.php?",
    deleteClaim: "Claim/deleteClaimMob.php?",
    createClaim: "Claim/createClaimMob.php?",
    getClaimsLevel: "Level/getEmployeeLevelExpRatesMob.php?",
    getGlobalSettings: "Level/getGlobalSettingMob.php",


    getPlants: "Plant/getPlantMob.php",
    getStocks: "Stock/getStockMob.php",
    getRole: "Auth_Reference/getAuthMob.php",

    createOrder: "Order/createOrder.php?",
    getOrders: "Order/getOrderByEmpMob.php?",


    createTicket: "Ticket/createTicket.php?",
    getTickets: "Ticket/getTicketMob.php?",
    getComponents: "Ticket/getComponentMob.php",
    getPriorityList: "Ticket/getTicketPriorityMob.php",


    getTeam: "Contacts/contactsMob.php?",
    getOffers: "Announcement/create_announcement/getAnnouncementMob.php?",
    dashboard: "Dashboard/todaySalesMob.php?",
    quarterSale: "Dashboard/quarterSalesChartMob.php?",
    monthSale: "Dashboard/currentMonthSalesMob.php?",
    chart: "Dashboard/sixMonthSalesChartMob.php?",



    changeDetails: "Employee/updateEmpMob.php?",
    changePassword: "Employee/resetPasswordMob.php?",



    getEmployee: "Employee/getReportingEmpMob.php?",
    createTask: "Task/createTaskMob.php?",
    createActivity: "Task/createActivityMob.php?",
    deleteTask: "Task/deleteTaskMob.php?",
    deleteActivity: "Task/deleteActivityMob.php?",
    getTask: "Task/getTaskByEmpMob.php?",
    taskDetail: "Task/getTaskDetailMob.php?",
    updateActivity: "Task/updateActivityMob.php?",
    updaetTask: "Task/updateTaskMob.php?",
    taskAttachment: "Task/uploadTaskAttachmentMob.php?",



}