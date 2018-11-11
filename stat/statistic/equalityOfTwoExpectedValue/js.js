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
	equalitiTwoExpectedValueKnownDispersion(averageX,deviationX,numberX,averageY,deviationY,numberY,level,selectTypeAlternative,'#solvers'); 
}
function equalitiTwoExpectedValueKnownDispersion(averageX,deviationX,numberX,averageY,deviationY,numberY,level,selectTypeAlternative,where) {
	recordtext("Знайдемо значення статистики із формули",where,'div');
	recordElement('Z='+divide(xOverLatex+'-'+yOverLatex,sqrt(divide(greek('sigma')+'^2_x','n_x')+'+'+divide(greek('sigma')+'^2_y','n_y'))),where,'div');
	var stat = roundTo4((averageX-averageY)/Math.sqrt(deviationX/numberX+deviationY/numberY));
	recordElement('Z='+divide(averageX+'-'+averageY,sqrt(divide(deviationX,numberX)+'+'+divide(deviationY,numberY)))+'='+stat,where,'div');
	recordtext("Дана величина має нормальний розподіл, знайдемо квантиль розподілу із таблиці",where,'div');
	if(selectTypeAlternative =='<') {
       recordtext('Отримаємо лівосторонню критичну область.',where,'div');
       recordElement('-'+greek('Phi')+'(z_'+greek('alpha')+')='+divide('1-2'+greek('alpha'),2),where,'div');
       recordElement('-'+greek('Phi')+'(z_'+greek('alpha')+')='+(1/2-level),where,'div'); 
       recordtext('Візьмемо значення з таблиці табуляції розподілу Лапласа',where,'div');
       recordElement('z_'+greek('alpha')+'='+inverseLaplas(level-0.5),where,'div');
       recordtext('Критична область матиме вигляд (-&infin; ;'+inverseLaplas(level-0.5)+')',where,'div');
       if (stat>inverseLaplas(level-0.5)) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;'+'(-&infin; ;'+inverseLaplas(level-0.5)+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; (-&infin; ;'+inverseLaplas(level-0.5)+')',where,'div');
       }
    } else if(selectTypeAlternative =='>') {
       recordtext('Отримаємо правосторонню критичну область.',where,'div');
 	   recordElement(greek('Phi')+'(z_'+greek('alpha')+')='+divide('1-2'+greek('alpha'),2),where,'div');
       recordElement(greek('Phi')+'(z_'+greek('alpha')+')='+(1/2-level),where,'div'); 
       recordtext('Візьмемо значення з таблиці табуляції розподілу Лапласа',where,'div');
       recordElement('z_'+greek('alpha')+'='+inverseLaplas(-level+0.5),where,'div');
       recordtext('Критична область матиме вигляд ('+inverseLaplas(-level+0.5)+';+&infin;'+')',where,'div');
       if (stat<inverseLaplas(-level+0.5)) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;	 ('+inverseLaplas(-level+0.5)+';+&infin;'+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; '+'('+inverseLaplas(-level+0.5)+';+&infin;'+')',where,'div');
       }
	} else {
       recordtext('Отримаємо двосторонню критичну область.',where,'div');
 	   recordElement(greek('Phi')+'(z_'+greek('alpha')+')='+divide('1-'+greek('alpha'),2),where,'div');
       recordElement(greek('Phi')+'(z_'+greek('alpha')+')='+(1/2-level/2),where,'div'); 
       recordtext('Візьмемо значення з таблиці табуляції розподілу Лапласа',where,'div');
       recordElement('z_'+greek('alpha')+'='+inverseLaplas(-level/2+0.5),where,'div');
       recordtext('Критична область матиме вигляд'+'(-&infin; ;'+inverseLaplas(level/2-0.5)+')'+'&cup;' +' ('+inverseLaplas(-level/2+0.5)+';+&infin;'+')',where,'div');
       if ((stat<inverseLaplas(-level/2+0.5))&&((stat>-inverseLaplas(-level/2+0.5)))) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;'+'(-&infin; ;'+inverseLaplas(level/2-0.5)+')'+'&cup;' +' ('+inverseLaplas(-level/2+0.5)+';+&infin;'+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; '+'(-&infin; ;'+inverseLaplas(level/2-0.5)+')'+'&cup;' +' ('+inverseLaplas(-level/2+0.5)+';+&infin;'+')',where,'div');
       }		   
    }
}