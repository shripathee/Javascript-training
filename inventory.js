var cur_exp=null;
function showInput(){
    var section=document.getElementById("input");
    section.style.display="block";
}
function addItem(){
    var iname=document.getElementById("iname");
    var iquantity=document.getElementById("iquantity");
    var iprice=document.getElementById("iprice");
    var table=document.getElementById("results");
    var row=table.insertRow(-1);
    var name_cell=row.insertCell(-1);
    var quantity_cell=row.insertCell(-1);
    var price_cell=row.insertCell(-1);
    var amount_cell=row.insertCell(-1);
    name_cell.innerHTML=iname.value;
    quantity_cell.innerHTML=iquantity.value;
    price_cell.innerHTML=iprice.value;
    var amount=parseFloat(iquantity.value)*parseFloat(iprice.value);
    window.console.log("Name is "+iname.value);
    amount_cell.innerHTML=amount;
    iname.value="";
    iquantity.value=null;
    iprice.value=null;
    
}
function storeRecord(rno,name,quantity,price,amount)
{
    var record=[name,quantity,price,amount];
    localStorage.setItem(rno,record);
}
function stringFromTable(tableid)
{
    var table=document.getElementById(tableid);
    var row_list=table.getElementsByTagName("tr");
    var str="";
    for(var i=1;i<row_list.length;i++)
    {
        var row=row_list[i].getElementsByTagName("td");
        for(var j=0;j<row.length;j++)
        {
            str=str+row[j].innerHTML;
            if(j!=row.length-1)
                str=str+",";
        }
        if(i!=row_list.length-1)
            str=str+"<br>";
        console.log(str);
    }
    return str;
}

function createBill()
{
    var cur_bill=parseInt(localStorage.getItem("cur_bill"));
    console.log("Current Bill ID="+cur_bill);
    var tabledata=stringFromTable("results");
    localStorage.setItem(cur_bill,tabledata);
    localStorage.setItem("cur_bill",cur_bill+1);
    var table=document.getElementById("results");
    table.innerHTML="<tr><th>Item</th><th>Quantity</th><th>Price</th><th>Amount</th></tr>";
    
//    localStorage.setItem("cur_bill",1001);
}

function displayBills()
{
    console.log("In displayBills");
    
    var article=document.getElementById("bills");
    var cur_no_of_bills=parseInt(localStorage.getItem("cur_bill"));
    console.log("Current no. of bills:"+cur_no_of_bills);
    for(var i=1001;i<cur_no_of_bills;i++)
    {
        var table=document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-bordered");
        table.style.width="25%";
        var bill_no=i;
        var tabledata=localStorage.getItem(bill_no);
        var rows=tabledata.split("<br>");
        var hrow=table.insertRow(-1);
        var hname_cell=hrow.insertCell(-1);
        var hquantity_cell=hrow.insertCell(-1);
        var hprice_cell=hrow.insertCell(-1);
        var hamount_cell=hrow.insertCell(-1);
        hname_cell.innerHTML="Name";
        hquantity_cell.innerHTML="Quantity";
        hprice_cell.innerHTML="Price";
        hamount_cell.innerHTML="Amount";
        hrow.style.fontWeight="bolder";
        for(var j=0;j<rows.length;j++)
        {
            var row=table.insertRow(-1);
            var name_cell=row.insertCell(-1);
            var quantity_cell=row.insertCell(-1);
            var price_cell=row.insertCell(-1);
            var amount_cell=row.insertCell(-1);
            fields=rows[j].split(",");
            name_cell.innerHTML=fields[0];
            quantity_cell.innerHTML=fields[1];
            price_cell.innerHTML=fields[2];
            amount_cell.innerHTML=fields[3];
        }
        article.appendChild(table);
        table.addEventListener("click",zoom,true);
    }
}

function showPrevious(){
    window.location.href="Bills.html";
}
function zoom(e){
    if(cur_exp!=null)
        cur_exp.style.height="25%";
    e.stopPropagation();
    e.preventDefault();
    var table=this;
    cur_exp=this;
    table.style.height="100%";
    table.style.width="100%";
}