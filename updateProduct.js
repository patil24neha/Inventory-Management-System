/* Code developed by Patil, Neha
Project #1
Spring 2018
Username : jadrn029, 
RED ID : 821545485 */

$(document).ready( function() {

var form;
var sku ;
var newFname;
var size=0;
var extension; 
var allowedExt;
var picName;

var esku_err=false;
var edup_err = false;
var ecat_err = false;
var evendor_err = false;
var emf_err = false;
var edesc_err = false;
var efeature_err = false;
var ecost_err = false;
var eretail_err = false;
var equantity_err = false;
var eimg_err = false; 

vendor_data = new Array();
category_data = new Array();

$("#esku").focus();	

form = document.getElementById("editRecordform");
form.reset();
$('#ecategory').html('<option value="">Select Category..</option>');
$('#evendor').html('<option value="">Select Vendor..</option>');
$('#epicshow').prop('src', "defaultPic.png");

$('#edit').prop('disabled',true);	

$('#ecategory').prop('disabled',true);
$('#evendor').prop('disabled',true);
$('#emfid').prop('disabled',true);
$('#edesc').prop('disabled',true);
$('#efeatures').prop('disabled',true);
$('#ecost').prop('disabled',true);
$('#eretail').prop('disabled',true);
$('#equantity').prop('disabled',true);
$('#epic').prop('disabled',true);
$('#eimgbutton').prop('disabled',true);

$('#esku').on('keyup', function() {
$("#esku").val($("#esku").val().toUpperCase());
});

$('#esku').on('blur', function() {
$('#editstatus').text("");
    	check_esku();
		if (esku_err == false)
		{
    	sku = $('#esku').val();
    	if(!sku) return;
    	var url = "/perl/jadrn029/proj1/check_dup.cgi?sku="+sku;
    	$.get(url, process_reply);
		}
    });

$('input[name="epicture"]').on('change',function(e) {
	size = this.files[0].size;
	if (size > 0 && $("#epic")[0].files[0].name != "")
	{
	$('#eimgbutton').prop('disabled',false);
	}
	else
	$('#eimgbutton').prop('disabled',true);
});

$('#eimgbutton').click(function() {
check_eimage();
});

$('#edit').on('click', function() {
	
 esku_err = false;
 edup_err = false;
 ecat_err = false;
 evendor_err = false;
 emf_err = false;
 edesc_err = false;
 efeature_err = false;
 ecost_err = false;
 eretail_err = false;
 equantity_err = false;
 eimg_err=false; 

check_esku();
check_ecat();
check_evendor();
check_emf();
check_edesc();
check_efeature();
check_ecost();
check_eretail();
check_equant();

if (size > 0 && $("#epic")[0].files[0].name != "")
{
check_eimage();
}

if(esku_err == false && edup_err == false && ecat_err == false && evendor_err == false && emf_err == false && edesc_err == false && efeature_err == false && ecost_err == false && eretail_err == false && equantity_err == false && eimg_err == false)
{	
	if (size == 0)
	{
	call_UpdateProduct(picName);
	}
	else
	send_file();
}

else
{
	$("#esku").focus();
}		
});

$('#esku').on('focus', function() {
	$('#editstatus').text("");
	$('#edit').prop('disabled',true);
	});     		
		
$('#esku').on('focusout', function() {
	check_esku();
	if(esku_err == false && edup_err == false)
	$('#edit').prop('disabled',false);
	else
	$('#edit').prop('disabled',true);
    });
$('#ecategory').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_ecat();
	if(ecat_err == true)
	$('#edit').prop('disabled',true);
    
    });
$('#evendor').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_evendor();
	if(evendor_err == true)
	$('#edit').prop('disabled',true);
    
    });
$('#emfid').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_emf();
	if(emf_err == true)
	$('#edit').prop('disabled',true);
    
    });
$('#edesc').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_edesc();
	if(edesc_err == true)
	$('#edit').prop('disabled',true);
    
    });
$('#efeatures').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_efeature();
	if(efeature_err == true)
	$('#edit').prop('disabled',true);
    
    });
$('#ecost').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_ecost();
	if(ecost_err == true)
	$('#edit').prop('disabled',true);
    
    });
$('#eretail').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_eretail();
	if(eretail_err == true)
	$('#edit').prop('disabled',true);
    
    });
$('#equantity').on('focusout', function() {
	$('#edit').prop('disabled',false);
	check_equant();
	if(equantity_err == true)
	$('#edit').prop('disabled',true);
    
    });

$(":reset").on("click",function() {
$("#esku").focus();

$("#eskuerror").html("");
$("#ecaterror").html("");
$("#evendorerror").html("");
$('#ecategory').html('<option value="">Select Category..</option>');
$('#evendor').html('<option value="">Select Vendor..</option>');
$("#emfiderror").html("");
$("#edescerror").html("");
$("#efeatureerror").html("");
$("#ecosterror").html("");
$("#eretailerror").html("");
$("#equantityerror").html("");
$("#eimageerror").html("");
$("#editstatus").html("");
$('#epicshow').prop('src', "defaultPic.png");

$("#esku").css('border','1px solid black');
$("#ecategory").css('border','1px solid black');
$("#evendor").css('border','1px solid black');
$("#emfid").css('border','1px solid black');
$("#edesc").css('border','1px solid black');
$("#efeatures").css('border','1px solid black');
$("#ecost").css('border','1px solid black');
$("#eretail").css('border','1px solid black');
$("#equantity").css('border','1px solid black');
$("#epic").css('border','1px solid black');

});

function process_reply(response) {

if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
	else if(response == "OK")		
	{
    	$("#eskuerror").show();
		$('#eskuerror').text("Product Not Found");
		edup_err = true;
		$('#edit').prop('disabled',true);
		
	}	
    else
	{
	edup_err = false;
	$('#edit').prop('disabled',false);
	$('#eskuerror').text("");
	
$('#ecategory').prop('disabled',false);
$('#evendor').prop('disabled',false);
$('#emfid').prop('disabled',false);
$('#edesc').prop('disabled',false);
$('#efeatures').prop('disabled',false);
$('#ecost').prop('disabled',false);
$('#eretail').prop('disabled',false);
$('#equantity').prop('disabled',false);
$('#epic').prop('disabled',false);
$('#eimgbutton').prop('disabled',false);

	$.get('/perl/jadrn029/proj1/get_vendor.cgi', storeVendor);
	$.get('/perl/jadrn029/proj1/get_category.cgi', storeCategory);
	
    	var url = "/perl/jadrn029/proj1/get_product.cgi?sku="+sku;
    	$.get(url, display_product);
	}
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

function display_product(response){

	if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
		
    else if(response == "NO DATA")
    	$('#editstatus').text("Product Data Not Found");
		
    else{

$('#editstatus').text("");
var cols = response.split("|");
		
$('#emfid').val(cols[3]);
$('#edesc').val(cols[4]);
$('#efeatures').val(cols[5]);
$('#ecost').val(cols[6]);
$('#eretail').val(cols[7]);
$('#equantity').val(cols[8]);

picName = cols[9];

var vendorText = '<option value="">Select Vendor..</option>';
    
	for(var i=0; i < vendor_data.length-1; i++) {
        if (vendor_data[i][0] == cols[2] )
		vendorText += '<option value="' + vendor_data[i][0] + '" selected>'+vendor_data[i][1]+"</option>";
        else
		vendorText += '<option value="' + vendor_data[i][0] + '">'+vendor_data[i][1]+"</option>";
        
		}
$('#evendor').html(vendorText);	

var categoryText = '<option value="">Select Category..</option>';
    
	for(var i=0; i < category_data.length-1; i++) {
        if (vendor_data[i][0] == cols[1] )
		categoryText += '<option value="' + category_data[i][0] + '" selected>'+category_data[i][1]+"</option>";
        else
		categoryText += '<option value="' + category_data[i][0] + '">'+category_data[i][1]+"</option>";
        
		}
$('#ecategory').html(categoryText);

$('#epicshow').prop('src', "http://jadran.sdsu.edu/~jadrn029/proj1/pim_&e$/"+cols[9]);
	}
	
	if (size > 0 && $("#epic")[0].files[0].name != "")
	{
	$('#eimgbutton').prop('disabled',false);
	}
	else
	$('#eimgbutton').prop('disabled',true);

}

function send_file() {    
		sku = $("#esku").val();
        var form_data = new FormData($('form')[0]);
        form_data.append("image",document.getElementById("epic").files[0]);
		newFname = $("#epic")[0].files[0].name.substr(0, $("#epic")[0].files[0].name.lastIndexOf('.'))+"_"+sku+"."+$("#epic")[0].files[0].name.substr(($("#epic")[0].files[0].name.lastIndexOf('.') + 1));
		form_data.append("image_name",newFname);
		
        var toDisplay = '<img src="http://jadran.sdsu.edu/~jadrn029/proj1/busywait.gif" width="30px"/>';               
		$('#epict').show();       
	   $('#epict').html(toDisplay);
	
		$.ajax( {
            url: "/perl/jadrn029/proj1/image_upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
	       if(response.startsWith("Success")) 
				{
				$('#epict').hide(); 
				call_UpdateProduct(newFname);	
				}
			else if(response == "Error")
				window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
	       else {
				imgStatus = response;
				$('#eimgerror').text(imgStatus);
				$('#epict').hide();
                }
	    },
            error: function(response) {
              imgStatus = "Sorry, an upload error occurred";
			  $('#eimgerror').text(imgStatus);
			  $('#epict').hide();		
				}
            });
}

function call_UpdateProduct(string){
      
sku = $("#esku").val();			
var category = $("#ecategory").val();
var vendor = $("#evendor").val();
var mfid = $("#emfid").val();
var desc = $("#edesc").val();
var features = $("#efeatures").val();
var cost = $("#ecost").val();
var retail = $("#eretail").val();
var quantity = $("#equantity").val();

var url = "/perl/jadrn029/proj1/editrecord.cgi?sku="+sku+"&category="+category+"&vendor="+vendor+"&mfid="+mfid+"&desc="+desc+"&features="+features+"&cost="+cost+"&retail="+retail+"&quantity="+quantity+"&pic="+string;
			
$.get(url, update_product); 

}
	
function update_product(response){
if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
   else{
	form = document.getElementById("editRecordform");
	form.reset();
	$('#ecategory').html('<option value="">Select Category..</option>');
	$('#evendor').html('<option value="">Select Vendor..</option>');
	$('#epicshow').prop('src', "defaultPic.png");
	$('#editstatus').text(response);
	
$('#ecategory').prop('disabled',true);
$('#evendor').prop('disabled',true);
$('#emfid').prop('disabled',true);
$('#edesc').prop('disabled',true);
$('#efeatures').prop('disabled',true);
$('#ecost').prop('disabled',true);
$('#eretail').prop('disabled',true);
$('#equantity').prop('disabled',true);
$('#epic').prop('disabled',true);
$('#eimgbutton').prop('disabled',true);

	}
}

function check_esku(){
        if(isEmpty($('#esku').val())) 
			{		
			$("#eskuerror").show();
			$("#eskuerror").html("Enter SKU");	
			$("#esku").css('border','1px solid red');
            esku_err=true;
			
            }
		else if(!$("#esku").val().match(/^[A-Z]{3}-[0-9]{3}$/))
			{
			$("#eskuerror").show();
			$("#eskuerror").html("Enter SKU in ABC-123 format");	
			$("#esku").css('border','1px solid red');
            esku_err=true;
			
            }
		else{
			$("#eskuerror").hide();
			$("#esku").css('border','1px solid black');
			esku_err=false;
			}
}

function check_ecat(){
	if($('select[name="ecategory"]').val()=="") {
			$("#ecaterror").show();
			$("#ecaterror").html("Select product category");	
			$('#ecategory').css('border','1px solid red');
            ecat_err=true;
			$('#edit').prop('disabled',true);
            }
	else {
			$("#ecaterror").hide();
			$('#ecategory').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			ecat_err=false;
			}
}

function check_evendor(){			
	if($('select[name="evendor"]').val()==""){
			$("#evendorerror").show();
			$("#evendorerror").html("Select product vendor");	
			$('#evendor').css('border','1px solid red');
            evendor_err=true;
			$('#edit').prop('disabled',true);
            
			}
	else{
			$("#evendorerror").hide();
			$('#evendor').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			evendor_err=false;
		}
}

function check_emf(){		
	if(isEmpty($('#emfid').val())){
			$("#emfiderror").show();
			$("#emfiderror").html("Enter manufacturer's id");	
			$('#emfid').css('border','1px solid red');
            emf_err=true;			
			$('#edit').prop('disabled',true);
            
			}
	else {
			$("#emfiderror").hide();
			$('#emfid').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			emf_err=false;
			}
}

function check_edesc(){			
	if(isEmpty($('#edesc').val())){
			$("#edescerror").show();
			$("#edescerror").html("Enter product description");	
			$('#edesc').css('border','1px solid red');
            edesc_err=true;			
			$('#edit').prop('disabled',true);           
			}
	else{
			$("#edescerror").hide();
			$('#edesc').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			edesc_err=false;
			}
}

function check_efeature(){		
	if(isEmpty($('#efeatures').val())){
			$("#efeatureerror").show();
			$("#efeatureerror").html("Enter product features");	
			$('#efeatures').css('border','1px solid red');
            efeature_err=true;		
			$('#edit').prop('disabled',true);           
			}
	else {
			$("#efeatureerror").hide();
			$('#efeatures').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			efeature_err=false;
			}
}

function check_ecost(){			
	if(isEmpty($('#ecost').val())){
			$("#ecosterror").show();
			$("#ecosterror").html("Enter cost");	
			$('#ecost').css('border','1px solid red');
            ecost_err=true;			
			$('#edit').prop('disabled',true);
            
			}
	else if(!$.isNumeric($("#ecost").val()) || $("#ecost").val()<=0) 
			{
			$("#ecosterror").show();
			$("#ecosterror").html("Cost should be > 0");	
			$('#ecost').css('border','1px solid red');
            ecost_err=true;
			$('#edit').prop('disabled',true);
            
			}
    else{
			$("#ecosterror").hide();
			$('#ecost').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			ecost_err=false;
			}
	}

function check_equant(){			
	if(isEmpty($('#equantity').val())){			
			$("#equantityerror").show();
			$("#equantityerror").html("Enter quantity");	
			$('#equantity').css('border','1px solid red');
            equantity_err=true;
			$('#edit').prop('disabled',true);
            
			}
	else if(!$("#equantity").val().match(/^[0-9]+$/)) 
			{
			$("#equantityerror").show();
			$("#equantityerror").html("Quantity should be >= 0");	
			$('#equantity').css('border','1px solid red');
            equantity_err=true;
			$('#edit').prop('disabled',true);
            
			}
	else{
			$("#equantityerror").hide();
			$('#equantity').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			equantity_err=false;
			} 
}

function check_eretail(){		
	if(isEmpty($('#eretail').val())){
			$("#eretailerror").show();
			$("#eretailerror").html("Enter retail price");	
			$('#eretail').css('border','1px solid red');
            eretail_err=true;	
			$('#edit').prop('disabled',true);
			}
	else if(!$.isNumeric($("#eretail").val()) || $("#eretail").val()<=0) 
			{
			$("#eretailerror").show();
			$("#eretailerror").html("Retail price should be > 0");	
			$('#eretail').css('border','1px solid red');
            eretail_err=true;	
			$('#edit').prop('disabled',true);
			}
	else{
			$("#eretailerror").hide();
			$('#eretail').css('border','1px solid black');
			$('#edit').prop('disabled',false);
			eretail_err=false;
			}
}

function check_eimage() {
	extension = $('#epic').val().split('.').pop().toLowerCase(); 
	allowedExt = new Array('gif','png','jpg','jpeg','tiff','bmp');
	
	if(size == 0) 
	{ 
	$("#eimageerror").show();
	$("#eimageerror").html("Please select a file");
	 eimg_err=true; 
	$('#edit').prop('disabled',true);
	}
	else if($("#epic")[0].files[0].name.length > 22) 
	{ 
	 
	$("#eimageerror").show();
	$("#eimageerror").html("Image name can have max 17 characters");
	$('input[name="epicture"]').css('border','1px solid red');			
    eimg_err=true; 
	$('#edit').prop('disabled',true);
	}
	else if(!$("#epic")[0].files[0].name.match(/^[a-zA-Z0-9_.-]+$/)) 
	{ 
	 
	$("#eimageerror").show();
	$("#eimageerror").html("Invalid characters in image name");
	$('input[name="epicture"]').css('border','1px solid red');			
    eimg_err=true; 
	$('#edit').prop('disabled',true);
	}
	else if((jQuery.inArray(extension, allowedExt))== -1) 
	{ 
	 
	$("#eimageerror").show();
	$("#eimageerror").html("Allowed file extensions are gif, png, jpg, jpeg, tiff, bmp");
    eimg_err=true; 	
	$('#edit').prop('disabled',true);
	} 
	else if(size/1000 > 3000) 
	{
	$("#eimageerror").show();
	$("#eimageerror").html("File is too big, 3 MB max");		
    eimg_err=true; 	
	$('#edit').prop('disabled',true);
	}
	else
	{
	$("#eimageerror").hide();
	$('#edit').prop('disabled',false);
	eimg_err=false; 
	showUploadedPic();
	}
}

//Source : https://codepen.io/mobifreaks/pen/LIbca
function showUploadedPic() {
            if ($("#epic")[0].files && $("#epic")[0].files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#epicshow')
                        .attr('src', e.target.result)
						.width(auto)
						.height(100);
                };

                reader.readAsDataURL($("#epic")[0].files[0]);
            }
			else
			{
			$('#epicshow').prop('src', "defaultPic.png")
			}
}

function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 
		
});