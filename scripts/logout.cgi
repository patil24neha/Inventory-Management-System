#Code developed by Patil, Neha
#Project #1
#Spring 2018
#Username : jadrn029, 
#RED ID : 821545485

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);


my $q = new CGI;
my $sid = $q->cookie("jadrn029SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->clear();
$session->delete($sid);
my $cookie = $q->cookie(jadrn029SID => '');
my $cookievalue = $q->cookie('jadrn029SID');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  

print <<END;

<html>
<head>
   <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, no-store, must-revalidate" />
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache" />
	<META HTTP-EQUIV="Expires" CONTENT="0" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>Logout</title>
	<link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn029/proj1/MyCSS.css"/>
	<script src="/jquery/jQueryUI.js"></script>
	<script src="http://jadran.sdsu.edu/~jadrn029/proj1/MyJavaScript.js"></script>	
</head>
<body>

<div id="logOutheader"><div id="title"><img src="http://jadran.sdsu.edu/~jadrn029/proj1/logo.png" width="100px" height="auto"><h1>Shoe Girl Inventory</h1></div></div>
<br><br>
<div id="logoutstatus">

You are logged out !!<br>
Click here to Login again<br><br>
<a href="http://jadran.sdsu.edu/~jadrn029/proj1/index.html" id="login"><input type="button" class="btn btn-primary btn-lg" value="Login"></a>

</div>

</body>
</html>

END
