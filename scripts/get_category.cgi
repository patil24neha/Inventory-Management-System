#Code developed by Patil, Neha
#Project #1
#Spring 2018
#Username : jadrn029, 
#RED ID : 821545485

use DBI;
use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

print "Content-type:  text/html\n\n";
$str = "";

my $q = new CGI;

my $sid_cookie = $q->cookie('jadrn029SID');
my $session = new CGI::Session(undef, $sid_cookie, {Directory=>'/tmp'});
my $sid = $session->id;

if($sid_cookie ne $sid) {
print "Error";
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
or die 'Cannot connect to db';

my $sth = $dbh->prepare("SELECT id,name FROM category");
$sth->execute();

while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        $str .= $item."|";
        }       
    $str .= ";";    
    }
 
$sth->finish();
$dbh->disconnect();

}  	
print $str;

