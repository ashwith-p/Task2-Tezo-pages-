
var oTable = document.querySelector(".employee-table")
var rowLength = oTable.rows.length;
var list=[0,0,0,0,0,0,0];
var employeesList=JSON.parse(localStorage.getItem('data')); //change name to employeesList
var cureentEmployeeList=employeesList.slice(); //change name
Window.onload=printTable(JSON.parse(localStorage.getItem('data')));
var alphabetEployeeData=[];
alphabetDropdown();
createLi();
var appliedFilter=false;
var previous='none';
var alphabetFilter=false;

function alphabetDropdown(){ //change function name
    var select=document.getElementById('drop-down-list');
    for(var i=65;i<=90;i++)
    {
        var option=document.createElement('option');
        var value=document.createTextNode(String.fromCharCode(i));
        option.appendChild(value);
        select.appendChild(option);
    }
}

function tableFormat(element)
   {
       var row = oTable.insertRow(-1);
       // First td
       var checkBox=row.insertCell(0); //change name
       var inputElement=document.createElement("input")
       inputElement.setAttribute("type","checkbox");
       inputElement.setAttribute('onclick',"check_select(this)");
       checkBox.appendChild(inputElement);
       //Second td
       var useDetails = row.insertCell(1);
       var path="images/person1.jpg";
       var userNameMail = document.createElement("div");
       userNameMail.setAttribute("class",'user-details user-width')
       var userImage=document.createElement("img");
       userImage.setAttribute('src',path)
       userImage.setAttribute('alt','person1');
       var userInfo=document.createElement("div");
       var userName=document.createElement("p");
       userName.setAttribute("class","employee-name");
       var textnode = document.createTextNode(element.firstName+' '+element.lastName);
       userName.appendChild(textnode);
       var userMail = document.createElement("p");
       userMail.setAttribute("class","email-id");
       var textnode = document.createTextNode(element.emailId);
       userMail.appendChild(textnode);
       userInfo.appendChild(userName);
       userInfo.appendChild(userMail);
       userNameMail.appendChild(userImage);
       userNameMail.appendChild(userInfo);
       useDetails.appendChild(userNameMail);
       //Third td
       var employeeLocation=row.insertCell(2);
       employeeLocation.innerHTML=element.location;
       //Fourth cell
       var employeeDepartment=row.insertCell(3);
       employeeDepartment.innerHTML=element.department;
       //Fifth cell
       var employeeRole=row.insertCell(4);
       employeeRole.innerHTML=element.jobTitle;
       //Sixth cell
       var employeeNum=row.insertCell(5);
       employeeNum.innerHTML=element.empNo;
       //Seventh cell
       var employeeStatus=row.insertCell(6);
       var statusBtn=document.createElement("button");
       statusBtn.setAttribute("class","status-btn");
       var textnode = document.createTextNode(element.status);
       statusBtn.appendChild(textnode);
       employeeStatus.appendChild(statusBtn);
       //Eight cell
       var joiningDate=row.insertCell(7);
       joiningDate.innerHTML=element.joiningDate;
       //Ninth cell
       var modifyDetails=row.insertCell(8);
       var elipsisImage=document.createElement("img");
       elipsisImage.setAttribute("src","images/ellipsis-solid.svg");
       elipsisImage.setAttribute("alt","3-dots image");
       elipsisImage.setAttribute('onclick','editRow(this)');
       var div=document.createElement("div");
       div.setAttribute('class','floating-div');
       var p=document.createElement("p");
       var data1=document.createTextNode("View Details");
       p.setAttribute("onclick","editDetails(this)");
       p.appendChild(data1);
       div.appendChild(p);
       var p=document.createElement("p");
       p.setAttribute("onclick","editDetails(this)");
       var data1=document.createTextNode("Edit");
       p.appendChild(data1);
       div.appendChild(p);
       var p=document.createElement("p");
       var data1=document.createTextNode("Delete");
       p.setAttribute("onclick","editDetails(this)");
       p.appendChild(data1);
       div.appendChild(p);
       elipsisImage.setAttribute("width","15px");
       elipsisImage.setAttribute("class","dots-image");
       modifyDetails.appendChild(elipsisImage);
       modifyDetails.appendChild(div);
   
}

function printTable(data)
   {
    
    data.forEach(element => tableFormat(element));
}
   
function applyFilter(removeFilter=false){

       appliedFilter=true;   
       var dept=document.getElementById("dept").value;
       filteredEmployees=[];
       var loc=document.getElementById("location").value;
       var status=document.getElementById("status").value;
       if(alphabetEployeeData.length>0 || alphabetFilter)
       {
        cureentEmployeeList=alphabetEployeeData;
       }
       else{
        cureentEmployeeList=employeesList;
       }

        //remove unwanted code
       if(!(dept=='none' && loc=='none' && status=='none') ) {
        delete_rows();
           for(var i=0;i<cureentEmployeeList.length;i++)
           {
                //remove unwanted variable declaration
               
               if((dept==cureentEmployeeList[i].department || dept=='none')&&
               (loc==cureentEmployeeList[i].location || loc=='none') && 
               (status==cureentEmployeeList[i].status || status=='none') )
                {
                    tableFormat(cureentEmployeeList[i]);
                    filteredEmployees.push(cureentEmployeeList[i]);
                   
               }
           }
       cureentEmployeeList=filteredEmployees;
    }
    else {
        if(alphabetEployeeData.length==0 && removeFilter){
            printTable(employeesList);
        }
    }
}

function sortDataByColumn(columnName){ //change name
    delete_rows();
    if(columnName=='user'){
        makezeros(0);
        if(list[0]==0){
            cureentEmployeeList.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
            list[0]=1;
        }
        else{
            cureentEmployeeList.sort((a,b)=>(a.firstName < b.firstName) ? 1 : -1);
        list[0]=0;}
    }

    
    else if(columnName=="location"){
        makezeros(1);
        if(list[1]==0){
        cureentEmployeeList.sort((a,b)=>(a.location > b.location) ? 1 : -1);
        list[1]=1;
    }
        else{
            cureentEmployeeList.sort((a,b)=>(a.location < b.location) ? 1 : -1);
            list[1]=0;
        }
    }
    else if(columnName=='dept')
    {
        makezeros(2);
        if(list[2]==0){
            list[2]=1;
        cureentEmployeeList.sort((a,b)=>(a.department > b.department) ? 1 :-1);}
        else{
            cureentEmployeeList.sort((a,b)=>(a.department < b.department) ? 1 :-1);
           list[2]=0;
        }
    }
    else if(columnName=='role'){
        makezeros(3);
        if(list[3]==0){
            list[3]=1;
        cureentEmployeeList.sort((a,b)=>(a.jobTitle > b.jobTitle) ? 1 :-1);}
        else{
            list[3]=0;
            cureentEmployeeList.sort((a,b)=>(a.jobTitle < b.jobTitle) ? 1 :-1);

        }
    }
    else if(columnName=='empNo'){
        makezeros(4);
        if(list[4]==0){
            list[4]=1;
        cureentEmployeeList.sort((a,b)=>(a.empNo > b.empNo) ? 1 :-1);}
        else{
            list[4]=0;
            cureentEmployeeList.sort((a,b)=>(a.empNo < b.empNo) ? 1 :-1);
        }
    }
    else if(columnName=='status'){
        makezeros(5);
        if(list[5]==0)
        {
            list[5]=1;
        cureentEmployeeList.sort((a,b)=>(a.status > b.status) ? 1 :-1);}
        else{
            list[5]=0;
            cureentEmployeeList.sort((a,b)=>(a.status < b.status) ? 1 :-1);
        }
    }else{
        makezeros(6);
        if(list[6]==0){
            list[6]=1;
        cureentEmployeeList.sort((a,b)=>(a.joiningDate > b.joiningDate) ? 1 :-1);}
        else{
            list[6]=0;
            cureentEmployeeList.sort((a,b)=>(a.joiningDate < b.joiningDate) ? 1 :-1);
        }
    }
    printTable(cureentEmployeeList);
    
}

function makezeros(index)
{
    for(var i=0;i<7;i++)
    {
        if(i!=index)
        {
            list[i]=0;
        }

    }
}

function delete_rows(){
    var oTable = document.querySelector(".employee-table")
       var rowLength = oTable.rows.length;
       for (var i =1; i < rowLength; i++) {
       oTable.deleteRow(1);}
}

function reset()
{
    appliedFilter=false;

    
    var status_reset=document.getElementById("status");
    status_reset.selectedIndex = 0;
    var location_reset=document.getElementById("location");
    location_reset.selectedIndex = 0;
    var department_reset=document.getElementById("dept");
    department_reset.selectedIndex = 0;
    var change_color=document.getElementsByClassName('apply-btn')[0];
    change_color.style.backgroundColor="#ffabab";
    
    cureentEmployeeList=[];
    delete_rows();
    if(alphabetEployeeData.length==0 && !alphabetFilter){
    cureentEmployeeList=employeesList.slice();
    printTable(cureentEmployeeList); 
}
    else{
        filterName('filter',false);
        cureentEmployeeList=alphabetEployeeData;
    }
      
}

function filterName(name,className){
    alphabetFilter=true;
    alphabetEployeeData=[];
     //remove
    var liTags=document.getElementsByClassName(name)[0].getElementsByTagName('li');
    for(var i=0;i<liTags.length;i++)
    {
        if(liTags[i].style.backgroundColor=="rgb(244, 72, 72)")
        {
            if(!className)
            {
                alphabet=liTags[i].firstChild.innerHTML;
            }
            else{
            liTags[i].style.backgroundColor="#EAEBEE";
            liTags[i].children[0].style.color="#919DAC";
            }
        }
    }
    if(className){
    className.style.backgroundColor="#F44848";
    className.children[0].style.color="#ffffff";
    alphabet=className.firstChild.innerHTML;
    }
    else{

    }
    document.getElementById("filter-icon").setAttribute('src','images/filter.svg');
    if(cureentEmployeeList.length  || appliedFilter){
        cureentEmployeeList.forEach(element => {
            if(element.firstName.charAt(0)==alphabet)
            {alphabetEployeeData.push(element);}
        });

    }
    else{
    employeesList.forEach(element => {
        if(element.firstName.charAt(0)==alphabet)
        {alphabetEployeeData.push(element);}
    });
    }
    
    
  
    delete_rows();
    printTable(alphabetEployeeData);
}

function activateButton(className)
{
    className=document.getElementsByClassName(className)[0];
    className.style.backgroundColor="#F44848";
    className.style.color="#ffffff"
}

function convertToCSV() {
    const array = [Object.keys(cureentEmployeeList[0])].concat(cureentEmployeeList)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }


function downloadCSV(csvData, fileName) {
    const blob = new Blob([csvData], { type: 'csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

function exportData(){
    var csvData=convertToCSV();
    downloadCSV(csvData,'exzmple.csv');
}

function removeFilter()
{
    
    document.getElementById("filter-icon").setAttribute('src','images/temp.svg');
    var liTags=document.getElementsByClassName('filter')[0].getElementsByTagName('li');
    for(var i=0;i<liTags.length;i++)
    {
        if(liTags[i].style.backgroundColor=="rgb(244, 72, 72)")
        {
            liTags[i].style.backgroundColor="#EAEBEE";
            liTags[i].children[0].style.color="#919DAC";
        }
    }
    delete_rows();
    alphabetEployeeData=[];
    alphabetFilter=false;
    applyFilter(1);  
    
}

function selectRows(className)
{
    if(className.checked)
    {
        var table=className.parentElement.parentElement.parentElement.parentElement;
        var inputs=table.getElementsByTagName('input');
        for(var i=1;i<inputs.length;i++){
            inputs[i].checked=true;
        }
        check(1);
    }
    else{
        var table=className.parentElement.parentElement.parentElement.parentElement;
        var inputs=table.getElementsByTagName('input');
        for(var i=1;i<inputs.length;i++){
            inputs[i].checked=false;
        }
        check(0);
    }
}

function check_select(className)
{
    var checkAllSelected=0,allFalse=0;
    
    var unselectCheckbox=document.getElementsByClassName('checkbox-btn')[0];
    unselectCheckbox.checked=false;
    var table=className.parentElement.parentElement.parentElement.parentElement;
    var inputs=table.getElementsByTagName('input');
    for(var i=1;i<inputs.length;i++){
       if( inputs[i].checked==false){checkAllSelected=1;}
       else{
        allFalse=1;
       }
    }
    if(checkAllSelected==0){unselectCheckbox.checked=true;}
    check(allFalse);
}
function check(allFalse){
    if(allFalse)
    {
        document.getElementById("delete-btn").style.backgroundColor="#F44848";
    }
    if(allFalse==0){document.getElementById("delete-btn").style.backgroundColor="#F89191";}

}

function deleteRows()
{
    var inputs=oTable.getElementsByTagName("input");
    var roleData=JSON.parse(localStorage.getItem("roleData"));
    if(confirm("Are you sure.You want to Delete the data")){
    for(var i=1;i<inputs.length;i++)
    {
        if(inputs[i].checked){
        var tr=inputs[i].parentElement.parentElement;
        var employeeNo=tr.childNodes[5].childNodes[0].data;
        employeesList.forEach(ele=>{
            if(ele.empNo==employeeNo)
            {
                var index=employeesList.indexOf(ele);
                if (index !== -1) {
                    employeesList.splice(index, 1);
                }
                if(roleData!=null)
                {
                    roleData.forEach(role=>{
                        if(ele.jobTitle==role.designation){
                            (role.employeesList).forEach(employee=>{
                                if(employee.empNo==ele.empNo){
                                    (role.employeesList).splice((role.employeesList).indexOf(employee),1);
                                }
                            })
                        }
                    })
                }
            }
        });
        }
    }
    localStorage.setItem("data",JSON.stringify(employeesList));
    localStorage.setItem('roleData',JSON.stringify(roleData));
    delete_rows();
    printTable(employeesList);
    if(inputs[0].checked){inputs[0].checked=false;
    document.getElementById("delete-btn").style.backgroundColor="#F89191";
    }
}
}

function createLi(){
    var ul=document.getElementById('create-li');
    for(var i=65;i<=90;i++){
        var li=document.createElement("li");
        var a=document.createElement('a');
        a.setAttribute("href",'#');
        li.setAttribute("onclick","filterName('filter',this)");
        var char=document.createTextNode(String.fromCharCode(i));
        a.appendChild(char);
        li.appendChild(a);
        ul.appendChild(li);
    }
}

document.addEventListener('click',function(e){
    var targetName=e.target.nodeName;
    if(targetName!="IMG" && targetName!="P"){
    if(previous!='none'){
        previous.style.display='none';
        previous="none";
    }}
},true)

function editRow(className){
 
    
    if(previous==className.parentElement.children[1])
    {
        className.parentElement.children[1].style.display='none';
        previous="none";

    }
    else{
        if(previous!='none'){
        previous.style.display="none";}
        className.parentElement.children[1].style.display='block';
        previous=className.parentElement.children[1];
    }

}

function editDetails(className)
{
    var functionality=className.innerHTML;
    if(functionality=='Delete'){
        className.parentElement.parentElement.parentElement.firstChild.firstChild.checked=true;
        deleteRows();
    }
    else {
        var employeeNo=className.parentElement.parentElement.parentElement.children[5].innerHTML;
        var obj={
            'employeeNumber':employeeNo,
            'functionality':functionality,
            'isEdited':false
        };
        sessionStorage.setItem("updateDetails",JSON.stringify(obj));
        window.location.href='add-employee.html';
    }
}
