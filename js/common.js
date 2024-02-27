var i=false;
var mobileView=false;
function toggle(){
    var toogleBtn=document.getElementsByClassName("horizantal-content");
    if(!i)
    { 
        toogleBtn[0].classList.add("toggle");
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="Role";
        document.getElementsByClassName('handle')[0].style.rotate="180deg";   
        document.getElementsByClassName("handle")[0].style.left="55px";
        document.getElementsByClassName("side-arrow-roles")[0].style.display='none';
        document.getElementsByClassName("side-arrow-user")[0].style.display='none';     
        if(!mobileView){
       
        document.getElementsByClassName('container')[0].style.width="calc(100% - 75px)";


        }
        else{
            document.getElementsByClassName('horizantal-content')[0].style.position="static";
            document.getElementsByClassName('container')[0].style.width="calc(89% - 30px)";
            //document.getElementsByClassName('container')[0].style.paddingLeft="92px";
            document.getElementsByClassName("handle")[0].style.left="55px";
            document.getElementsByClassName("handle")[0].style.top="2%";
        }
        
        i=true;
    }
    else{
        if(!mobileView){
        document.getElementsByClassName('horizantal-content')[0].style.position="static";
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="ROLE/USER MANAGEMENT";
        document.getElementsByClassName('container')[0].style.width="calc(100% - 230px)";
        document.getElementsByClassName("handle")[0].style.left="175px";
        
        }
        else{
            document.getElementsByClassName('horizantal-content')[0].style.position='absolute';
            document.getElementsByClassName('horizantal-content')[0].style.backgroundColor='white';
            document.getElementsByClassName('horizantal-content')[0].style.zIndex=10;
            document.getElementsByClassName('container')[0].style.width="calc(100% - 30px)";
            document.getElementsByClassName("handle")[0].style.left="175px";
            document.getElementsByClassName("handle")[0].style.top="2%";
            document.getElementsByClassName("handle")[0].style.zIndex="12";
        }
        toogleBtn[0].classList.remove("toggle");
        document.getElementsByClassName('handle')[0].style.rotate="0deg";
        i=false;
        
    }
    
}
window.onresize = function() {
    if(window.screen.width<665 && !mobileView){
        toggle();
        mobileView=true;
    }
    else if(window.screen.width>=665 && mobileView){
        toggle();
        document.getElementsByClassName('horizantal-content')[0].style.position="static";
        document.getElementsByClassName('container')[0].style.width="calc(100% - 230px)";
        document.getElementsByClassName("handle")[0].style.left="175px";
        document.getElementsByClassName('roles-or-user-management')[0].innerHTML="ROLE/USER MANAGEMENT";
        mobileView=false;
    }
};