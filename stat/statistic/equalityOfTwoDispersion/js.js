function greek(text) {
    return '&#92'+text;
}
function start() {
	var disp1 = document.querySelector('input[name=firstDispersion]').value;
	var number1 = document.querySelector('input[name=firstNumber]').value;
	var disp2 = document.querySelector('input[name=secondDispersion]').value;
	var number2 = document.querySelector('input[name=secondNumber]').value;
	var level= document.querySelector('input[name=levelConfidence]').value;
	var chooseTypeProblem  = document.querySelector('#typeOfHypotheses').value	
	var where = '#solvers';
	recordtext("Розв'язки",where,'p');
	checkEqualityTwoDispersion(disp1,disp2,number1,number2,level,chooseTypeProblem,where);
}
//if disp1>disp2 then bool = true
// where  is selector of element where we put solvers
function checkEqualityTwoDispersion(disp1,disp2,number1,number2,level,chooseTypeProblem,where) {
	var bool=(+disp1)>(+disp2);
	recordtext('Запишемо нашу гіпотезу',where,'div');
	recordElement('H_0:'+greek('sigma')+'^2_x='+greek('sigma')+'^2_y',where,'div');
	if (chooseTypeProblem=='>') {
		if (bool) {
			recordElement('H_1:'+greek('sigma')+'^2_x>'+greek('sigma')+'^2_y',where,'div');
		} else {
			recordElement('H_1:'+greek('sigma')+'^2_y>'+greek('sigma')+'^2_x',where,'div');
		}
	} else {
		recordElement('H_1:'+greek('sigma')+'^2_y'+'&#92'+'neq'+greek('sigma')+'^2_x',where,'div');
	}
	recordtext('Вичислимо значення величини, прийнятої за статистику',where,'div');
	if (bool) {
			var stat = roundTo4(disp1/disp2)
			recordElement('F='+divide('S^2_x','S^2_y')+'='+divide(disp1,disp2)+'='+stat,where,'div')
		} else {
			var stat = roundTo4(disp2/disp1)
			recordElement('F='+divide('S^2_y','S^2_x')+'='+divide(disp2,disp1)+'='+stat,where,'div')			
		}
	recordtext('Величина статистики має розподіл Фішера з n<sub>x</sub>-1 i n<sub>y</sub>-1 степенями свободи.',where,'div');
	recordtext('Обчислимо критичне значення',where,'div');

	if(chooseTypeProblem=='>') {
		if (bool) {
			var limitValue = fdistr(number1-1,number2-1,level); 
			recordElement('F_kr = F('+greek('gamma')+','+(number1-1)+','+(number2-1)+')='+limitValue,where,'div');
			} else {
			var limitValue =fdistr(number2-1,number1-1,level) 
			recordElement('F_kr = F('+greek('gamma')+','+(number2-1)+','+(number1-1)+')='+limitValue,where,'div');
			}		
	   		recordtext('правостороння критична область матиме вигляд ('+limitValue+';+&infin;)',where,'div');
			if (limitValue>stat) {
				recordtext('гіпотезу про рівність дисперсії приймаємо, так як'+ stat+'&notin;'+' ('+limitValue+';+&infin;)',where,'div');
				return true;
			} else {
				recordtext('гіпотезу про рівність дисперсії відхиляємо, так як'+ stat+'&itin;'+' ('+limitValue+';+&infin;)',where,'div');
			}
	    } else {
			var limitValue = fdistr(number1-1,number2-1,level/2);
			 
				if (bool) {
					recordElement('F_{kr} = F('+greek('gamma/2')+','+(number1-1)+','+(number2-1)+')='+limitValue,where,'div');
					recordElement('F_{kr_2} ='+divide('1','F_{kr}')+'='+divide('1',roundTo4(limitValue))+'='+(roundTo4(1/limitValue)),where,'div');
					recordtext('двостороння критична область матиме вигляд'+'(0;'+roundTo4((1/limitValue))+')'+'&cup;'+' ('+limitValue+';+&infin;)',where,'div');
					if ((limitValue>stat)&&(1/limitValue<stat)) {
						recordtext('гіпотезу приймаємо, так як '+stat+'&notin;'+'(0;'+roundTo4((1/limitValue))+')'+'&cup;'+' ('+limitValue+';+&infin;)',where,'div');
						return true;
					} else {
						recordtext('гіпотезу про рівність дисперсій відхиляємо, так як '+stat+'&isin;'+'(0;'+roundTo4((1/limitValue))+')'+'&cup;'+' ('+limitValue+';+&infin;)',where,'div')						
					}
				} else {
					recordElement('F_{kr} = F('+greek('gamma/2')+','+(number1-1)+','+(number2-1)+')='+limitValue,where,'div');
					recordElement('F_{kr_2} ='+divide('1',limitValue)+'='+roundTo4(1/limitValue),where,'div');
					recordtext('двостороння критична область матиме вигляд'+'(0;'+roundTo4((1/limitValue))+')'+'&cup;'+' ('+limitValue+';+&infin;)',where,'div');
					if ((limitValue>stat)&&(1/limitValue<stat)) {
						recordtext('гіпотезу примаємо, так як '+stat+'&notin;'+'(0;'+roundTo4((1/limitValue))+')'+'&cup;'+'('+limitValue+';+&infin;)',where,'div');
						return true;
					} else {
						recordtext('гіпотезу про рівність дисперсій відхиляємо, так як '+stat+'&isin;'+'(0;'+roundTo4((1/limitValue))+')'+'&cup;'+' ('+limitValue+';+&infin;)',where,'div')
					}
				}
	    }
	return false;
}