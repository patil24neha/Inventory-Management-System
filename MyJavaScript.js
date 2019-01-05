/* Code developed by Patil, Neha
Project #1
Spring 2018
Username : jadrn029, 
RED ID : 821545485 */

var sku_err = false;
var dup_err = false;
var cat_err = false;
var vendor_err = false;
var mf_err = false;
var desc_err = false;
var feature_err = false;
var cost_err = false;
var retail_err = false;
var quantity_err = false;
var img_err = false;

$(document).ready( function() {
	
$.get('/perl/jadrn029/proj1/validate_cookie.cgi', validateCookie);

$('#new').prop('disabled',true);	
$("[name='username']").focus();	
$("[name='sku']").focus();	
$('#tabs').hide();
$("#tabs").tabs(); 
var form;
var size=0;
var extension; 
var allowedExt;

vendor_data = new Array();
category_data = new Array();

form = document.getElementById("newRecordform");
form.reset();
$('#picshow').prop('src', "defaultPic.png");

document.getElementById("header").innerHTML = ('<div id="title"><img src="logo.png" width="100px" height="auto"><h1>Shoe Girl Inventory</h1></div>');

$("#LoginReset").on("click",function() {
$("[name='username']").focus();
$('#loginerror').html("");
});

$(":submit").on("click",function(e) {
	e.preventDefault();

var username = $("#username").val();
var password = $("#password").val();
  
var url = "/perl/jadrn029/proj1/login.cgi";
$.post(url, {username:username,password:password}, verify_login);

});

$('#newTab').click(function() {
$('#new').prop('disabled',true);
});

$('body').on('click', function() {
$('#newstatus').text("");
});

$('#new').on('click', function() {
	dup_err = false;
	sku_err = false;
	cat_err = false;
	vendor_err = false;
	mf_err = false;
	desc_err = false;
	feature_err = false;
	cost_err = false;
	retail_err = false;
	quantity_err = false;
	img_err = false;
	
check_sku();
check_cat();
check_vendor();
check_mf();
check_desc();
check_feature();
check_cost();
check_retail();
check_quant();
check_image();

if(sku_err == false && dup_err == false && cat_err == false && vendor_err == false && mf_err == false && desc_err == false && feature_err == false && cost_err == false && retail_err == false && quantity_err == false && img_err == false)
{	
	send_file();
}
else
{
	$("#sku").focus();
}
});

$('#sku').on('keyup', function() {
$("#sku").val($("#sku").val().toUpperCase());
});

$('#sku').on('blur', function() {
		check_sku();
		if (sku_err == false)
		{
    	var sku = $('#sku').val();
    	if(!sku) return;
    	var url = "/perl/jadrn029/proj1/check_dup.cgi?sku="+sku;
    	$.get(url, process_reply);
		}
    });

$('input[name="picture"]').on('change',function(e) {
	size = this.files[0].size;
	});

$('#imgbutton').click(function() {
	$('#new').prop('disabled',false);
	check_image();
	if(img_err == true){
	$('#new').prop('disabled',true);
}
	else
	$('#new').prop('disabled',false);	
});
	
$('#sku').on('focus', function() {
	$('#new').prop('disabled',true);
	
	});     		
		
$('#sku').on('focusout', function() {
$('#newstatus').text("");
	check_sku();
	if(sku_err == false && dup_err == false){
	$('#new').prop('disabled',false);
}
	else
	$('#new').prop('disabled',true);
    });
$('#category').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_cat();
	if(cat_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#vendor').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_vendor();
	if(vendor_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#mfid').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_mf();
	if(mf_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#desc').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_desc();
	if(desc_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#features').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_feature();
	if(feature_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#cost').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_cost();
	if(cost_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#retail').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_retail();
	if(retail_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#quantity').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_quant();
	if(quantity_err == true)
	$('#new').prop('disabled',true);
    
    });
$('#pic').on('focusout', function() {
	$('#new').prop('disabled',false);
	check_image();
	if(img_err == true){
	$('#new').prop('disabled',true);
	}
});


$(":reset").on("click",function() {
$("#sku").focus();

$("#skuerror").html("");
$("#caterror").html("");
$("#vendorerror").html("");
$("#mfiderror").html("");
$("#descerror").html("");
$("#featureerror").html("");
$("#costerror").html("");
$("#retailerror").html("");
$("#quantityerror").html("");
$("#imageerror").html("");
$("#newstatus").html("");
$('#picshow').prop('src', "defaultPic.png");

$("#sku").css('border','1px solid black');
$("#category").css('border','1px solid black');
$("#vendor").css('border','1px solid black');
$("#mfid").css('border','1px solid black');
$("#desc").css('border','1px solid black');
$("#features").css('border','1px solid black');
$("#cost").css('border','1px solid black');
$("#retail").css('border','1px solid black');
$("#quantity").css('border','1px solid black');
$("#pic").css('border','1px solid black');
});

function validateCookie(response){
if(response.startsWith("Success"))
	{
			$("#content").hide();
			$("#tabs").show();
				$.get('/perl/jadrn029/proj1/get_vendor.cgi', storeVendor);
				$.get('/perl/jadrn029/proj1/get_category.cgi', storeCategory);
		
     }
    else if(response.startsWith("Fail"))
		{
			$("#tabs").hide();
			$("#content").show();
			$("#username").focus();			
    }
}
		
function verify_login(response){
 if(response.startsWith("Success")) 
	{	
	$('#content').hide();
	$('#tabs').show();
	$('#logout').show();
	$.get('/perl/jadrn029/proj1/get_vendor.cgi', storeVendor);
	$.get('/perl/jadrn029/proj1/get_category.cgi', storeCategory);
	}
 else 
	{
	$('#tabs').hide();
	$('#loginerror').show();
	$('#loginerror').text("Invalid Username or Password");
	}
}

function storeVendor(response) {
	var vendorText; 
	if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
   else
   {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        vendor_data[i] = innerArray;
        }
	vendorText = '<option value="">Select Vendor..</option>';
    
	for(var i=0; i < vendor_data.length-1; i++) {
        vendorText += '<option value="' + vendor_data[i][0] + '">'+vendor_data[i][1]+"</option>";
        }
		$('#vendor').html(vendorText);	
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
	var categoryText = '<option value="">Select Category..</option>';
    
	for(var i=0; i < category_data.length-1; i++) {
        categoryText += '<option value="' + category_data[i][0] + '">'+category_data[i][1]+"</option>";
        }		
		$('#category').html(categoryText);	
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

function process_reply(response) {

	if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
   else if(response == "OK"){
		$('#skuerror').text("");
		dup_err=false;
		$('#new').prop('disabled',false);
		}
    else{
        dup_err=true;
		$("#skuerror").show();
		$('#skuerror').text("Duplicate SKU");
		$('#new').prop('disabled',true);
	}
}

function send_file() {    
		var sku = $("#sku").val();
        var form_data = new FormData($('form')[0]);         
        form_data.append("image",document.getElementById("pic").files[0]);		
		var newFname = $("#pic")[0].files[0].name.substr(0, $("#pic")[0].files[0].name.lastIndexOf('.'))+"_"+sku+"."+$("#pic")[0].files[0].name.substr(($("#pic")[0].files[0].name.lastIndexOf('.') + 1));
		
		form_data.append("image_name",newFname);		
        var toDisplay = '<img src="http://jadran.sdsu.edu/~jadrn029/proj1/busywait.gif" width="30px"/>';               
		$('#pict').show();       
	   $('#pict').html(toDisplay);
	
		$.ajax( {
            url: "/perl/jadrn029/proj1/image_upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
	       if(response.startsWith("Success")) 
				{
				$('#pict').hide();       
				
		var category = $("#category").val();
		var vendor = $("#vendor").val();
		var mfid = $("#mfid").val();
		var desc = $("#desc").val();
		var features = $("#features").val();
		var cost = $("#cost").val();
		var retail = $("#retail").val();
		var quantity = $("#quantity").val();

				var url = "/perl/jadrn029/proj1/newrecord.cgi?sku="+sku+"&category="+category+"&vendor="+vendor+"&mfid="+mfid+"&desc="+desc+"&features="+features+"&cost="+cost+"&retail="+retail+"&quantity="+quantity+"&pic="+newFname;
			
				$.get(url, add_product); 
				}
	       
			else if(response == "Error")
				window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
		
			else {
				imgStatus = response;
				$('#imgerror').text(imgStatus);
				$('#pict').hide();
                }
	    },
            error: function(response) {
              imgStatus = "Sorry, an upload error occurred";
			  $('#imgerror').text(imgStatus);
			  $('#pict').hide();		
				}
            });
}
	
function add_product(response){
if(response == "Error")
    	window.location = "http://jadran.sdsu.edu/perl/jadrn029/proj1/logout.cgi";
   
   else{
	$('#newstatus').text(response);
	form = document.getElementById("newRecordform");
	form.reset();
	$('#picshow').prop('src', "defaultPic.png");
	$("[name='sku']").focus();	
	}
}

function check_sku(){
        if(isEmpty($('#sku').val())) 
			{		
			$("#skuerror").show();
			$("#skuerror").html("Enter SKU");	
			$("#sku").css('border','1px solid red');
            sku_err=true;
			
            }
		else if(!$("#sku").val().match(/^[A-Z]{3}-[0-9]{3}$/))
			{
			$("#skuerror").show();
			$("#skuerror").html("Enter SKU in ABC-123 format");	
			$("#sku").css('border','1px solid red');
            sku_err=true;
			
            }
		else{
			$("#skuerror").hide();
			$("#sku").css('border','1px solid black');
			sku_err=false;
			}
}

function check_cat(){
	if($('select[name="category"]').val()=="") {
			$("#caterror").show();
			$("#caterror").html("Select product category");	
			$('#category').css('border','1px solid red');
            cat_err=true;			
			$('#new').prop('disabled',true);
            }
	else {
			$("#caterror").hide();
			$('#category').css('border','1px solid black');
			$('#new').prop('disabled',false);
			cat_err=false;
			}
}

function check_vendor(){			
	if($('select[name="vendor"]').val()==""){
			$("#vendorerror").show();
			$("#vendorerror").html("Select product vendor");	
			$('#vendor').css('border','1px solid red');
            vendor_err=true;			
			$('#new').prop('disabled',true);
            
			}
	else{
			$("#vendorerror").hide();
			$('#vendor').css('border','1px solid black');
			$('#new').prop('disabled',false);
			vendor_err=false;
		}
}

function check_mf(){		
	if(isEmpty($('#mfid').val())){
			$("#mfiderror").show();
			$("#mfiderror").html("Enter manufacturer's id");	
			$('#mfid').css('border','1px solid red');
            mf_err=true;
			
			$('#new').prop('disabled',true);
            
			}
	else {
			$("#mfiderror").hide();
			$('#mfid').css('border','1px solid black');
			$('#new').prop('disabled',false);
			mf_err=false;
			}
}

function check_desc(){			
	if(isEmpty($('#desc').val())){
			$("#descerror").show();
			$("#descerror").html("Enter product description");	
			$('#desc').css('border','1px solid red');
            desc_err=true;
			
			$('#new').prop('disabled',true);
            
			}
	else{
			$("#descerror").hide();
			$('#desc').css('border','1px solid black');
			$('#new').prop('disabled',false);
			desc_err=false;
			}
}

function check_feature(){			
	if(isEmpty($('#features').val())){
			$("#featureerror").show();
			$("#featureerror").html("Enter product features");	
			$('#features').css('border','1px solid red');
            feature_err=true;
		
			$('#new').prop('disabled',true);
            
			}
	else {
			$("#featureerror").hide();
			$('#features').css('border','1px solid black');
			$('#new').prop('disabled',false);
			feature_err=false;
			}
}

function check_cost(){			
	if(isEmpty($('#cost').val())){
			$("#costerror").show();
			$("#costerror").html("Enter cost");	
			$('#cost').css('border','1px solid red');
            cost_err=true;
			
			$('#new').prop('disabled',true);
            
			}
	else if(!$.isNumeric($("#cost").val()) || $("#cost").val()<=0) 
			{
			$("#costerror").show();
			$("#costerror").html("Cost should be > 0");	
			$('#cost').css('border','1px solid red');
            cost_err=true;
			$('#new').prop('disabled',true);
            
			}
    else{
			$("#costerror").hide();
			$('#cost').css('border','1px solid black');
			$('#new').prop('disabled',false);
			cost_err=false;
			}
	}

function check_quant(){			
	if(isEmpty($('#quantity').val())){
			
			$("#quantityerror").show();
			$("#quantityerror").html("Enter quantity");	
			$('#quantity').css('border','1px solid red');
            quantity_err=true;
			$('#new').prop('disabled',true);
            
			}
	else if(!$("#quantity").val().match(/^[0-9]+$/)) 
			{
			$("#quantityerror").show();
			$("#quantityerror").html("Quantity should be >= 0");	
			$('#quantity').css('border','1px solid red');
            quantity_err=true;
			$('#new').prop('disabled',true);
            
			}
	else{
			$("#quantityerror").hide();
			$('#quantity').css('border','1px solid black');
			$('#new').prop('disabled',false);
			quantity_err=false;
			} 
}

function check_retail(){		
	if(isEmpty($('#retail').val())){
			$("#retailerror").show();
			$("#retailerror").html("Enter retail price");	
			$('#retail').css('border','1px solid red');
            retail_err=true;	
			$('#new').prop('disabled',true);
			}
	else if(!$.isNumeric($("#retail").val()) || $("#retail").val()<=0) 
			{
			$("#retailerror").show();
			$("#retailerror").html("Retail price should be > 0");	
			$('#retail').css('border','1px solid red');
            retail_err=true;	
			$('#new').prop('disabled',true);
			}
	else{
			$("#retailerror").hide();
			$('#retail').css('border','1px solid black');
			$('#new').prop('disabled',false);
			retail_err=false;
			}
}

function check_image() {
	extension = $('#pic').val().split('.').pop().toLowerCase(); 
	allowedExt = new Array('gif','png','jpg','jpeg','tiff','bmp');
	
	if(size == 0) 
	{ 
	$("#imageerror").show();
	$("#imageerror").html("Please select a file");
	$('input[name="picture"]').css('border','1px solid red');			
    img_err=true; 
	$('#new').prop('disabled',true);
	}
	else if($("#pic")[0].files[0].name.length > 22) 
	{ 
	
	$("#imageerror").show();
	$("#imageerror").html("Image name can have max 17 characters");
	$('input[name="picture"]').css('border','1px solid red');			
    img_err=true; 
	$('#new').prop('disabled',true);
	}
	else if(!$("#pic")[0].files[0].name.match(/^[a-zA-Z0-9_.-]+$/)) 
	{ 	 
	$("#imageerror").show();
	$("#imageerror").html("Invalid characters in image name");
	$('input[name="picture"]').css('border','1px solid red');			
    img_err=true; 
	$('#new').prop('disabled',true);
	}
	else if((jQuery.inArray(extension, allowedExt))== -1) 
	{ 
	$("#imageerror").show();
	$("#imageerror").html("Allowed file extensions are gif, png, jpg, jpeg, tiff, bmp");
	$('input[name="picture"]').css('border','1px solid red');			
    img_err=true; 
	$('#new').prop('disabled',true);
	} 
	else if(size/1000 > 3000) 
	{
	$("#imageerror").show();
	$("#imageerror").html("File is too big, 3 MB max");
	$('input[name="picture"]').css('border','1px solid red');		
    img_err=true; 
	$('#new').prop('disabled',true);
	}
	else
	{
	$("#imageerror").hide();
	$('input[name="picture"]').css('border','1px solid black');
	$('#new').prop('disabled',false);
	img_err=false; 
	showUploadedPic();
	}
}

//Source : https://codepen.io/mobifreaks/pen/LIbca
function showUploadedPic() {
            if ($("#pic")[0].files && $("#pic")[0].files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#picshow')
                        .attr('src', e.target.result)
						.width(auto)
						.height(100);
                };

                reader.readAsDataURL($("#pic")[0].files[0]);
            }
			else
			{
			$('#picshow').prop('src', "defaultPic.png");
			}
}
		
function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 
});
