#Code developed by Patil, Neha
#Project #1
#Spring 2018
#Username : jadrn029, 
#RED ID : 821545485

use CGI;
use DBI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
$str = "";
print "content-type: text/html\n\n";

my $sid_cookie = $q->cookie('jadrn029SID');
my $session = new CGI::Session(undef, $sid_cookie, {Directory=>'/tmp'});
my $sid = $session->id;

if($sid_cookie ne $sid) {
$str = "Error";
}

else
{
my $sku = $q->param('sku');

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn029';
my $username = 'jadrn029';
my $password = 'england';

my $database_source = "dbi:mysql:$database:$host:$port";
my $dbh = DBI->connect($database_source, $username, $password)
	or die "Cannot connect to DB";
	
my $sth = $dbh->prepare("SELECT sku FROM product where sku='$sku'");
$sth->execute();
my $number_of_rows = $sth->rows;

if($number_of_rows == 0) {
	$str = "OK";
	}
else {
	$str = "DUPLICATE";
	}

$sth->finish();
$dbh->disconnect();

}

print $str;
