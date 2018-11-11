var xOverLatex ='&#92'+'overline{x}'; 
var yOverLatex ='&#92'+'overline{y}'; 
function greek(text) {
    return '&#92'+text;
}
function inverseLaplas (p) {
    return roundTo4(ltqnorm(p+0.5))
}
function sqrt (text) {
    return '&#92'+'sqrt{'+text+'}';
}
function start()  {
    var averageX = document.querySelector('input[name=averageX]').value;
    var deviationX = document.querySelector('input[name=deviationX]').value;
    var numberX = document.querySelector('input[name=numberX]').value; 
	var averageY = document.querySelector('input[name=averageY]').value;
    var deviationY = document.querySelector('input[name=deviationY]').value;
    var numberY = document.querySelector('input[name=numberY]').value;
	var level = document.querySelector('input[name=confidenceLevel]').value;
    var selectTypeAlternative = document.querySelector('#typeOfHypotheses').value;
    recordtext("Розв'язки",'#solvers','div');
    recordtext('Запишемо гіпотезу','#solvers','div');
    recordElement('H_0 : &#92mu_x = &#92mu_y','#solvers','div');
    selectTypeAlternative = ((selectTypeAlternative!='<')&&((selectTypeAlternative!='>')))?('&#92'+'neq'):selectTypeAlternative;
    recordElement('H_0 : &#92mu_x '+selectTypeAlternative+ '&#92mu_y','#solvers','div');
	equalitiTwoExpectedValueUnKnownDispersion(averageX,deviationX,numberX,averageY,deviationY,numberY,level,selectTypeAlternative,'#solvers'); 
}
function equalitiTwoExpectedValueUnKnownDispersion(averageX,deviationX,numberX,averageY,deviationY,numberY,level,selectTypeAlternative,where){
	recordtext('Перевіримо гіпотезу на рівність двох дисперсій',where,'div');
	var bool = checkEqualityTwoDispersion(deviationX,deviationY,numberX,numberY,level,'&ne;',where);
	if (bool) {
		var power = +numberX+ (+numberY)-2;
		console.log(power)
		recordtext('Перевіримо гіпотезу на рівність двох математичниї сподівань при рівних дисперсіях',where,'div');
		recordtext('Обчислимо статистику величини, використовуючи формулу',where,'div');
		var stat = (averageX-averageY)/Math.sqrt((numberX-1)*deviationX+(numberY-1)*deviationY)*Math.sqrt(numberX*numberY*(power)/(power+2));

		var stat = roundTo4(stat);
		recordElement('T='+divide('('+xOverLatex+'-'+yOverLatex+')',sqrt('(n_x-1)*S^2_x+(n_y-1)*S^2_y'))+sqrt(divide('n_xn_y(n_x+n_y-2)','n_x+n_y'))+'='+divide(averageX+'-'+averageY,sqrt(mult('('+numberX+'-1'+')',deviationX)+'+'+mult('('+numberY+'-1'+')',deviationY)))+sqrt(divide(mult3(numberX,numberY,'('+numberX+'+'+numberY+'-2'+')'),numberX+'+'+numberY))+'=',where,'div');
		recordElement('='+stat,where,'div');
		recordtext('Величина Т має розподіл Стюдента з n<sub>x</sub>+n<sub>y</sub>-2 = '+numberX+'+'+numberY+'-2='+(power)+' степенями свободи',where,'div');
		recordtext('Вичислимо критичну область гіпотези',where,'div');
    if(selectTypeAlternative =='<') {
       recordtext('Отримаємо лівосторонню критичну область.',where,'div');
       recordElement('t_'+greek('alpha')+'='+'-t_{n_x+n_y-2,'+greek('alpha')+'}',where,'div');
       recordElement('t_'+greek('alpha')+'='+'-t_{'+power+','+level+'}',where,'div');
       recordtext('Візьмемо значення з таблиці табуляції розподілу Стюдента',where,'div');
       recordElement('t_'+greek('alpha')+'='+tdistr(power,1-level),where,'div');
       recordtext('Критична область матиме вигляд (-&infin; ;'+tdistr(power,1-level)+')',where,'div');
       if (stat>tdistr(power,1-level)) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;'+'(-&infin; ;'+tdistr(power,1-level)+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; (-&infin; ;'+tdistr(power,level)+')',where,'div');
       }
    } else if(selectTypeAlternative =='>') {
       recordtext('Отримаємо правосторонню критичну область.',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{n_x+n_y-2,'+greek('alpha')+'}',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{'+power+','+level+'}',where,'div');
       recordtext('Візьмемо значення з таблиці табуляції розподілу Стюдента',where,'div');
       recordElement('t_'+greek('alpha')+'='+tdistr(power,level),where,'div');
       recordtext('Критична область матиме вигляд ('+tdistr(power,level)+';+&infin;'+')',where,'div');
       if (stat<tdistr(power,level)) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;	 ('+tdistr(power,level)+';+&infin;'+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; '+'('+tdistr(power,level)+';+&infin;'+')',where,'div');
       }
	} else {
       recordtext('Отримаємо двосторонню критичну область.',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{n-1,'+divide(greek('alpha'),'2')+'}',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{'+(power)+','+divide(level,'2')+'}',where,'div');
       recordtext('Візьмемо значення з таблиці табуляції розподілу Стюдента',where,'div');
       recordElement('t_'+greek('alpha')+'='+tdistr(power,level/2),where,'div');
       recordtext('Критична область матиме вигляд'+'(-&infin; ;'+tdistr(power,1-level/2)+')'+'&cup;' +' ('+tdistr(power,level/2)+';+&infin;'+')',where,'div');
       if ((stat<tdistr(power,level/2))&&((stat>tdistr(power,1-level/2)))) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;'+'(-&infin; ;'+tdistr(power,1-level/2)+')'+'&cup;' +' ('+tdistr(power,level/2)+';+&infin;'+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; '+'(-&infin; ;'+tdistr(power,1-level/2)+')'+'&cup;' +' ('+tdistr(power,level/2)+';+&infin;'+')',where,'div');
       }		   
    }				
	} else {
		recordtext('Не виконується гіпотеза про рівність дисперсій',where,'div');
	}
}