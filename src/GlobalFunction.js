const GlobalFunction = {
    logOut(){
        localStorage.removeItem('email')
        localStorage.removeItem('name') 
        localStorage.removeItem('photo') 
        localStorage.removeItem('phone') 
        localStorage.removeItem('token') 
    },
    isAdmin(){
        if (localStorage.ROLE != undefined && localStorage.ROLE == 1){
            return true
        }else {
            return false
        }
    },
    formatPrice(price, symbol = " FCFA")
    {
        return new Intl.NumberFormat('en').format(price) + symbol;
    }


}   

export default GlobalFunction