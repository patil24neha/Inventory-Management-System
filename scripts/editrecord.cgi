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
$q = new CGI;

print "Content-type:  text/html\n\n";

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

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Can not connect to db';

my $count;

my $sku = $q->param("sku");
my $category = $q->param("category");
my $vendor = $q->param("vendor");
my $mfid = $q->param("mfid");
my $desc = $q->param("desc");
my $features = $q->param("features");
my $cost = $q->param("cost");
my $retail = $q->param("retail");
my $quantity = $q->param("quantity");
my $pic = $q->param("pic");

	
my $sql = "UPDATE product set catID=? , venID=? , vendorModel=? , description=? , features=? , cost=? , retail=? , quantity=? , image=? where sku=?;";
my $sth = $dbh->prepare($sql);
$sth->execute($category,$vendor,$mfid,$desc,$features,$cost,$retail,$quantity,$pic,$sku);

$count = $sth->rows;

if($count > 0) 
{
	$str = "Successfully updated product data";
}
else 
{
	$str ="ERROR: ".$dbh->errstr()."SQL :".$sql;
}

$sth->finish();
$dbh->disconnect();


}
print $str;