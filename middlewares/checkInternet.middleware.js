function checkInternet(func){
    if(navigator.onLine == true){
        return func(1);
    }else{
        return alert("No Internet");
    }
}



export default checkInternet;