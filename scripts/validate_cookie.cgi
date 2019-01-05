#Code developed by Patil, Neha
#Project #1
#Spring 2018
#Username : jadrn029, 
#RED ID : 821545485

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid_cookie = $q->cookie('jadrn029SID');
my $session = new CGI::Session(undef, $sid_cookie, {Directory=>'/tmp'});
my $sid = $session->id;

print "Content-type: text/html\n\n";

if($sid_cookie eq $sid) {
print "Success";
}
else{
print "Fail";
}

