interface Hai{
    getMe();
    position:number;
}

class Hello implements Hai{
    getMe(){

    }
    position=0;
}

var check:Hai=new Hello();
check.getMe();