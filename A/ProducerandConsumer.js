var track = 0;

function signal(){
    track = track + 1;
}

function wait(){
    while(track <= 0);
     track = track - 1;
}

//if-else statements have time complexity of 1
//single for loop will have time complexity of O(n) ,n is no. of time the loop executes
//space complexity of assigning the variable is O(1)

function produce()
{
    var bufferSize = document.getElementById('space').value;  //keeps tracks of processes
    var prod = document.getElementById('produced').value;  //keeps track of items to be produced
    var divSpace = document.getElementById('toAdd'); //div having id named toAdd

    if(parseInt(bufferSize) < 0) //checks whether the buffer is negative 
    {
        alert('Total space cannot be negative'); //alerts
    }

    if(parseInt(prod) < 0) //checks whether the produce is negative
    {
        alert('Producers cannot be negative');  //alerts
    }
    
    if(parseInt(track)+parseInt(prod) > bufferSize)  
    {
        alert("Space is full!"); //alerts
    }
    else 
    {
        for(var i = 0; i < prod; i++)
        {
            var o = '<button class = "btn-add" id = '+(track+1)+' >'+'process'+(track+1)+'</button>'; //O(p)  //its a process button sort of
            signal();
            divSpace.innerHTML += o; //adds the process to the divSpace
        }
    }
}


function consume()
{
    var cons = document.getElementById('consumed').value;  //keeps track of no. of items to be consumed

    if(parseInt(cons) < 0) //checks whether the consumer is negative or not
    {
        alert('Consumers cannot be negative'); //alerts
    }
   
    if(track - cons >= 0)
    {
        for(var i = track; i > track-cons; i--)
        {
            var x = document.getElementById(i);  //selects the process
            x.remove();  //removes the process
        }
        
        for(var j = 0; j < cons; j++){
            wait();
        }
    }
    else 
    {
        alert("Producers are not enough!"); //alerts
    }

    
    
}

function reset()
{
    track = 0;
}