var counterCalls = 0;
function clojure ()  {
	return function () {
		counterCalls++;
	}
}
var countCalls = clojure();
function createFormOfSendingData () {
	countCalls();
	if (counterCalls == 1) {
		$('#listOfTasc').toggleClass('none') 
	}
	if (counterCalls>1) {
		$('#table').text('');
	}
    var dimX= $('input[name=dimensionX]').val();
    var dimY= $('input[name=dimensionY]').val();
    var arr = [];
    for (var i =0;i<=dimX;i++) {
        arr[i]= [];
        for (var j = 0;j<=dimY;j++) {
            var input = document.createElement('input');
            input.setAttribute('class','smallForm');
            input.setAttribute('id',i+''+j);

            arr[i][j]=input;
        }
    }
    arr[0][0].value='X/Y';
	createTableWithForms(arr,'#table');

}
function processData() {
    var dimX= $('input[name=dimensionX]').val();
    var dimY= $('input[name=dimensionY]').val();
	var arr = [];
	var arrX = [];
	var arrY = [];
	var arrValX = [];
	var arrValY = [];
	for (var i=0;i<dimX;i++) {
		arr[i] = [];
		for (var j =0;j<dimY;j++) {
			arr[i][j] = +($('#'+(i+1)+(j+1)).val())
		}
	}
	var nameOfDistributions = $('#00').val();
	if (nameOfDistributions[0] == 'X') {
		for (var i=1;i<=dimX;i++) {
			arrX[i-1] = +$('#'+i+'0').val()
			arrValX[i-1] = 0;
			for (var j =0;j<dimY;j++){
				arrValX[i-1] += arr[i-1][j]
			}
		}
		for (var i=1;i<=dimY;i++) {
			arrY[i-1] = +$('#0'+i).val()
			arrValY[i-1] = 0;
			for (var j =0;j<dimX;j++){
				arrValY[i-1] += arr[j][i-1];
			}			
		}
	} 	
	if (nameOfDistributions[0] == 'Y') {
		for (var i=1;i<=dimX;i++) {
			arrY[i-1] = +($('#'+i+'0').val())
			arrValY[i-1] = 0;
			for (var j =0;j<dimY;j++){
				arrValY[i-1] += arr[i-1][j]
			}
		}
		for (var i=1;i<=dimY;i++) {
			arrX[i-1] = +$('#0'+i).val()
			arrValX[i-1] = 0;
			for (var j =0;j<dimX;j++){
				arrValX[i-1] += arr[j][i-1]
			}
		}
	} 
	var statX = new StatisticDistribution(arrX,arrValX)
	var statY = new StatisticDistribution(arrY,arrValY,'y')
	recordtext('Запишемо статистичний розподіл компоненти Х','#solver','div')
	statX.showTable('#solver')
	recordtext('Запишемо статистичний розподіл компоненти У','#solver','div')
	statY.showTable('#solver')
	recordtext('обчислимо для цих величин середнє значення, та вибіркові дисперсії','#solver','div');
	var xAverage = statX.calculateAverage('#solver');
	var xSelectiveDispersion = statX.calculateDispersion('#solver');
	var yAverage = statY.calculateAverage('#solver');
	var ySelectiveDispersion = statY.calculateDispersion('#solver');
	var xyAverage = 0;
	var processOfCalculatingXY = []; 
	var k = 1;
	processOfCalculatingXY[0]= '&#92'+'overline{'+statX.name+statY.name+'}='+divide('1','n')+'&#92'+'sum_{i=1}^{'+statX.values.length+'}'+'&#92'+'sum_{j=1}^{'+statY.values.length+'}'+'('+statX.name+'_i'+statY.name+'_j'+'n_{ij})='
	processOfCalculatingXY[1]= '='+divide('1',statX.dimension)+'(';
	for (var i = 0;i<statX.values.length;i++) {
		
		var help  = '';
		for (var j=0;j<statY.values.length;j++) {
			help +=mult(statY.values[j],arr[i][j]);
			xyAverage+=statX.values[i]*statY.values[j]*arr[i][j];
			if (j!=statY.values.length-1) {
				help+='+';
			}
		}
		processOfCalculatingXY[k] +=mult(correctMinus(statX.values[i]),'('+help)+')'
		if (i!=statX.values.length-1) {
			processOfCalculatingXY[k] +='+'
		}

		if (i%2==1) {
			if (i==statX.values.length-1) {
				processOfCalculatingXY[k] +=')='+roundTo(xyAverage,5)
			} else {
				k++;
				processOfCalculatingXY[k] = '+';
			}
		} else {
			if (i==statX.values.length-1) {
				processOfCalculatingXY[k] +=')='+roundTo(xyAverage,5)
			} 
		}
	}
	xyAverage=xyAverage/statX.dimension
	for (var i = 0;i<processOfCalculatingXY.length;i++) {
		recordElement(processOfCalculatingXY[i],'#solver','div');
	}
	var correlationCoefficient = (xyAverage-xAverage*yAverage)/Math.sqrt(xSelectiveDispersion*ySelectiveDispersion);
	recordElement('r_{'+statX.name+statY.name+'}='+divide('&#92'+'overline{'+statX.name+statY.name+'}-'+mult('&#92'+'overline{'+statX.name+'}','&#92'+'overline{'+statY.name+'}'),'&#92'+'sigma('+statX.name+')'+'&#92'+'sigma('+statX.name+')')+'='+divide(roundTo(xyAverage,5)+'-'+mult(xAverage,yAverage),'&#92'+'sqrt{'+mult(xSelectiveDispersion,ySelectiveDispersion)+'}')+'='+roundTo(correlationCoefficient,3),'#solver','div');
	if($('input[name=yFromX]')[0].checked) {
		
		recordtext('Запишемо рівняння лінійної регресії y на x, використовуючи формулу','#solver','div');
		recordElement(statY.name+'-'+'&#92'+'overline{'+statY.name+'}='+'r_{'+statX.name+statY.name+'}'+divide('&#92'+'sigma('+statY.name+')','&#92'+'sigma('+statX.name+')')+'('+statX.name+'-'+'&#92'+'overline{'+statX.name+'}'+')','#solver','div')
		recordElement(statY.name+'-'+correctMinus(yAverage)+'='+roundTo(correlationCoefficient,3)+divide(roundTo(Math.sqrt(ySelectiveDispersion),3),roundTo(Math.sqrt(xSelectiveDispersion),3))+'('+statX.name+'-'+correctMinus(xAverage)+')','#solver','div')
		var ya = roundTo(correlationCoefficient*Math.sqrt(ySelectiveDispersion/xSelectiveDispersion),2)
		var yb = roundTo(yAverage- xAverage*correlationCoefficient*Math.sqrt(ySelectiveDispersion/xSelectiveDispersion),3)
		recordtext('Рівнянян лінійної регресії має вигляд: y='+correctMinus(ya)+'x+'+correctMinus(yb),'#solver','div')
	}
	if($('input[name=xFromY]')[0].checked) {
		recordtext('Запишемо рівняння лінійної регресії x на y, використовуючи формулу','#solver','div');
		recordElement(statX.name+'-'+'&#92'+'overline{'+statX.name+'}='+'r_{'+statX.name+statX.name+'}'+divide('&#92'+'sigma('+statX.name+')','&#92'+'sigma('+statY.name+')')+'('+statY.name+'-'+'&#92'+'overline{'+statY.name+'}'+')','#solver','div')
		recordElement(statX.name+'-'+correctMinus(xAverage)+'='+roundTo(correlationCoefficient,3)+divide(roundTo(Math.sqrt(xSelectiveDispersion),3),roundTo(Math.sqrt(ySelectiveDispersion),3))+'('+statY.name+'-'+correctMinus(yAverage)+')','#solver','div')
		var xa = roundTo(correlationCoefficient*Math.sqrt(xSelectiveDispersion/ySelectiveDispersion),2)
		var xb = roundTo(xAverage- yAverage*correlationCoefficient*Math.sqrt(xSelectiveDispersion/ySelectiveDispersion),3)
		recordtext('Рівнянян лінійної регресії має вигляд: x='+correctMinus(xa)+'y+'+correctMinus(xb),'#solver','div')
	}

}