<?php




require('phpmailer/class.phpmailer.php');


$email = new PHPMailer();


$email->CharSet = 'UTF-8';

$email->From      = $_POST['mailMeil'];//'xz@gmail.com';//от кого
$email->FromName  = 'Planner Wardrobe Larvij';
$email->Subject   = $_POST['mailTitle'];
$email->Body      = $_POST['mailText'];
$email->AddAddress($_POST['mailmy']);//куда

$file_to_attach ='xz';
$xz ='xz';
if($_POST['id']!='nullxz'){

	$file_to_attach = 'info.pdf';

	$xz = '../save/'.$_POST['id'].'/infoTime/info.pdf';
	$file_to_attach ='../save/'.$_POST['id'].'/infoTime/info.pdf';
	$email->AddAttachment( $file_to_attach , 'info.pdf');
}
//

$email->Send();

echo '$email 222mailmy== '.$_POST['mailTitle'].' file_to_attach= '.$file_to_attach.$file_to_attach.$xz;


/*
//Почта получателя
$mailTo = $_POST['mailmy'];
//Почта отпровителя
$mailFrom = $_POST['mailMeil'];
//Заголовок письма
$mailTitle = $_POST['mailTitle'];
//Текст письма
$mailText = $_POST['mailText'];
//Путь к папке для файлов
$mailDirect = $_POST['mailDirect'];






function xLog($msg){
    global $mailTo, $fileName;
    $res = date("d.m.y H:i") ."; To: $mailTo; pic: $fileName" . "; $msg";
    $log = fopen("uplog.log", "a");
    fwrite($log, "\n$res");
    fclose($log);
    
    return $res;
}

// вариант 2
require_once 'lib/libmail.php';
$m = new Mail("UTF-8");
$m->From($mailFrom);
$m->To($mailTo);
$m->Subject($mailTitle);
$m->Body($mailText);


if($m->Send() === true){
    echo xLog("Libmail Successn");
}
else {
    echo xLog("Libmail Failure");
}
*/

?>
