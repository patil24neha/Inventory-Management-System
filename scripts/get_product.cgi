#Code developed by Patil, Neha
#Project #1
#Spring 2018
#Username : jadrn029, 
#RED ID : 821545485

use DBI;
use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;

$str = "";

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

my $sth = $dbh->prepare("SELECT * from product where sku='$sku'");
$sth->execute();

my $number_of_rows = $sth->rows;

if($number_of_rows == 0) {
	$str = "NO DATA";
	}
else {

while(my @row=$sth->fetchrow_array()) {
    $str = $row[0]."|".$row[1]."|".$row[2]."|".$row[3]."|".$row[4]."|".$row[5]."|".$row[6]."|".$row[7]."|".$row[8]."|".$row[9];

	}
	}
	
$sth->finish();
$dbh->disconnect();

}

print "Content-type:  text/html\n\n";   	
print $str;

