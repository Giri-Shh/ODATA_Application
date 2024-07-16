sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";
        var deptName;
        var index;

        return Controller.extend("uiapp.project1.controller.Emp1", {
            reViewPopUp: null,
            onInit: function () {
                window.history.pushState(null, document.title, window.location.href);    
                window.addEventListener('popstate', function (event) {      
                window.history.pushState(null, document.title, window.location.href);
 
            })
                sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this.emp1, this)
            },
            new:function(){
                var that = this
            // var oModel=new sap.ui.model.json.JSONModel()
            var oModel = this.getView().getModel('empModel')
            var oModel2 = this.getView().getModel('newModel')

            var oModelData = oModel.oData
            var oModelData2 = oModel2.oData


                this.getOwnerComponent().getModel("abc").read("/ZGUI5APP1Set",{
                    method:"GET",
                    success:function (data, response) {
                        debugger
                        
                        debugger
                        oModelData.UI5.length=0
                        oModelData.ABAP.length=0
                        oModelData.SLF.length=0
                        oModelData.HYB.length=0
                        oModelData.all.length=0
                        oModelData.profile.length=0
                        oModelData.all.push(data.results)
                        
                        data.results.forEach((X)=>{
                            if(X.Department=='UI5' && X.Request=="TRUE"){
                                oModelData.UI5.push(X)
                            }else if(X.Department=='ABAP' && X.Request=="TRUE"){
                                oModelData.ABAP.push(X)
                            }else if(X.Department=='HYB' && X.Request=="TRUE"){
                                oModelData.HYB.push(X)
                            }else if(X.Department=='SLF' && X.Request=="TRUE"){
                                oModelData.SLF.push(X)
                            }
                        })
                        data.results.forEach((X)=>{
                            if(index==X.Id){
                                oModelData.profile.push(X)
                            }
                        })
                        debugger
                        var spliceData2
                        var SpliceId = oModelData.profile[0].Id
                        if (deptName == 'UI5') {
                                spliceData2=oModelData.UI5
                            } else if (deptName == 'ABAP') {
                                spliceData2=oModelData.ABAP
                            } else if (deptName == 'SLF') {
                                spliceData2=oModelData.SLF
                            } else if (deptName == 'HYB') {
                                spliceData2=oModelData.HYB
                            }
                            spliceData2.forEach((x,index)=>{
                                if(SpliceId==x.Id){
                                    debugger
                                    spliceData2.splice(index,1)
                                }
                            })



                        
                        

                        debugger
                        oModel.setData(oModelData)
                        sap.ui.getCore().setModel(oModel)
                        oModel2.setData(oModelData2)
                        sap.ui.getCore().setModel(oModel2)
                        MessageToast.show("Data Loaded for Both Models")
                        that.requestBind()
                    },
                    error:function(){
                        MessageToast.show("Error")
                    }
                })

            },
            emp1: function (oEvent) {
                debugger
                deptName = oEvent.getParameters().arguments.y
                index = oEvent.getParameters().arguments.z
                

                this.new()










                
                // var idList = this.getView().byId('requestList')
                // if (deptName == 'UI5') {
                //     idList.bindElement('requestData>/UI52/')
                // } else if (deptName == 'ABAP') {
                //     idList.bindElement('requestData>/ABAP2/')
                // } else if (deptName == 'SALESFORCE') {
                //     idList.bindElement('requestData>/SALESFORCE2/')
                // } else if (deptName == 'HYBRIS') {
                //     idList.bindElement('requestData>/HYBRIS2/')
                // }
                // var loginName=this.getView().getModel('loginData').oData.EMPDETAIL[0].name
                // var rModel=this.getView().getModel('requestData')
                // if (deptName == 'UI5') {
                //     var rModelData=rModel.oData.UI5
                // } else if (deptName == 'ABAP') {
                //     var rModelData=rModel.oData.ABAP
                // } else if (deptName == 'SALESFORCE') {
                //     var rModelData=rModel.oData.SALESFORCE
                // } else if (deptName == 'HYBRIS') {
                //     var rModelData=rModel.oData.HYBRIS
                // }
                // var count=0;
                // var spliceIndex;
                // debugger
                // var listId=sap.ui.getCore().byId('requestList');
                // if (deptName == 'UI5') {
                //     var rModelData2=rModel.oData.UI52
                // } else if (deptName == 'ABAP') {
                //     var rModelData2=rModel.oData.ABAP2
                // } else if (deptName == 'SALESFORCE') {
                //     var rModelData2=rModel.oData.SALESFORCE2
                // } else if (deptName == 'HYBRIS') {
                //     var rModelData2=rModel.oData.HYBRIS2
                // }


                // for(let i=0;i<rModelData.length;i++){
                //     if(loginName!=rModelData[i].name){
                //         // count++;
                //         // spliceIndex=i
                //         // rModelData.slice(spliceIndex,1)
                //         rModelData2.push(rModelData[i])
                //     }
                    
                // }
                // rModel.refresh(true)







                  
                // var requestModel=this.getView().getModel("requestData")
                // var requestModelData=requestModel.oData
                // var uiLength=requestModel.oData.UI5.length
                // var abapLength=requestModel.oData.ABAP.length
                // var salesLength=requestModel.oData.SALESFORCE.length
                // var hybLength=requestModel.oData.HYBRIS.length
                // var idNotify=this.getView().byId('notify')
                // if(deptName=='UI5'){
                //     idNotify.setProperty("value", uiLength)
                // }else if(deptName=='ABAP'){
                //     idNotify.setProperty("value", abapLength)
                // }else if(deptName=='SALESFORCE'){
                //     idNotify.setProperty("value", salesLength)
                // }else if(deptName=='HYBRIS'){
                //     idNotify.setProperty("value", hybLength)
                // }


            },
            requestBind:function(){
                debugger
                // var oModel=this.getView().getModel('empModel')
                // var spliceData = oModel.oData
                // var SpliceId = spliceData.profile[0].Id
                // var spliceData2
                // if (deptName == 'UI5') {
                //     spliceData2=spliceData.UI5
                // } else if (deptName == 'ABAP') {
                //     spliceData2=spliceData.ABAP
                // } else if (deptName == 'SLF') {
                //     spliceData2=spliceData.SLF
                // } else if (deptName == 'HYB') {
                //     spliceData2=spliceData.HYB
                // }
                // spliceData2.forEach((x,index)=>{
                //     if(SpliceId==x.Id){
                //         debugger
                //         spliceData2.splice(index,1)
                //     }
                // })
                // oModel.setData(spliceData2)
                // sap.ui.getCore().setModel(oModel)
                debugger
                var requestList = this.getView().byId("requestList")
                if (deptName == 'UI5') {
                        requestList.bindElement('empModel>/UI5/')
                } else if (deptName == 'ABAP') {
                        requestList.bindElement('empModel>/ABAP/')
                } else if (deptName == 'SLF') {
                        requestList.bindElement('empModel>/SLF/')
                } else if (deptName == 'HYB') {
                        requestList.bindElement('empModel>/HYB/')
                }
            },
            onPress222: function (oEvent) {
                debugger
                var f = this.getView().byId('hhh')
                f.setSize('40%')
                var s = this.getView().byId('empForm')
                var sPath = oEvent.getParameter("listItem").getBindingContextPath()
                s.bindElement('empModel>' + sPath)
            },
            onEmpLogout: function () {
                debugger
                this.getOwnerComponent().getRouter().navTo('RouteLogin')
                // var oModel = this.getView().getModel('loginData')
                // var ologdata = oModel.oData.EMPDETAIL
                // ologdata.splice(0, 1)
                // oModel.refresh(true)
                // oModel.setData(oModel, ologdata)
                // sap.ui.getCore().setModel(oModel)
                // var rModel=this.getView().getModel('requestData')
                // if(deptName=='UI5'){
                //     rModel.oData.UI52=[]
                // }else if(deptName=='ABAP'){
                //     rModel.oData.ABAP2=[]
                // }else if(deptName=='SALESFORCE'){
                //     rModel.oData.SALESFORCE2=[]
                // }else if(deptName=='HYBRIS'){
                //     rModel.oData.HYBRIS2=[]
                // }
                
            },
            profilePopup: null,
            userProfile: function () {
                debugger
                if (!this.profilePopup) {
                    debugger
                    this.profilePopup = new sap.ui.xmlfragment("uiapp.project1.fragments.profile", this)
                    this.profilePopup.setTitle("Your profile")
                    this.getView().addDependent(this.profilePopup);
                    this.profilePopup.open()

                }
            },
            profileCancel: function () {
                debugger
                this.profilePopup.close()
                this.profilePopup.destroy(true);
                this.profilePopup = null
            },
            reViewPopUp2: null,
            onPressReview: function () {
                debugger

                if (!this.reViewPopUp2) {
                    debugger
                    this.reViewPopUp2 = new sap.ui.xmlfragment("uiapp.project1.fragments.reView2", this)
                    // this.reViewPopUp.setTitle("Your profile")
                    this.getView().addDependent(this.reViewPopUp2);
                    this.reViewPopUp2.open()
                }
                else {
                    this.reViewPopUp2.open()

                }

            },
            reViewCancel: function () {
                debugger
                this.reViewPopUp2.close()
                this.reViewPopUp2.destroy(true);
                this.reViewPopUp2 = null
            },
            liveUpdate: function (oEvent) {
                debugger
                var mock = sap.ui.getCore().byId("rMock")
                var rate = sap.ui.getCore().byId("rRatingId")
                var skill = sap.ui.getCore().byId("rSkillId")
                var senior = sap.ui.getCore().byId("rSeniorId")
                var junior = sap.ui.getCore().byId("rJuniorId")
                var tech = sap.ui.getCore().byId("rTechId")
                var code = sap.ui.getCore().byId("rCodeId")

                var rateValue = rate.getValue()
                var skillValue = skill.getValue()
                var seniouValue = senior.getValue()
                var juniorValue = junior.getValue()
                var techValue = tech.getValue()
                var codeValue = code.getValue()

                var avg2 = (rateValue + skillValue + seniouValue + juniorValue + techValue + codeValue) / 6
                var avg=Math.floor(avg2)
                MessageToast.show(avg)


                var oView = sap.ui.getCore().byId('overView')
                oView.setText(avg)

            },
            onReviewSave: function () {
                debugger
                var mock = sap.ui.getCore().byId("rMock")
                var rate = sap.ui.getCore().byId("rRatingId")
                var skill = sap.ui.getCore().byId("rSkillId")
                var senior = sap.ui.getCore().byId("rSeniorId")
                var junior = sap.ui.getCore().byId("rJuniorId")
                var tech = sap.ui.getCore().byId("rTechId")
                var code = sap.ui.getCore().byId("rCodeId")
                var fBack = sap.ui.getCore().byId("rFeedBack")

                var mockValue = mock.mProperties.selectedKey
                var rateValue = rate.getValue()
                var skillValue = skill.getValue()
                var seniouValue = senior.getValue()
                var juniorValue = junior.getValue()
                var techValue = tech.getValue()
                var codeValue = code.getValue()
                var fBackValue = fBack.getValue()
                var index2;
                var avg2 = (rateValue + skillValue + seniouValue + juniorValue + techValue + codeValue) / 6
                var avg=Math.floor(avg2)
                var date=new Date()
                var year=date.getFullYear()
                var month=date.getMonth()
                var day=date.getDate()
                var rDate=day+"/"+month+"/"+year
                var reviewrName=this.getView().getModel('empModel').oData.profile[0].Name
                var reviewrId=this.getView().getModel('empModel').oData.profile[0].Id
                var empName = this.getView().byId('rEmp').getValue()
                var empModelData=this.getView().getModel('empModel').oData.all[0] 
                var reviewObj
                empModelData.forEach((x)=>{
                    if(x.Id==index){
                        reviewObj={
                            Reviewerid:reviewrId,
                            Reviedforid:x.Id,
                            Reviewrname:reviewrName,
                            Reviewedforname:x.Name,
                            Reviewdate:rDate,
                            Mockrating:avg2,
                            Mocktype:mockValue,
                            Feedback:fBackValue,
                            Rvdept:x.Department
                        }
                    }
                })


                if(mockValue=="" && fBackValue==""){
                        mock.setValueState('Error')
                        mock.setValueStateText('Select Typeof Mock')
    
                        fBack.setValueState('Error')
                        fBack.setValueStateText('Please Give Feedback')
                }else if(mockValue=="" && fBackValue==""){
                        if(mockValue==""){
                            mock.setValueState('Error')
                            mock.setValueStateText('Select Typeof Mock')
                        }else if(fBackValue==""){
                            fBack.setValueState('Error')
                            fBack.setValueStateText('Please Give Feedback')
                        }
                }else if(rateValue=="" && skillValue=="" && seniouValue=="" && juniorValue=="" && techValue=="" && codeValue==""){
                    console.log(this.reviewObj)
                    MessageBox.confirm('All the Ratings are Zero, Would Like to Continue' ,{
                        title: 'Confirmation',
                        onClose:function(oAction){
                            debugger
                            console.log(this.reviewObj)
                            if(oAction===sap.m.MessageBox.Action.OK){
                                debugger
                                // this.getView().getModel('empModel')
                                MessageToast.show("OK")
                                console.log(this.reviewObj)
                            }else {
                                MessageToast.show("Enter All The Details")
                            }
                        }
                    })
                }else {
                    console.log(this.reviewObj)
                }






















                // var orgModel = this.getView().getModel('empData')
                // var overModel=this.getView().getModel('overView')
                // var overModel2=this.getView().getModel('overView2')
                // var requestData=this.getView().getModel('requestData')
                // var nModel=this.getView().getModel("requestData")
                // var idNotify=this.getView().byId('notify')
                // var empDlt=this.getView().byId('empForm').mObjectBindingInfos.requestData.path
                // var orgData = orgModel.oData
                // var rr = Object.keys(orgData)
                // var reviewObject={
                //     "mockType":mockValue,
                //     "mockrating":avg,
                //     "rDate":rDate,
                //     "reviewName":reviewrName,
                //     "reviewrId":reviewrId,
                //     "feedBack":fBackValue
                // }

                // debugger
                // if (deptName == "UI5") {
                //     for (let j = 0; j < orgData.UI5.length; j++) {
                //         if (empName == orgData.UI5[j].name) {
                //             index2=j
                //         }
                //     }
                // } else if (deptName == "ABAP") {
                //     for (let j = 0; j < orgData.ABAP.length; j++) {
                //         if (empName == orgData.ABAP[j].name) {
                //             index2=j
                //         }
                //     }
                // } else if (deptName == "SALESFORCE") {
                //     for (let j = 0; j < orgData.SALESFORCE.length; j++) {
                //         if (empName == orgData.SALESFORCE[j].name) {
                //             index2=j
                //         }
                //     }
                // }
                // else if (deptName == "HYBRIS") {
                //     for (let j = 0; j < orgData.HYBRIS.length; j++) {
                //         if (empName == orgData.HYBRIS[j].name) {
                //             index2=j
                //         }
                //     }
                // }
                
                
                // if(mockValue=="" && fBackValue==""){
                //     mock.setValueState('Error')
                //     mock.setValueStateText('Select Typeof Mock')

                //     fBack.setValueState('Error')
                //     fBack.setValueStateText('Please Give Feedback')
                // }else if(mockValue=="" && fBackValue==""){
                //     if(mockValue==""){
                //         mock.setValueState('Error')
                //         mock.setValueStateText('Select Typeof Mock')
                //     }else if(fBackValue==""){
                //         fBack.setValueState('Error')
                //         fBack.setValueStateText('Please Give Feedback')
                //     }
                // }else if(rateValue=="" && skillValue=="" && seniouValue=="" && juniorValue=="" && techValue=="" && codeValue==""){
                //     MessageBox.confirm('ALl THE RATINGS ARE ZERO WOULD YOU LIKE TO CONTINUE',{
                //         title: "Confirmation",
                //             onClose: function(oAction) {
                //                 if (oAction === sap.m.MessageBox.Action.OK) {
                //                     debugger
                //                         if(deptName=='UI5'){
                //                             var reviewArray=orgData.UI5[index2].empReview
                //                         }else if(deptName=='ABAP'){
                //                             var reviewArray=orgData.ABAP[index2].empReview
                //                         }else if(deptName=='SALESFORCE'){
                //                             var reviewArray=orgData.SALESFORCE[index2].empReview
                //                         }else if(deptName=='HYBRIS'){
                //                             var reviewArray=orgData.HYBRIS[index2].empReview
                        
                //                         }
                //                         reviewArray.push(reviewObject)
                //                         debugger
                //                         orgModel.refresh(true)
                //                         orgModel.setData(orgModel,reviewArray)
                //                         sap.ui.getCore().setModel(orgModel)
                //                         debugger
                                        
                //                        debugger
                //                         let overObject={
                //                             "name":empName,
                //                             "mock":avg,
                //                             "mockType":mockValue,
                //                             "rDate":rDate,
                //                             "reviewName":reviewrName,
                //                             "reviewrId":reviewrId,
                //                             "feedBack":fBackValue
                //                         }
                                        
                //                         var overData=overModel.oData
                        
                //                         if(deptName=="UI5"){
                //                             var overData2=overData.UI5
                //                         }else if(deptName=="ABAP"){
                //                             var overData2=overData.ABAP
                //                         }else if(deptName=='SALESFORCE'){
                //                             var overData2=overData.SALESFORCE
                //                         }else if(deptName=='HYBRIS'){
                //                             var overData2=overData.HYBRIS
                //                         }
                //                         overData2.push(overObject)
                //                         overModel.refresh(true)
                //                         overModel.setData(overData2,overData)
                //                         sap.ui.getCore().setModel(overModel)
                                        
                                        
                //                         var overModel2Data=overModel2.oData
                //                         var overModel2All=overModel2Data.ALL
                //                         overModel2All.push(overObject)
                //                         overModel.refresh(true)
                //                         overModel.setData(overModel2All,overModel2Data)
                //                         sap.ui.getCore().setModel(overModel2)
                //                         debugger
                                       
                //                         var empDlt2=empDlt.split('/')[empDlt.split('/').length-1]
                                       
                //                         // var requestData2=requestData.oData
                //                         // if(deptName=="UI5"){
                //                         //     var requestData3=requestData2.UI5
                //                         // }else if(deptName=="ABAP"){
                //                         //     var requestData3=requestData2.ABAP
                //                         // }else if(deptName=="SALESFORCE"){
                //                         //     var requestData3=requestData2.SALESFORCE
                //                         // }else if(deptName=="HYBRIS"){
                //                         //     var requestData3=requestData2.HYBRIS
                //                         // }
                //                         // for(let i=0;i<requestData3.length;i++){
                //                         //     if(requestData3[i].name==empName){
                //                         //         requestData3.splice(i,1)

                //                         //     }
                //                         // }
                //                         // requestData.setData(requestData)
                //                         // sap.ui.getCore().setModel(requestData)
                                        
                                                        
                                          
                //                         var requestModelData=nModel.oData
                //                         var uiLength=requestModelData.UI5.length
                //                         var abapLength=requestModelData.ABAP.length
                //                         var salesLength=requestModelData.SALESFORCE.length
                //                         var hybLength=requestModelData.HYBRIS.length
                                       
                                       
                //                         if(deptName=='UI5'){
                //                             idNotify.setProperty("value", uiLength)
                //                         }else if(deptName=='ABAP'){
                //                             idNotify.setProperty("value", abapLength)
                //                         }else if(deptName=='SALESFORCE'){
                //                             idNotify.setProperty("value", salesLength)
                //                         }else if(deptName=='HYBRIS'){
                //                             idNotify.setProperty("value", hybLength)
                //                         }
                                        

                //                         if(deptName=='UI5'){
                //                             var a=requestData.oData.UI52
                //                         }else if(deptName=='ABAP'){
                //                             var a=requestData.oData.ABAP2
                //                         }else if(deptName=='SALESFORCE'){
                //                             var a=requestData.oData.SALESFORCE2
                //                         }else if(deptName=='HYBRIS'){
                //                             var a=requestData.oData.SALESFORCE2
                //                         }
                //                         for(let i=0;i<a.length;i++){
                //                             if(a[i].name==empName){
                //                                 a.splice(i,1)
                //                             }
                //                         }
                //                         requestData.refresh(true)
                //                         requestData.setData(a,requestData)
                //                         sap.ui.getCore().setModel(requestData)
                //                         MessageToast.show("REVIEW SENT")
                                
                //                 } else {
                //                 MessageBox.show('ENTER ALL THE DETAILS')
                // }
                // }
                //     })
                //                 this.reViewPopUp2.close()
                //                         this.reViewPopUp2.destroy(true);
                //                         this.reViewPopUp2 = null
                // }else{
                //     if(deptName=='UI5'){
                //         var reviewArray=orgData.UI5[index2].empReview
                //     }else if(deptName=='ABAP'){
                //         var reviewArray=orgData.ABAP[index2].empReview
                //     }else if(deptName=='SALESFORCE'){
                //         var reviewArray=orgData.SALESFORCE[index2].empReview
                //     }else if(deptName=='HYBRIS'){
                //         var reviewArray=orgData.HYBRIS[index2].empReview
    
                //     }
                //     reviewArray.push(reviewObject)
                //     debugger
                //     orgModel.refresh(true)
                //     orgModel.setData(orgModel,reviewArray)
                //     sap.ui.getCore().setModel(orgModel)
                //     debugger
                    
                //    debugger
                //     let overObject={
                //         "name":empName,
                //         "mock":avg,
                //         "mockType":mockValue,
                //         "rDate":rDate,
                //         "reviewName":reviewrName,
                //         "reviewrId":reviewrId,
                //         "feedBack":fBackValue
                //     }
                    
                //     var overData=overModel.oData
    
                //     if(deptName=="UI5"){
                //         var overData2=overData.UI5
                //     }else if(deptName=="ABAP"){
                //         var overData2=overData.ABAP
                //     }else if(deptName=='SALESFORCE'){
                //         var overData2=overData.SALESFORCE
                //     }else if(deptName=='HYBRIS'){
                //         var overData2=overData.HYBRIS
                //     }
                //     overData2.push(overObject)
                //     overModel.refresh(true)
                //     overModel.setData(overData2,overData)
                //     sap.ui.getCore().setModel(overModel)
                    
                    
                //     var overModel2Data=overModel2.oData
                //     var overModel2All=overModel2Data.ALL
                //     overModel2All.push(overObject)
                //     overModel.refresh(true)
                //     overModel.setData(overModel2All,overModel2Data)
                //     sap.ui.getCore().setModel(overModel2)
                //     debugger
                   
                //     var empDlt2=empDlt.split('/')[empDlt.split('/').length-1]
                   
                //     var requestData2=requestData.oData
                //     if(deptName=="UI5"){
                //         var requestData3=requestData2.UI5
                //     }else if(deptName=="ABAP"){
                //         var requestData3=requestData2.ABAP
                //     }else if(deptName=="SALESFORCE"){
                //         var requestData3=requestData2.SALESFORCE
                //     }else if(deptName=="HYBRIS"){
                //         var requestData3=requestData2.HYBRIS
                //     }
                //     for(let i=0;i<requestData3.length;i++){
                //         if(requestData3[i].name==empName){
                //             requestData3.splice(i,1)

                //         }
                //     }
                    
                //     requestData.setData(requestData,requestData2)
                //     sap.ui.getCore().setModel(requestData)
                //     if(deptName=='UI5'){
                //         var a=requestData.oData.UI52
                //     }else if(deptName=='ABAP'){
                //         var a=requestData.oData.ABAP2
                //     }else if(deptName=='SALESFORCE'){
                //         var a=requestData.oData.SALESFORCE2
                //     }else if(deptName=='HYBRIS'){
                //         var a=requestData.oData.SALESFORCE2
                //     }
                //     for(let i=0;i<a.length;i++){
                //         if(a[i].name==empName){
                //             a.splice(i,1)
                //         }
                //     }
                //     requestData.refresh(true)
                //     requestData.setData(a,requestData)
                //     sap.ui.getCore().setModel(requestData)
                    
                //     var requestModelData=nModel.oData
                //     var uiLength=nModel.oData.UI5.length
                //     var abapLength=nModel.oData.ABAP.length
                //     var salesLength=nModel.oData.SALESFORCE.length
                //     var hybLength=nModel.oData.HYBRIS.length
                   
                //     if(deptName=='UI5'){
                //         idNotify.setProperty("value", uiLength)
                //     }else if(deptName=='ABAP'){
                //         idNotify.setProperty("value", abapLength)
                //     }else if(deptName=='SALESFORCE'){
                //         idNotify.setProperty("value", salesLength)
                //     }else if(deptName=='HYBRIS'){
                //         idNotify.setProperty("value", hybLength)
                //     }
                    
                //     MessageToast.show("REVIEW SENT")
                //     this.reViewPopUp2.close()
                //     this.reViewPopUp2.destroy(true);
                //     this.reViewPopUp2 = null
            
                // }   
            },
            onReviewSave2:function(){
                debugger
                var mock = sap.ui.getCore().byId("rMock")
                var rate = sap.ui.getCore().byId("rRatingId")
                var skill = sap.ui.getCore().byId("rSkillId")
                var senior = sap.ui.getCore().byId("rSeniorId")
                var junior = sap.ui.getCore().byId("rJuniorId")
                var tech = sap.ui.getCore().byId("rTechId")
                var code = sap.ui.getCore().byId("rCodeId")
                var fBack = sap.ui.getCore().byId("rFeedBack")

                var mockValue = mock.mProperties.selectedKey
                var rateValue = rate.getValue()
                var skillValue = skill.getValue()
                var seniouValue = senior.getValue()
                var juniorValue = junior.getValue()
                var techValue = tech.getValue()
                var codeValue = code.getValue()
                var fBackValue = fBack.getValue()
                var index2;
                var avg2 = (rateValue + skillValue + seniouValue + juniorValue + techValue + codeValue) / 6
                var avg3 = Math.floor(avg2)
                var avg4 = avg3.toString()
                var avg=Math.floor(avg2)
                var date=new Date()
                var year=date.getFullYear()
                var month=date.getMonth()
                var day=date.getDate()
                var rDate=day+"/"+month+"/"+year
                var reviewrName=this.getView().getModel('empModel').oData.profile[0].Name
                var reviewrId=this.getView().getModel('empModel').oData.profile[0].Id
                var empName = this.getView().byId('rEmp').getValue()
                var empId = this.getView().byId('rEmpId').getValue()
                var empModelData=this.getView().getModel('empModel').oData.all[0] 
                var reviewObj={
                                Reviewerid:reviewrId,
                                Reviedforid:empId,
                                Reviewrname:reviewrName,
                                Reviewedforname:empName,
                                Reviewdate:rDate,
                                Mockrating:avg4,
                                Mocktype:mockValue,
                                Feedback:fBackValue,
                                Rvdept:deptName
                            }
                // var reviewObj
                // empModelData.forEach((x)=>{
                //     if(x.Id==index){
                //         reviewObj={
                //             Reviewerid:reviewrId,
                //             Reviedforid:x.Id,
                //             Reviewrname:reviewrName,
                //             Reviewedforname:empName,
                //             Reviewdate:rDate,
                //             Mockrating:avg3,
                //             Mocktype:mockValue,
                //             Feedback:fBackValue,
                //             Rvdept:x.Department
                //         }
                //     }
                // })
                if(mockValue=="" && fBackValue==""){
                    mock.setValueState('Error')
                        mock.setValueStateText('Select Typeof Mock')
    
                        fBack.setValueState('Error')
                        fBack.setValueStateText('Please Give Feedback')
                }else if(mockValue=="" && fBackValue==""){
                    if(mockValue==""){
                        mock.setValueState('Error')
                        mock.setValueStateText('Select Typeof Mock')
                    }else if(fBackValue==""){
                        fBack.setValueState('Error')
                        fBack.setValueStateText('Please Give Feedback')
                    }
                }else if(rateValue=="" && skillValue=="" && seniouValue=="" && juniorValue=="" && techValue=="" && codeValue==""){
                    console.log(reviewObj)
                    var that = this
                    MessageBox.confirm("All the Ratings are zero, Would you like to Continue",{
                        title: "Confirmation",
                        onClose: function(oAction){
                            debugger
                            console.log(reviewObj)
                            if(oAction == sap.m.MessageBox.Action.OK){
                                // console.log(reviewObj)
                                // console.log(empModelData)
                               
                                that.getOwnerComponent().getModel('xyz').create("/ZGUI5APPRVWTAB2Set",reviewObj,{
                                    method:"POST",
                                    success:function(){
                                        debugger
                                        MessageToast.show("Created")
                                        that.reviewStatusChnage(empId)
                                    },
                                    error:function(){
                                        debugger
                                        MessageToast.show("Error")
                                        
                                    }
                                })

                            }else {
                                console.log(reviewObj)
                            }
                        }
                    })
                }else {
                    var that = this
                    this.getOwnerComponent().getModel('xyz').create("/ZGUI5APPRVWTAB2Set",reviewObj,{
                        method:"POST",
                        success:function(){
                            debugger
                            MessageToast.show("Created")
                            that.reviewStatusChnage(empId)
                        },
                        error:function(){
                            debugger
                            MessageToast.show("Error")
                            
                        }
                    })
                }

            },
            reviewStatusChnage:function(empId){
                debugger
                var oModel = this.getView().getModel("empModel").oData.all[0]
                var statusObject
                oModel.forEach((x)=>{
                    if(x.Id ==empId){
                        statusObject={
                            Id:empId,
                            Name:x.Name,
                            Department:x.Department,
                            Designation:x.Designation,
                            Joindate:x.Joindate,
                            Contactnumber:x.Contactnumber,
                            Mailid:x.Mailid,
                            Mockrating:x.Mockrating,
                            Password:x.Password,
                            Request:"FALSE",
                            Review:x.Review,
                            Pwdchange:x.Pwdchange,
                            Sample1:x.Sample1,
                            Sample2:x.Sample2,
                            Sample3:x.Sample3,
                            Sample4:x.Sample4,
                            Sample5:x.Sample5,
                            Sample6:x.Sample6
                        }
                    }
                })
                var that=this
                    this.getOwnerComponent().getModel("abc").update("/ZGUI5APP1Set('"+empId+"')",statusObject,{
                
                        method: "PATCH",
                        success: function(){
                            debugger
                            MessageToast.show("Status Canged Successfully")
                            // that.cancelEdit()
                            that.reViewCancel()
                            that.new()
                            
                        },
                        error: function(){
                            debugger
                            MessageToast.show("ERROR IN UPDATING")
                        }
                       })
            }
        });
    });