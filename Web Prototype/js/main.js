$(document).ready(function(){

       //equal height
     $('.primary-info, .pay-box').each(function(){  
          var highestBox = 0;
          $('.card, .price-card', this).each(function(){
          
              if($(this).height() > highestBox) 
                 highestBox = $(this).height(); 
          });  
          
          $('.card, .price-card',this).height(highestBox);
    }); 

      // switch toggle

      $('.switch').click(function() {
        $(this).toggleClass('on').toggleClass('off');
      });



     // multiple tabs 

      $('.tabs').each(function(){
          var $active, $content, $links = $(this).find('a');
          $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
          //$active.addClass('active');
          $content = $($active[0].hash);
          $links.not($active).each(function () {
            $(this.hash).hide();
          });

          // Bind the click event handler
          $(this).on('click', 'a', function(e){
            $active.removeClass('active');
            $content.hide();
            $active = $(this);
            $content = $(this.hash);
            $active.addClass('active');
            $content.show();
            e.preventDefault();
          });
       });
      
       //multiple/single click listitem

        $('[data-click="single"] li').on('click', function() {
            $(this).addClass('select').siblings().removeClass('select');
        });
        $('[data-click="multiple"] li').on('click', function() {
            $(this).toggleClass('select');
        });
		
    		$('.brokerresp li').on('click', function() {
    			if($('.brokerresp [class="select"]').text()=='Yes'){
    				$('.warning-msg').hide();	
    			}
    			else{
    				$('.warning-msg').show();
    			}
    		});


		
     
        // slideToggle with text and icon change
        $('[data-view="more"]').on('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var $me = $(this),
             x = $me.parent().parent();

          x.find('[data-expand="expand"]').slideToggle();
            if ($.trim($me.text()) === 'Hide more amenities') {
                 $me.html('<i class="sul-plus"></i> Add more amenities');
             } else {
                 $me.html('<i class="sul-minus"></i> Hide more amenities');    
             }
        });
         $('[data-view="bedrooms"]').on('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var $me = $(this),
             x = $me.parent().parent();

          x.find('[data-expand="bedrooms"]').slideToggle();
            if ($.trim($me.text()) === 'Hide Bedroom Dimensions') {
                 $me.html('<i class="sul-plus"></i> Add Bedroom Dimensions');
             } else {
                 $me.html('<i class="sul-minus"></i> Hide Bedroom Dimensions');    
             }
        });

        //click close to remove parent

          $('[data-dismiss="alert"]').on('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().remove().fadeout();
          });


          // poppup

          $('[data-popup="close"]').on('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            $(this).parents().eq(3).remove();
          });

        //scroll sticky
        function checkOffset() {
            if($('aside').offset().top + $('aside').height() 
                >= $('.s1-footer').offset().top - 10)
            {
                $('aside').css('position', 'absolute');
                $('aside.right').css('right', 0);
                $('aside.left').css('left', 0);
              }
        }
      
       $(window).scroll(function(){

         var getWindow = $( window ).width(); 
             getContainer = $('#content-wrap').width();
             getValue = (getWindow - getContainer);
             getTotal = (getValue / 2);
        
        if($(window).scrollTop()>60){
            $('aside').css({"position": "fixed", "top": 52 + 'px'});
            $('aside.right').css('right', getTotal + 'px');
            $('aside.left').css('left', getTotal + 'px');
            
        } else {
            $('aside').css({"position": "absolute", "top": 52 + 'px'});
            $('aside.left').css('left', 0);
            $('aside.right').css('right', 0);
        }
        checkOffset();
      });

        // checkbox 

        $('.checkmark').on('click', function (event){
             event.preventDefault();
             event.stopPropagation();

             var $me = $(this),
                checkbox = $me.find('input[type="checkbox"]'),
                selected = checkbox.prop('checked'),
                $checked = $me.parent().parent().siblings('.split-wrap');
                
             if(selected) {
              checkbox.prop('checked',false);
              $checked.removeClass('hide');
              
              }
             else {
              checkbox.prop('checked',true);
              $checked.addClass('hide');
             
              }
        });


        $('select').change(function() {
             event.preventDefault();
             event.stopPropagation();
            
             var parkingVal = $(this).val();
             var parkingSet = $(this).parent().next('[data-click="single"]');

            if(parkingVal > 0) {
              parkingSet.removeClass('hide');
            } 
            else{
             parkingSet.addClass('hide');
            };
        });

        $('#bedrooms li.select').click (function(){
            event.preventDefault();
            event.stopPropagation();

              $(this).parents().eq(3).next('.toggle-group').removeClass('hide');
        });
       

});