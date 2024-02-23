function toggle(){
    
    var toogleBtn=document.getElementsByClassName("horizantal-content");
    if(toogleBtn[0].offsetWidth>=170 && toogleBtn[0].offsetWidth<=200 )
    { 
        toogleBtn[0].classList.add("toggle");
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="Role";
        document.getElementsByClassName('container')[0].style.width="calc(100% - 75px)";
        document.getElementsByClassName('handle')[0].style.rotate="180deg";
    }
    else{
        toogleBtn[0].classList.remove("toggle");
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="ROLE/USER MANAGEMENT";
        document.getElementsByClassName('container')[0].style.width="calc(100% - 200px)";
        document.getElementsByClassName('handle')[0].style.rotate="0deg";
    }
}