$(function(){
  $('#form1').materialForm();
  $('#form1').center();
  $('#form2').materialForm();
  $('#form2').hide();
  $('#triangle').moveLeft();
  $('#ambigCase').hide();
  $('#lang').change(function() {
    if($('#lang').val() == 'DE') {
      $('#submitVals').prop('value', 'Eintragen');
      $('#clearVals').prop('value', 'Zahlenwerte löschen');
      $('#prompt1').text('Bringe alle bekannten Zahlenwerte von Seiten A, B, und C und Winkel A, B, und C ein.');
      $('#sA').text('Seite A:');
      $('#sB').text('Seite B:');
      $('#sC').text('Seite C:');
      $('#aA').text('Winkel A:');
      $('#aB').text('Winkel B:');
      $('#aC').text('Winkel C:');
      $('#a1').text('Fläche:');
      $('#sA2').text('Seite A:');
      $('#sB2').text('Seite B:');
      $('#sC2').text('Seite C:');
      $('#aA2').text('Winkel A:');
      $('#aB2').text('Winkel B:');
      $('#aC2').text('Winkel C:');
      $('#a2').text('Fläche:');
      $('#prompt2').text('Eine Ausnahme wurde gefunden! Informationen:');
    } else if($('#lang').val() == 'na' || $('#lang').val() == 'EN') {
        $('#submitVals').prop('value', 'Submit');
        $('#clearVals').prop('value', 'Clear values');
        $('#prompt1').text('Enter all known values of sides A, B, and C and angles A, B, and C. ');
        $('#sA').text('Side A:');
        $('#sB').text('Side B:');
        $('#sC').text('Side C:');
        $('#aA').text('Angle A:');
        $('#aB').text('Angle B:');
        $('#aC').text('Angle C:');
        $('#a1').text('Area:');
        $('#sA2').text('Side A:');
        $('#sB2').text('Side B:');
        $('#sC2').text('Side C:');
        $('#aA2').text('Angle A:');
        $('#aB2').text('Angle B:');
        $('#aC2').text('Angle C:');
        $('#a2').text('Area:');
        $('#prompt2').text('Ambiguous case found! Information:');
    } else if($('#lang').val() == 'FR') {
        $('#submitVals').prop('value', 'Calculer');
        $('#clearVals').prop('value', 'Annuler');
        $('#prompt1').text('Renseignez les dimensions des angles ou côtés que vous connaissez.');
        $('#sA').text('Côté A:');
        $('#sB').text('Côté B:');
        $('#sC').text('Côté C:');
        $('#aA').text('Angle A:');
        $('#aB').text('Angle B:');
        $('#aC').text('Angle C:');
        $('#a1').text('La Superficie:');
        $('#sA2').text('Côté A:');
        $('#sB2').text('Côté B:');
        $('#sC2').text('Côté C:');
        $('#aA2').text('Angle A:');
        $('#aB2').text('Angle B:');
        $('#aC2').text('Angle C:');
        $('#a2').text('La Superficie:');
        $('#prompt2').text('Un cas ambigu est trouvé:');
    } else if($('#lang').val() == 'DK') {
        $('#submitVals').prop('value', 'Indsend');
        $('#clearVals').prop('value', 'Fjern tal');
        $('#prompt1').text('Opdater alle kendte tal til sider A, B, og C og vinkler A, B, og C');
        $('#sA').text('Side A:');
        $('#sB').text('Side B:');
        $('#sC').text('Side C:');
        $('#aA').text('Vinkel A:');
        $('#aB').text('Vinkel B:');
        $('#aC').text('Vinkel C:');
        $('#a1').text('Areal:');
        $('#sA2').text('Side A:');
        $('#sB2').text('Side B:');
        $('#sC2').text('Side C:');
        $('#aA2').text('Vinkel A:');
        $('#aB2').text('Vinkel B:');
        $('#aC2').text('Vinkel C:');
        $('#a2').text('Areal:');
        $('#prompt2').text('Undtagelse funden! Information:');
    }
  });
});

//dont worry about it
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
};

jQuery.fn.moveRight = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth())) + $(window).scrollLeft()) + "px");
    return this;
};

jQuery.fn.moveLeft = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    return this;
};

var sideA, sideB, sideC, angleA, angleB, angleC, area;
var sideA2, sideB2, sideC2, angleA2, angleB2, angleC2, area2;
var isTri;
var text, text2;
area = 0;
area2 = 0;
document.getElementById("submitVals").addEventListener("click", function init() {
  text = document.querySelector("#form1");
  sideA = text.elements[0].value;
  sideB = text.elements[1].value;
  sideC = text.elements[2].value;
  angleA = degToRad(text.elements[3].value);
  angleB = degToRad(text.elements[4].value);
  angleC = degToRad(text.elements[5].value);
  isTri = true;
  whatWeGot();
});

function whatWeGot() {
  //test for diff cases
  if (sideA>0 && sideB>0 && sideC>0) {
    algSSS();
  } else if (angleA>0 && sideB>0 && sideC>0) {
    algSASa();
  } else if (sideA>0 && angleB>0 && sideC>0) {
    algSASb();
  } else if (sideA>0 && sideB>0 && angleC>0) {
    algSASc();
  } else if (sideA>0 && angleB>0 && angleC>0) {
    algASAa();
  } else if (angleA>0 && sideB>0 && angleC>0) {
    algASAb();
  } else if (angleA>0 && angleB>0 && sideC>0) {
    algASAc();
  } else if (angleA>0 && sideA>0 && sideB>0) {
    algSSAab();
    
  } else if (angleA>0 && sideA>0 && sideC>0) {
    algSSAac();
  } else if (angleB>0 && sideB>0 && sideA>0) {
    algSSAba();
  } else if (angleB>0 && sideB>0 && sideC>0) {
    algSSAbc();
  } else if (angleC>0 && sideC>0 && sideA>0) {
    algSSAca();
  } else if (angleC>0 && sideC>0 && sideB>0) {
    algSSAcb();
  } else {
    if (angleA===0) {
      angleA = Math.PI - angleB - angleC;
    } else if (angleB===0) {
      angleB = Math.PI - angleA - angleC;
    } else if (angleC===0) {
      angleC = Math.PI - angleA - angleB;
    }
    if (sideC>0) {
      algASAc();
    } else if (sideB>0) {
      algASAb();
    } else {
      algASAa();
    }
  }
}

document.getElementById("clearVals").addEventListener("click", function clear() {
  text.elements[0].value  = undefined;
  text.elements[1].value  = undefined;
  text.elements[2].value  = undefined;
  text.elements[3].value  = undefined;
  text.elements[4].value  = undefined;
  text.elements[5].value  = undefined;
  text.elements[8].value  = undefined;
  text2.elements[0].value = undefined;
  text2.elements[1].value = undefined;
  text2.elements[2].value = undefined;
  text2.elements[3].value = undefined;
  text2.elements[4].value = undefined;
  text2.elements[5].value = undefined;
  text2.elements[6].value = undefined;
  $(function() {
    $('#form2').fadeOut('slow');
  });
});


//-------------------------Math Stuffs---------------------------


//returns angle opp from side1
function lawCosAng(side1, side2, side3) {
 var temp = Math.pow(side1, 2) - Math.pow(side2, 2) - Math.pow(side3, 2);
 temp = temp / (-2 * side2 * side3);
 if (temp>=-1 && temp<=1) {
   return Math.acos(temp);
 } else {
   isTri = false;
 }
}

//returns side opp from angle
function lawCosSide(angle, side1, side2) {
  var temp = -2 * side1 * side2 * Math.cos(angle);
  temp += Math.pow(side1, 2) + Math.pow(side2, 2);
  if (temp !== null) {
    return Math.sqrt(temp);
  } else {
    isTri = false;
  }
}

//returns angle opp from side2
function lawSinAngle(side1, angle1, side2) {
  var temp = Math.sin(angle1) / side1;
  if (temp * side2 >= -1 && temp * side2 <= 1) {
    return Math.asin(temp * side2);
  } else {
    isTri = false;
  }
}

//returns side opp from angle2
function lawSinSide(side1, angle1, angle2) {
  var temp = side1 / Math.sin(angle1);
  return temp * Math.sin(angle2);
}

//converts degrees to radians for the math
function degToRad(num) {
  if (num === undefined) { return; }
  return Math.PI * num / 180;
}

//converts radians to degrees
function radToDeg(num) {
  return 180 * num / Math.PI;
}

//----------------------SSS Method-------------------------------


function algSSS() {
  angleA = lawCosAng(sideA, sideB, sideC);
  angleB = lawCosAng(sideB, sideC, sideA);
  angleC = lawCosAng(sideC, sideA, sideB);
  showAnswers(false);
  areaC(sideA, sideB, angleC);
}


//----------------------SAS Methods------------------------------


//SAS angleA is known
function algSASa() {
  sideA = lawCosSide(angleA, sideB, sideC);
  algSSS();
  areaC(sideA, sideB, angleC);
}

//SAS angleB is known
function algSASb() {
  sideB = lawCosSide(angleB, sideA, sideC);
  algSSS();
  areaC(sideA, sideB, angleC);
}

//SAS angleC is known
function algSASc() {
  sideC = lawCosSide(angleC, sideA, sideB);
  algSSS();
  areaC(sideA, sideB, angleC);
}


//----------------------ASA Methods------------------------------


//ASA sideA is known
function algASAa() {
  angleA = Math.PI - angleB - angleC;
  sideB = lawSinSide(sideA, angleA, angleB);
  sideC = lawSinSide(sideA, angleA, angleC);
  showAnswers(false);
  areaC(sideA, sideB, angleC);
}

//ASA sideB is known
function algASAb() {
  angleB = Math.PI - angleA - angleC;
  sideA = lawSinSide(sideB, angleB, angleA);
  sideC = lawSinSide(sideB, angleB, angleC);
  showAnswers(false);
  areaC(sideA, sideB, angleC);
}

//ASA sideC is known
function algASAc() {
  angleC= Math.PI - angleB - angleA;
  sideB = lawSinSide(sideC, angleC, angleB);
  sideA = lawSinSide(sideC, angleC, angleA);
  showAnswers(false);
  areaC(sideA, sideB, angleC);
}


//----------------------SSA Methods------------------------------


//SSA when angleA sideB is known
function algSSAab() {
  angleB = lawSinAngle(sideA, angleA, sideB);
  angleC = Math.PI - angleA- angleB;
  sideC = lawSinSide(sideA, angleA, angleC);
  angleA2 = angleA;
  sideA2 = sideA;
  sideB2 = sideB;
  angleB2 = Math.PI - angleB;
  angleC2 = Math.PI - angleB2 - angleA2;
  sideC2 = lawSinSide(sideA2, angleA2, angleC2);
  areaCa(sideA2, sideB2, angleC2);
  areaC(sideA, sideB, angleC);
  showAnswers(true);
}

//SSA when angleA sideC is known
function algSSAac() {
  angleC = lawSinAngle(sideA, angleA, sideC);
  angleB = Math.PI - angleA - angleC;
  sideB = lawSinSide(sideA, angleA, angleB);
    angleA2 = angleA;
    sideA2 = sideA;
    sideC2 = sideC;
    angleC2 = Math.PI - angleC;
    angleB2 = Math.PI - angleC2 - angleA2;
    sideB2 = lawSinSide(sideA2, angleA2, angleB2);
    areaCa(sideA2, sideB2, angleC2);
  areaC(sideA, sideB, angleC);
  showAnswers(true);
}

//SSA when angleB sideA is known
function algSSAba() {
  angleA = lawSinAngle(sideB, angleB, sideA);
  angleC = Math.PI - angleB - angleA;
  sideC = lawSinSide(sideB, angleB, angleC);
    angleB2 = angleB;
    sideB2 = sideB;
    sideA2 = sideA;
    angleA2 = Math.PI - angleA;
    angleC2 = Math.PI - angleB2 - angleA2;
    sideC2 = lawSinSide(sideA2, angleA2, angleC2);
    areaCa(sideA2, sideB2, angleC2);
  areaC(sideA, sideB, angleC);
  showAnswers(true);
}

//SSA when angleB sideC is known
function algSSAbc() {
  angleC = lawSinAngle(sideB, angleB, sideC);
  angleA = Math.PI - angleB - angleC;
  sideA = lawSinSide(sideB, angleB, angleA);
    angleB2 = angleB;
    sideB2 = sideB;
    sideC2 = sideC;
    angleC2 = Math.PI - angleC;
    angleA2 = Math.PI - angleB2 - angleC2;
    sideA2 = lawSinSide(sideC2, angleC2, angleA2);
    areaCa(sideA2, sideB2, angleC2);
  areaC(sideA, sideB, angleC);
  showAnswers(true);
}

//SSA when angleC sideA is known
function algSSAca() {
  angleA = lawSinAngle(sideC, angleC, sideA);
  angleB = Math.PI - angleC - angleA;
  sideB = lawSinSide(sideC, angleC, angleB);
    angleC2 = angleC;
    sideC2 = sideC;
    sideA2 = sideA;
    angleA2 = Math.PI - angleA;
    angleB2 = Math.PI - angleC2 - angleA2;
    sideB2 = lawSinSide(sideA2, angleA2, angleB2);
    areaCa(sideA2, sideB2, angleC2);
  areaC(sideA, sideB, angleC);
  showAnswers(true);
}

//SSA when angleC sideB is known
function algSSAcb() {
  angleB = lawSinAngle(sideC, angleC, sideB);
  angleA = Math.PI - angleC - angleB;
  sideA = lawSinSide(sideC, angleC, angleA);
    angleC2 = angleC;
    sideC2 = sideC;
    sideB2 = sideB;
    angleB2 = Math.PI - angleB;
    angleA2 = Math.PI - angleC2 - angleB2;
    sideA2 = lawSinSide(sideB2, angleB2, angleA2);
    areaCa(sideA2, sideB2, angleC2);
  areaC(sideA, sideB, angleC);
  showAnswers(true);
}


//----------------------Output Code------------------------------


function showAnswers(ambig) {
  text = document.querySelector("#form1");
  text.elements[0].value = sideA;
  text.elements[1].value = sideB;
  text.elements[2].value = sideC;
  text.elements[3].value = radToDeg(angleA);
  text.elements[4].value = radToDeg(angleB);
  text.elements[5].value = radToDeg(angleC);
  
  if ((!isTri) || (angleA===0 || angleB===0)) {
    text = document.querySelector("#form1");
    text.elements[0].value  = undefined;
    text.elements[1].value  = undefined;
    text.elements[2].value  = undefined;
    text.elements[3].value  = undefined;
    text.elements[4].value  = undefined;
    text.elements[5].value  = undefined;
    text.elements[8].value  = undefined;
    
    if($('#lang').val() == 'EN' || $('#lang').val() == 'na') {
      $('#ambigCase').text("No triangle can be formed with the given information.");
      $('#ambigCase').fadeIn("slow");
      $('#ambigCase').delay(5000).fadeOut();
    } else if($('#lang').val() == 'DE') {
      $('#ambigCase').text('Kein Dreieck kann mit den angeführten Zahlen bilden.');
      $('#ambigCase').fadeIn("slow");
      $('#ambigCase').delay(5000).fadeOut();
    } else if($('#lang').val() == 'FR') {
      $('#ambigCase').text('Ces valeurs ne peuvent construire un triangle.');
      $('#ambigCase').fadeIn("slow");
      $('#ambigCase').delay(5000).fadeOut();
    } else if($('#lang').val() == 'DK') {
      $('#ambigCase').text('Ingen trekant kan skabe med informationen.');
      $('#ambigCase').fadeIn("slow");
      $('#ambigCase').delay(5000).fadeOut();
    }
  } else if (ambig && (sideA2>0 && sideB2>0 && sideC2>0)) {
    $(function() {
      $("#form2").fadeIn("slow");
      $('#form2').moveRight();
    });
    text2 = document.getElementById("form2");
    text2.elements[0].value = sideA2;
    text2.elements[1].value = sideB2;
    text2.elements[2].value = sideC2;
    text2.elements[3].value = radToDeg(angleA2);
    text2.elements[4].value = radToDeg(angleB2);
    text2.elements[5].value = radToDeg(angleC2);
    text2.elements[6].value = area2;   
  }
}


//-----------------------Calculation of Area-------------------


function areaC(sideA, sideB, angleC) {
  var temp = 0.5 * sideA * sideB;
  temp *= Math.sin(angleC);
  area = temp;
  if ((!isTri) || (angleA===0 || angleB===0)) {
    text.elements[8].value  = undefined;
  } else {
    text.elements[8].value = area; }
}

function areaA(sideB, sideC, angleA) {
  var temp = 0.5 * sideB * sideC;
  temp *= Math.sin(angleA);
  area = temp;
  if ((!isTri) || (angleA===0 || angleB===0)) {
    text.elements[8].value  = undefined;
  } else {
    text.elements[8].value = area; }
}

function areaB(sideA, sideC, angleB) {
  var temp = 0.5 * sideA * sideC;
  temp *= Math.sin(angleB);
  area = temp;
  if ((!isTri) || (angleA===0 || angleB===0)) {
    text.elements[8].value  = undefined;
  } else {
    text.elements[8].value = area; }
}

function areaCa(sideA2, sideB2, angleC2) {
  var temp = 0.5 * sideA2 * sideB2;
  temp *= Math.sin(angleC2);
  area2 = temp;

}