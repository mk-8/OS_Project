//Time Complexity of the peterson algorithm is O(1).

var turn,lock=0;  //turn indicates whose turn it is to enter critical section  //lock is a variable used to block and unblock the process for entering the critical section
var flag=[0,0]; //flag is used to indicate whether the process is ready to enter its critical section

function entry_state(id){  //entry state 
    var x=document.getElementById(id);  
    x.remove();  //shifts the original to next state hence no duplication is found
    var y=document.getElementById('entry');
    y.innerHTML+='<button id = '+id+' onclick="critical_state(this.id)">P'+id+'</button>'; //if clicked the button then will move to the critical state withs its own id and it also get backs the button after successfull run
}

function critical_state(id){  //critical state
    var x=document.getElementById(id);
    x.remove();  //shifts the original to next state hence no duplication is found
    var y=document.getElementById('critical');
    if(lock==0){  //lock value is 0 so the process can enter the critical state
        y.innerHTML='<button id = '+id+' onclick="exit_state(this.id)">P'+id+'</button>'; //if clicked the button then will move to the exit state.
        turn=1-id;  //gives the turn value
        flag[id-1]=1;
        lock=1; // lock value is set to 1 so another process cannot enter critical section
        document.getElementById('turn_state').innerHTML='Turn: '+(turn+2);   //displays the turn value
        if(id==1)
            document.getElementById('flag1').innerHTML='Flag1: '+(flag[0]);  // it sets the flag1 of derived value
        else
            document.getElementById('flag2').innerHTML='Flag2: '+(flag[1]);  // it sets the flag2 of derived value
        
    }
    else{
        alert("Process cannot enter critical section");  //gives alert
        location.reload(); //reloads page
        lock=0;  //resets the value of lock
    }
    console.log(y);
}

function exit_state(id){  //exit state
    var x=document.getElementById(id);
    x.remove(); //shifts the original to next state hence no duplication is found.
    lock=0;  //lock is set to 0 so once again any process can enter the critical section but only one process will be present at a time in critical section
    flag[id-1]=0; //flag is set to 0 at the end so any process can enter cs
    if(id==1)
        document.getElementById('flag1').innerHTML='Flag1: '+(flag[0]);  // it sets the flag1 of derived value
    else
        document.getElementById('flag2').innerHTML='Flag2: '+(flag[1]);  // it sets the flag2 of derived value
    var y=document.getElementById('exit');
    y.innerHTML+='<button id = '+id+' onclick="entry_state(this.id)">P'+id+'</button>';  //if clicked then the button will move again to the entry state and will be able to rerun again and also it get backs the button after successful run
}


