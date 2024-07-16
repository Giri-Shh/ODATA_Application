sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";
        var deptName2;
        var index2;
        var empName2;
        var empId2;
        var empDept2;
        var empPwd2;
        var pwdChange;
        return Controller.extend("uiapp.project1.controller.Login", {
            pwdChanegpPopup:null,
            
        
            onInit: function () {
                debugger
            //     window.history.pushState(null, document.title, window.location.href);    
            //     window.addEventListener('popstate', function (event) {      
            //     window.history.pushState(null, document.title, window.location.href);
 
            // })

            var that = this
            var oModel=new sap.ui.model.json.JSONModel()
                this.getOwnerComponent().getModel("abc").read("/ZGUI5APP1Set",{
                    method:"GET",
                    success:function (data, response) {
                        debugger
                        var empData={UI5:[],ABAP:[],HYB:[],SLF:[],all:data.results}
                        debugger
                        data.results.forEach((X)=>{
                            if(X.Department=='UI5'){
                                empData.UI5.push(X)
                            }else if(X.Department=='ABAP'){
                                empData.ABAP.push(X)
                            }else if(X.Department=='HYB'){
                                empData.HYB.push(X)
                            }else if(X.Department=='SLF'){
                                empData.SLF.push(X)
                            }
                        })
                        oModel.setData(empData)
                        sap.ui.getCore().setModel(oModel,"Rani")
                        MessageToast.show("Data Loaded")
                    },
                    error:function(){
                        MessageToast.show("Error")
                    }
                })
            },
            onChange1:function(){   
                var f=this.getView().byId("userId")
                f.setValueState('None')
            },
            onChange2:function(){   
                var g=this.getView().byId("userPwd")
                g.setValueState('None')
            },
            pwdChanegpPopup:null,
            onPress:function(){
                debugger
                var f=this.getView().byId("userId")
                var g=this.getView().byId("userPwd")
                var userId=f.getValue()
                var userPwd=g.getValue()
               
                
                debugger
                var oModel = sap.ui.getCore().getModel('Rani')
                var oModelData = oModel.oData
                debugger
                oModelData.all.forEach((x)=>{
                    if(userPwd==x.Password && userId==x.Id ){
                    console.log(x.Name)
                        debugger
                        empName2=x.Name
                        empId2=x.Id
                        empDept2=x.Department
                        empPwd2=x.Password
                        pwdChange=x.Pwdchange

                }

            })
                console.log(empName2,empId2,empDept2,empPwd2,pwdChange)
                if(userId=="" && userPwd==''){
                    f.setValueState("Error")
                    g.setValueState("Error")
                    f.setValueStateText("Please Enter Your User ID")
                    g.setValueStateText("Please Enter Your Password")
                    MessageToast.show("User Id and Pasword are required to Login")
                }else if(userId=="Admin" && userPwd=='1234'){
                    debugger
                    f.setValue("")
                    g.setValue("")
                    this.getOwnerComponent().getRouter().navTo('AdminPage1')


                }else if( userId==empId2 && userPwd==empPwd2){
                    if(pwdChange=="FALSE"){
                        this.pwdChanegpPopup=new sap.ui.xmlfragment("uiapp.project1.fragments.pwdChange", this)
                        this.pwdChanegpPopup.setTitle("Change Your Passwords Here")
                        var listId2=sap.ui.getCore().byId('pwdChangeDialog')
                        this.getView().addDependent(this.pwdChanegpPopup);
                        this.pwdChanegpPopup.open()
                    }else {
                    f.setValue("")
                    g.setValue("")
                    this.getOwnerComponent().getRouter().navTo('Emp1',{y:empDept2,z:empId2})
                    MessageToast.show(`${empName2},${empId2},${empDept2},${empPwd2},${pwdChange}`)
                    
                    this.onInit();
                    }
                }else {
                    f.setValueState("Error")
                    g.setValueState("Error")
                    f.setValueStateText("Please Give Valid User Id")
                    g.setValueStateText("Please Give Valid Password")
                    MessageToast.show("User Not Found")
                }



































                // var x=this.getView().getModel('empData').oData;
                // var y=Object.keys(x)
                // var deptName;
                // var index;
                // for(let i=0;i<y.length;i++){
                //     if(y[i]=="UI5"){
                //         for (let j=0;j<x.UI5.length;j++){
                //             if(x.UI5[j].pwd==userPwd && x.UI5[j].empId==userId){
                //                 deptName="UI5"
                //                 index=j
                //                 deptName2=deptName
                //                 index2=index
                //                 break
                //             }
                //         }
                //     }else if(y[i]=="ABAP"){
                //         for (let j=0;j<x.ABAP.length;j++){
                //             if(x.ABAP[j].pwd==userPwd && x.ABAP[j].empId==userId){
                //                 deptName="ABAP"
                //                 index=j
                //                 deptName2=deptName
                //                 index2=index
                //                 break
                //             }
                //         }
                //     }else if(y[i]=="SALESFORCE"){
                //         for (let j=0;j<x.SALESFORCE.length;j++){
                //             if(x.SALESFORCE[j].pwd==userPwd && x.SALESFORCE [j].empId==userId){
                //                 deptName="SALESFORCE"
                //                 index=j
                //                 deptName2=deptName
                //                 index2=index
                //                 break
                //             }
                //         }
                //     }if(y[i]=="HYBRIS"){
                //         for (let j=0;j<x.HYBRIS.length;j++){
                //             if(x.HYBRIS[j].pwd==userPwd && x.HYBRIS[j].empId==userId){
                //                 deptName="HYBRIS"
                //                 index=j
                //                 deptName2=deptName
                //                 index2=index
                //                 break
                //             }
                //         }
                //     }
                // }  
                // debugger
                
                //  if(userId == "" && userPwd==""){
                //     g.setValueState("Error")
                //     f.setValueState("Error")

                //     f.setValueStateText("User Id cannot be empty")


                //     g.setValueStateText("Password cannot be empty")
                // }else if(userId=="" || userPwd==""){
                //     debugger    
                //     if(userId==""){
                //         f.setValueState("Error")
                //         f.setValueStateText("User Id cannot be empty")
                //         MessageToast.show("Enter USER ID")
                //     }else if(userPwd==""){
                //         g.setValueState("Error")
                //         g.setValueStateText("Password cannot be empty")
                //         MessageToast.show("Enter PASSWORD")
                //     }
                // }
                // else if(userId=="Admin" && userPwd=="1234"){
                //     this.getOwnerComponent().getRouter().navTo('AdminPage1')
                //     g.setValue("");
                //     f.setValue("")

                // }else if(deptName == undefined){
                //     debugger
                //     f.setValueState("Error")
                //     f.setValueStateText("User ID not found")

                //     g.setValueStateText("Password not found")

                //     g.setValueState("Error")
                //     MessageToast.show("User not found")
                    
                // }else {
                //     debugger
                //     if(deptName =="UI5"){
                //         var d=x.UI5[index].pStatus
                //     }else if(deptName =="ABAP"){
                //         var d=x.ABAP[index].pStatus
                //     }else if(deptName =="SALESFORCE"){
                //         var d=x.SALESFORCE[index].pStatus
                //     }else if(deptName =="HYBRIS"){
                //         var d=x.HYBRIS[index].pStatus
                //     }
                    
                //     if(d=="notChanged"){
                //     this.pwdChanegpPopup=new sap.ui.xmlfragment("uiapp.project1.fragments.pwdChange", this)
                //     this.pwdChanegpPopup.setTitle("Change Your Passwords Here")
                //     var listId2=sap.ui.getCore().byId('pwdChangeDialog')
                //     this.getView().addDependent(this.pwdChanegpPopup);
                //     this.pwdChanegpPopup.open()
                //     }else {
                //         if(deptName =="UI5"){
                //             var d=x.UI5[index]
                //         }else if(deptName =="ABAP"){
                //             var d=x.ABAP[index] 
                //         }else if(deptName =="SALESFORCE"){
                //             var d=x.SALESFORCE[index] 
                //         }else if(deptName =="HYBRIS"){
                //             var d=x.HYBRIS[index] 
                //         }
                //         var oLogData=this.getView().getModel('loginData')
                //         var oLogData2=oLogData.oData
                //         console.log(oLogData2);
                           
                //         console.log( oLogData2.EMPDETAIL);
                //         oLogData2.EMPDETAIL.push(d)
                //         oLogData.refresh(true)
                //         oLogData.setData(oLogData2,d)
                //         sap.ui.getCore().setModel(oLogData)
                //         this.getOwnerComponent().getRouter().navTo('Emp1',{y:deptName,z:index})
                //     }

                //     g.setValue("");
                //     f.setValue("");
                // }
            
            // }
        },
            onPressPwdChangeCancel:function(){
                debugger
                this.pwdChanegpPopup.close()
                this.pwdChanegpPopup.destroy(true);
                this.pwdChanegpPopup = null
            },
            onPressReset:function(){
                debugger
                var f=this.getView().byId("userId")
                var g=this.getView().byId("userPwd")
                f.setValue(null)
                g.setValue(null)
                f.setValueState('None')
                g.setValueState('None')
            },
            selectshowPwd1:function(){
                debugger
                var sp1=sap.ui.getCore().byId("changePwdOld")
                if(sp1.getProperty('type')=="Text"){
                    sp1.setProperty('type','Password')
                }else{
                    sp1.setProperty('type','Text')
                }
            },
            selectshowPwd2:function(){
                debugger
                var sp1=sap.ui.getCore().byId("changePwdNew1")
                if(sp1.getProperty('type')=="Text"){
                    sp1.setProperty('type','Password')
                }else{
                    sp1.setProperty('type','Text')
                }
            },
            selectshowPwd3:function(){
                debugger
                var sp1=sap.ui.getCore().byId("changePwdNew2")
                if(sp1.getProperty('type')=="Text"){
                    sp1.setProperty('type','Password')
                }else{
                    sp1.setProperty('type','Text')
                }     
            },
            onPressSavePassword:function(){
                debugger
                
                var a=sap.ui.getCore().byId('changePwdOld')
                var b=sap.ui.getCore().byId('changePwdNew1')
                var c=sap.ui.getCore().byId('changePwdNew2')
                var oldPwd=a.getValue()
                var newPwd1=b.getValue()
                var newPwd2=c.getValue()
                var UserPassRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;


                // var empModel=this.getView().getModel('empData')
                // var empmodelData=empModel.oData
                // if(deptName2 =="UI5"){
                //     var d=empmodelData.UI5[index2].pwd
                // }else if(deptName2 =="ABAP"){
                //     var d=empmodelData.ABAP[index2].pwd
                // }else if(deptName2 =="SALESFORCE"){
                //     var d=empmodelData.SALESFORCE[index2].pwd
                // }else if(deptName2 =="HYBRIS"){
                //     var d=empmodelData.HYBRIS[index2].pwd
                // }
                var Id2,Name2,Department2,Designation2,Joindate2,Contactnumber2,Mailid2,Mockrating2,Password2,    Request2,    Review2,    Pwdchange2,    Sample12,    Sample22,    Sample32,    Sample42,    Sample52,    Sample62


                var oModel = sap.ui.getCore().getModel('Rani')
                var OModelData = oModel.oData
                OModelData.all.forEach((x)=>{
                    if(x.Id==empId2){
                        debugger
                        console.log(x)
                        Id2=x.Id,
                        Name2=x.Name,
                        Department2=x.Department,
                        Designation2=x.Designation,
                        Joindate2=x.Joindate,
                        Contactnumber2=x.Contactnumber,
                        Mailid2=x.Mailid,
                        Mockrating2=x.Mockrating,
                        Password2=newPwd2,
                        Request2=x.Request,
                        Review2=x.Review,
                        Pwdchange2='TRUE',
                        Sample12=x.Sample1,
                        Sample22=x.Sample2,
                        Sample32=x.Sample3,
                        Sample42=x.Sample4,
                        Sample52=x.Sample5,
                        Sample62=x.Sample6

                    }
                })
debugger



                if(empPwd2!=oldPwd){
                    a.setValueState('Error')
                    a.setValueStateText('Old Password Is Incorrect')
                }else if(!UserPassRegex.test(newPwd1)){
                    b.setValueState('Error')
                    b.setValueStateText('Password Should Contain atleason one digit, on special Character and length should be 7 to 15 characters')
                }else if(!UserPassRegex.test(newPwd2)){
                    b.setValueState('Error')
                    b.setValueStateText('Password Should Contain atleason one digit, on special Character and length should be 7 to 15 characters')
                }else if(newPwd1 != newPwd2){
                    b.setValueState('Error')
                    b.setValueStateText("Passwords are Not Matching")
                    c.setValueState('Error')
                    c.setValueStateText("Passwords are Not Matching")
                }else {
                    debugger
                    var empObj={
                        Id:Id2,
                        Name:Name2,
                        Department:Department2,
                        Designation:Designation2,
                        Joindate:Joindate2,
                        Contactnumber:Contactnumber2,
                        Mailid:Mailid2,
                        Mockrating:Mockrating2,
                        Password:Password2,
                        Request:Request2,
                        Review:Review2,
                        Pwdchange:Pwdchange2,
                        Sample1:Sample12,
                        Sample2:Sample22,
                        Sample3:Sample32,
                        Sample4:Sample42,
                        Sample5:Sample52,
                        Sample6:Sample62

                    }
debugger

                    var that = this
                    this.getOwnerComponent().getModel('abc').update("/ZGUI5APP1Set('"+empId2+"')",empObj,{
                
                        method: "PATCH",
                        success: function(){
                            debugger
                            MessageToast.show("Updated Successfully")
                            that.onInit()
                            
                        },
                        error: function(){
                            debugger
                            MessageToast.show("ERROR IN UPDATING")
                        }
                       })
        



                    // if(deptName2 =="UI5"){
                    //     empmodelData.UI5[index2].pwd=newPwd1
                    //     empmodelData.UI5[index2].pStatus="Changed"
                    // }else if(deptName2 =="ABAP"){
                    //     empmodelData.ABAP[index2].pwd=newPwd1
                    //     empmodelData.ABAP[index2].pStatus="Changed"
                    // }else if(deptName2 =="SALESFORCE"){
                    //     empmodelData.SALESFORCE[index2].pwd=newPwd1
                    //     empmodelData.SALESFORCE[index2].pStatus="Changed"
                    // }else if(deptName2 =="HYBRIS"){
                    //     empmodelData.HYBRIS[index2].pwd=newPwd1
                    //     empmodelData.HYBRIS[index2].pStatus="Changed"
                    // }
                    // empModel.refresh(true)
                    // // rData.setData(rData,rObject)
                    // sap.ui.getCore().setModel(empModel)
                    MessageToast.show('Password Changed SuccesFully and your New Password Is'+ newPwd1)

                   this.onPressPwdChangeCancel()
                    
                }
            },
            forgotPopUp:null,
            forgotPassword:function(){
                debugger
                if(!this.forgotPopUp){
                    debugger
                    this.forgotPopUp=new sap.ui.xmlfragment("uiapp.project1.fragments.forgotPass", this)
                    this.getView().addDependent(this.forgotPopUp);
                    var s=sap.ui.getCore().byId('forgotDialog')
                    s.setTitle('RESET YOUR PASSWORD')
                    this.forgotPopUp.open()
                }else{
                    this.forgotPopUp.open()
                }
            },
            cancelForgot:function(){
                debugger
                this.forgotPopUp.close()
                this.forgotPopUp.destroy(true);
                this.forgotPopUp = null
            },
            Validate:function(){
                debugger
                var a=sap.ui.getCore().byId('forgotEmpId')
                var b=sap.ui.getCore().byId('forgotEmpNo')
                var c=sap.ui.getCore().byId('forgotPwd')
                var d=sap.ui.getCore().byId('forgotCnfpwd')
                var e=sap.ui.getCore().byId('forCheck1')
                var f=sap.ui.getCore().byId('forCheck2')

                
                
                var forgorEmpId=a.getValue()
                var forgotEmpNo=b.getValue()
                var forgotPwd=c.getValue()

                var matched;

                sap.ui.getCore().getModel('Rani').oData.all.forEach((x)=>{
                    if(x.Id==forgorEmpId && x.Contactnumber==forgotEmpNo){
                       
                        matched = true
                    }
                })

                if(matched) {
                    a.setProperty('enabled',false)
                    b.setProperty('enabled',false)
                    c.setProperty('enabled',true)
                    d.setProperty('enabled',true) 
                    e.setProperty('enabled',true) 
                    f.setProperty('enabled',true) 
                }else{
                    a.setValueState('Error')
                    b.setValueState('Error')
                    MessageToast.show("EMPID AND NUMBER ARE NOT MATCHING")
                }
               

                // var z=this.getView().getModel('empData');
                // var x=z.oData
                // var y=Object.keys(x)
                // var deptName;
                // var index;
                // for(let i=0;i<y.length;i++){
                //     if(y[i]=="UI5"){
                //         for (let j=0;j<x.UI5.length;j++){
                //             if(x.UI5[j].contactNo==forgotEmpNo && x.UI5[j].empId==forgorEmpId){
                //                 deptName="UI5"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }else if(y[i]=="ABAP"){
                //         for (let j=0;j<x.ABAP.length;j++){
                //             if(x.ABAP[j].contactNo==forgotEmpNo && x.ABAP[j].empId==forgorEmpId){
                //                 deptName="ABAP"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }else if(y[i]=="SALESFORCE"){
                //         for (let j=0;j<x.SALESFORCE.length;j++){
                //             if(x.SALESFORCE[j].contactNo==forgotEmpNo && x.SALESFORCE [j].empId==forgorEmpId){
                //                 deptName="SALESFORCE"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }if(y[i]=="HYBRIS"){
                //         for (let j=0;j<x.HYBRIS.length;j++){
                //             if(x.HYBRIS[j].contactNo==forgotEmpNo && x.HYBRIS[j].empId==forgorEmpId){
                //                 deptName="HYBRIS"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }
                // }

                // if(deptName=='UI5'){
                //     var oldEmpId=x.UI5[index].empId
                //     var oldContact=x.UI5[index].contactNo
                // }else if(deptName=='ABAP'){
                //     var oldEmpId=x.ABAP[index].empId
                //     var oldContact=x.ABAP[index].contactNo
                // }else if(deptName=='SALESFORCE'){
                //     var oldEmpId=x.SALESFORCE[index].empId
                //     var oldContact=x.SALESFORCE[index].contactNo
                // }else if(deptName=='HYBRIS'){
                //     var oldEmpId=x.HYBRIS[index].empId
                //     var oldContact=x.HYBRIS[index].contactNo
                // }

                // if(forgotEmpNo=="" && forgorEmpId==""){
                //     a.setValueState('Error')
                //     a.setValueStateText('EMP ID field cannot be empyt')
                //     b.setValueState('Error')
                //     b.setValueStateText('Contact Number field cannot be empyt')
                //     MessageToast.show('ENTER ALL THE FIELDS')
                // }else if(forgotEmpNo=="" || forgorEmpId==""){
                //     if(forgotEmpNo==""){
                //         b.setValueState('Error')
                //         b.setValueStateText('Contact Number field cannot be empyt')
                //         MessageToast.show('ENTER Contact Number')
                //     }else if(forgorEmpId==""){
                //         a.setValueState('Error')
                //         a.setValueStateText('EMP ID field cannot be empyt')
                //         MessageToast.show('ENTER EMP ID')
                       
                //     }
                // }else if(oldContact!=forgotEmpNo && oldEmpId!=forgorEmpId){
                //     a.setValueState('Error')
                //     a.setValueStateText('Enter Correct EMPID')
                //     b.setValueState('Error')
                //     b.setValueStateText('Enter Correct Contact No')
                //     MessageToast.show('USER NOT FOUND')
                // }else if(oldContact==forgotEmpNo && oldEmpId==forgorEmpId){
                //     debugger
                //     a.setProperty('enabled',false)
                //     b.setProperty('enabled',false)
                //     c.setProperty('enabled',true)
                //     d.setProperty('enabled',true) 
                //     e.setProperty('enabled',true) 
                //     f.setProperty('enabled',true)       
                // }
            },
            saveChangePassword:function(){
                debugger
                var a=sap.ui.getCore().byId('forgotEmpId')
                var b=sap.ui.getCore().byId('forgotEmpNo')
                var c=sap.ui.getCore().byId('forgotPwd')
                var d=sap.ui.getCore().byId('forgotCnfpwd')
                var e=sap.ui.getCore().byId('forCheck1')
                var f=sap.ui.getCore().byId('forCheck2')
                var forgorEmpId=a.getValue()
                var forgotEmpNo=b.getValue()
                var forgotPwd=c.getValue()
                var forgotCnfpwd=d.getValue()
                var UserPassRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
                var Id2,Name2,Department2,Designation2,Joindate2,Contactnumber2,Mailid2,Mockrating2,Password2,    Request2,    Review2,    Pwdchange2,    Sample12,    Sample22,    Sample32,    Sample42,    Sample52,    Sample62
                sap.ui.getCore().getModel('Rani').oData.all.forEach((x)=>{
                    if(x.Id==forgorEmpId){
                        debugger
                        console.log(x)
                        Id2=x.Id,
                        Name2=x.Name,
                        Department2=x.Department,
                        Designation2=x.Designation,
                        Joindate2=x.Joindate,
                        Contactnumber2=x.Contactnumber,
                        Mailid2=x.Mailid,
                        Mockrating2=x.Mockrating,
                        Password2=forgotPwd,
                        Request2=x.Request,
                        Review2=x.Review,
                        Pwdchange2=x.Pwdchange,
                        Sample12=x.Sample1,
                        Sample22=x.Sample2,
                        Sample32=x.Sample3,
                        Sample42=x.Sample4,
                        Sample52=x.Sample5,
                        Sample62=x.Sample6

                    }
                })
debugger


                // var z=this.getView().getModel('empData');
                // var x=z.oData
                // var y=Object.keys(x)
                // var deptName;
                // var index;
                // for(let i=0;i<y.length;i++){
                //     if(y[i]=="UI5"){
                //         for (let j=0;j<x.UI5.length;j++){
                //             if(x.UI5[j].contactNo==forgotEmpNo && x.UI5[j].empId==forgorEmpId){
                //                 deptName="UI5"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }else if(y[i]=="ABAP"){
                //         for (let j=0;j<x.ABAP.length;j++){
                //             if(x.ABAP[j].contactNo==forgotEmpNo && x.ABAP[j].empId==forgorEmpId){
                //                 deptName="ABAP"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }else if(y[i]=="SALESFORCE"){
                //         for (let j=0;j<x.SALESFORCE.length;j++){
                //             if(x.SALESFORCE[j].contactNo==forgotEmpNo && x.SALESFORCE [j].empId==forgorEmpId){
                //                 deptName="SALESFORCE"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }if(y[i]=="HYBRIS"){
                //         for (let j=0;j<x.HYBRIS.length;j++){
                //             if(x.HYBRIS[j].contactNo==forgotEmpNo && x.HYBRIS[j].empId==forgorEmpId){
                //                 deptName="HYBRIS"
                //                 index=j
                //                 break
                //             }
                //         }
                //     }
                // }

                // if(deptName=='UI5'){
                //     var oldEmpId=x.UI5[index].empId
                //     var oldContact=x.UI5[index].contactNo
                // }else if(deptName=='ABAP'){
                //     var oldEmpId=x.ABAP[index].empId
                //     var oldContact=x.ABAP[index].contactNo
                // }else if(deptName=='SALESFORCE'){
                //     var oldEmpId=x.SALESFORCE[index].empId
                //     var oldContact=x.SALESFORCE[index].contactNo
                // }else if(deptName=='HYBRIS'){
                //     var oldEmpId=x.HYBRIS[index].empId
                //     var oldContact=x.HYBRIS[index].contactNo
                // }

                // if(oldContact!=forgotEmpNo && oldEmpId!=forgorEmpId){
                //     a.setValueState('Error')
                //     a.setValueStateText('Enter Correct EMPID')
                //     b.setValueState('Error')
                //     b.setValueStateText('Enter Correct Contact No')
                //     MessageToast.show('USER NOT FOUND')
                // }else if(oldContact==forgotEmpNo && oldEmpId==forgorEmpId){
                //     debugger
                //     a.setProperty('enabled',false)
                //     b.setProperty('enabled',false)
                //     c.setProperty('enabled',true)
                //     d.setProperty('enabled',true) 
                //     e.setProperty('enabled',true) 
                //     f.setProperty('enabled',true) 
                      
                // }


                if(!UserPassRegex.test(forgotPwd)){
                    c.setValueState('Error')
                    c.setValueStateText('Poor Password Criteria')
                    MessageToast.show('Poor Password Criteria')
                }else if(forgotPwd!=forgotCnfpwd){
                    c.setValueState('Error')
                    c.setValueStateText('PasswordsNot Matching')
                    d.setValueState('Error')
                    d.setValueStateText('PasswordsNot Matching')
                    MessageToast.show('passwords are not matching')
                }else {
                    debugger
                    var empObj={
                        Id:Id2,
                        Name:Name2,
                        Department:Department2,
                        Designation:Designation2,
                        Joindate:Joindate2,
                        Contactnumber:Contactnumber2,
                        Mailid:Mailid2,
                        Mockrating:Mockrating2,
                        Password:Password2,
                        Request:Request2,
                        Review:Review2,
                        Pwdchange:Pwdchange2,
                        Sample1:Sample12,
                        Sample2:Sample22,
                        Sample3:Sample32,
                        Sample4:Sample42,
                        Sample5:Sample52,
                        Sample6:Sample62

                    }
debugger

                    var that = this
                    this.getOwnerComponent().getModel('abc').update("/ZGUI5APP1Set('"+forgorEmpId+"')",empObj,{
                
                        method: "PATCH",
                        success: function(){
                            debugger
                            MessageToast.show("Updated Successfully")
                            that.cancelForgot()
                            that.onInit()
                            
                        },
                        error: function(){
                            debugger
                            MessageToast.show("ERROR IN UPDATING")
                        }
                       })
        

                    // if(deptName=='UI5'){
                    //     x.UI5[index].pwd=forgotPwd
                    // }else if(deptName=='ABAP'){
                    //     x.ABAP[index].pwd=forgotPwd
                    // }else if(deptName=='SALESFORCE'){
                    //     x.SALESFORCE[index].pwd=forgotPwd
                    // }else if(deptName=='HYBRIS'){
                    //     x.HYBRIS[index].pwd=forgotPwd
                    // }
                    // z.refresh(true)
                    // sap.ui.getCore().setModel(z)
                    // this.forgotPopUp.close()
                    // this.forgotPopUp.destroy(true);
                    // this.forgotPopUp = null
                }
            },
            forCheck1:function(){
                debugger
                var sp1=sap.ui.getCore().byId("forgotPwd")
                if(sp1.getProperty('type')=="Text"){
                    sp1.setProperty('type','Password')
                }else{
                    sp1.setProperty('type','Text')
                }     
            },
            forCheck2:function(){
                debugger
                var sp1=sap.ui.getCore().byId("forgotCnfpwd")
                if(sp1.getProperty('type')=="Text"){
                    sp1.setProperty('type','Password')
                }else{
                    sp1.setProperty('type','Text')
                }     
            },
            forEmpId:function(){
                var a=sap.ui.getCore().byId('forgotEmpId')
                a.setValueState('None')
            },
            forEmpNo:function(){
                var b=sap.ui.getCore().byId('forgotEmpNo')
                b.setValueState('None')
            },
            forpwd:function(){
                var c=sap.ui.getCore().byId('forgotPwd')
                c.setValueState('None')
            },
            fornfpwd:function(){
                var d=sap.ui.getCore().byId('forgotCnfpwd')
                d.setValueState('None')

            }
        });
    });
