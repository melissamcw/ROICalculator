$(function(){


    $('#monitoringslider').slider({ 
    	value: 0.0,
    	min:0.0,
    	max:10.0,
    	step:1.0,
  		slide: function(event, ui){ 
                         $('monitoring').value = ui.value/10+ " hrs";
                         $('totalhourslawyer').value = (($('lawyersonstaff').value)) * ((parseInt($('monitoring').value))+(parseInt($('updating').value))+(parseInt($('counseladvice').value))+(parseInt($('flaggaps').value))+(parseInt($('reviewing').value)))*50;
                         $('totalcostlawyer').value= (parseInt($('totalhourslawyer').value)) * ((parseInt($('laywercost').value))/2000);
                         $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  + (parseInt($('totalhourslawyer').value))) *0.40;
                         $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
                         $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
                         $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;
    
    }
       
       });
 
  $("#slide2").slider({
       
       step:10,
       min:1.0,
       max:10.0,
       value: 1,
       
  slide: function(event, ui){ 
                        $('updating').value = ui.value/10+ " hrs";
       $('totalhourslawyer').value =  (($('lawyersonstaff').value)) * ((parseInt($('monitoring').value))+(parseInt($('updating').value))+(parseInt($('counseladvice').value))+(parseInt($('flaggaps').value))+(parseInt($('reviewing').value)))*50;
    $('totalcostlawyer').value= (parseInt($('totalhourslawyer').value)) * ((parseInt($('laywercost').value))/2000);
    $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
    $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
    $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
    $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;
    
    
    }
       
       });
 
    $("#slide4").slider({
       
       step:10,
       min:1.0,
       max:10.0,
       value: 1,
       
   slide: function(event, ui){ 
                         $('counseladvice').value = ui.value/10+ " hrs";
    $('totalhourslawyer').value =  (($('lawyersonstaff').value)) * ((parseInt($('monitoring').value))+(parseInt($('updating').value))+(parseInt($('counseladvice').value))+(parseInt($('flaggaps').value))+(parseInt($('reviewing').value)))*50;
    $('totalcostlawyer').value= (parseInt($('totalhourslawyer').value)) * ((parseInt($('laywercost').value))/2000);
    $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
    $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
    $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
    $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;

      }
       
       });
       

   $("#slide7").slider({
       
          step:10,
       min:1.0,
       max:10.0,
       value: 1,
       
  slide: function(event, ui){ 
                         $('flaggaps').value = ui.value/10+ " hrs";
    $('totalhourslawyer').value = (($('lawyersonstaff').value)) * ((parseInt($('monitoring').value))+(parseInt($('updating').value))+(parseInt($('counseladvice').value))+(parseInt($('flaggaps').value))+(parseInt($('reviewing').value)))*50;
    $('totalcostlawyer').value= (parseInt($('totalhourslawyer').value)) * ((parseInt($('laywercost').value))/2000);      
    $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  + (parseInt($('totalhourslawyer').value))) *0.40;
    $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
    $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
    $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;
    }
       });

           $("#slide10").slider({
                     
                     step:10,
                     min:1.0,
                     max:10.0,
                     value: 1,
                     
   slide: function(event, ui){ 
                          $('reviewing').value = ui.value/10+ " hrs";
     $('totalhourslawyer').value =  (($('lawyersonstaff').value)) * ((parseInt($('monitoring').value))+(parseInt($('updating').value))+(parseInt($('counseladvice').value))+(parseInt($('flaggaps').value))+(parseInt($('reviewing').value)))*50;
    $('totalcostlawyer').value= (parseInt($('totalhourslawyer').value)) * ((parseInt($('laywercost').value))/2000);                    
    $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
    $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
    $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
    $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;

              }            
       });
       
       
   $("#slide13").slider({
                        
      step:10,
      min:1.0,
      max:10.0,
      value: 1,
                            
     slide: function(event, ui){ 
                            $('preparing').value = ui.value/10+ " hrs";
        $('totalhourssupport').value = ( (($('supportonstaff').value)) * (parseInt($('preparing').value))+(parseInt($('collecting').value))+(parseInt($('flaggapsCO').value))+(parseInt($('documenting').value))+(parseInt($('followup').value)))*50;
      $('totalsupportcost').value= (parseInt($('totalhourssupport').value)) * ((parseInt($('salarysupportstaff').value))/2000);
      $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
      $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
$('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
$('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;
                     
       }            
       });
       $("#slide16").slider({
                            
         step:10,
         min:1.0,
         max:10.0,
                            value: 1,
               
        slide: function(event, ui){ 
                               $('collecting').value = ui.value/10+ " hrs";
          $('totalhourssupport').value =  ((($('supportonstaff').value)) * ((parseInt($('preparing').value))+(parseInt($('collecting').value))+(parseInt($('flaggapsCO').value))+(parseInt($('documenting').value))+(parseInt($('followup').value))))*50;
          $('totalsupportcost').value= (parseInt($('totalhourssupport').value)) * ((parseInt($('salarysupportstaff').value))/2000);
         $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
         $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
      $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
      $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;
      
                     }            
       });
       
       $("#slide17").slider({
                            
                            step:10,
                            min:1.0,
                            max:10.0,
                            value: 1,
                            
                           slide: function(event, ui){ 
                                             $('flaggapsCO').value = ui.value/10+ " hrs";
                     $('totalhourssupport').value =  ((($('supportonstaff').value)) * ((parseInt($('preparing').value))+(parseInt($('collecting').value))+(parseInt($('flaggapsCO').value))+(parseInt($('documenting').value))+(parseInt($('followup').value))))*50;
                    $('totalsupportcost').value= (parseInt($('totalhourssupport').value)) * ((parseInt($('salarysupportstaff').value))/2000);
                               $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
                            $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
                            $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
                            $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;

                     }            
       });
       
       
       $("#slide18").slider({
                            
                            step:10,
                            min:1.0,
                            max:10.0,
                            value: 1,
                            
                           slide: function(event, ui){ 
                                             $('documenting').value = ui.value/10+ " hrs";
                     $('totalhourssupport').value =  ((($('supportonstaff').value)) * ((parseInt($('preparing').value))+(parseInt($('collecting').value))+(parseInt($('flaggapsCO').value))+(parseInt($('documenting').value))+(parseInt($('followup').value))))*50;
                    $('totalsupportcost').value= (parseInt($('totalhourssupport').value)) * ((parseInt($('salarysupportstaff').value))/2000);
                               $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
                            $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
                            $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
                            $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;

                     }            
       });
       
       $("#slide19").slider({
                            
                            step:10,
                            min:1.0,
                            max:10.0,
                            value: 1,
                            
                           slide: function(event, ui){ 
                                             $('followup').value = ui.value/10+ " hrs";
                     $('totalhourssupport').value =  ((($('supportonstaff').value)) * ((parseInt($('preparing').value))+(parseInt($('collecting').value))+(parseInt($('flaggapsCO').value))+(parseInt($('documenting').value))+(parseInt($('followup').value))))*50;
                    $('totalsupportcost').value= (parseInt($('totalhourssupport').value)) * ((parseInt($('salarysupportstaff').value))/2000);
                               $('crstltimesaved').value= ((parseInt($('totalhourssupport').value))  +(parseInt($('totalhourslawyer').value))) *0.40;
                            $('crstlcostsaved').value= prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) * 0.4;
                            $('totalhours').value = (parseInt((($('totalhourslawyer').value)))) + (parseInt((($('totalhourssupport').value))));
                            $('totalcost').value = prefix+((parseInt($('totalcostlawyer').value)) + ((parseInt($('totalsupportcost').value)) )) ;

                     }            
       });
      
       
     
}

);