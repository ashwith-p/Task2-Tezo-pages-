if(!JSON.parse(localStorage.getItem('data'))){
var myObject=[];
localStorage.setItem("data",JSON.stringify(myObject));
}
var currentDate=new Date();
var year = currentDate.getFullYear();
var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
var day = currentDate.getDate().toString().padStart(2, '0');
var minYear=year-100;
var formattedDate = year + '-' + month + '-' + day;
var dob=document.getElementsByClassName('date-of-birth')[0];
var joiningDate=document.getElementsByClassName('joining-date')[0];
joiningDate.setAttribute('max',formattedDate);
var min18Years=year-60;
dob.setAttribute("max",formattedDate);
currentDate.setFullYear(minYear);
var formattedDate = minYear + '-' + month + '-' + day;
var empNoExist=false;
var i=false;
var cureentEmployeeList=[];
var viewOrEdit=JSON.parse(sessionStorage.getItem('updateDetails'));
dob.setAttribute('min',formattedDate);
currentDate.setFullYear(min18Years);
formattedDate = min18Years + '-' + month + '-' + day;
joiningDate.setAttribute("min",formattedDate);
var lessThan18=false;
var roleId;
var roleData=JSON.parse(localStorage.getItem('roleData'));
var role;
var currentRoles=[];
initializer();

function initializer()
{
    var details=JSON.parse(localStorage.getItem('data'));
    roleId=JSON.parse(sessionStorage.getItem('roleId'));
    roleId=roleId.roleId;
    console.log(roleId);
    var roleNames=JSON.parse(localStorage.getItem("roleNames"));
    var employee={};
    if(viewOrEdit!=null){
        viewOrEdit['isEdited']=true;
        sessionStorage.removeItem('updateDetails');
        details.forEach(ele=>{
            if(ele.empNo==viewOrEdit.employeeNumber)
            {
                employee=ele;
            }
            else{
                cureentEmployeeList.push(ele);
            }
        });

        
        document.getElementsByClassName("employee-number")[0].value=employee.empNo;
        document.getElementsByClassName('first-name')[0].value=employee.firstName;
        document.getElementsByClassName('last-name')[0].value=employee.lastName;
        document.getElementsByClassName("date-of-birth")[0].value=employee.dateOfBirth;
        document.getElementsByClassName("email-id")[0].value=employee.emailId;
        document.getElementsByClassName("mobile-no")[0].value=employee.mobieNo;
        document.getElementsByClassName('joining-date')[0].value=(employee.joiningDate).split('-').reverse().join('-');
        document.getElementsByClassName('location')[0].value=employee.location;
        document.getElementsByClassName('job-title')[0].value=employee.jobTitle;
        document.getElementsByClassName('department')[0].value=employee.department;
        document.getElementsByClassName('assign-manager')[0].value=employee.assignManager;
        document.getElementsByClassName('assign-project')[0].value=employee.assignProject;
        if(viewOrEdit.functionality=='View Details'){
        document.getElementsByClassName('cancel-btn')[0].value="close";
        document.getElementsByClassName('heading')[0].innerHTML="View Employee";
        document.getElementsByClassName('add-btn')[0].style.display="none";
        }
        else{
            document.getElementsByClassName('add-btn')[0].value="Edit employee";
            document.getElementsByClassName('heading')[0].innerHTML="Edit Employee";

        }

    }
    if(roleNames){
        var selectRole=document.getElementsByClassName('job-title')[0];
        roleNames=new Set(roleNames);
        roleNames.forEach(rolename=>{
            var option=document.createElement("option");
            option.appendChild(document.createTextNode(rolename));
            selectRole.append(option);
        })
    }
    if(roleId){
        roleData.forEach(ele=>{
            if(ele.id==roleId){
                role=ele;
            }
            else{
                currentRoles.push(ele);
            }
        })

        document.getElementsByClassName('job-title')[0].value=role.designation;
        document.getElementsByClassName('job-title')[0].setAttribute("disabled","");
        document.getElementsByClassName('department')[0].value=role.roleDepartment;
        document.getElementsByClassName('department')[0].setAttribute("disabled","");
        document.getElementsByClassName('location')[0].value=role.roleLocation;
        document.getElementsByClassName('location')[0].setAttribute("disabled","");
    }

}

class employeeDetails{
    constructor(empNo,firstName,lastName,dateOfBirth,emailId,mobieNo,joiningDate,location,jobTitle,department,assignManager,assignProject,status){
        this.empNo=empNo;
        this.firstName=firstName;
        this.lastName=lastName;
        this.dateOfBirth=dateOfBirth;
        this.emailId=emailId;
        this.mobieNo=mobieNo;
        this.jobTitle=jobTitle;
        this.joiningDate=joiningDate;
        this.location=location;
        this.department=department;
        this.assignManager=assignManager;
        this.assignProject=assignProject;
        this.status=status;
    }
}

function border_change(className)
{
    
    if(!i){
    className.style.border="2px solid rgb(0, 126, 252)";
    i=true;
    }
    else{
        className.style.border='2px solid #e2e2e2';
        i=false;
    }
    removeSpan(className);
}

function checkDuplicate(className){
    border_change(className);
    var dataInLocalStorage=JSON.parse(localStorage.getItem('data'));
    if(dataInLocalStorage.length){
       for(var j=0;j<dataInLocalStorage.length;j++){
            empNoExist=false;
            if(dataInLocalStorage[j].empNo==className.value)
            {
                empNoExist=true;
                className.parentElement.appendChild(createSpan("Eployee No. Already Exists"));
                break;
            }
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

  function border_type_change(className){
    if(!i){
        className.type="date";
        className.style.border="2px solid rgb(0, 126, 252)";
        className.style.padding="5px";
        i=true;
    }
    else{
        className.type="text";
        className.style.border='2px solid #e2e2e2';
        className.style.padding="6px";
        i=false;
    }
    removeSpan(className);
}

function createSpan(text)
{
    var span=document.createElement("span");
    var text=document.createTextNode(text);
    span.setAttribute("class","warning");
    span.appendChild(text);
    return span;
}

  function validateDetails(){
    var form=document.getElementById("employee-details");
    var hasEmptyField=false;
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if(element.value.length==0)
        {
            hasEmptyField=true;
            var parent=element.parentNode;
            var a=parent.getElementsByTagName("span");
            if(a.length==0){
            element.style.border="2px solid red";
            parent=parent.id;
            
            document.getElementById(parent).appendChild(createSpan("This field is required"));
            }
        }
    }
    if(!hasEmptyField && !empNoExist && !lessThan18){
    var empNo=document.getElementsByClassName("employee-number")[0].value;
    var firstName=document.getElementsByClassName('first-name')[0].value;
    var lastName=document.getElementsByClassName('last-name')[0].value;
    var dateOfBirth=document.getElementsByClassName("date-of-birth")[0].value;
    var emailId=document.getElementsByClassName("email-id")[0].value;
    var mobieNo=document.getElementsByClassName("mobile-no")[0].value;
    var joiningDate=document.getElementsByClassName('joining-date')[0].value;
    joiningDate=joiningDate.split('-').reverse().join('-');
    var location=document.getElementsByClassName('location')[0].value;
    var jobTitle=document.getElementsByClassName('job-title')[0].value;
    var department=document.getElementsByClassName('department')[0].value;
    var assignManager=document.getElementsByClassName('assign-manager')[0].value;
    var assignProject=document.getElementsByClassName('assign-project')[0].value;
    var obj=new employeeDetails(empNo,firstName,lastName,dateOfBirth,emailId,mobieNo,
        joiningDate,location,jobTitle,department,assignManager,assignProject,"Active");
    if(viewOrEdit){
        if(viewOrEdit['isEdited']){
            localStorage.setItem("data",JSON.stringify(cureentEmployeeList));
        }
    }
    var data=JSON.parse(localStorage.getItem('data'));
    data.push(obj);
    localStorage.setItem("data",JSON.stringify(data));
    if(roleId){
        role.employeesList.push(obj);
        currentRoles.push(role);
        localStorage.setItem('roleData',JSON.stringify(currentRoles));
        sessionStorage.removeItem('roleId');
        window.location.href="roles.html";

    }
    else{
    alert("Date added successfully!!");
    window.location.href = 'employees.html';
    }

}}

function checkABove18(className){
    border_type_change(className);
    var birthDate=new Date(className.value);
    var currentDate=new Date();
    if( !(currentDate.getFullYear() - birthDate.getFullYear()>=18)){
        lessThan18=true;
        className.parentElement.appendChild(createSpan("Age is less than 18"));
    }

}

document.getElementById('employee-details').addEventListener('submit',function(e){
    e.preventDefault();
    validateDetails();
    window.location.href='employees.html';
})

