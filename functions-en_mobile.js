// dom ready
$(function(){
		
	hideSecondTab();				// init hide tab	
	initializeSearchCalendar(); 	// init datepicker
	bindUIDatepicker(); 			// bind datepicker icons
		
	// childs change
	$('#childs').change(function(){
		bingChildDrops($(this));
	});	
	
	// check ages
	$('.row_3 .col_4 input').click(function(){		
		bingChildDrops($('#childs'));
	});	
	
	// save ages
	$('.row_7 input').click(function(){		
		saveAgesChanges();			
		showFirstTab();
		hideSecondTab();
	});

	// submit		
	$('#submitBtn').click(function(){		
		be2();		
	});
	
});


function saveAgesChanges(){
	
	var nrChilds = $('#childs').val();
	var childs1age = $('#age_1').val();		
	var childs2age = $('#age_2').val();					
	var childs3age = $('#age_3').val();				
	var childs4age = $('#age_4').val();		
	
	if(nrChilds == 1){
		var currentChildAges = '';
	}	
	if(nrChilds == 1){
		var currentChildAges = childs1age;
	}
	if(nrChilds == 2){
		var currentChildAges = childs1age+';'+childs2age;
	}
	if(nrChilds == 3){
		var currentChildAges = childs1age+';'+childs2age+';'+childs3age;
	}
	if(nrChilds == 4){
		var currentChildAges = childs1age+';'+childs2age+';'+childs3age+';'+childs4age;
	}
			
	$('#childAgesVal').val(currentChildAges);	
}

// bind ui childs
function bingChildDrops(number){			
	var NChilds = number.val();	
	if(NChilds == 0){
		$('#childAgesVal').val('');
	}				
	if(NChilds == 1){
		$('.row_9, .row_7, .row_5, .row_5 .col_1').show();
		$('.row_1, .row_2, .row_3, .row_4, .row_0, .row_10, .row_11').hide();			
		$('.row_5 .col_2, .row_5 .col_3, .row_5 .col_4').hide();
	}		
	if(NChilds == 2){
		$('.row_9, .row_7, .row_5, .row_5 .col_1, .row_5 .col_2').show();
		$('.row_1, .row_2, .row_3, .row_4, .row_0, .row_10, .row_11').hide();			
		$('.row_5 .col_3, .row_5 .col_4').hide();
	}		
	if(NChilds == 3){
		$('.row_9, .row_7, .row_5, .row_5 .col_1, .row_5 .col_2, .row_5 .col_3').show();
		$('.row_1, .row_2, .row_3, .row_4, .row_0, .row_10, .row_11').hide();			
		$(' .row_5 .col_4').hide();
	}		
	if(NChilds == 4){
		$('.row_9, .row_7, .row_5, .row_5 .col_1, .row_5 .col_2, .row_5 .col_3, .row_5 .col_4').show();
		$('.row_1, .row_2, .row_3, .row_4, .row_0, .row_10, .row_11').hide();			
	}				
}	

function hideSecondTab(){
	$('.row_5, .row_6, .row_7, .row_8, .row_9').hide();
}

function showFirstTab(){
	$('.row_1, .row_2, .row_3, .row_4, .row_0, .row_10, .row_11').show();				
}


function be2() {				

	var CheckIn = $('#inputCheckIn').val();
	var CheckOut = $('#inputCheckOut').val();
	var NRooms = $('#selectRooms').val();
	var NChilds = $('#childs').val();
	var nr_adults = "1";	
	var promoCode = $('.row_10 input').val();
	var property = $('.row_0 select').val();
	
	CheckIn = CheckIn.replace(/-/g, "");
	CheckOut = CheckOut.replace(/-/g, "");	
		
	// varios quartos	
	if(NRooms > 1){		
		for ($i = 1; $i < $('#selectAdults').val(); $i++) {
			nr_adults = nr_adults + ",1";
		}
		nr_adults.toString();		
	}
	
	// 1 quarto
	if(NRooms == 1){
		nr_adults = $('#selectAdults').val();
	}
	
	// set NaN childs to 0
	if(NChilds == ""){
		NChilds = 0;
	}	
	var nr_childs = parseInt(NChilds);
	
	// 1 quarto
	if(NRooms == 1){        
        var childAges = $('#childAgesVal').val();
		var searchParameters = "?q=" + property + "&lang=" + 'en-US' + "&CheckIn=" + CheckIn + "&CheckOut=" + CheckOut + "&NRooms=" + NRooms + "&ad=" + nr_adults + "&ch=" + nr_childs + "&ag=" + childAges + "&Code=" + promoCode + "";		
	}
	
	// varios quartos	
	if(NRooms > 1){

        var array_nr_adults = new Array();
        var array_nr_childs = new Array();
        var array_child_ages = new Array();

        var i = 1;
        for (i = 1; i <= NRooms; i++) {

            /* adults */
			var nr_adults = $('#selectAdults').val();
            array_nr_adults.push(nr_adults);

            /* childs */
			var nr_childs = 0;
			if(i==1){
				array_nr_childs.push($('#childs').val());	
			}
			if(i>1){
				array_nr_childs.push(nr_childs);	
			}            

            /* childs ages */
			var child_ages = 0;
			if(i==1){
				array_child_ages.push(child_ages+';0');
			}
			if(i>1){
				array_child_ages.push(child_ages);
			}            			            

        }		

        var strAdults = array_nr_adults.toString();
        var strRAdults = strAdults.replace(/,/gi, ",");

        var strChilds = array_nr_childs.toString();
        var strRChilds = strChilds.replace(/,/gi, ";");

        var strChildAges = array_child_ages.toString();
        var strRChildsAges = strChildAges.replace(/,/gi,",");
		
		// search parammeters
		var searchParameters = "?q=" + property + "&lang=" + 'en-US' + "&CheckIn=" + CheckIn + "&CheckOut=" + CheckOut + "&NRooms=" + NRooms + "&ad=" + strRAdults + "&ch=" + strChilds + "&ag=" + strRChildsAges + "&Code=" + promoCode + "";		
		
	}
	
	// window open
	 window.open("https://reservations.omnibees.com/default.aspx" + searchParameters + "", "_blank");
}

function bindUIDatepicker(){
	$('.row_1 .col_3 a').click(function(){
		if($('#ui-datepicker-div').is(':visible')){
			$("#inputCheckIn").datepicker("hide");				
		}else{
			$("#inputCheckIn").datepicker("show");	
		}
	});
	$('.row_2 .col_3 a').click(function(){
		if($('#ui-datepicker-div').is(':visible')){
			$("#inputCheckOut").datepicker("hide");				
		}else{
			$("#inputCheckOut").datepicker("show");	
		}		
	});			
}
	

// -------------------------------------------------------------------------------------------
// Calculate Dates
// -------------------------------------------------------------------------------------------
$(function () {    

    /* today */
    var today_time = new Date();
    today_time.setDate(today_time.getDate());
    var today_month = today_time.getMonth() + 1;
    var today_day = today_time.getDate();
    var today_year = today_time.getFullYear();
    var checkin = pad2(today_day) + "-" + pad2(today_month) + '-' + today_year;

    /* tomorrow */
    var nextDay = new Date();
    nextDay.setDate(today_time.getDate() + 1);
    var tomorrow_time = new Date();
    var tomorrow_month = nextDay.getMonth() + 1;
    var tomorrow_day = nextDay.getDate();
    var tomorrow_year = nextDay.getFullYear();
    var checkout = pad2(tomorrow_day) + "-" + pad2(tomorrow_month) + '-' + tomorrow_year;

    $('#inputCheckIn').val(checkin);
    $('#inputCheckOut').val(checkout);
});


// -------------------------------------------------------------------------------------------
// INLINE CALENDAR
// -------------------------------------------------------------------------------------------
var oneDay = 24 * 60 * 60 * 1000;
function initializeSearchCalendar() {

    var tomorrow = new Date();
    var startDate = new Date();

    var tomorrow_change = new Date();
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = 1;
    var newDate = new Date();
    var endDate = new Date();

    var dates_sidebar = $("#inputCheckIn, #inputCheckOut").datepicker({

        dateFormat: "dd-mm-yy",
        firstDay: 1,
        minDate: 0,
        maxDate: "+6M +1Y",
        changeMonth: false,
        numberOfMonths: 1,

        onSelect: function (selectedDate) {

            var option = this.id == "inputCheckIn" ? "minDate" : "maxDate",
                instance = $(this).data("datepicker"),
                date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);

            if (option == "minDate") {

                startDate = new Date(date.getTime());

                if (Math.ceil((newDate.getTime() - startDate.getTime()) / (oneDay)) < 1) {
                    tomorrow = new Date(date.getTime());
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    var month = tomorrow.getMonth() + 1;
                    var day = tomorrow.getDate();
                    var year = tomorrow.getFullYear();
                    newDate = $.datepicker.parseDate(instance.settings.dateFormat, day + "-" + month + "-" + year);
                } else {
                    var tempDate = new Date(date.getTime());
                    tempDate.setDate(tempDate.getDate() + 1);
                    var month = tempDate.getMonth() + 1;
                    var day = tempDate.getDate();
                    var year = tempDate.getFullYear();
                    newDate = $.datepicker.parseDate(instance.settings.dateFormat, day + "-" + month + "-" + year);
                }

                dates_sidebar.not(this).datepicker("option", option, newDate);

            }

            if (option == "maxDate") {
                tomorrow = date;
            }


            calculateDates();

        }
    });
}


// -------------------------------------------------------------------------------------------
// Calculate dates
// -------------------------------------------------------------------------------------------
function calculateDates() {

    var sDate = $.datepicker.parseDate("dd-mm-yy", $("#inputCheckIn").val());
    var eDate = $.datepicker.parseDate("dd-mm-yy", $("#inputCheckOut").val());

    diffDays = Math.ceil((eDate.getTime() - sDate.getTime()) / (oneDay));

    initializeSearchCalendar();
}


// -------------------------------------------------------------------------------------------
// Date Parser
// -------------------------------------------------------------------------------------------
function pad2(number) {
    try {
        return (number < 10) ? '0' + number : number;
    } catch (e) {}
}

var current_Times = new Date();
current_Times.setDate(current_Times.getDate() - 1);
var month = current_Times.getMonth() + 1;
var day = current_Times.getDate();
var year = current_Times.getFullYear();
var checkin = pad2(day + 1) + "-" + pad2(month) + '-' + year;

current_Times.setDate(current_Times.getDate());
var month = current_Times.getMonth() + 1;
var day = current_Times.getDate() + 1;
var year = current_Times.getFullYear();
var checkout = pad2(day + 1) + "-" + pad2(month) + '-' + year;;

var dataInicio = '0';
var dataFim = '0';
var datas;
var minimoNoites = 1;
var now2 = new Date();
now2.setHours(0, 0, 0, 0);

var blockedDatesArray = null;

$(function(){	
	$('.row_3 .col_4 input').css('height',$('.row_3 select#childs').height()-2);
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf('msie') !== -1) {
	  if(ua.indexOf("msie 7.0") != -1){        
	      $(function(){          
	          $('.row_3 .col_4 input').css('padding','3px 0');
	      }); 
	  }    
	} 	
});