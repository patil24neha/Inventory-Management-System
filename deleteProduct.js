/* Code developed by Patil, Neha
Project #1
Spring 2018
Username : jadrn029, 
RED ID : 821545485 */

$(document).ready( function() {

var form;
var sku ;
var dsku_err = false;
var ddup_err = false;

vendor_data = new Array();
category_data = new Array();

$('#dsku').focus();
$('#delete').prop('disabled',true);

form = document.getElementById("deleteRecordform");
form.reset();
$('#dcategory').html('<option value="">Select Category..</option>');
$('#dvendor').html('<option value="">Select Vendor..</option>');
$('#dpic').html('<img src="defaultPic.png" height="100px" width=auto/>');

$('#deleteTab').click(function() {
$('#delete').prop('disabled',true);
$('#dsku').focus();
});

$('#dsku').on('keyup', function() {
$("#dsku").val($("#dsku").val().toUpperCase());
});
		
$('#dsku').on('blur', function() {
		check_dsku();
		if (dsku_err == false)
		{
    	sku = $('#dsku').val();
    	if(!sku) return;
    	var url = "/perl/jadrn029/proj1/check_dup.cgi?sku="+sku;
    	$.get(url, process_reply);
		}
    });

$('#dsku').on('focusout', function() {
	check_dsku();
	if(dsku_err == false && ddup_err == false)
	$('#delete').prop('disabled',false);
	else
	$('#delete').prop('disabled',true);
    });

$('#dsku').on('focus', function() {
	$('#delete').prop('disabled',true);
	$('#delstatus').text("");
});
  
$('#delete').on('click', function() {

dsku_err = false;
check_dsku();
			
if(dsku_err == false && ddup_err == false)	{
	var url = "/perl/jadrn029/proj1/deleterecord.cgi?sku="+sku;
	$.get(url, delete_product);
}
else
{
	$("#dsku").focus();
}
			
});

$(":reset").on("click",function() {
	$("#dsku").focus();
	$('#dcategory').html('<option value="">Select Category..</option>');
	$('#dvendor').html('<option value="">Select Vendor..</option>');
	$('#dpic').html('<img src="defaultPic.png" height="100px" width=auto/>');
	$("#dsku").css('border','1px solid black');
});
	
function process_reply(response) {

	if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
	else if(response == "OK")	{
		$("#dskuerror").show();
    	$('#dskuerror').text("Product Not Found");
		$('#delstatus').text("");
		ddup_err=true;
		$('#delete').prop('disabled',true);
		}
    else{
		ddup_err=false;
        $('#dskuerror').text("");
		$('#delstatus').text("");
		$('#delete').prop('disabled',false);
		sku = $('#dsku').val();
		$.get('/perl/jadrn029/proj1/get_vendor.cgi', storeVendor);
		$.get('/perl/jadrn029/proj1/get_category.cgi', storeCategory);
		var url = "/perl/jadrn029/proj1/get_product.cgi?sku="+sku;
    	$.get(url, display_product);
		
	}
}

function display_product(response){

	if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
    else if(response == "NO DATA")
    	$('#delstatus').text("Product Data Not Found");
		
    else{

		$('#delstatus').text("");
    	var cols = response.split("|");

$('#dmfid').val(cols[3]);
$('#ddesc').val(cols[4]);
$('#dfeatures').val(cols[5]);
$('#dcost').val(cols[6]);
$('#dretail').val(cols[7]);
$('#dquantity').val(cols[8]);

	for(var i=0; i < vendor_data.length-1; i++) {
        if (vendor_data[i][0] == cols[2] )
		var vendorText = '<option value="' + vendor_data[i][0] + '">'+vendor_data[i][1]+"</option>";        
		}
	for(var i=0; i < category_data.length-1; i++) {
        if (vendor_data[i][0] == cols[1] )
		var categoryText = '<option value="' + category_data[i][0] + '">'+category_data[i][1]+"</option>";
		}
$('#dcategory').html(categoryText);
$('#dvendor').html(vendorText);		

var img = '<img src="http://jadran.sdsu.edu/~jadrn029/proj1/pim_&e$/'+cols[9]+'" height="100px" width=auto/>';
	$('#dpic').html(img);
	$('#delete').prop('disabled',false);
	}

}

function delete_product(response) {
if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
   else{
	$('#delstatus').text(response);
	form = document.getElementById("deleteRecordform");
	form.reset();
	$('#dcategory').html('<option value="">Select Category..</option>');
	$('#dvendor').html('<option value="">Select Vendor..</option>');
	$('#dpic').html('<img src="defaultPic.png" height="100px" width=auto/>');
	
	}
	
}

function check_dsku(){
        if(isEmpty($('#dsku').val())) 
			{		
			$("#dskuerror").show();
			$("#dskuerror").html("Enter SKU");	
			$('#delstatus').text("");
			$("#dsku").css('border','1px solid red');
            dsku_err=true;
			$('#delete').prop('disabled',true);
            }
		else if(!$("#dsku").val().match(/^[A-Z]{3}-[0-9]{3}$/))
			{
			$("#dskuerror").show();
			$("#dskuerror").html("Enter SKU in ABC-123 format");
			$('#delstatus').text("");			
			$("#dsku").css('border','1px solid red');
            dsku_err=true;
			$('#delete').prop('disabled',true);
            }
		else{
			$("#dskuerror").hide();
			$("#dsku").css('border','1px solid black');
			dsku_err=false;
			$('#delete').prop('disabled',false);
			}
}

function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 

function storeVendor(response) {
	
	if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
   else
   {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        vendor_data[i] = innerArray;
        }
	}
}

function storeCategory(response) {
	if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
   else
   {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        category_data[i] = innerArray;
        }
	}	
}

function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
}


});