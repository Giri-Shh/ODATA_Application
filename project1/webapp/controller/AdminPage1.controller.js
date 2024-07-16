sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("uiapp.project1.controller.AdminPage1", {
            onInit: function () {
                window.history.pushState(null, document.title, window.location.href);    
   window.addEventListener('popstate', function (event) {      
        window.history.pushState(null, document.title, window.location.href);
 
            })
            },
            onPress1:function(){
                debugger
                var tile1=this.getView().byId("tile1")
                var x=tile1.getProperty("header")
                console.log(x);
                this.getOwnerComponent().getRouter().navTo("AdminPage2",{y:x})
                // var requestModel=this.getView().getModel("overView")
                // var uiLength=requestModel.oData.UI5.length
                // var adminNotifyId=sap.ui.getCore().byId('adminNotify')
                
                // adminNotifyId.setProperty("value", uiLength)
                
            },
            onPress2:function(){
                debugger
                var tile1=this.getView().byId("tile2")
                var x=tile1.getProperty("header")
                console.log(x);
                this.getOwnerComponent().getRouter().navTo("AdminPage2",{y:x})
                var requestModel=this.getView().getModel("overView")
                var uiLength=requestModel.oData.UI5.length
                var abapLength=requestModel.oData.ABAP.length
                var salesLength=requestModel.oData.SALESFORCE.length
                var hybLength=requestModel.oData.HYBRIS.length
                var adminNotifyId=sap.ui.getCore().byId('adminNotify')
                
                adminNotifyId.setProperty("value", uiLength)
                // if(deptName=='UI5'){
                // }else if(deptName=='ABAP'){
                //     adminNotifyId.setProperty("value", abapLength)
                // }else if(deptName=='SALESFORCE'){
                //     adminNotifyId.setProperty("value", salesLength)
                // }else if(deptName=='HYBRIS'){
                //     adminNotifyId.setProperty("value", hybLength)
                // }
            },
            onPress3:function(){
                debugger
                // var tile1=this.getView().byId("tile3")
                // var x=tile1.getProperty("header")
                // console.log(x);
                this.getOwnerComponent().getRouter().navTo("AdminPage2",{y:"SLF"})
                var requestModel=this.getView().getModel("overView")
                var uiLength=requestModel.oData.UI5.length
                var abapLength=requestModel.oData.ABAP.length
                var salesLength=requestModel.oData.SALESFORCE.length
                var hybLength=requestModel.oData.HYBRIS.length
                var adminNotifyId=sap.ui.getCore().byId('adminNotify')
                
                adminNotifyId.setProperty("value", uiLength)
                // if(deptName=='UI5'){
                // }else if(deptName=='ABAP'){
                //     adminNotifyId.setProperty("value", abapLength)
                // }else if(deptName=='SALESFORCE'){
                //     adminNotifyId.setProperty("value", salesLength)
                // }else if(deptName=='HYBRIS'){
                //     adminNotifyId.setProperty("value", hybLength)
                // }
            },
            onPress4:function(){
                debugger
                var tile1=this.getView().byId("tile4")
                var x=tile1.getProperty("header")
                console.log(x);
                this.getOwnerComponent().getRouter().navTo("AdminPage2",{y:"HYB"})


                var requestModel=this.getView().getModel("overView")
                var uiLength=requestModel.oData.UI5.length
                var abapLength=requestModel.oData.ABAP.length
                var salesLength=requestModel.oData.SALESFORCE.length
                var hybLength=requestModel.oData.HYBRIS.length
                var adminNotifyId=sap.ui.getCore().byId('adminNotify')
                
                adminNotifyId.setProperty("value", uiLength)
                // if(deptName=='UI5'){
                // }else if(deptName=='ABAP'){
                //     adminNotifyId.setProperty("value", abapLength)
                // }else if(deptName=='SALESFORCE'){
                //     adminNotifyId.setProperty("value", salesLength)
                // }else if(deptName=='HYBRIS'){
                //     adminNotifyId.setProperty("value", hybLength)
                // }
            },
            adminLogout1:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo("RouteLogin")
            },
            onPressAP1Over:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo('overView2')
            }

        });
    });
