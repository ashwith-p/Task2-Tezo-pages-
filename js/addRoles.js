
var cureentEmployeeList=JSON.parse(localStorage.getItem('data'));
if(!JSON.parse(localStorage.getItem('roleData'))){
roleData=[];
localStorage.setItem("roleData",JSON.stringify(roleData));
}
var roleExists=false;
var k=false;
obj={};
var editedData={
    'isEdited':false,
    'cureentEmployeeList':{}
};
var checkedList=[]
var changeBorder=false; //name
initializer();

function initializer(){
    var roleDetails=JSON.parse(sessionStorage.getItem('roleDetails'));
    var rolesInfo=JSON.parse(localStorage.getItem('roleData'));
    var cureentEmployeeList=[];
    var employee={};
    var employeeData=JSON.parse(localStorage.getItem('data'));
    if(roleDetails){
        sessionStorage.removeItem('roleDetails');
        document.getElementsByClassName('add-btn')[0].value="Edit Role";
    rolesInfo.forEach(ele=>{
        if(ele.designation==roleDetails.roleName){
            employee=ele;
        }
        else{
            cureentEmployeeList.push(ele);
        }
    });
    editedData['isEdited']=true;
    editedData['cureentEmployeeList']=cureentEmployeeList;
    document.getElementById("designation").value=employee.designation;
    document.getElementById('role-department').value=employee.roleDepartment;
    document.getElementById('description').value=employee.description;
    document.getElementById('role-location').value=employee.roleLocation;
    (employee.employeesList).forEach(ele=>{
        for(var i=0;i<employeeData.length;i++){
            if(ele.empNo==employeeData[i].empNo)
            {
                addEmployees(employeeData[i],true);
            }
        }
    })
    
}
}

class RoleInformation{
    constructor(obj,checkedList)
    {
        this.id=obj['id'];
        this.designation=obj["designation"];
        this.roleDepartment=obj["role-department"]
        this.description=obj["description"];
        this.roleLocation=obj["role-location"];
        this.assignEmployees=obj["assign-employees"];
        this.employeesList=checkedList;
    }
}

function validateRole(){
    var form=document.getElementById("role-data");
    var hasEmptyField=false;
    for (var i = 0; i < form.elements.length-1; i++) {
        var element = form.elements[i];
        if(element.value.length==0 || element.value=="none")
        {
            hasEmptyField=true;
            var parent=element.parentNode;
            var a=parent.getElementsByTagName("span");
            if(a.length==0){
            element.style.border="2px solid red";
            
            parent.appendChild(createSpan("This field is required"));
            }
        }
        else{
            var x=element.id;
            obj[x]=element.value;
        }
    }
    if(!roleExists){obj['id']=makeid();
    if(!hasEmptyField){
    checkedList=getObjects(checkedList)
    var role=new RoleInformation(obj,checkedList);
    for(var j=0;j<checkedList.length;j++)
    {
        for(var i=0;i<cureentEmployeeList.length;i++)
        {
            if(cureentEmployeeList[i].empNo==checkedList[j].empNo)
            {
                cureentEmployeeList[i].jobTitle=role.designation;
                cureentEmployeeList[i].location=role.roleLocation;
                cureentEmployeeList[i].department=role.roleDepartment;
            }
        }
    }
    if(editedData['isEdited']==1){
        localStorage.setItem('roleData',JSON.stringify(editedData['cureentEmployeeList']));
    }
    localStorage.setItem('data',JSON.stringify(cureentEmployeeList));
    checkedList=[];
    var roleData=JSON.parse(localStorage.getItem('roleData'));
    roleData.push(role);
    localStorage.setItem("roleData",JSON.stringify(roleData));
    
    if(localStorage.getItem('roleNames'))
    {
        var names=JSON.parse(localStorage.getItem('roleNames'));
        names.push(role.designation);
    }
    else{
        var names=[];
        names.push(role.designation);
        
    }
    localStorage.setItem('roleNames',JSON.stringify(names));
    window.location.href='roles.html';}}

}

function createSpan(text)
{
    var span=document.createElement("span");
    var text=document.createTextNode(text);
    span.setAttribute("class","warning");
    span.appendChild(text);
    return span;
}


 function cleardiv(){
    var ele=document.getElementsByClassName("employee-list");
    if(ele){
    j=0;
    while(j<ele.length)
    {
    var inputs=ele[j].getElementsByTagName('input');
    if(!inputs[0].checked){
    var assignEmployeesDiv=inputs[0].parentElement;
    assignEmployeesDiv.remove();
    }
    else{j++;}
    }
}
 }

 function addEmployees(ele,checkStatus=false){
    var roleEmployeeDivision=document.createElement("div");
    var image=document.createElement("img");
    image.setAttribute("src","images/person1.jpg");
    image.setAttribute("class","display-img");
    roleEmployeeDivision.appendChild(image);
    var name=document.createElement("p");
    var nameValue=ele.empNo+' '+ele.firstName+' '+ele.lastName+' ';

    nameValue=nameValue.length > 20 ? nameValue.substring(0,12) + "..." :nameValue;//change
    var content=document.createTextNode(nameValue);
    name.appendChild(content);
    roleEmployeeDivision.appendChild(name);
    var inputElement=document.createElement("input");
    inputElement.setAttribute("type","checkbox");
    if(checkStatus){
        checkedList.push(ele.empNo);
    inputElement.setAttribute("checked","");}
    inputElement.setAttribute('onchange',"checkValue(this, '" + ele.empNo + "')");
    var employeeList=document.createElement("div");
    employeeList.setAttribute("class","employee-list");

    var list=document.getElementById("display-column");
    employeeList.appendChild(roleEmployeeDivision);
    employeeList.appendChild(inputElement);
    list.appendChild(employeeList);
 }

 function filterByNames(){
    cleardiv();
    var searhFilter=document.getElementById('assign-employees').value;
    if(searhFilter!=""){
    cureentEmployeeList=JSON.parse(localStorage.getItem('data'));
    for(var j=0;j<cureentEmployeeList.length;j++){
        if((cureentEmployeeList[j].firstName.toLowerCase().includes(searhFilter)|| cureentEmployeeList[j].empNo.includes(searhFilter)) &&
        checkedList.indexOf(cureentEmployeeList[j].empNo)==-1){
            addEmployees(cureentEmployeeList[j]);
        }
    }
}
    
 }

function checkValue(className,empNo){
   
    if(className.checked){
        checkedList.push(empNo);
    }
    else{
        if(checkedList.indexOf(empNo)!=-1){
            
            checkedList.splice(checkedList.indexOf(empNo),1);
           
        }
    }
   
}

 function removeSpan(className)
{
    var x=className.parentNode;
    var a=x.getElementsByTagName("span");
    if(a.length>0){
        a[0].remove();
    }
}


function border_change(className)
{
    
    if(!k){
    className.style.border="2px solid rgb(0, 126, 252)";
    k=true;
    }
    else{
        
        className.style.border='1px solid #e8e8e8';
        k=false;
        
    }
    removeSpan(className);
    cleardiv();
}

function getObjects(checkedList){
    var list=[];
    checkedList.forEach(ele=>{
        for(var j=0;j<cureentEmployeeList.length;j++){
            if(ele==cureentEmployeeList[j].empNo)
            {
                list.push(cureentEmployeeList[j]);
            }
        }
    });
    return list;
}

function findRoleDuplicates(className){
    debugger;
    border_change(className);
    var name=document.getElementById('designation').value;
    name=name.replace(" ","");
    var roleData=JSON.parse(localStorage.getItem('roleData'));
    roleData.forEach(ele=>{
        if(name.toLowerCase()==(ele.designation).replace(" ","").toLowerCase()){
            document.getElementById('designation').parentElement.appendChild(createSpan('Role Already Exista'));
            roleExists=true;
        }
    })
    
}

function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }