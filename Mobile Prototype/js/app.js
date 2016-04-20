

$(document).ready(function() {

  //SINGLE CHECK & MULTI CHECK
	$('[data-click="single"] li').on('click', function() {
    	$(this).addClass('select').siblings().removeClass('select');
	});
	$('[data-click="multiple"] li').on('click', function() {
    	$(this).toggleClass('select');
	});

  //FILTER BUTTON CLICK SHOW MENU
  $('.sul-filter').on('click', function(){
    $('body').toggleClass('filter-click');
  });

	// TOGGLE BUTTON
	$('.switch').click(function() {
    $(this).toggleClass('on').toggleClass('off');
  }); 


	// TAB JQUERY
	$('ul.tabs').each(function(){
		  var $active, $content, $links = $(this).find('a');
		  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		  // $active.addClass('active');

		  $content = $($active[0].hash);
		  $links.not($active).each(function () {
		    $(this.hash).hide();
		  });
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

  //BUTTON CLICK
  $('#bedrooms li.select').click (function(){
      event.preventDefault();
      event.stopPropagation();
      $(this).parents().eq(3).next('.toggle-group').removeClass('hide');
  });


  		//CAROUSEL WIDTH SET
  		$('.carousel ul').each(function(){  
          var liItems = $(this);
          var Sum = 0;
          if(liItems.children('li').length >= 1){
           $(this).children('li').each(function(i, e){
                  Sum += $(e).outerWidth(true);
           });
          $(this).width(Sum+1);
          } 
  	  });

		  // slideToggle with text and icon change
        $('[data-view="more"]').on('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          
          var $me = $(this),
             x = $me.parent().parent();

          x.find('[data-expand="expand"]').slideToggle();
            if ($.trim($me.text()) === 'Hide') {
                 $me.html('<i class="sul-plus"></i> Add');
             } else {
                 $me.html('<i class="sul-minus"></i> Hide');    
             }
        });


        // ADD REMOVE VALUE
        $('.sul-plus').click(function(e){
            e.preventDefault();
            fieldName = $(this).attr('field');
            var currentVal = parseInt($('input[name='+fieldName+']').val());
            if (!isNaN(currentVal)) {
                $('input[name='+fieldName+']').val(currentVal + 1);
            } else {
                $('input[name='+fieldName+']').val(0);
            }
            $("[name='"+fieldName+"']").change();
        });
        $(".sul-minus").click(function(e) {
            e.preventDefault();
            fieldName = $(this).attr('field');
            var currentVal = parseInt($('input[name='+fieldName+']').val());
            if (!isNaN(currentVal) && currentVal > 0) {
                $('input[name='+fieldName+']').val(currentVal - 1);
            } else {
                $('input[name='+fieldName+']').val(0);
            }
            $("[name='"+fieldName+"']").change();
        });

        //SHOW HIDE DIV RELATED WITH INPUT VALUE
        $("[name='carquantity'], [name='bikequantity']").change(function(){            
            var myValue = $(this).val();
            var $input= $(this).parent().siblings('.val-hide');
            if(myValue  == 0){
               $input.hide();
            }
            else if(myValue >= 1)
            {
                $input.show();
            }
        });

        // IMAGE DELETE
        // $('[data-dismiss="alert"]').on('click', function(event){
        //         event.preventDefault();
        //         event.stopPropagation();
        //         $(this).parent().remove();
        // });

         // POPUP DELETE
        $('[data-popup="close"]').on('click', function(event){
                event.preventDefault();
                event.stopPropagation();
                $(this).parents().eq(3).remove().fadeOut();
        });

        // CHECKBOX CHECKED SHOW / HIDE

        $('.checkmark-right').on('click', function (event){
             event.preventDefault();
             event.stopPropagation();

             var $me = $(this),
                checkbox = $me.find('input[type="checkbox"]'),
                selected = checkbox.prop('checked'),
               $checked = $me.parent().find('.from-to-time');
                
             if(selected) {
              checkbox.prop('checked',false);
              $checked.removeClass('hide');
              
              }
             else {
              checkbox.prop('checked',true);
              $checked.addClass('hide');
             
              }
        });

        //DIV EDITABLE (MOBILE NUMBER)
        // $('.change-num').click(function(){
        //     var $edit=$('.edit'), isEditable=$edit.is('.editable');
        //     $('.edit').prop('contenteditable',isEditable).toggleClass('editable')
        // })




});