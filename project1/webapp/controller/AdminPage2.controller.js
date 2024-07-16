sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast,Filter, FilterOperator, JSONModel) {
        "use strict";
        count:null;
        var header;
        var aFilters = [];
        return Controller.extend("uiapp.project1.controller.AdminPage2", {
            onInit: function () {
            //     window.history.pushState(null, document.title, window.location.href);    
            //     window.addEventListener('popstate', function (event) {      
            //     window.history.pushState(null, document.title, window.location.href);
 
            // })
            debugger
            
                sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this.auto,this)
                // this.auto()
            },
            
            auto:function(oEvent){
                debugger
                
                header=oEvent.getParameters().arguments.y
                this.bindingData()

            
                
                // var listId=this.getView().byId("idList")
                // if(header=="UI5"){
                //     listId.bindElement("empData>/UI5/")
                // }else if(header=="ABAP"){
                //     listId.bindElement("empData>/ABAP/")
                // }else if(header=="SALESFORCE"){
                //     listId.bindElement("empData>/SALESFORCE/")
                // }else if(header=="HYBRIS"){
                //     listId.bindElement("empData>/HYBRIS/")
                // }
                // var requestModel=this.getView().getModel("overView")
                // var uiLength=requestModel.oData.UI5.length
                // var abapLength=requestModel.oData.ABAP.length
                // var salesLength=requestModel.oData.SALESFORCE.length
                // var hybLength=requestModel.oData.HYBRIS.length
                // var adminNotifyId=this.getView().byId('adminNotify')
                // // sap.ui.getCore().byId('adminNotify')
                
                // if(header=='UI5'){
                //     adminNotifyId.setProperty("value", uiLength)
                // }else if(header=='ABAP'){
                //     adminNotifyId.setProperty("value", abapLength)
                // }else if(header=='SALESFORCE'){
                //     adminNotifyId.setProperty("value", salesLength)
                // }else if(header=='HYBRIS'){
                //     adminNotifyId.setProperty("value", hybLength)
                // }
                
            },
            bindingData:function(){
                debugger
                var that = this
            // var oModel=new sap.ui.model.json.JSONModel()
            var oModel = this.getView().getModel('newModel')
            var oModelData = oModel.oData

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
                        oModelData.filters.length=0
                        oModelData.all.push(data.results)
                        data.results.forEach((X)=>{
                            if(X.Department=='UI5'){
                                oModelData.UI5.push(X)
                            }else if(X.Department=='ABAP'){
                                oModelData.ABAP.push(X)
                            }else if(X.Department=='HYB'){
                                oModelData.HYB.push(X)
                            }else if(X.Department=='SLF'){
                                oModelData.SLF.push(X)
                            }
                        })
                        
                        oModel.setData(oModelData)
                        sap.ui.getCore().setModel(oModel)
                        MessageToast.show("Data Loaded")
                        that.reviewModel()
                    },
                    error:function(){
                        MessageToast.show("Error")
                    }
                })
            },
            reviewModel:function(){
                debugger
                var that = this
            // var oModel=new sap.ui.model.json.JSONModel()
            var oModel = this.getView().getModel('reviewModel')
            var oModelData = oModel.oData

                this.getOwnerComponent().getModel("xyz").read("/ZGUI5APPRVWTAB2Set",{
                    method:"GET",
                    success:function (data, response) {
                        debugger
                        
                        debugger
                        oModelData.UI5.length=0
                        oModelData.ABAP.length=0
                        oModelData.SLF.length=0
                        oModelData.HYB.length=0
                        oModelData.all=data.results
                        // oModelData.all.push(data.results)
                        data.results.forEach((X)=>{
                            // oModelData.all.push(X)
                            if(X.Rvdept=='UI5'){
                                oModelData.UI5.push(X)
                            }else if(X.Rvdept=='ABAP'){
                                oModelData.ABAP.push(X)
                            }else if(X.Rvdept=='HYB'){
                                oModelData.HYB.push(X)
                            }else if(X.Rvdept=='SLF'){
                                oModelData.SLF.push(X)
                            }
                        })
                        
                        oModel.setData(oModelData)
                        sap.ui.getCore().setModel(oModel)
                        MessageToast.show("Data Loaded for Review Model")
                        that.new()
                    },
                    error:function(){
                        MessageToast.show("Error")
                    }
                })
            },
            new:function(){
                debugger
                // var oModel = sap.ui.getCore().getModel('adminPage2');
                var listId2 = this.getView().byId('idList')
                // listId2.removeAllItems()
                listId2.bindElement('newModel>/'+header+'/')

                var tabId= this.getView().byId("myTable")
                tabId.bindElement('reviewModel>/'+header+'/')
                debugger

            },
            onItemPress:function(oEvent){
                debugger
                var sPath=oEvent.getParameter("listItem").getBindingContextPath()
                var s=this.getView().byId("ObjectPageLayout")
                s.bindElement("newModel>"+sPath)
                var t=this.getView().byId("myTable")
                t.bindElement("newModel>"+sPath)



            },
          
            addPopUp:null,
            addEmp:function(){
                debugger

                

                if(!this.addPopUp){
                    debugger
                    this.addPopUp=new sap.ui.xmlfragment("uiapp.project1.fragments.addEmp", this)
                    
                    this.getView().addDependent(this.addPopUp);
                    this.addPopUp.setTitle(`ENTER EMPLOYEE DETAILS FOR ${header}`)
                //  
                    this.addPopUp.open()
                     
                }else{
                    this.addPopUp.open()

                }

                var dropDownId=sap.ui.getCore().byId('_IDGenInput3')
                if(header=="UI5"){
                    dropDownId.bindElement("dropDown>/UI5/")
                }else if(header=="ABAP"){
                    dropDownId.bindElement("dropDown>/ABAP/")
                }else if(header=="SLF"){
                    dropDownId.bindElement("dropDown>/SLF/")
                }else if(header=="HYB"){
                    dropDownId.bindElement("dropDown>/HYB/")
                }

                var empModel=this.getView().getModel('newModel')
                if(header=='UI5'){
                    var empoo=empModel.oData.UI5.length
                }else if(header=="ABAP"){
                    var empoo=empModel.oData.ABAP.length
                }else if(header=="SLF"){
                    var empoo=empModel.oData.SLF.length
                }else if(header=="HYB"){
                    var empoo=empModel.oData.HYB.length
                }
                var b=sap.ui.getCore().byId("_IDGenInput2")
                if(header=='UI5'){
                    b.setValue(empoo+101)
                }else if(header=="ABAP"){
                    b.setValue(empoo+201)
                }else if(header=="SLF"){
                    b.setValue(empoo+401)
                }else if(header=="HYB"){
                    b.setValue(empoo+301)
                }
                
                sap.ui.getCore().byId("_IDGenInput4").setMaxDate(new Date())
            },
            cancelDialog:function(){
                debugger
                this.addPopUp.close()
                this.addPopUp.destroy(true);
                this.addPopUp = null
            },
            onSave : function() {
                debugger
                var a=sap.ui.getCore().byId("_IDGenInput1")
                var b=sap.ui.getCore().byId("_IDGenInput2")
                var c=sap.ui.getCore().byId("_IDGenInput3")
                var d=sap.ui.getCore().byId("_IDGenInput4")
                var e=sap.ui.getCore().byId("_IDGenInput5")
                var f=sap.ui.getCore().byId("_IDGenInput6")
                var g=sap.ui.getCore().byId("_IDGenInput7")
                var h=sap.ui.getCore().byId("_IDGenInput8")
                var i=sap.ui.getCore().byId("_IDGenInput9")

                var NameVal =/^[A-Za-z]{3,25}$/
                var PhoneVal =/^[6-9][0-9]{9}$/
                var EmailVal =/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
                var UserPassRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

                var empName=a.getValue()
                var empId=b.getValue()
                var empDesignation=c.mProperties.selectedKey
                var empNJoinDate=d.getValue()
                var empExp=e.getValue()
                var empContactNo=f.getValue()
                var empMail=g.getValue()
                var empPwd=h.getValue()
                var confPwd=i.getValue()
                var arr2=[a,c,d,e,f,g,h,i]
                var arr=[empName,empDesignation,empNJoinDate,empExp,empContactNo,empMail,empPwd,confPwd]
                debugger
                if(empName=="" || empDesignation=="" || empNJoinDate=="" || empExp=="" || empContactNo=="" || empMail=="" || empPwd=="" || confPwd==""){
                    debugger
                    arr2.forEach((x)=>{
                        debugger
                        if(x.sId=="_IDGenInput1"){
                            if(empName==""){
                                a.setValueState("Error")
                                a.setValueStateText("Name Cannot Be Empty")
                            }
                        }else if(x.sId=="_IDGenInput3"){
                            if(empDesignation==""){
                                c.setValueState("Error")
                                c.setValueStateText("Select a Designation")
                            }
                        }else if(x.sId=="_IDGenInput4"){
                            if(empNJoinDate==""){
                                d.setValueState("Error")
                                d.setValueStateText("Select a Joining Date")
                            }
                        }else if(x.sId=="_IDGenInput5"){
                            if(empExp==""){
                                e.setValueState("Error")
                                e.setValueStateText("Enter a Employee Experience")
                            }
                        }else if(x.sId=="_IDGenInput6"){
                            if(empContactNo==""){
                                f.setValueState("Error")
                                f.setValueStateText("Enter Employee Contact Number")
                            }
                        }else if(x.sId=="_IDGenInput7"){
                            if(empMail==""){
                                g.setValueState("Error")
                                g.setValueStateText("Enter Employee Mail ID")
                            }
                        } else if(x.sId=="_IDGenInput8"){
                            if(empPwd==""){
                                h.setValueState("Error")
                                h.setValueStateText("Enter Employee PASSWORD")
                            }
                        }else if(x.sId=="_IDGenInput9"){
                            if(confPwd==""){
                                i.setValueState("Error")
                                i.setValueStateText("Confirm Employee PASSWORD")
                            }
                        }
                    })
                }else if(!NameVal.test(empName) || !PhoneVal.test(empContactNo) || !EmailVal.test(empMail) || !UserPassRegex.test(empPwd)){
                    var tempArr=[a,f,g,h]
                    tempArr.forEach((x)=>{
                        if(x.sId=="_IDGenInput1"){
                            if(!NameVal.test(empName)){
                                a.setValueState('Error')
                                a.setValueStateText('ENTER VALID NAME')
                            }
                        }else if(x.sId=="_IDGenInput6"){
                            if(!PhoneVal.test(empContactNo)){
                                f.setValueState("Error");
                                f.setValueStateText("Please enter valid contact number");
                            }
                        }else if(x.sId=="_IDGenInput7"){
                            if(!EmailVal.test(empMail)){
                                g.setValueState("Error");
                                g.setValueStateText("Please enter valid email id");
                            }
                        }else if(x.sId=="_IDGenInput8"){
                            if(!UserPassRegex.test(empPwd)){
                                h.setValueState("Error");
                                h.setValueStateText("Password Should Contain atleason one digit, on special Character and length should be 7 to 15 characters");
                            }
                        }
                    })       
                }else if(empExp>15){
                    e.setValueState("Error")
                    e.setValueStateText("Experience Should be Below 15 years")
                }else if(empPwd != confPwd){
                    i.setValueState("Error");
                    i.setValueStateText("PASSWORDS ARE NOT MATCHING");
                    h.setValueState("Error");
                    h.setValueStateText("PASSWORDS ARE NOT MATCHING");
                }else {
                    var empObj={
                        Id:empId,
                        Name:empName,
                        Department:header,
                        Designation:empDesignation,
                        Joindate:empNJoinDate,
                        Contactnumber:empContactNo,
                        Mailid:empMail,
                        Mockrating:"",
                        Password:empPwd,
                        Request:"FALSE",
                        Review:"",
                        Pwdchange:"FALSE",
                        Sample1:empExp,
                        Sample2:"",
                        Sample3:"",
                        Sample4:"",
                        Sample5:"",
                        Sample6:""
                    }
                    var that=this
                    this.getOwnerComponent().getModel("abc").create("/ZGUI5APP1Set",empObj,{
                        method: "POST",
                        success: function(){
                            debugger
                            MessageToast.show("Created")
                            that.cancelDialog()
                            that.bindingData()
                        },
                        error: function(){
                            debugger
                            MessageToast.show("Error")
                        }
                       })
                }
                

















                // let empObj={
                //     name: empName,
                //     designation:empDesignation,
                //     joiningDate:empNJoinDate,
                //     clientCompany:"",
                //     experienceInYear:empExp,
                //     contactNo:empContactNo,
                //     mailId:empMail,
                //     image:"sap-icon://employee",
                //     empId:empId,
                //     pwd:empPwd,
                //     empReview:[],
                //     pStatus:"notChanged",
                //     }
                // var oldPwd;
                // var oldMail;
                // var oldId;
                // var oModel =this.getView().getModel("empData")
                // oModel.refresh(true)
                // if(header=="UI5"){
                //     var oldData=oModel.oData.UI5
                // }else if(header=="ABAP"){
                //     var oldData=oModel.oData.ABAP
                // }else if(header=="SALESFORCE"){
                //     var oldData=oModel.oData.SALESFORCE
                // }else if(header=="HYBRIS"){
                //     var oldData=oModel.oData.HYBRIS
                // }
                // //to get old Password email and ID
                // var x=this.getView().getModel('empData').oData;
                // var y=Object.keys(x)
                // for(let i=0;i<y.length;i++){
                //     debugger
                //     if(y[i]=="UI5"){
                //         for (let j=0;j<x.UI5.length;j++){
                //             if(x.UI5[j].pwd==empPwd || x.UI5[j].empId==empId ||  x.UI5[j].mailId==empMail){
                //                 oldId=x.UI5[j].empId
                //                 oldPwd=x.UI5[j].pwd
                //                 oldMail=x.UI5[j].mailId
                //             }
                //         }
                //     }else if(y[i]=="ABAP"){
                //         for (let j=0;j<x.ABAP.length;j++){
                //             if(x.ABAP[j].pwd==empPwd || x.ABAP[j].empId==empId ||  x.ABAP[j].mailId==empMail){
                //                 oldId=x.ABAP[j].empId
                //                 oldPwd=x.ABAP[j].pwd
                //                 oldMail=x.ABAP[j].mailId
                //             }
                //         }
                //     }else if(y[i]=="SALESFORCE"){
                //         for (let j=0;j<x.SALESFORCE.length;j++){
                //             if(x.SALESFORCE[j].pwd==empPwd || x.SALESFORCE[j].empId==empId ||  x.SALESFORCE[j].mailId==empMail){
                //                 oldId=x.SALESFORCE[j].empId
                //                 oldPwd=x.SALESFORCE[j].pwd
                //                 oldMail=x.SALESFORCE[j].mailId
                //             }
                //         }
                //     }if(y[i]=="HYBRIS"){
                //         for (let j=0;j<x.HYBRIS.length;j++){
                //             if(x.HYBRIS[j].pwd==empPwd || x.HYBRIS[j].empId==empId ||  x.HYBRIS[j].mailId==empMail){
                //                 oldId=x.HYBRIS[j].empId
                //                 oldPwd=x.HYBRIS[j].pwd
                //                 oldMail=x.HYBRIS[j].mailId
                //             }
                //         }
                //     }
                // }  
                // if(empName=="" &&  empDesignation=="" && empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                //     a.setValueState("Error");
                //     a.setValueStateText("Emp Name cannot be empty");
                    
                //     b.setValueState("Error");
                //     b.setValueStateText("EMP ID cannot be empty");

                //     c.setValueState("Error");
                //     c.setValueStateText("Designationn Field cannot be empty");

                //     d.setValueState("Error");
                //     d.setValueStateText("Date field cannot be empty");

                //     e.setValueState("Error");
                //     e.setValueStateText("Experience field cannot be empty");

                //     f.setValueState("Error");
                //     f.setValueStateText("Contact Number field cannot be empty");

                //     g.setValueState("Error");
                //     g.setValueStateText("Mail field cannot be empty");

                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(empId=="" && empDesignation=="" && empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                //     b.setValueState("Error");
                //     b.setValueStateText("EMP ID cannot be empty");

                //     c.setValueState("Error");
                //     c.setValueStateText("Designationn Field cannot be empty");

                //     d.setValueState("Error");
                //     d.setValueStateText("Date field cannot be empty");

                //     e.setValueState("Error");
                //     e.setValueStateText("Experience field cannot be empty");

                //     f.setValueState("Error");
                //     f.setValueStateText("Contact Number field cannot be empty");

                //     g.setValueState("Error");
                //     g.setValueStateText("Mail field cannot be empty");

                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(empDesignation=="" && empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                //     c.setValueState("Error");
                //     c.setValueStateText("Designationn Field cannot be empty");

                //     d.setValueState("Error");
                //     d.setValueStateText("Date field cannot be empty");

                //     e.setValueState("Error");
                //     e.setValueStateText("Experience field cannot be empty");

                //     f.setValueState("Error");
                //     f.setValueStateText("Mail field cannot be empty");

                //     g.setValueState("Error");
                //     g.setValueStateText("Contact No field cannot be empty");

                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                //     d.setValueState("Error");
                //     d.setValueStateText("Date field cannot be empty");

                //     e.setValueState("Error");
                //     e.setValueStateText("Experience field cannot be empty");

                //     f.setValueState("Error");
                //     f.setValueStateText("Contact Number field cannot be empty");

                //     g.setValueState("Error");
                //     g.setValueStateText("Mail field cannot be empty");

                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                //     e.setValueState("Error");
                //     e.setValueStateText("Experience field cannot be empty");

                //     f.setValueState("Error");
                //     f.setValueStateText("Contact Number field cannot be empty");

                //     g.setValueState("Error");
                //     g.setValueStateText("Mail field cannot be empty");

                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                //     f.setValueState("Error");
                //     f.setValueStateText("Contact Number field cannot be empty");

                //     g.setValueState("Error");
                //     g.setValueStateText("Mail field cannot be empty");

                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(empMail=="" && empPwd=="" && confPwd==""){
                //     g.setValueState("Error");
                //     g.setValueStateText("Mail field cannot be empty");

                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(empPwd=="" && confPwd==""){
                //     h.setValueState("Error");
                //     h.setValueStateText("Password cannot be empty");

                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');
                // }else if(confPwd==""){
                //     i.setValueState("Error");
                //     i.setValueStateText("Confirm password cannot be empty");

                //     MessageToast.show('ENTER ALL THE FIELDS');

                // }else  if(!NameVal.test(empName)){
                //     a.setValueState("Error");
                //     a.setValueStateText("Please enter valid user name");
                
                // }else if(!PhoneVal.test(empContactNo)){
                   
                //     f.setValueState("Error");
                //     f.setValueStateText("Please enter valid contact number");
                
                // }else if(!EmailVal.test(empMail)){
                    
                //     g.setValueState("Error");
                //     g.setValueStateText("Please enter valid email id");

                // } else if(!UserPassRegex.test(empPwd)){

                //     h.setValueState("Error");
                //     h.setValueStateText("Password Should Contain atleason one digit, on special Character and length should be 7 to 15 characters");
                // }
                // else if(empName==""||empId==""||empDesignation==""||empNJoinDate==""||empExp==""||empContactNo==""||empMail==""||empPwd==""){
                //     if(empName==""){
                //         a.setValueState("Error")
                //         MessageToast.show("ENTER EMPLOYEE NAME")
                //     }else if(empId==""){
                //         b.setValueState("Error")
                //         MessageToast.show("Enter Employee ID")
                //     }else if(empDesignation==""){
                //         c.setValueState("Error")
                //         MessageToast.show("Enter Designation")
                //     }else if(empNJoinDate==""){
                //         d.setValueState("Error")
                //         MessageToast.show("Enter Employee Join Date")
                //     }else if(empExp==""){
                //         e.setValueState("Error")
                //         MessageToast.show("Enter Employee Experience")
                //     }else if(empContactNo==""){
                //         f.setValueState("Error")
                //         MessageToast.show("Enter Employee Contact Number")
                //     }else if(empMail==""){
                //         g.setValueState("Error")
                //         MessageToast.show("Enter Employee Email")
                //     }else if(empPwd==""){
                //         h.setValueState("Error")
                //         MessageToast.show("Enter Employee Password")
                //     }
                // }else if(oldPwd==empPwd||oldId==empId||oldMail==empMail){
                //     if(oldPwd==empPwd){
                //         h.setValueState("Error")
                //         MessageToast.show("PASSWORD ID ALREADY TRY OTHER")
                //     }else if(oldId==empId){
                //         b.setValueState("Error")
                //         MessageToast.show("ID IS ALREADY GIVEN TRY OTHER")
                //     }else if(oldMail==empMail){
                //         g.setValueState("Error")
                //         MessageToast.show("MAIL IS ALREADY GIVEN TRY OTHER")
                //     }
                // }else if(empPwd!=confPwd){
                //     h.setValueState("Error")

                //     i.setValueState("Error")
                //     h.setValueStateText("Passwords are not Matching");
                // }else {
                //     oldData.push(empObj)
                //     oModel.setData(empObj,"oldData")
                //     sap.ui.getCore().setModel(oModel)


                //     this.addPopUp.close()
                //     this.addPopUp.destroy(true);
                //     this.addPopUp = null
                //     MessageToast.show("SAVED")
                // }
                
                
            },
            deletePopUp:null,
            deleteEmp:function(oEvent){
                debugger
                // MessageToast.show("Okk I'll Come")
                // var listId=this.getView().byId("idList")
                // listId.setProperty("mode","SingleSelect")
                // var header=listId.mElementBindingContexts.empData.sPath
                
                if(!this.deletePopUp){
                    debugger
                    this.deletePopUp=new sap.ui.xmlfragment("uiapp.project1.fragments.deleteEmp", this)
                    this.getView().addDependent(this.deletePopUp);
                    this.deletePopUp.setTitle("Select Employs to Delete")
                    this.deletePopUp.open()   

                    var listId2=sap.ui.getCore().byId('idDeleteList')
                    if(header=="UI5"){
                        listId2.bindElement("newModel>/UI5/")
                    }else if(header=="ABAP"){
                        listId2.bindElement("newModel>/ABAP/")
                    }else if(header=="SLF"){
                        listId2.bindElement("newModel>/SLF/")
                    }else if(header=="HYB"){
                        listId2.bindElement("newModel>/HYB/")
                    }
                    
                    
                }
            },
            deleteCancel:function(){
                debugger
                this.deletePopUp.close()
                this.deletePopUp.destroy(true);
                this.deletePopUp = null
            },
            onItemPressDelete:function(oEvent){

                debugger
                var that=this
                debugger
                var a=[]
                var b=[]
                var selectedItems=sap.ui.getCore().byId('idDeleteList').getSelectedContextPaths()
                selectedItems.forEach((x)=>{
                    a.push(x.split('/')[x.split('/').length-1])
                })
                var modelData=this.getView().getModel('newModel').oData
                if(header=="UI5"){
                    var seperateData = modelData.UI5
                }else if(header=="ABAP"){
                    var seperateData = modelData.ABAP
                }else if(header=="SLF"){
                    var seperateData = modelData.SLF
                }else if(header=="HYB"){
                    var seperateData = modelData.HYB
                }
                
                for(let i=0;i<a.length;i++){
                    b.push(seperateData[a[i]])
                }

                var oModel=this.getOwnerComponent().getModel('abc');
                oModel.setUseBatch()
                b.forEach((x)=>{

                    oModel.remove("/ZGUI5APP1Set('"+x.Id+"')",{
                        method:"DELETE",
                        success:function(data){
                            debugger
                            MessageToast.show("successfully deleted")
                            that.deleteCancel()
                            that.bindingData();
                            
                        },error:function(data){
                            debugger
                            MessageToast.show("Error")
                        }
                    })
                })
                debugger

                
                // var oList = sap.ui.getCore().byId("idDeleteList"); 
                // var aSelectedItems = oList.getSelectedItems();
                // var oModel = oList.getModel("empData");
                // if(header=="UI5"){
                //     var aData = oModel.getProperty("/UI5");
                // }else if(header=="ABAP"){
                //     var aData = oModel.getProperty("/ABAP");
                // }else if(header=="SALESFORCE"){
                //     var aData = oModel.getProperty("/SALESFORCE");
                // }else if(header=="HYBRIS"){
                //     var aData = oModel.getProperty("/HYBRIS");
                // }
                
 
       
                
                // var aIndices = [];
                // aSelectedItems.forEach(function(oItem) {
                //     debugger
                //     var sPath = oItem.getBindingContext("empData").getPath();
                //     var nIndex = parseInt(sPath.substring(sPath.lastIndexOf("/") + 1));
                //     aIndices.push(nIndex);
                // });
       
                
                // aIndices.sort(function(a, b) {
                //     debugger
                //     return b - a;
                // });
       
               
                // aIndices.forEach(function(index) {
                //     debugger
                //     aData.splice(index, 1);
                // });
                // if(header=="UI5"){
                //     oModel.setProperty("/UI5", aData);
                // }else if(header=="ABAP"){
                //     oModel.setProperty("/ABAP", aData);
                // }else if(header=="SALESFORCE"){
                //     oModel.setProperty("/SALESFORCE", aData);
                // }else if(header=="HYBRIS"){
                //     oModel.setProperty("/HYBRIS", aData);
                // }
                
                
       
                
                // oList.removeSelections();
                // this.deletePopUp.close()
                // this.deletePopUp.destroy(true);
                // this.deletePopUp = null
                // MessageToast.show('DELETE SUCCESSFUL')
            },
            onRequest:function(){
                debugger
               
    
                var data=this.getView().getModel('newModel').oData
                var oldId2 = this.getView().byId('sumneKottiddu').getText().split(' ')[this.getView().byId('sumneKottiddu').getText().split(' ').length-1]
                var oModelData2=this.getView().getModel('newModel').oData.all[0]

                var Id4,Name4,Department4,Designation4,Joindate4,Contactnumber4,Mailid4,Mockrating4,
                    Password4,Request4,Review4,Pwdchange4,Sample14,Sample24,Sample34,Sample44,Sample54,Sample64
                    oModelData2.forEach((x)=>{
                        if(x.Id==oldId2){
                            debugger
                            Id4=x.Id,Name4=x.Name,Department4=x.Department,Designation4=x.Designation,Joindate4=x.Joindate,
                            Contactnumber4=x.Contactnumber,Mailid4=x.Mailid,Mockrating4=x.Mockrating,Password4=x.Password,Request4=x.Request,Review4=x.Review,Pwdchange4=x.Pwdchange,Sample14=x.Sample1
                            Sample24=x.Sample2,Sample34=x.Sample3,Sample44=x.Sample4,Sample54=x.Sample5,Sample64=x.Sample6
                        }
                    })
                    // console.log(Id4,Name4,Department4,Designation4,Joindate4,Contactnumber4,Mailid4,Mockrating4,
                    //     Password4,Request4,Review4,Pwdchange4,Sample14,Sample24,Sample34,Sample44,Sample54,Sample64)
                    debugger
                    var empObj24={
                        Id:Id4,
                        Name:Name4,
                        Department:Department4,
                        Designation:Designation4,
                        Joindate:Joindate4,
                        Contactnumber:Contactnumber4,
                        Mailid:Mailid4,
                        Mockrating:Mockrating4,
                        Password:Password4,
                        Request:"TRUE",
                        Review:Review4,
                        Pwdchange:Pwdchange4,
                        Sample1:Sample14,
                        Sample2:Sample24,
                        Sample3:Sample34,
                        Sample4:Sample44,
                        Sample5:Sample54,
                        Sample6:Sample64
                    }
                    // console.log(empObj24)
                    // MessageToast.show("Requested Successfully")
                    if(Request4=="FALSE"){

                    
                    var that=this
                    this.getOwnerComponent().getModel("abc").update("/ZGUI5APP1Set('"+oldId2+"')",empObj24,{
                
                        method: "PATCH",
                        success: function(){
                            debugger
                            MessageToast.show("Requested Successfully")
                            // that.cancelEdit()
                            that.bindingData()
                            
                        },
                        error: function(){
                            debugger
                            MessageToast.show("ERROR IN UPDATING")
                        }
                       })
                }else {
                    MessageToast.show("Already Requested")
                }

























                // var s=this.getView().byId("ObjectPageLayout")
                // var ss=s.mObjectBindingInfos.empData.path
                // var index=ss.split('/')[ss.split('/').length-1]
               
                // if(header=="UI5"){
                //    var empobj= data.UI5[index]
                // }else if(header=="ABAP"){
                //     var empobj= data.ABAP[index]
                // }else if(header=="SALESFORCE"){
                //     var empobj= data.SALESFORCE[index]
                // }else if(header=="HYBRIS"){
                //     var empobj= data.HYBRIS[index]
                // }
                // console.log(empobj);
                // var rData=this.getView().getModel('requestData')
                // var rObject={
                //     name:empobj.name ,
                //     designation:empobj.designation,
                //     contactNo:empobj.contactNo,
                //     mailId:empobj.mailId,
                //     empId:empobj.empId
                // }
                // if(header=="UI5"){
                //     rData.oData.UI5.push(rObject)
                // }else if(header=="ABAP"){
                //     rData.oData.ABAP.push(rObject)
                // }else if(header=="SALESFORCE"){
                //     rData.oData.SALESFORCE.push(rObject)
                // }else if(header=="HYBRIS"){
                //     rData.oData.HYBRIS.push(rObject)
                // }
                // rData.refresh(true)
                // rData.setData(rData,rObject)
                // sap.ui.getCore().setModel(rData)
                // MessageToast.show('Request Sent Successfully')
   
            },
            adminLogout2:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo("RouteLogin")
            },
            goBack:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo("AdminPage1")
            },
            onEnterDetails1:function(){
                debugger
                var a=sap.ui.getCore().byId("_IDGenInput1")
                a.setValueState("None")  
            },
            onEnterDetails2:function(){
                debugger
                var b=sap.ui.getCore().byId("_IDGenInput2")
                b.setValueState("None")
            },
            onEnterDetails3:function(){
                debugger
                var c=sap.ui.getCore().byId("_IDGenInput3")
                c.setValueState("None")
            },
            onEnterDetails4:function(){
                debugger
                var d=sap.ui.getCore().byId("_IDGenInput4")
                d.setValueState("None")
            },
            onEnterDetails5:function(){
                debugger
                var e=sap.ui.getCore().byId("_IDGenInput5")
                e.setValueState("None")
            },
            onEnterDetails6:function(){
                debugger
                var f=sap.ui.getCore().byId("_IDGenInput6")
                f.setValueState("None")
            },
            onEnterDetails7:function(){
                debugger
                var g=sap.ui.getCore().byId("_IDGenInput7")
                g.setValueState("None")
            },
            onEnterDetails8:function(){
                debugger
                var h=sap.ui.getCore().byId("_IDGenInput8")
                h.setValueState("None")
            },
            onEnterDetails9:function(){
                debugger
                var i=sap.ui.getCore().byId("_IDGenInput9")
                i.setValueState("None")
            },
            onOverView:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo('overView', {h:header})
            },
            
            onSearch:function(oEvent){
                debugger
               
                MessageToast.show("Searched")
                var searchValue=oEvent.getSource().getValue().toUpperCase()
                var valueLength=searchValue.length
                if(valueLength<=0){
                    this.bindingData()
                }else if(valueLength>0){
                    debugger
                    var that = this
                    this.getOwnerComponent().getModel("abc").callFunction("/searchName",{
                        method:"GET",
                        urlParameters:{
                            Name: searchValue
                        },
                        success: function(data){
                            debugger
                            var oModel=that.getView().getModel("newModel").oData
                            data.results.forEach((x)=>{
                                debugger
                                if(x.Department==header){
                                    oModel.filters.push(x)
                                }
                            })
                            debugger
                            that.getView().byId("idList").bindElement("newModel>/filters")
                            MessageToast.show(`${data.results[0].Name} Found`)
                        },
                        error: function(data){
                            debugger
                            MessageToast.show(data,"Error")
                        }
                    })

                } 
                
                // var searchValue2=searchValue1.to
               
			// var sQuery = oEvent.getSource().getValue();
			// if (sQuery && sQuery.length > 0) {
			// 	var filter = new Filter("name", FilterOperator.Contains, sQuery);
			// 	aFilters.push(filter);
			// }

			// // update list binding
			// var oList = this.byId("idList");
			// var oBinding = oList.getBinding("items");
			// oBinding.filter(aFilters, "Application");

            },
            editPopUp:null,
            editEmpDetails:function(){
                debugger
                if(!this.editPopUp){
                    debugger
                    this.editPopUp=new sap.ui.xmlfragment("uiapp.project1.fragments.editEmp", this)
                    
                    this.getView().addDependent(this.editPopUp);
                    
                //  
                    this.editPopUp.open()
                }else{
                    this.editPopUp.open()
                }

                var data=this.getView().getModel('newModel').oData
                var s=this.getView().byId("ObjectPageLayout")
                var ss=s.mObjectBindingInfos.newModel.path
                var index=ss.split('/')[ss.split('/').length-1]
               debugger
                if(header=="UI5"){
                   var name2= data.UI5[index].Name
                }else if(header=="ABAP"){
                    var name2= data.ABAP[index].Name
                }else if(header=="SLF"){
                    var name2= data.SLF[index].Name
                }else if(header=="HYB"){
                    var name2= data.HYB[index].Name
                }
                // console.log(empobj);
                sap.ui.getCore().byId("editedJoinDate").setMaxDate(new Date()) 
                var x=sap.ui.getCore().byId('editEmpForm')
                x.bindElement('newModel>'+ss)

                var editTitle=sap.ui.getCore().byId('editEmpDialog')
                editTitle.setTitle("Change Details For "+ name2) 
                debugger 
            },
            cancelEdit:function(){
                debugger
                this.editPopUp.close()
                this.editPopUp.destroy(true);
                this.editPopUp = null
            },
            onPresEditSave:function(){
                debugger
                var a=sap.ui.getCore().byId('editedName')
                var b=sap.ui.getCore().byId('editedContactNo')
                var c=sap.ui.getCore().byId('editedMail')
                var d=sap.ui.getCore().byId('editedJoinDate')
                var e=sap.ui.getCore().byId('editedExperience')

                var editedName=a.getValue()
                var editedContactNo=b.getValue()
                var editedMail=c.getValue()
                var editedJoinDate=d.getValue()
                var editedExperience=e.getValue()

                var s=this.getView().byId("ObjectPageLayout")
                var ss=s.mObjectBindingInfos.newModel.path
                var index=ss.split('/')[ss.split('/').length-1]
                var oModel=this.getView().getModel('newModel')
                if(header=="UI5"){
                   var oModelData=oModel.oData.UI5[index]
                }else if(header=="ABAP"){
                    var oModelData=oModel.oData.ABAP[index]
                }else if(header=="SLF"){
                    var oModelData=oModel.oData.SLF[index]
                }else if(header=="HYB"){
                    var oModelData=oModel.oData.HYB[index]
                }
                // var oData=this.getView().getModel(newModel)
                var NameVal =/^[A-Za-z]{3,25}$/
                var PhoneVal =/^[6-9][0-9]{9}$/
                var EmailVal =/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
                if(editedName=="" || editedContactNo=="" || editedMail==""  || editedJoinDate=="" || editedExperience==""){
                    var arr=[a,b,c,d,e]
                    debugger
                    arr.forEach((x)=>{
                        if(x.sId=="editedName"){
                            if(editedName==""){
                                a.setValueState("Error")
                                a.setValueStateText("Name Cannot be Empty")
                            }
                        }else if(x.sId=="editedContactNo"){
                            if(editedContactNo==""){
                                b.setValueState("Error")
                                b.setValueStateText("Contact Number Cannot be Empty")
                            }
                        }else if(x.sId=="editedMail"){
                            if(editedMail==""){
                                c.setValueState("Error")
                                c.setValueStateText("Mail Cannot be Empty")
                            }
                        }else if(x.sId=="editedJoinDate"){
                            if(editedJoinDate==""){
                                d.setValueState("Error")
                                d.setValueStateText("Join Date Cannot be Empty")
                            }
                        }else if(x.sId=="editedExperience"){
                            if(editedExperience==""){
                                e.setValueState("Error")
                                e.setValueStateText("Experience Cannot be Empty")
                            }
                        }
                    })
                }else if( !NameVal.test(editedName) || !PhoneVal.test(editedContactNo) || !EmailVal.test(editedMail)){
                    var abc=[a,b,c]
                    debugger
                    abc.forEach((x)=>{
                        if(x.sId=="editedName"){
                            if(!NameVal.test(editedName)){
                                a.setValueState("Error")
                                a.setValueStateText("Enter Valid Name")
                            }
                        }else if(x.sId=="editedContactNo"){
                            if(!PhoneVal.test(editedContactNo)){
                                b.setValueState("Error")
                                b.setValueStateText("Enter Contact Number")
                            }
                        }else if(x.sId=="editedMail"){
                            if(!EmailVal.test(editedMail)){
                                c.setValueState("Error")
                                c.setValueStateText("Enter Valid Mail ID")
                            }
                        }
                    })
                }else if(editedExperience>15){
                    e.setValueState("Error")
                    e.setValueStateText("Experience Should be Below 15")
                    
                }else {
                    debugger
                    var oldId = this.getView().byId('sumneKottiddu').getText().split(' ')[this.getView().byId('sumneKottiddu').getText().split(' ').length-1]
                    var oModelData=this.getView().getModel('newModel').oData.all[0]
                    var Id3,Name3,Department3,Designation3,Joindate3,Contactnumber3,Mailid3,Mockrating3,
                    Password3,Request3,Review3,Pwdchange3,Sample13,Sample23,Sample33,Sample43,Sample53,Sample63
                    oModelData.forEach((x)=>{
                        if(x.Id==oldId){
                            Id3=x.Id,Name3=x.Name,Department3=x.Department,Designation3=x.Designation,Joindate3=x.Joindate,
                            Contactnumber3=x.Contactnumber,Mailid3=x.Mailid,Mockrating3=x.Mockrating,Password3=x.Password,Request3=x.Request,Review3=x.Review,Pwdchange3=x.Pwdchange,Sample13=x.Sample1
                            Sample23=x.Sample2,Sample33=x.Sample3,Sample43=Sample43,Sample53=x.Sample5,Sample63=x.Sample6
                        }
                    })
                    // console.log(Id3,Name3,Department3,Designation3,Joindate3,Contactnumber3,Mailid3,Mockrating3,
                    //     Password3,Request3,Review3,Pwdchange3,Sample13,Sample23,Sample33,Sample43,Sample53,Sample63)
                    debugger
                    var empObj2={
                        Id:Id3,
                        Name:editedName,
                        Department:Department3,
                        Designation:Designation3,
                        Joindate:editedJoinDate,
                        Contactnumber:editedContactNo,
                        Mailid:editedMail,
                        Mockrating:Mockrating3,
                        Password:Password3,
                        Request:Request3,
                        Review:Review3,
                        Pwdchange:Pwdchange3,
                        Sample1:editedExperience,
                        Sample2:Sample23,
                        Sample3:Sample33,
                        Sample4:Sample43,
                        Sample5:Sample53,
                        Sample6:Sample63
                    }
                    var that=this
                    this.getOwnerComponent().getModel("abc").update("/ZGUI5APP1Set('"+Id3+"')",empObj2,{
                
                        method: "PATCH",
                        success: function(){
                            debugger
                            MessageToast.show("Updated Successfully")
                            that.cancelEdit()
                            that.bindingData()
                            
                        },
                        error: function(){
                            debugger
                            MessageToast.show("ERROR IN UPDATING")
                        }
                       })
                }

















                // if(editedName=="" && editedContactNo=="" && editedMail=="" && editedJoinDate=="" && editedExperience==""){
                //     a.setValueState('Error')
                //     a.setValueStateText('Name Field Cannot be Empty')

                //     b.setValueState('Error')
                //     b.setValueStateText('Contact Number Field Cannot be Empty')

                //     c.setValueState('Error')
                //     c.setValueStateText('Mail Field Cannot be Empty')

                //     d.setValueState('Error')
                //     d.setValueStateText('JoinDate Field Cannot be Empty')

                //     e.setValueState('Error')
                //     e.setValueStateText('Experience Field Cannot be Empty')

                //     MessageToast.show('ENTER ALL THE DETAILS')
                // }else if(editedContactNo=="" && editedMail=="" && editedJoinDate=="" && editedExperience==""){
                //     b.setValueState('Error')
                //     b.setValueStateText('Contact Number Field Cannot be Empty')

                //     c.setValueState('Error')
                //     c.setValueStateText('Mail Field Cannot be Empty')

                //     d.setValueState('Error')
                //     d.setValueStateText('JoinDate Field Cannot be Empty')

                //     e.setValueState('Error')
                //     e.setValueStateText('Experience Field Cannot be Empty')

                //     MessageToast.show('ENTER ALL THE DETAILS')
                // }else if(editedMail=="" && editedJoinDate=="" && editedExperience==""){
                //     c.setValueState('Error')
                //     c.setValueStateText('Mail Field Cannot be Empty')

                //     d.setValueState('Error')
                //     d.setValueStateText('JoinDate Field Cannot be Empty')

                //     e.setValueState('Error')
                //     e.setValueStateText('Experience Field Cannot be Empty')

                //     MessageToast.show('ENTER ALL THE DETAILS')
                // }else if(editedJoinDate=="" && editedExperience==""){
                //     d.setValueState('Error')
                //     d.setValueStateText('JoinDate Field Cannot be Empty')

                //     e.setValueState('Error')
                //     e.setValueStateText('Experience Field Cannot be Empty')

                //     MessageToast.show('ENTER ALL THE DETAILS')
                // }else if(editedExperience==""){
                //     e.setValueState('Error')
                //     e.setValueStateText('Experience Field Cannot be Empty')
                // }else if(editedName=="" || editedContactNo=="" || editedMail=="" || editedJoinDate=="" || editedExperience==""){
                //     if(editedName==""){
                //         a.setValueState('Error')
                //         a.setValueStateText('Name Field Cannot be Empty')
                //         MessageToast.show('ENTER NAME')
                //     }else if(editedContactNo==""){
                //         b.setValueState('Error')
                //         b.setValueStateText('Contact Number Field Cannot be Empty')
                //         MessageToast.show('ENTER CONTACT NUMBER')
                //     }else if(editedMail==""){
                //         c.setValueState('Error')
                //         c.setValueStateText('Mail Field Cannot be Empty')
                //         MessageToast.show('ENTER MAIL ID')
                //     }else if(editedJoinDate==""){
                //         d.setValueState('Error')
                //         d.setValueStateText('JoinDate Field Cannot be Empty')
                //         MessageToast.show('SELECT JOIN DATE')
                //     }else if(editedExperience==""){
                //         e.setValueState('Error')
                //         e.setValueStateText('Experience Field Cannot be Empty')
                //         MessageToast.show('ENTER EXPERIENCE')
                //     }
                // }else if(!NameVal.test(editedName)){
                //     a.setValueState('Error')
                //     a.setValueStateText('ENTER VALID NAME')
                // }else if(!PhoneVal.test(editedContactNo)){
                   
                //     b.setValueState("Error");
                //     b.setValueStateText("Please enter valid contact number");
                
                // }else if(!EmailVal.test(editedMail)){
                    
                //     c.setValueState("Error");
                //     c.setValueStateText("Please enter valid email id");

                // }else {
                //     oModelData.name=editedName
                //     oModelData.contactNo=editedContactNo
                //     oModelData.mailId=editedMail
                //     oModelData.joiningDate=editedJoinDate
                //     oModelData.experienceInYear=editedExperience

                //     oModel.refresh(true)
                //     MessageToast.show('UPDATED SUCCESSFULLY')
                //     // rData.setData(rData,rObject)
                //     // sap.ui.getCore().setModel(rData)
                //     this.editPopUp.close()
                //     this.editPopUp.destroy(true);
                //     this.editPopUp = null


                // }




            },
            abcd1:function(){
                debugger
                var a=sap.ui.getCore().byId('editedName')
                a.setValueState('None')
            },
            abcd2:function(){
                debugger
                var b=sap.ui.getCore().byId('editedContactNo')
                b.setValueState('None')
            },
            abcd3:function(){
                debugger
                var c=sap.ui.getCore().byId('editedMail')
                c.setValueState('None')
            },
            abcd4:function(){
                debugger
                var d=sap.ui.getCore().byId('editedJoinDate')
                d.setValueState('None')
            },
            abcd5:function(){
                debugger
                var e=sap.ui.getCore().byId('editedExperience')
                e.setValueState('None')
            },
            formatname:function(x){
                debugger
                return x.toLowerCase()
            }
            
            
        });
    });
