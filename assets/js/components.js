//btnScrollToTop
//Requires code to hide button when at the top of the page
async function trackScrollBtn(){
    //Establish Page Height and Width
    var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
    var _docWidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
    //Track amount of scroll
    var scrollLeft = $(window).scrollLeft();
    var scrollTop = $(window).scrollTop();
    console.log(scrollTop);    
    var showBtnPoint = _docHeight * .90;
    //Trigger Hide/Show
    if(scrollTop < showBtnPoint){
        console.log("Showing Button")
        showBtnScroll();
    }
    else{
        console.log("Hiding Button")
        hideBtnScroll();
    }
    
};

function showBtnScroll(){
    let scrollBtn = document.getElementById("btnScrollToTop")
    scrollBtn.style.visibility = visible;
    console.log("Button Visible")
};


function hideBtnScroll(){
    let scrollBtn = document.getElementById("btnScrollToTop")
    scrollBtn.style.visibility = hidden;
    console.log("Button Hidden");
    
};