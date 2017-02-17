

$(document).ready(function(){
    MapNeeds();
    $("#Menu img").css({ opacity: 0.5 });
    $(".blocCarte").css({height:($(window).height()-160)});
    $("#carte").css({height:($(window).height()+160)});
    LoadAdmin2Map("DynamicAdmin2","Admin2Cameroon");
    
    
    doAnimation("#clickOnSector");
    doAnimation("#clickOnMap");
    doAnimation("#clickToScroll");
    SartTimeline();
    
 
    
});

function doAnimation(elment){
    var animMaxCount=4;
    var animCount=0;
    $(elment).animate({ width: 300},1000, function(){
         $(elment).animate({ width: 270},1000, function(){
             if( animCount<animMaxCount)
                 doAnimation(elment);
          });
        animCount++;
    });
}

function AnimateBackground(elment){
    var animMaxCount=4;
    var animCount=0;
    $(elment).animate({ 'background-color': "#ff4d4d"},1000, function(){
         $(elment).animate({'background-color': "#000000"},1000, function(){
             if( animCount<animMaxCount)
                 AnimateBackground(elment);
          });
        animCount++;
    });
}


function SartTimeline(){
    
    $("#time1").show("slow",function(){
        $("#time2").show("slow",function(){
            $("#time3").show("slow",function(){
                $("#time4").show("slow",function(){
                    $("#time5").show("slow",function(){
                        $("#time6").show("slow");
                    });
                });
            });
        });     
    });
}

function MapNeeds(){ 

    //RECUPERATION DES DONNEES SUR LE FICHIER JSON

    datas = '[{"region":"Diffa","inNeeds":236000,"Target":160000,"FondsRequis":0,"Resume":"<ul><li>Ensure adequate prevention mechanisms as well as response to protection incidents, including SGBV and child protection via robust protection monitoring, referral and follow-up.</li><li>Monitor access to asylum for Nigerian nationals and advocate the respect of international protection norms such as non-refoulement.</li><li>Provide legal and psychosocial assistance to IDPs and refugees in need and address the lack of documentation to prevent statelessness.</li><li>Build government protection capacity through targeted training, support and capacity development; reinforce the capacity of community-based protection mechanisms through training, awareness-raising and mobilisation.</li></ul>"},{"region":"Lac","inNeeds":153512,"Target":146518,"FondsRequis":0,"Resume":"<ul><li>Ensure adequate prevention mechanisms as well as response to protection incidents, including SGBV and child protection via robust protection monitoring, referral and follow-up.</li><li>Monitor access to asylum for Nigerian nationals and advocate the respect of international protection norms such as non-refoulement.</li><li>Provide legal and psychosocial assistance to IDPs and refugees in need and address the lack of documentation to prevent statelessness.</li><li>Build government protection capacity through targeted training, support and capacity development; reinforce the capacity of community-based protection mechanisms through training, awareness-raising and mobilisation.</li></ul>"},{"region":"Yobe","inNeeds":541408,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Ensure adequate prevention mechanisms as well as response to protection incidents, including SGBV and child protection via robust protection monitoring, referral and follow-up.</li><li>Monitor access to asylum for Nigerian nationals and advocate the respect of international protection norms such as non-refoulement.</li><li>Provide legal and psychosocial assistance to IDPs and refugees in need and address the lack of documentation to prevent statelessness.</li><li>Build government protection capacity through targeted training, support and capacity development; reinforce the capacity of community-based protection mechanisms through training, awareness-raising and mobilisation.</li></ul>"},{"region":"Borno","inNeeds":4432669,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Ensure adequate prevention mechanisms as well as response to protection incidents, including SGBV and child protection via robust protection monitoring, referral and follow-up.</li><li>Monitor access to asylum for Nigerian nationals and advocate the respect of international protection norms such as non-refoulement.</li><li>Provide legal and psychosocial assistance to IDPs and refugees in need and address the lack of documentation to prevent statelessness.</li><li>Build government protection capacity through targeted training, support and capacity development; reinforce the capacity of community-based protection mechanisms through training, awareness-raising and mobilisation.</li></ul>"},{"region":"ExtremeNord","inNeeds":551825,"Target":538118,"FondsRequis":0,"Resume":"<ul><li>Ensure adequate prevention mechanisms as well as response to protection incidents, including SGBV and child protection via robust protection monitoring, referral and follow-up.</li><li>Monitor access to asylum for Nigerian nationals and advocate the respect of international protection norms such as non-refoulement.</li><li>Provide legal and psychosocial assistance to IDPs and refugees in need and address the lack of documentation to prevent statelessness.</li><li>Build government protection capacity through targeted training, support and capacity development; reinforce the capacity of community-based protection mechanisms through training, awareness-raising and mobilisation.</li></ul>"},{"region":"Adamawa","inNeeds":1143975,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Ensure adequate prevention mechanisms as well as response to protection incidents, including SGBV and child protection via robust protection monitoring, referral and follow-up.</li><li>Monitor access to asylum for Nigerian nationals and advocate the respect of international protection norms such as non-refoulement.</li><li>Provide legal and psychosocial assistance to IDPs and refugees in need and address the lack of documentation to prevent statelessness.</li><li>Build government protection capacity through targeted training, support and capacity development; reinforce the capacity of community-based protection mechanisms through training, awareness-raising and mobilisation.</li></ul>"},{"region":"Total","inNeeds":4432669,"Target":538118,"FondsRequis":0,"Resume":""}]';
    
    var regions = JSON.parse(datas);
    
 
    //RECHERCHE DE LA VALEUR MAXIMALE
    var temp_array= regions.map( function( item ) {
        return item.inNeeds;
    });
    var highest_value = Math.max.apply( Math, temp_array );
    
	
    for(i=0; i < regions.length; i++) {
		$('#'+ regions[i].region).css({'fill': 'rgba(109, 207, 246,'+ regions[i].inNeeds/highest_value + ')'}).data('region', regions[i]);
    }
}

function LoadMapData(datas){ 
	var regions = JSON.parse(datas);
 
    //RECHERCHE DE LA VALEUR MAXIMALE
    var temp_array= regions.map( function( item ) {
        return item.inNeeds;
    });
    var highest_value = Math.max.apply( Math, temp_array );
    
    for(i=0; i < regions.length; i++) {
		$('#'+ regions[i].region).css({'fill': 'rgba(109, 207, 246,'+ regions[i].inNeeds/highest_value + ')'}).data('region', regions[i]);
    }
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 
 
 
//APERCUE DES VALEURS DE CARTE INTERRACTION AVEC LA SOURIS
$('#carte g polygon').mouseover(function (e) {
    //RECUPERATION DES DONNEES STOCKEES DANS LA CARTE ET AFFICHAGE DE LA BULLE
	var region_data=$(this).data('region');
	$('<div class="info_panel"><span class="regionInfoPanel">' 
		+ region_data.region + '</span><br>' 
		+ 'Needs: '+ region_data.inNeeds + '<br>' 
		+ 'Target: '+ region_data.Target + '<br>' 
		+ 'Requierement: '+ region_data.FondsRequis
		+ '</div>').appendTo('body');
    
    //CHANGEMENT DU FONDS DE LA CARTE
    $('#'+ region_data.region).css({'fill': 'rgba(244, 121, 50,1)'});

}).mouseleave(function () {
    //SUPRESSION DE LA BULLE
    $('.info_panel').remove();
    var region_total=$('#Total').data('region');

    //REMISE DES COULEURS DE CHAQUE REGION DE LA CARTE
    $('#carte #Regions polygon').each(function() {
        var regionData=$(this).data('region');
        $('#'+ regionData.region).css({'fill': 'rgba(109, 207, 246,'+ regionData.inNeeds/region_total.inNeeds + ')'});
	});
    
    
}).mousemove(function(e) {
    //RECUPERER LA POSITION DE LA SOURIS
	var mouseX = e.pageX,mouseY = e.pageY;
    
    //REPOSITIONNER LA BULLE PAR RAPPORT A LA SOURIS
	$('.info_panel').css({
	  top: mouseY-100,
	  left: mouseX - ($('.info_panel').width() / 2)
	});
    
}).click(function(e) {
    //AFFICHER LE RESUME DE LA ZONE ET PAR RAPPORT AU SECTEUR
    var regionData=$(this).data('region');
    
    
    
    
    /*
    $("#detailCarte").hide("fast");
    
    $("#detailCarte .imgPreview").css({'background-image':"url('images/"+regionData.region+".png')"});
    $("#detailCarte .detailtexte").html("");
    $("#valueInNeed").html("");
    $("#valueInNeed").append(regionData.inNeeds);
    $("#valueTarget").html("");
    $("#valueTarget").append(regionData.Target);
    $("#valueRequierement").html("");
    $("#valueRequierement").append(regionData.FondsRequis);
    $("#detailCarte .detailtexte").append("<h4>"+regionData.region+"</h4><p>"+regionData.Resume+"</p>");
	$("#detailCarte").show("slow");
    */
    
    
    inNedd = regionData.inNeeds;
    target = regionData.Target;
    requier = regionData.FondsRequis;
    
    //FORMAT MILLION
    if(inNedd<1000000){
        inNedd = Math.round(inNedd/1000);
        inNedd = inNedd+"K";
    }
    if(target<1000000){
        target = Math.round(target/1000);
        target = target+"K";
    }
    if(requier<1000000){
        requier = Math.round(requier/1000);
        requier = requier+"K";
    }
    
    
    //FORMAT MILLER
    if(inNedd>=1000000 && inNedd<10000000){
        inNedd = inNedd/1000000;
        inNedd = inNedd.toFixed(1)+"M";
    }
    if(target>=1000000 && target<10000000){
        target = target/10000000;
        target = target.toFixed(1)+"M";
    }
    if(requier>=1000000 && requier<10000000){
        requier = requier/1000000;
        requier = requier.toFixed(1)+"M";
    }
    
    //FORMAT MILLIARD
    if(inNedd>=10000000){
        inNedd = inNedd/10000000;
        inNedd = inNedd.toFixed(1)+"B";
    }
    if(target>=1000000){
        target = target/100000000;
        target = target.toFixed(1)+"B";
    }
    if(requier>=1000000){
        requier = requier/10000000;
        requier = requier.toFixed(1)+"B";
    }
    
    resume = "";
    if(regionData.Resume!=null){
        resume = regionData.Resume;
    }
    
    //contenu = "<div id='titre' class='titreNoir'>"+regionData.region+"</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>"+inNedd+"M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>"+target+"M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>"+requier+"M</span></div></div></div>";
    
    
    contenu = "<div class='detailContenu'><div class='blocTrans'><div class='titreNoir'>"+regionData.region+"</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'> "+inNedd+"</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'> "+target+"</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'> "+requier+"</span></div></div></div><p>"+resume+"</p></div>";
    
    
    $("#Admin1Info").fadeOut(10);
    $("#Admin1Info").html("");
    $("#clickOnMap").hide("slow", function() {
        $("#Admin1Info").show("slow");
      });
    
    $("#Admin1Info").html(contenu);
    
});


//IMAGES MENUS
$('#Menu img').mouseover(function (e) {
	id= $(this).attr('id');
	$("#"+id).css({ opacity: 1 });
	//alert($(this));
}).mouseleave(function () {
	id= $(this).attr('id');
	$("#"+id).css({ opacity: 0.7 });
});

$('#Menu img').click(function (e) {
	id= $(this).attr('id');
    $('#Menu img').animate({
        width:"50px",
        height: "50px"
        }, 100, function() {
        });
	$(this).animate({
        width:"70px",
        height: "70px"
        }, 100, function() {
        });
    
    
    $("#clickOnSector").hide("slow");
	
	switch(id) {
		case 'ImgCccm':
			datas = '[{"region":"Diffa","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":null},{"region":"Lac","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":null},{"region":"Yobe","inNeeds":141073,"Target":0,"FondsRequis":0,"Resume":null},{"region":"Borno","inNeeds":1675697,"Target":0,"FondsRequis":0,"Resume":null},{"region":"ExtremeNord","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":null},{"region":"Adamawa","inNeeds":458974,"Target":0,"FondsRequis":0,"Resume":null},{"region":"Total","inNeeds":1675697,"Target":0,"FondsRequis":0,"Resume":null}]';
            
            
			//$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Camp Coordinaton & Camp Management</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>2.2M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>0M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>11.5M</span></div></div></div>");
            
            
			$("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Camp Coordinaton & Camp Management</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>2.2</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>0</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>11.5</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgEducation':
			datas = '[{"region":"Diffa","inNeeds":137000,"Target":137000,"FondsRequis":0,"Resume":"<ul><li>Establish temporary learning spaces, improve the learning environment and provide education to 137,000 children.</li><li>Identify out-of-school children and establish alternative learning methods such as through radio broadcasts.</li><li>Distribute school kits, teaching material and implement school feeding programmes.</li><li>Train teachers to improve psychosocial support, prevention of SGBV, education for peace and disaster risk reduction.</li></ul>"},{"region":"Lac","inNeeds":128217,"Target":97640,"FondsRequis":0,"Resume":"To expand access to education for 92,000 targeted children in need of emergency education, it is necessary to:<ul><li>Extend education services to children out of school by providing temporary learning spaces and rehabilitating classrooms.</li><li>Improve the learning environment through distribution of learning and recreational kits, provision of school meals and training of teachers on psychosocial support.</li></ul>"},{"region":"Yobe","inNeeds":220020,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide 1.6 million children aged 3 - 17 years with early childhood education, formal primary and non-formal basic literacy and vocational training.</li><li>Train education personnel in psychosocial first aid and referral mechanisms, social-emotional well-being and essential life skills such as mine risk awareness.</li><li>Empower communities to contribute to protecting, restoring and supporting learning for conflict-affected children.</li></ul>"},{"region":"Borno","inNeeds":1861487,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide 1.6 million children aged 3 - 17 years with early childhood education, formal primary and non-formal basic literacy and vocational training.</li><li>Train education personnel in psychosocial first aid and referral mechanisms, social-emotional well-being and essential life skills such as mine risk awareness.</li><li>Empower communities to contribute to protecting, restoring and supporting learning for conflict-affected children.</li></ul>"},{"region":"ExtremeNord","inNeeds":183317,"Target":155802,"FondsRequis":0,"Resume":"<ul><li>Ensure access to emergency education for more than 80,000 children (IDPs, refugees and hosts).</li><li>Train 1,200 teachers and staff in psychosocial support and education in emergency situations.</li><li>Provide teaching and learning materials to 1,200 teachers and 80,000 children (IDPs, refugees and hosts).</li><li>Implement an Emergency School Feeding programme for 80,000 children (IDPs and hosts).</li></ul>"},{"region":"Adamawa","inNeeds":779953,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide 1.6 million children aged 3 - 17 years with early childhood education, formal primary and non-formal basic literacy and vocational training.</li><li>Train education personnel in psychosocial first aid and referral mechanisms, social-emotional well-being and essential life skills such as mine risk awareness.</li><li>Empower communities to contribute to protecting, restoring and supporting learning for conflict-affected children.</li></ul>"},{"region":"Total","inNeeds":1861487,"Target":155802,"FondsRequis":0,"Resume":""}]';
			
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Education</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>3.3M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>0.3M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>84M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Education</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>3.3</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>0.3</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>84</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgErl':
			datas = '[{"region":"Diffa","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":""},{"region":"Lac","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":""},{"region":"Yobe","inNeeds":1554261,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide mine risk education for IDPs, host communities and humanitarian workers.</li><li>Assist the restoration of economic livelihoods through emergency cash-based interventions and temporary employment.</li><li>Respond to environmental emergencies including the clearing of crisis-generated debris and solid waste.</li></ul>"},{"region":"Borno","inNeeds":4432669,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide mine risk education for IDPs, host communities and humanitarian workers.</li><li>Assist the restoration of economic livelihoods through emergency cash-based interventions and temporary employment.</li><li>Respond to environmental emergencies including the clearing of crisis-generated debris and solid waste.</li></ul>"},{"region":"ExtremeNord","inNeeds":551825,"Target":228494,"FondsRequis":0,"Resume":"<ul><li>Provide economic recovery assistance for 9,900 IDPs and host population.</li><li>Reinforce awareness and capacity of prevention and management of crisis/conflict and extreme violence.</li></ul>"},{"region":"Adamawa","inNeeds":2475374,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide mine risk education for IDPs, host communities and humanitarian workers.</li><li>Assist the restoration of economic livelihoods through emergency cash-based interventions and temporary employment.</li><li>Respond to environmental emergencies including the clearing of crisis-generated debris and solid waste.</li></ul>"},{"region":"Total","inNeeds":4432669,"Target":228494,"FondsRequis":0,"Resume":""}]';
		
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Early Recovery & Livelihoods</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>9M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>0.2M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>62.5M</span></div></div></div>");
            
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Early Recovery & Livelihoods</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>9</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>0.2</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>62.5</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgFsa':
			datas = '[{"region":"Diffa","inNeeds":340000,"Target":200000,"FondsRequis":0,"Resume":"<ul><li>Provide in kind and cash assistance to 200,000 IDPs and members of the host communities struck by food insecurity.</li><li>Support to the most vulnerable households through the distribution of agricultural inputs such as seeds, fertilizers and veterinary assistance for livestock production.</li><li>Support the government to improve food security analysis and reinforce the food security monitoring and evaluation system.</li></ul>"},{"region":"Lac","inNeeds":303231,"Target":176523,"FondsRequis":0,"Resume":"To address growing food insecurity during the lean season and support livelihoods and agricultural production of displaced people and communities affected by displacements it is necessary to:<ul><li>Provide food assistance to 125,000 displaced people as well as to 31,000 severely food insecure people among the host community.</li><li>Provide agricultural support for 36,000 households through the provision of seeds and tools and support livestock production.</li></ul>"},{"region":"Yobe","inNeeds":1272704,"Target":1272704,"FondsRequis":0,"Resume":"<ul><li>Deliver food assistance to 3 million host community members, 1.5 million IDPs and 600,000 returnees through inkind assistance, cash transfers or commodity vouchers.</li><li>Support household agriculture production and livelihoods through improved access to agro-based production inputs such as seeds, tools, fertilizer, irrigation, livestock health.</li><li>Support evidence-based assessment, analysis and capacity building of national stakeholders to strengthen food security coordination and data.</li></ul>"},{"region":"Borno","inNeeds":3641297,"Target":3641297,"FondsRequis":0,"Resume":"<ul><li>Deliver food assistance to 3 million host community members, 1.5 million IDPs and 600,000 returnees through inkind assistance, cash transfers or commodity vouchers.</li><li>Support household agriculture production and livelihoods through improved access to agro-based production inputs such as seeds, tools, fertilizer, irrigation, livestock health.</li><li>Support evidence-based assessment, analysis and capacity building of national stakeholders to strengthen food security coordination and data.</li></ul>"},{"region":"ExtremeNord","inNeeds":1579042,"Target":467480,"FondsRequis":0,"Resume":"<ul><li>Ensure agricultural support to vulnerable people including IDPs, returnees and host population to improve food access by providing seeds and fertilizers, grain mills, carts, storage facilities, technical support and capacity development.</li><li>Provide unconditional food assistance, in kind or cash, to 361,000 refugees, IDPs, returnees and host population.</li><li>Support livelihood rehabilitation and provide conditional and unconditional food assistance to 58,000 people from the local communities during the lean season.</li><li>Collect and disseminate quality information on food security and vulnerability through relevant food security and market assessments.</li></ul>"},{"region":"Adamawa","inNeeds":204749,"Target":204749,"FondsRequis":0,"Resume":"<ul><li>Deliver food assistance to 3 million host community members, 1.5 million IDPs and 600,000 returnees through inkind assistance, cash transfers or commodity vouchers.</li><li>Support household agriculture production and livelihoods through improved access to agro-based production inputs such as seeds, tools, fertilizer, irrigation, livestock health.</li><li>Support evidence-based assessment, analysis and capacity building of national stakeholders to strengthen food security coordination and data.</li></ul>"},{"region":"Total","inNeeds":3641297,"Target":3641297,"FondsRequis":0,"Resume":""}]';
            
            
            
			
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Food Security & Agriculture</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>7.3M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>5.9M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>645M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Food Security & Agriculture</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>7.3</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>5.9</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>645</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgHealth':
			datas = '[{"region":"Diffa","inNeeds":340000,"Target":200000,"FondsRequis":0,"Resume":"<ul><li>Provide in kind and cash assistance to 200,000 IDPs and members of the host communities struck by food insecurity.</li><li>Support to the most vulnerable households through the distribution of agricultural inputs such as seeds, fertilizers and veterinary assistance for livestock production.</li><li>Support the government to improve food security analysis and reinforce the food security monitoring and evaluation system.</li></ul>"},{"region":"Lac","inNeeds":303231,"Target":176523,"FondsRequis":0,"Resume":"To address growing food insecurity during the lean season and support livelihoods and agricultural production of displaced people and communities affected by displacements it is necessary to:<ul><li>Provide food assistance to 125,000 displaced people as well as to 31,000 severely food insecure people among the host community.</li><li>Provide agricultural support for 36,000 households through the provision of seeds and tools and support livestock production.</li></ul>"},{"region":"Yobe","inNeeds":1272704,"Target":1272704,"FondsRequis":0,"Resume":"<ul><li>Deliver food assistance to 3 million host community members, 1.5 million IDPs and 600,000 returnees through inkind assistance, cash transfers or commodity vouchers.</li><li>Support household agriculture production and livelihoods through improved access to agro-based production inputs such as seeds, tools, fertilizer, irrigation, livestock health.</li><li>Support evidence-based assessment, analysis and capacity building of national stakeholders to strengthen food security coordination and data.</li></ul>"},{"region":"Borno","inNeeds":3641297,"Target":3641297,"FondsRequis":0,"Resume":"<ul><li>Deliver food assistance to 3 million host community members, 1.5 million IDPs and 600,000 returnees through inkind assistance, cash transfers or commodity vouchers.</li><li>Support household agriculture production and livelihoods through improved access to agro-based production inputs such as seeds, tools, fertilizer, irrigation, livestock health.</li><li>Support evidence-based assessment, analysis and capacity building of national stakeholders to strengthen food security coordination and data.</li></ul>"},{"region":"ExtremeNord","inNeeds":1579042,"Target":467480,"FondsRequis":0,"Resume":"<ul><li>Ensure access to essential health care for 1.2 million people by supporting 70 health facilities with 140 additional staff and 100 IEHK kits and by providing comprehensive immunization for 240,000 children under 5 and 60,000 pregnant women.</li><li>Procure essential commodities for safe delivery and distribute 5,000 dignity kits for 60,000 pregnant women.</li><li>Implement a comprehensive package for HIV and AIDS services for 60,000 pregnant women and their children and 30,000 IDPs and host communities.</li></ul>"},{"region":"Adamawa","inNeeds":204749,"Target":204749,"FondsRequis":0,"Resume":"<ul><li>Deliver food assistance to 3 million host community members, 1.5 million IDPs and 600,000 returnees through inkind assistance, cash transfers or commodity vouchers.</li><li>Support household agriculture production and livelihoods through improved access to agro-based production inputs such as seeds, tools, fertilizer, irrigation, livestock health.</li><li>Support evidence-based assessment, analysis and capacity building of national stakeholders to strengthen food security coordination and data.</li></ul>"},{"region":"Total","inNeeds":3641297,"Target":3641297,"FondsRequis":0,"Resume":""}]';
			
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Health</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>7.8M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>1.3M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>125.1M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Health</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>7.8</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>1.3</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>125.1</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgNutrition':
			datas = '[{"region":"Diffa","inNeeds":72000,"Target":59000,"FondsRequis":0,"Resume":"<ul><li>Provide treatment to around 12,000 severely malnourished under 5 children and to around 44,000 children suffering from moderate malnutrition as well as ensuring regular community-based screening of malnourished children.</li><li>Provide preventive nutritional supplementation assistance to around 13,000 pregnant and lactating women, and to 1,700 children between 0 - 23 months at risk of malnutrition.</li><li>Promote infant and young child feeding programmes in emergency situations.</li></ul>"},{"region":"Lac","inNeeds":99956,"Target":64617,"FondsRequis":0,"Resume":"To combat alarming malnutrition rates in displacement sites, particularly during the lean period, it is essential to:<ul><li>Increase the detection of malnutrition among 22,000 children below the age of five.</li><li>Extend malnutrition treatment for 17,600 displaced children and children among the host community.</li></ul>"},{"region":"Yobe","inNeeds":840050,"Target":2323232,"FondsRequis":0,"Resume":"<ul><li>Improve access to quality services for the management of acute malnutrition with a particular focus on strengthening the management of severe malnutrition cases with medical complications.</li><li>Provide preventive nutrition assistance through micronutrient deficiency control, blanket supplementary feeding for children and pregnant and lactating women as well as infant feeding in emergencies.</li><li>Scale up assistance to children at risk of acute malnutrition (391,000 under five children) and pregnant and lactating women (185,500).</li></ul>"},{"region":"Borno","inNeeds":1516085,"Target":646351,"FondsRequis":0,"Resume":"<ul><li>Improve access to quality services for the management of acute malnutrition with a particular focus on strengthening the management of severe malnutrition cases with medical complications.</li><li>Provide preventive nutrition assistance through micronutrient deficiency control, blanket supplementary feeding for children and pregnant and lactating women as well as infant feeding in emergencies.</li><li>Scale up assistance to children at risk of acute malnutrition (391,000 under five children) and pregnant and lactating women (185,500).</li></ul>"},{"region":"ExtremeNord","inNeeds":303187,"Target":151271,"FondsRequis":0,"Resume":"<ul><li>Provide therapeutic care for 27,000 children under 5 suffering from severe acute malnutrition (IDPs and host communities).</li><li>Accelerate programmes aimed at improving Infant and Young Child Feeding (IYCF) practices, targeting about 25,000 mothers and caregivers.</li><li>Ensure malnutrition prevention support through the implementation of blanket supplementary feeding for 135,000 children at risk of malnutrition.</li></ul>"},{"region":"Adamawa","inNeeds":1091631,"Target":839916,"FondsRequis":0,"Resume":"<ul><li>Improve access to quality services for the management of acute malnutrition with a particular focus on strengthening the management of severe malnutrition cases with medical complications.</li><li>Provide preventive nutrition assistance through micronutrient deficiency control, blanket supplementary feeding for children and pregnant and lactating women as well as infant feeding in emergencies.</li><li>Scale up assistance to children at risk of acute malnutrition (391,000 under five children) and pregnant and lactating women (185,500).</li></ul>"},{"region":"Total","inNeeds":1516085,"Target":2323232,"FondsRequis":0,"Resume":""}]';
			
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Nutrition</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>3.9M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>2.9M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>162.3M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Nutrition</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>3.9</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>2.9</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>162.3</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgProtection':
			datas = '[{"region":"Diffa","inNeeds":236000,"Target":160000,"FondsRequis":0,"Resume":"<ul><li>Reinforce the national and community-based structures to identify, monitor and support around 160,000 people with specific needs related to protection (psychosocial support, unaccompanied children, 46,000 SGBV survivors,children associated with armed groups).</li><li>Provide identification documents to displaced people and ensure access to justice.</li><li>Ensure access to psychosocial support and recreational activities for displaced children.</li><li>Train and sensitize teams in community-based structures to prevent and manage conflicts, and prevent and mitigate mine risks.</li></ul>"},{"region":"Lac","inNeeds":153512,"Target":146518,"FondsRequis":0,"Resume":"In a context of military operations leading to displacements and increased human rights violations risks, it is essential to:<ul><li>Implement multi-sector referral and response mechanisms to ensure the protection of 65,000 people in displacement.</li><li>Strengthen community protection mechanisms to meet the specific needs of 10,000 people.</li></ul>"},{"region":"Yobe","inNeeds":541408,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Improve access to child protection services and psychosocial support for 900,000 boys and girls. Support the prevention of and response to grave child rights violations.</li><li>Increase access to well-coordinated, multi-sectoral services for GBV survivors (960,000 people at risk) by developing and strengthening referral systems and safe spaces.</li><li>Support livelihoods, resilience-building activities, access to justice and national protection and legal frameworks.</li></ul>"},{"region":"Borno","inNeeds":4432669,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Improve access to child protection services and psychosocial support for 900,000 boys and girls. Support the prevention of and response to grave child rights violations.</li><li>Increase access to well-coordinated, multi-sectoral services for GBV survivors (960,000 people at risk) by developing and strengthening referral systems and safe spaces.</li><li>Support livelihoods, resilience-building activities, access to justice and national protection and legal frameworks.</li></ul>"},{"region":"ExtremeNord","inNeeds":551825,"Target":538118,"FondsRequis":0,"Resume":"<ul><li>Ensure adequate prevention mechanisms as well as response to protection incidents, including SGBV and child protection via robust protection monitoring, referral and follow-up.Monitor access to asylum for Nigerian nationals and advocate the respect of international protection norms such as non-refoulement.</li><li>Provide legal and psychosocial assistance to IDPs and refugees in need and address the lack of documentation to prevent statelessness.</li><li>Build government protection capacity through targeted training, support and capacity development; reinforce the capacity of community-based protection mechanisms through training, awareness-raising and mobilisation.</li></ul>"},{"region":"Adamawa","inNeeds":1143975,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Improve access to child protection services and psychosocial support for 900,000 boys and girls. Support the prevention of and response to grave child rights violations.</li><li>Increase access to well-coordinated, multi-sectoral services for GBV survivors (960,000 people at risk) by developing and strengthening referral systems and safe spaces.</li><li>Support livelihoods, resilience-building activities, access to justice and national protection and legal frameworks.</li></ul>"},{"region":"Total","inNeeds":4432669,"Target":538118,"FondsRequis":0,"Resume":""}]';
            
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Protection</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>7M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>0.8M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>145.1M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Protection</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>7</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>0.8</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>145.1</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgShelter':
			datas = '[{"region":"Diffa","inNeeds":281000,"Target":180000,"FondsRequis":0,"Resume":"<ul><li>Distribute basic household items to some 40,000 vulnerable households.</li><li>Provide shelter in order to ensure their protection and dignity.</li><li>Distribute cash and commodity vouchers for the purchase of basic household items.</li></ul>"},{"region":"Lac","inNeeds":220500,"Target":166910,"FondsRequis":0,"Resume":"To provide the displaced population with dignified living conditions, while facilitating access to shelter and basic household items, it is essential to:<ul><li>Provide emergency shelter to 10,000 displaced people with specific needs (distribution of tarpaulins) and NFI to 60,000 displaced people.</li><li>Provide long-term solutions that promote self-sufficiency and/or reintegration of 125,000 displaced people.</li></ul>"},{"region":"Yobe","inNeeds":141073,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide reinforced or temporary emergency shelters, repairs/rehabilitation and cash for shelter as well as nonfood items to 1 million people.</li><li>Distribute non-food item kits to the most vulnerable target groups, with replenishments made according to needs.</li></ul>"},{"region":"Borno","inNeeds":1675697,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide reinforced or temporary emergency shelters, repairs/rehabilitation and cash for shelter as well as nonfood items to 1 million people.</li><li>Distribute non-food item kits to the most vulnerable target groups, with replenishments made according to needs.</li></ul>"},{"region":"ExtremeNord","inNeeds":514890,"Target":314447,"FondsRequis":0,"Resume":"<ul><li>Distribute 33,000 shelter kits to 165,000 IDPs and hosts and help build 1,500 family shelters.</li><li>Distribute sleeping mats, blankets, mosquito nets and sanitary napkins to 42,000 IDP families.</li><li>Build 5,000 emergency shelters and distribute 20,000 NFI kits to refugees ; build 3,500 transitional shelters for vulnerable households living around the camp.</li><ul>"},{"region":"Adamawa","inNeeds":458974,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Provide reinforced or temporary emergency shelters, repairs/rehabilitation and cash for shelter as well as nonfood items to 1 million people.</li><li>Distribute non-food item kits to the most vulnerable target groups, with replenishments made according to needs.</li></ul>"},{"region":"Total","inNeeds":1675697,"Target":314447,"FondsRequis":0,"Resume":""}]';
			
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Shelter</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>3.2M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>0.6M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>90.8M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Shelter</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>3.2</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>0.6</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>90.8</span><span class='happy'> M</span></div></div>");
			break;
		case 'ImgWash':
			datas = '[{"region":"Diffa","inNeeds":330000,"Target":326000,"FondsRequis":0,"Resume":"<ul><li>Improve access to water, sanitation and hygiene to around 330,200 people at temporary displacement sites or in host communities through the establishment of emergency and permanent water supply facilities.</li> <li>Support the treatment of severe malnutrition among 7,294 children through the construction or rehabilitation of water and sanitation facilities at health centres and the promotion of proper hygiene practices.</li><li>Provide WASH services for around 178,000 people in areas at high risk of cholera outbreaks.</li></ul>"},{"region":"Lac","inNeeds":219894,"Target":118092,"FondsRequis":0,"Resume":"To ensure integrated access to drinking water, hygiene promotion and basic sanitation services in order to improve the living conditions of people affected by population movements, it is necessary to:<ul><li>Increase access to drinking water for 35,000 people (water points and treatment) according to the Sphere norms and standards.</li><li>Promote good hygiene practices (latrines and waste management) and access to adequate sanitation services for 70,000 people in order to prevent disease.</li></ul>"},{"region":"Yobe","inNeeds":197046,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Rehabilitate water sources and improve supply in temporary IDP sites and in vulnerable communities for 1 million IDPs.</li><li>Construct WASH facilities and promote hygiene in temporary IDP sites, over-crowded host communities and areas of return for 600,000 IDPs and 400,000 members of host communities.</li></ul>"},{"region":"Borno","inNeeds":2838451,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Rehabilitate water sources and improve supply in temporary IDP sites and in vulnerable communities for 1 million IDPs.</li><li>Construct WASH facilities and promote hygiene in temporary IDP sites, over-crowded host communities and areas of return for 600,000 IDPs and 400,000 members of host communities.</li></ul>"},{"region":"ExtremeNord","inNeeds":462060,"Target":320167,"FondsRequis":0,"Resume":"<ul><li>Provide access to safe drinking water, sanitation and hygiene services to 123,000 people, including 54,000 IDPs and refugees out of camp by constructing and rehabilitating 200 boreholes and 40 latrines.</li><li>Promote good hygiene awareness and distribute kits to 150,000 IDPs, refugees and host communities.</li></ul>"},{"region":"Adamawa","inNeeds":597934,"Target":0,"FondsRequis":0,"Resume":"<ul><li>Rehabilitate water sources and improve supply in temporary IDP sites and in vulnerable communities for 1 million IDPs.</li><li>Construct WASH facilities and promote hygiene in temporary IDP sites, over-crowded host communities and areas of return for 600,000 IDPs and 400,000 members of host communities.</li></ul>"},{"region":"Total","inNeeds":2838451,"Target":326000,"FondsRequis":0,"Resume":""}]';
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Water, Hygiene and sanitation (Wash)</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>4.6M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>0.7M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>81.2M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Water, Hygiene and sanitation (Wash)</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>4.6</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>0.7</span><span class='happy'> M</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>81.2</span><span class='happy'> M</span></div></div>");
			
			break;
		case 'ImgMsrr':
			datas = '[{"region":"Diffa","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":""},{"region":"Lac","inNeeds":8200,"Target":8200,"FondsRequis":11777881,"Resume":"To ensure continuity of international protection of refugees and to guarantee their access to essential services in accordance with international standards, it is necessary to:<ul><li>Protect 8,200 refugees against all forms of abuse, exploitation and violence.</li><li>Improve access to education for 400 refugee children through the construction of classrooms.</li><li>Increase the self-sufficiency of 500 refugee households.</li></ul>"},{"region":"Yobe","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":""},{"region":"Borno","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":""},{"region":"ExtremeNord","inNeeds":86000,"Target":86000,"FondsRequis":33384663,"Resume":"<ul><li>Ensure optimal access to formal education for Nigerian refugee children by constructing/upgrading 105 classrooms and have at least 20,000 students (67 per cent of school-aged children at Minawao camp) enrolled and attending school on a regular basis.</li><li>Finalise and establish a permanent water supply system to respond to the needs of 85,000 people, including 75,000 in Minawao camp and 10,000 among the host community.</li></ul>"},{"region":"Adamawa","inNeeds":0,"Target":0,"FondsRequis":0,"Resume":""},{"region":"Total","inNeeds":86000,"Target":86000,"FondsRequis":33384663,"Resume":""}]';
            
            //$("#SectorInfo").html("<div id='titre' class='titre ContenuAGauche'>Multi-Sector for refugees</div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People in need</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/peopleUrgent.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>4.6M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>People targeted</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/TargetX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>0.7M</span></div></div></div><div class='shadowBox centrerContenu'><div><span class='texteMoyen happy'>2017 requierement</span></div><div><div class='col-xs-6 col-md-6  col-lg-6'><img src='images/RequirementX60.png'/></div><div class='col-xs-6 col-md-6  col-lg-6'><span class='titre happy'>81.2M</span></div></div></div>");
            
            $("#SectorInfo").html("<div class='titrePetit ContenuAGauche'>Lake Chad Basin</div><div class='titre ContenuAGauche'>Multi-Sector for refugees</div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People in need</span></div><div><img src='images/peopleUrgent.png'/><span class='texteMoyen happy'>94</span><span class='happy'> K</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>People targeted</span></div><div><img src='images/TargetX30.png'/><span class='texteMoyen happy'>94</span><span class='happy'> K</span></div></div><div class='blocNoir centrerContenu marge'><div><span class='texte2x happy'>2017 requierement</span></div><div><img src='images/RequirementX30.png'/><span class='texteMoyen happy'>45.1</span><span class='happy'> M</span></div></div>");
			
			break;
		default:
			break;
	}
	$("#mapBloc").show("slow");
	LoadMapData(datas);
    $("#Admin1Info").fadeOut(10);
    
});


$(document).scroll(function() {
    
    var timeOffSet = $("#time1").offset();
    
    
    
    //console.log( "P1 " + ((img2Offset.top/$(document).height())+0.05));
    //console.log( "P2 " + (($(window).height() + $(window).scrollTop()) / $(document).height()));
     /*
        console.log(
        "windows height " + $(window).height()
        +"windows scrool top " + $(window).scrollTop()
        +"document height " + $(document).height()
        +"img offet " + timeOffSet.top
               );
			   */
        
    
	
    
    if(((timeOffSet.top/$(document).height())+0.1)<=(($(window).height() + $(window).scrollTop()) / $(document).height())){
		
			$("#time1").delay(400).fadeIn("slow", function(){
				$("#time2").delay(400).fadeIn("slow", function(){
					$("#time3").delay(400).fadeIn("slow", function(){
						$("#time4").delay(400).fadeIn("slow");
					});
				});
			});
		
		
    }

});


$('.graph g circle').mouseover(function (e) {
    $(this).css({r:"10"});
}).mouseleave(function () {
	$(this).css({r:"8"});
});

$(window).resize(function() {
    $("#carte").css({height:($(window).height()+160)});
    $(".blocCarte").css({height:($(window).height()-160)});
});

//FATE OUT AND IN GALERIE
$('#imgGal1Bloc').mouseover(function (e) {
    $('#imgGal1Black').fadeOut('fast');
    $('#imgGal1').fadeIn('fast');
    
}).mouseleave(function () {
    $('#imgGal1').fadeOut('slow');
    $('#imgGal1Black').fadeIn('slow');
});

$('#imgGal2Bloc').mouseover(function (e) {
    $('#imgGal2Black').fadeOut('fast');
    $('#imgGal2').fadeIn('fast');
    
}).mouseleave(function () {
    $('#imgGal2').fadeOut('slow');
    $('#imgGal2Black').fadeIn('slow');
});

$('#imgGal3Bloc').mouseover(function (e) {
    $('#imgGal3Black').fadeOut('fast');
    $('#imgGal3').fadeIn('fast');
    
}).mouseleave(function () {
    $('#imgGal3').fadeOut('slow');
    $('#imgGal3Black').fadeIn('slow');
});

$('#imgGal4Bloc').mouseover(function (e) {
    $('#imgGal4Black').fadeOut('fast');
    $('#imgGal4').fadeIn('fast');
    
}).mouseleave(function () {
    $('#imgGal4').fadeOut('slow');
    $('#imgGal4Black').fadeIn('slow');
});

$('#imgGal5Bloc').mouseover(function (e) {
    $('#imgGal5Black').fadeOut('fast');
    $('#imgGal5').fadeIn('fast');
    
}).mouseleave(function () {
    $('#imgGal5').fadeOut('slow');
    $('#imgGal5Black').fadeIn('slow');
});

$('#imgGal6Bloc').mouseover(function (e) {
    $('#imgGal6Black').fadeOut('fast');
    $('#imgGal6').fadeIn('fast');
    
}).mouseleave(function () {
    $('#imgGal6').fadeOut('slow');
    $('#imgGal6Black').fadeIn('slow');
});



//
$('#hightLight1').mouseover(function (e) {
    $('#hoverInsideFront1').fadeOut('fast');
    $('#hoverInsideBehind1').fadeIn('fast');
    
}).mouseleave(function () {
    $('#hoverInsideBehind1').fadeOut('slow');
    $('#hoverInsideFront1').fadeIn('slow');
});
$('#hightLight2').mouseover(function (e) {
    $('#hoverInsideFront2').fadeOut('fast');
    $('#hoverInsideBehind2').fadeIn('fast');
    
}).mouseleave(function () {
    $('#hoverInsideBehind2').fadeOut('slow');
    $('#hoverInsideFront2').fadeIn('slow');
});
$('#hightLight3').mouseover(function (e) {
    $('#hoverInsideFront3').fadeOut('fast');
    $('#hoverInsideBehind3').fadeIn('fast');
    
}).mouseleave(function () {
    $('#hoverInsideBehind3').fadeOut('slow');
    $('#hoverInsideFront3').fadeIn('slow');
});











//SCROLL VERS LES PAGES
$('#GotoPage1').click(function (e) {
    $("#clickToScroll").hide("fast");
    $('html, body').animate({
            scrollTop: $("#page1").offset().top
          }, 600);
    
    
    var blocheight;
    var Winheight;
    blocheight = $("#page1").css("height").replace("px","");
    Winheight = $(window).height();
    if(blocheight<Winheight){
        $("#page1").css("height",$(window).height());
    }
    
    
      
    
}).mouseover(function (e) {
    $('#GotoPage1 circle').css({r:"5"});
    $('#labelPage1').fadeIn('slow');
    
}).mouseleave(function () {
    $('#GotoPage1 circle').css({r:"3"});
    $('#labelPage1').fadeOut('slow');
});


$('#GotoPage2').click(function (e) {
    $("#clickToScroll").hide("fast");
    $('html, body').animate({
        scrollTop: $("#page2").offset().top
      }, 600);
    var blocheight;
    var Winheight;
    blocheight = $("#page2").css("height").replace("px","");
    Winheight = $(window).height();
    if(blocheight<Winheight){
        $("#page2").css("height",$(window).height());
    }
    
    
      
}).mouseover(function (e) {
    $('#GotoPage2 circle').css({r:"5"});
    $('#labelPage2').fadeIn('slow');
    
}).mouseleave(function () {
    $('#GotoPage2 circle').css({r:"3"});
    $('#labelPage2').fadeOut('slow');
});


$('#GotoPage3').click(function (e) {
    $("#clickToScroll").hide("fast");
    $('html, body').animate({
        scrollTop: $("#page3").offset().top
      }, 600);
    var blocheight;
    var Winheight;
    blocheight = $("#page3").css("height").replace("px","");
    Winheight = $(window).height();
    if(blocheight<Winheight){
        $("#page3").css("height",$(window).height());
    }
    
    
      
}).mouseover(function (e) {
    $('#GotoPage3 circle').css({r:"5"});
    $('#labelPage3').fadeIn('slow');
    
}).mouseleave(function () {
    $('#GotoPage3 circle').css({r:"3"});
    $('#labelPage3').fadeOut('slow');
});


$('#GotoPage4').click(function (e) {
    $("#clickToScroll").hide("fast");
    $('html, body').animate({
        scrollTop: $("#page4").offset().top
      }, 600);
    var blocheight;
    var Winheight;
    blocheight = $("#page4").css("height").replace("px","");
    Winheight = $(window).height();
    if(blocheight<Winheight){
        $("#page4").css("height",$(window).height());
    }
    
    
    
      
}).mouseover(function (e) {
    $('#GotoPage4 circle').css({r:"5"});
    $('#labelPage4').fadeIn('slow');
    
}).mouseleave(function () {
    $('#GotoPage4 circle').css({r:"3"});
    $('#labelPage4').fadeOut('slow');
});


$('#GotoPage5').click(function (e) {
    $("#clickToScroll").hide("fast");
    $('html, body').animate({
        scrollTop: $("#page5").offset().top
      }, 600);
    var blocheight;
    var Winheight;
    blocheight = $("#page5").css("height").replace("px","");
    Winheight = $(window).height();
    if(blocheight<Winheight){
        $("#page5").css("height",$(window).height());
    }
    
    
    
      
}).mouseover(function (e) {
    $('#GotoPage5 circle').css({r:"5"});
    $('#labelPage5').fadeIn('slow');
    
}).mouseleave(function () {
    $('#GotoPage5 circle').css({r:"3"});
    $('#labelPage5').fadeOut('slow');
});


$('#GotoPage6').click(function (e) {
    $("#clickToScroll").hide("fast");
    $('html, body').animate({
        scrollTop: $("#page6").offset().top
      }, 600);
    var blocheight;
    var Winheight;
    blocheight = $("#page6").css("height").replace("px","");
    Winheight = $(window).height();
    if(blocheight<Winheight){
        $("#page6").css("height",$(window).height());
    }
    
    
    
      
}).mouseover(function (e) {
    $('#GotoPage6 circle').css({r:"5"});
    $('#labelPage6').fadeIn('slow');
    
}).mouseleave(function () {
    $('#GotoPage6 circle').css({r:"3"});
    $('#labelPage6').fadeOut('slow');
});


$('#GotoPage7').click(function (e) {
    $("#clickToScroll").hide("fast");
    $('html, body').animate({
        scrollTop: $("#page7").offset().top
      }, 600);
    var blocheight;
    var Winheight;
    blocheight = $("#page7").css("height").replace("px","");
    Winheight = $(window).height();
    if(blocheight<Winheight){
        $("#page7").css("height",$(window).height());
    }
    
    
    
    
      
}).mouseover(function (e) {
    $('#GotoPage7 circle').css({r:"5"});
    $('#labelPage7').fadeIn('slow');
    
}).mouseleave(function () {
    $('#GotoPage7 circle').css({r:"3"});
    $('#labelPage7').fadeOut('slow');
});