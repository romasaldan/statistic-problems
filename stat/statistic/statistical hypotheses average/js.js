var xOverLatex ='&#92'+'overline{x}'; 
function greek(text) {
    return '&#92'+text;
}
function inverseLaplas (p) {
    return roundTo4(ltqnorm(p+0.5))
}
function sqrt (text) {
    return '&#92'+'sqrt'+text;
}
function start()  {
    var expectedValue=document.querySelector('input[name=expectedValue]').value;
    var average = document.querySelector('input[name=average]').value;
    var bool = document.querySelector('input[name=deviationKnown]').checked;
    var dimension = document.querySelector('input[name=membership]').value;
    var level = document.querySelector('input[name=level]').value;
    var deviation = document.querySelector('input[name=deviation]').value;
    var selectTypeAlternative = document.querySelector('#typeOfHypotheses').value;
    recordtext("Розв'язки",'#solvers','div');
    recordtext('Запишемо гіпотезу','#solvers','div');
    recordElement('H_0 : &#92mu = '+expectedValue,'#solvers','div');
    selectTypeAlternative = ((selectTypeAlternative!='<')&&((selectTypeAlternative!='>')))?('&#92'+'neq'):selectTypeAlternative;
    recordElement('H_0 : &#92mu '+selectTypeAlternative+expectedValue,'#solvers','div');
    recordtext("Середнє значення рівне",'#solvers','div');    
    recordElement(xOverLatex+'='+average,'#solvers','div');
    if (bool) {
        hypothesKnownDeviation('#solvers',average,expectedValue,dimension,level,deviation,selectTypeAlternative)
    } else {
        hypothesUnKnownDeviation('#solvers',average,expectedValue,dimension,level,deviation,selectTypeAlternative)
    }
}
function hypothesKnownDeviation(where,average,expectedValue,dimension,level,deviation,typeProblem) {
    recordtext('обчислимо величину взяту в якості статистики',where,'div');
    recordElement('Z = '+mult(divide(xOverLatex+'-'+'&#92mu_0',greek('sigma')),sqrt(' n'))+'='+mult(divide(average+'-'+expectedValue,deviation),sqrt(dimension))+'='+(roundTo4((average-expectedValue)/deviation*Math.sqrt(dimension))),where,'div');
    var stat =  roundTo4((average-expectedValue)/deviation*Math.sqrt(dimension));
    recordtext('Дана величина має нормальний розподіл, враховуючи це, потрібно вичислити критичну область. ',where,'div');
    if(typeProblem =='<') {
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
    } else if(typeProblem =='>') {
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
function hypothesUnKnownDeviation(where,average,expectedValue,dimension,level,deviation,typeProblem) {
    recordtext('обчислимо величину взяту в якості статистики',where,'div');
    recordElement('Z = '+mult(divide(xOverLatex+'-'+'&#92mu_0','S'),sqrt(' n'))+'='+mult(divide(average+'-'+expectedValue,deviation),sqrt(dimension))+'='+(roundTo4((average-expectedValue)/deviation*Math.sqrt(dimension))),where,'div');
    var stat =  roundTo4((average-expectedValue)/deviation*Math.sqrt(dimension));
    recordtext('Дана величина має розподіл Стюдента з '+(dimension-1)+' степенями свободи , враховуючи це, потрібно вичислити критичну область. ',where,'div');	
    if(typeProblem =='<') {
       recordtext('Отримаємо лівосторонню критичну область.',where,'div');
       recordElement('t_'+greek('alpha')+'='+'-t_{n-1,'+greek('alpha')+'}',where,'div');
       recordElement('t_'+greek('alpha')+'='+'-t_{'+(dimension-1)+','+level+'}',where,'div');
       recordtext('Візьмемо значення з таблиці табуляції розподілу Стюдента',where,'div');
       recordElement('t_'+greek('alpha')+'='+tdistr(dimension-1,1-level),where,'div');
       recordtext('Критична область матиме вигляд (-&infin; ;'+tdistr(dimension-1,1-level)+')',where,'div');
       if (stat>tdistr(dimension-1,1-level)) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;'+'(-&infin; ;'+tdistr(dimension-1,1-level)+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; (-&infin; ;'+tdistr(dimension-1,level)+')',where,'div');
       }
    } else if(typeProblem =='>') {
       recordtext('Отримаємо правосторонню критичну область.',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{n-1,'+greek('alpha')+'}',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{'+(dimension-1)+','+level+'}',where,'div');
       recordtext('Візьмемо значення з таблиці табуляції розподілу Стюдента',where,'div');
       recordElement('t_'+greek('alpha')+'='+tdistr(dimension-1,level),where,'div');
       recordtext('Критична область матиме вигляд ('+tdistr(dimension-1,level)+';+&infin;'+')',where,'div');
       if (stat<tdistr(dimension-1,level)) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;	 ('+tdistr(dimension-1,level)+';+&infin;'+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; '+'('+tdistr(dimension-1,level)+';+&infin;'+')',where,'div');
       }
	} else {
       recordtext('Отримаємо двосторонню критичну область.',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{n-1,'+divide(greek('alpha'),'2')+'}',where,'div');
       recordElement('t_'+greek('alpha')+'='+'t_{'+(dimension-1)+','+divide(level,'2')+'}',where,'div');
       recordtext('Візьмемо значення з таблиці табуляції розподілу Стюдента',where,'div');
       recordElement('t_'+greek('alpha')+'='+tdistr(dimension-1,level/2),where,'div');
       recordtext('Критична область матиме вигляд'+'(-&infin; ;'+tdistr(dimension-1,1-level/2)+')'+'&cup;' +' ('+tdistr(dimension-1,level/2)+';+&infin;'+')',where,'div');
       if ((stat<tdistr(dimension-1,level/2))&&((stat>tdistr(dimension-1,1-level/2)))) {
            recordtext('гіпотезу приймаємо, так як Z='+stat+'&notin;'+'(-&infin; ;'+tdistr(dimension-1,1-level/2)+')'+'&cup;' +' ('+tdistr(dimension-1,level/2)+';+&infin;'+')',where,'div');
       } else {
            recordtext('основну гіпотезу відхиляємо і приймаємо альтернативну, так як Z='+stat+' &isin; '+'(-&infin; ;'+tdistr(dimension-1,1-level/2)+')'+'&cup;' +' ('+tdistr(dimension-1,level/2)+';+&infin;'+')',where,'div');
       }		   
    }	
}
