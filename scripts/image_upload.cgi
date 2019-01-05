#   file upload script.  
#   Remember that you MUST use enctype="mulitpart/form-data"
#   in the web page that invokes this script, and the destination 
#   directory for the uploaded file must have permissions set to 777.  
#   Do NOT set 777 permission on any other directory in your account!
#   
#   CS645, Spring 2018
#   Alan Riggins

#Code developed by Patil, Neha
#Project #1
#Spring 2018
#Username : jadrn029, 
#RED ID : 821545485

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use CGI::Session;

$str = "";
my $q = new CGI;

print "content-type: text/html\n\n";

my $sid_cookie = $q->cookie('jadrn029SID');
my $session = new CGI::Session(undef, $sid_cookie, {Directory=>'/tmp'});
my $sid = $session->id;

if($sid_cookie ne $sid) {
print "Error";
}

else
{
####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn029/public_html/proj1/pim_&e$';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################


my $filename = $q->param("image");
my $fname = $q->param("image_name");
unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }
    
my ($name, $path, $extension) = fileparse($filename, '/..*/');
$filename = $name.$extension;

$fname =~ s/ //; #remove any spaces
if($fname !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }   

$filename = untaint($filename);

# get a handle on the uploaded image     
my $filehandle = $q->upload("image"); 

unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$fname" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    print UPLOADFILE $_;
    }
close UPLOADFILE;


print "Success, the file $filename has been uploaded";


# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }
}