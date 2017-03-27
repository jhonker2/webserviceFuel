<?php
$cedula=$_GET["cedula"];

$url = 'http://www.mdi.gob.ec/minterior1/antecedentes/data.php';
$data =array(
    'tipo' => 'getDataWs',  
    'ci' => $cedula,         
    'tp' => 'C'   
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);


$decoded = json_decode($result,true);
foreach ($decoded as $value)
{
  echo $value["name"];
        
}
 
 






