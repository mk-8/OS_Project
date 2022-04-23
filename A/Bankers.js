/*
Banker's Algorithm
Time complexity = O(n^2)

where n = rows;
*/

let counter = 1;
// counter is initialized to 1, so when a new row is to be added,
// it can be done using this counter as the ID in the HTML
$(document).ready(function () {
    
    var rows = $('#tableId tbody tr').length
    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td>P'+rows+'</td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Allo0"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Allo1"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Allo2"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Max0"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Max1"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Max2"/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Avai0" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Avai1" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Avai2" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Need0" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Need1" disabled/></td>';
        cols += '<td><input type="text" class="form-control text-center" id="'+counter+'Need2" disabled/></td>';
        // the above lines are for the 1st row before increasing the rows,
        // as the rows are increased counter is incremented, id changed from alloc0 to 1alloc0
        newRow.append(cols);
        $("table.order-list").append(newRow);
        counter++;
        rows++;
    });

    $("table.order-list").on("click", ".ibtnDel", function (event) {
        if(rows >1){
            document.getElementById("tBody").deleteRow(-1);
            counter -= 1;
            rows-=1;
        }      
    });
    // definition of what to do when the delete button is used

});

let allocation = new Array();
// holds the information regarding the already allocated resources

let max = new Array();
// holds information regarding the maximum requirenment of resources

let availiable = new Array();
// holds the information of currently free resources in the system

let oldAvailiable = new Array();
// holds the information 

let need = new Array();
let result = new Array();

function addArray(){    
    
    let rows = $('#tableId tbody tr').length
    for(let i = 0; i<rows;i++){
        allocation[i] = new Array();
        max[i] = new Array()  ;      
        need[i] = new Array();
        oldAvailiable[i] = new Array();
        
    }

    for(let i = 0; i<rows;i++){
        for(let j = 0; j <3;j++){
            if(parseInt(document.getElementById(i+'Allo'+j).value) >= 0)            
                allocation[i][j] = parseInt(document.getElementById(i+'Allo'+j).value);
            else{
                alert("Error: Input of allocated resources can not be negative");
            }
            if(parseInt(document.getElementById(i+'Max'+j).value) >= 0)
                max[i][j] = parseInt(document.getElementById(i+'Max'+j).value);
            else{
                alert("Error: Input of Maximum required resources can not be negative");
            }
            if(parseInt(document.getElementById(i+'Allo'+j).value) > parseInt(document.getElementById(i+'Max'+j).value)){
                alert("Error: Allocated resources can not be more than maximum required resources");
            }
            if(parseInt(document.getElementById('0Avai'+j).value)>= 0)
                availiable[j] = parseInt(document.getElementById('0Avai'+j).value);
            else{
                alert("Error: Input of available resources can not be negative");
            }
            
        }
    }
}
function deleterow(){
    document.getElementById("tBody").deleteRow(-1);
    counter-=1;
}

function calculate(){
    addArray();
    let rows = $('#tableId tbody tr').length;
    let check = [];
    for(let i = 0; i<rows;i++){
        check[i] = false;
        for(let j = 0; j <3;j++){            
            need[i][j] = max[i][j]-allocation[i][j];
            document.getElementById(i+'Need'+j).value = need[i][j] ;           
        }
    }
    
    let k = 0;
    let m = 0;
    while(k<rows){
        let checkWhile = false;
        for(let i = 0; i<rows;i++){
            if(check[i]==false){
                if(need[i][0]<=availiable[0] && need[i][1]<=availiable[1] && need[i][2]<=availiable[2]){
                    check[i] = true;
                    result[k] = i;
                    k++;
                    checkWhile = true;

                    oldAvailiable[m][0] = availiable[0];
                    oldAvailiable[m][1] = availiable[1];
                    oldAvailiable[m][2] = availiable[2];

                    availiable[0] = availiable[0]+allocation[i][0];
                    availiable[1] = availiable[1]+allocation[i][1];
                    availiable[2] = availiable[2]+allocation[i][2];
                    
                    document.getElementById('Avai0').value = availiable[0];
                    document.getElementById('Avai1').value = availiable[1];
                    document.getElementById('Avai2').value = availiable[2];
                    
                    document.getElementById(m+'Avai0').value = oldAvailiable[m][0];
                    document.getElementById(m+'Avai1').value = oldAvailiable[m][1];
                    document.getElementById(m+'Avai2').value = oldAvailiable[m][2];
                    m++
                
                }
               
            }
        }
        if(checkWhile==false){
            break;
        }
    }
    if(k<rows){
        // therefore not all processes will be executed using the resources available
        document.getElementById('result').value = 'DEADLOCK';
    }
    else{
        // in the else condition, k can only be equal to rows,
        let str = ""
        for(let i = 0; i< rows; i++){
            str += "P"+result[i];
            if(i != rows-1){
                str+="-->";
            } 
        }
        document.getElementById('result').value = str
    }    

}