function greek(text) {
    return '&#92'+text;
}
function start() {
//	  var expectedValue=document.querySelector('input[name=expectedValue]').value;
//    var average = document.querySelector('input[name=average]').value;
//    var bool = document.querySelector('input[name=deviationKnown]').checked;
    var dimension = document.querySelector('input[name=membership]').value;
    var level = document.querySelector('input[name=level]').value;
    var disp = document.querySelector('input[name=disp]').value;
    var selectedDisp = document.querySelector('input[name=selectedDisp]').value;
    var selectTypeAlternative = document.querySelector('#typeOfHypotheses').value;
	hypothesesForDispersion(dimension,level,disp,selectedDisp,selectTypeAlternative,'#solvers')
}
function hypothesesForDispersion(dimension,level,disp,selectedDisp,selectTypeAlternative,where) {
	var stat = roundTo4((dimension-1)*selectedDisp/(disp));
	recordtext("Розв'язки",where,'p');
	recordtext('Запишемо гіпотезу',where,'p');
    recordElement('H_0 : '+greek('sigma')+'='+disp,where,'div');
    selectTypeAlternative = ((selectTypeAlternative!='<')&&((selectTypeAlternative!='>')))?('&#92'+'neq'):selectTypeAlternative;
    recordElement('H_0 : '+greek('sigma')+' '+selectTypeAlternative+disp,where,'div');
    recordtext("Вибіркова дисперсія рівна",where,'div');    
    recordElement('S^2='+selectedDisp,'#solvers','div');
	recordtext('знайдемо значення статистики',where,'p');
	recordElement(greek('chi')+'^2='+divide(mult('(n-1)','S^2'),greek('sigma')+'^2')+'='+divide(mult((dimension-1),selectedDisp+'^2'),disp+'^2')+'='+stat,where,'p');
	if(selectTypeAlternative=='<') {
		recordtext('Отримаємо лівосторонню критичну область, знайдемо критичне значення області з рівнем значимості '+level,where,'p');
		var limitValue =chisqrdistr(dimension-1,1-level);
		recordElement(greek('chi')+'^2_{limit value}'+'='+greek('chi')+'^2_{'+(dimension-1)+','+level+'}'+'='+limitValue,where,'div');
		recordtext('критична область матиме вигляд (0;'+limitValue+')',where,'p');
		if (stat>limitValue) {
			recordtext('Гіпотезу приймаємо, так як '+stat+'&notin;'+'(0;'+limitValue+')',where,'p')
		} else {
			recordtext('Основну гіпотезу візхиляємо і приймаємо альтернативну, так як '+stat+'&isin;'+'(0;'+limitValue+')')
		}
	} else if (selectTypeAlternative =='>') {
		recordtext('Отримаємо правосторонню критичну область, знайдемо критичне значення області з рівнем значимості '+level,where,'p');
		var limitValue =chisqrdistr(dimension-1,level);
		recordElement(greek('chi')+'^2_{limit value}'+'='+greek('chi')+'^2_{'+(dimension-1)+','+(1-level)+'}'+'='+limitValue,where,'div');
		recordtext('критична область матиме вигляд ('+limitValue+';+&infin;'+')',where,'p');
		if (stat<limitValue) {
			recordtext('Гіпотезу приймаємо, так як '+stat+'&notin;'+'('+limitValue+';+&infin;'+')',where,'p')
		} else {
			recordtext('Основну гіпотезу відхиляємо і приймаємо альтернативну, так як '+stat+'&isin;'+'('+limitValue+';+&infin;'+')',where,'div');
		}
	} else {
		recordtext('Отримаємо двосторонню критичну область, знайдемо критичне значення області з рівнем значимості '+level,where,'p');
		var limitValue1 =chisqrdistr(dimension-1,1-level/2);
		var limitValue2 =chisqrdistr(dimension-1,level/2);
		recordElement(greek('chi')+'^2_{limit value_1}'+'='+greek('chi')+'^2_{'+(dimension-1)+','+(level/2)+'}'+'='+limitValue1,where,'div');
		recordElement(greek('chi')+'^2_{limit value_2}'+'='+greek('chi')+'^2_{'+(dimension-1)+','+(1-level/2)+'}'+'='+limitValue2,where,'div');
		recordtext('критична область матиме вигляд'+'(0;'+limitValue1+')'+'&cup;'+' ('+limitValue2+';+&infin;'+')',where,'p');
		if ((stat>limitValue1)&&(stat<limitValue2)) {
			recordtext('Гіпотезу приймаємо, так як '+stat+'&notin;'+'(0;'+limitValue1+')'+'&cup;'+' ('+limitValue2+';+&infin;'+')',where,'p')
		} else {
			recordtext('Основну гіпотезу відхиляємо і приймаємо альтернативну, так як '+stat+'&isin;'+'(0;'+limitValue1+')'+'&cup;'+' ('+limitValue2+';+&infin;'+')',where,'div');
		}		
	}
}