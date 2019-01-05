#Code developed by Patil, Neha
#Project #1
#Spring 2018
#Username : jadrn029, 
#RED ID : 821545485

use DBI;
use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

$str = "";

my $q = new CGI;

my $sid_cookie = $q->cookie('jadrn029SID');
my $session = new CGI::Session(undef, $sid_cookie, {Directory=>'/tmp'});
my $sid = $session->id;

if($sid_cookie ne $sid) {
$str = "Error";
}

else
{

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn029";
my $username = "jadrn029";
my $password = "england";
my $database_source = "dbi:mysql:$database:$host:$port";

my $sku = $q->param('sku');

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

my $sth = $dbh->prepare("DELETE from product where sku='$sku'");
$sth->execute();

my $number_of_rows = $sth->rows;


if($number_of_rows == 0) {
	$str = "Error : ".$dbh->errstr();
	}
else {
    $str = "Product is deleted successfully";
}
$sth->finish();
$dbh->disconnect();	
}

print "Content-type:  text/html\n\n";

print $str;

