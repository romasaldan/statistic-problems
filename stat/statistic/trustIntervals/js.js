var checkbox = $('input[name=chooseTasc]');
var obj = $("#solvers");
function inverseLaplas (p) {
    return roundTo4(ltqnorm(p+0.5))
}
function start() {
    if(checkbox[0].checked) {
        var average = document.querySelector('input[name=averageKD]').value;
        var confidenceLevelKnownDispersion =document.querySelector('input[name=confidenceLevelKD]').value;

        var knownDispersion = +document.querySelector('input[name=disp]').value;
        var numberKD = +document.querySelector('input[name=numberKD]').value;
        calculateTrustIntervalForAverage('#solvers',confidenceLevelKnownDispersion,average,knownDispersion,numberKD,true);
    }
    if(checkbox[1].checked) {
        var averageUk = +document.querySelector('input[name=averageUKD]').value;
        var confidenceLevelUnknownDispersion =+document.querySelector('input[name=confidenceLevelUKD]').value;
        var selectiveDispersion = +document.querySelector('input[name=selectiveDispersionUKD]').value;
        var numberUkD = +document.querySelector('input[name=numberUKD]').value;
        calculateTrustIntervalForAverage('#solvers',confidenceLevelUnknownDispersion,averageUk,selectiveDispersion,numberUkD,false)        
    }
    if(checkbox[2].checked) {
        var confidenceLevelDispersion =document.querySelector('input[name=confidenceLevelDisp]').value;
        var selectiveDispersion = document.querySelector('input[name=selectiveDispersion]').value;
        var numberD = document.querySelector('input[name=numberDisp]').value;  
        var trustIntervalDeviation = document.querySelector('input[name=deviation]').checked;
        trustIntervalForDispersion('#solvers',confidenceLevelDispersion,numberD,selectiveDispersion,trustIntervalDeviation);
    }
}
function calculateTrustIntervalForAverage(where,prob,average,dispersion,dimension,deviation){
     if (deviation == false) {
        var t = tdistr(dimension-1,1-(1+prob)/2)
        console.log(t)
        var delta = t*Math.sqrt(dispersion/dimension)
        recordtext('обчислимо довірчий інтервал для математичного сподівання при невідомій дисперсії, використовуючи формулу',where,'p')
        recordElement('P('+'&#92'+'overline{x} -t_'+'&#92'+'gamma '+divide('&#92'+'sqrt{'+'&#92'+'overline{S^2}'+'}','&#92'+'sqrt{n}')+'&#92'+'leq '+'m_x'+'&#92'+'leq '+'&#92'+'overline{x} +t_'+'&#92'+'gamma '+divide('&#92'+'sqrt{'+'&#92'+'overline{S^2}'+'}','&#92'+'sqrt n')+')='+'&#92'+'gamma',where,'div');
        recordtext('обчислимо квантиль розподілу стюдента з '+(dimension-1)+' степенями свободи ',where,'div'); 
        recordElement('t_'+'&#92'+'gamma '+'='+'t_{'+divide('1+'+'&#92'+'gamma ','2')+',n-1'+'}=t_{'+((1+prob)/2)+','+(dimension-1)+'}='+t,where,'div')
        recordtext('визначимо межі довірчого інтервалу',where,'div'); 
        recordElement(average+'-'+t+divide('&#92'+'sqrt{'+dispersion+'}','&#92'+'sqrt{'+dimension+'}')+'&#92'+'leq  '+'m_x'+'&#92'+'leq  '+average+'+'+t+divide('&#92'+'sqrt{'+dispersion+'}','&#92'+'sqrt{'+dimension+'}'),where,'div') 
        var  down = average-delta;
        var  up = +average+ (+delta);
        recordElement(roundTo4(down)+'&#92'+'leq '+'m_x'+'&#92'+'leq '+roundTo4(up),where,'div');
    } else {
        var t = inverseLaplas(+prob/2)
        console.log(t)
        var delta = t*Math.sqrt(dispersion)/Math.sqrt(dimension)        
        recordtext('обчислимо довірчий інтервал для математичного сподівання при відомому середньому квадратичному відхиленні',where,'p');
        recordElement('P('+'&#92'+'overline{x} -u_'+'&#92'+'gamma '+divide('&#92'+'sigma ','&#92'+'sqrt n')+'&#92'+'leq '+'m_x'+'&#92'+'leq '+'&#92'+'overline{x} +t_'+'&#92'+'gamma '+divide('&#92'+'sigma ','&#92'+'sqrt n')+')='+'&#92'+'gamma',where,'div');
        recordtext('Обчислимо квантиль нормального розподілу, де Ф(х) функція Лапласа',where,'p');
        recordElement('2'+'&#92'+'Phi '+'(u_{'+'&#92'+'gamma '+'})'+'='+'&#92'+'gamma ',where,'p')
        recordElement('&#92'+'Phi '+'(u_{'+'&#92'+'gamma '+'})'+'='+(prob/2),where,'p');
        recordElement('u_'+'&#92'+'gamma '+'='+t,where,'p');
        recordtext('Підставимо дані у основну формулу і визначимо ежі довірчого інтервалу',where,'p');
        recordElement(average+'-'+t+divide('&#92'+'sqrt{'+dispersion+'}','&#92'+'sqrt{'+dimension+'}')+'&#92'+'leq  '+'m_x'+'&#92'+'leq '+average+'+'+t+divide('&#92'+'sqrt{'+dispersion+'}','&#92'+'sqrt{'+dimension+'}'),where,'div');
        var  down = +average-delta;
        var  up = +average+delta; recordElement(roundTo4(down)+'&#92'+'leq '+'m_x'+'&#92'+'leq '+roundTo4(up),where,'div');
    }
}
function trustIntervalForDispersion(where,prob,dimension,selectiveDispersion,devSqrt){
    recordtext('<b>Запишемо довірчий інтервал для дисперсії, використовуючи формулу</b>',where,'p');
    recordElement(divide(mult('(n-1)','&#92'+'overline{S^2}'),' u_2')+'&#92'+'leq '+'&#92'+'sigma '+'^2'+'&#92'+'leq '+divide(mult('(n-1)','&#92'+'overline{S^2}'),' u_1'),where,'div');
    recordtext('обчислимо квантилі розподілу хі-квадрат з '+(dimension-1)+' степенями свободи',where,'p');
    
    recordElement('u_2='+'&#92'+'chi^2_{'+'n-1,'+divide('1+'+'&#92'+'gamma','2')+'}'+'='+'&#92'+'chi^2_{'+(dimension-1)+','+roundTo6((1+(+prob))/2)+'}'+'='+chisqrdistr(dimension-1,(-prob+1)/2),where,'div');
    recordElement('u_1='+'&#92'+'chi^2_{'+'n-1,'+divide('1-'+'&#92'+'gamma','2')+'}'+'='+'&#92'+'chi^2_{'+(dimension-1)+','+roundTo6((1-prob)/2)+'}'+'='+chisqrdistr(dimension-1,(1+(+prob))/2),where,'div');
    recordtext('підставимо дані у загальну формулу',where,'p');
    console.log((1-prob)/2);
    recordElement(divide(mult((dimension-1),' '+selectiveDispersion),chisqrdistr(dimension-1,(-prob+1)/2))+'&#92'+'leq '+'&#92'+'sigma '+'^2'+'&#92'+'leq '+divide(mult((dimension-1),' '+selectiveDispersion),chisqrdistr(dimension-1,(1+(+prob))/2)),where,'div') ;
    var u1 = chisqrdistr(dimension-1,(+prob+1)/2)
    var u2 = chisqrdistr(dimension-1,(1-prob)/2);
    recordElement(roundTo4((dimension-1)*Math.pow(selectiveDispersion,1)/u2)+'&#92'+'leq '+'&#92'+'sigma '+'^2'+'&#92'+'leq '+roundTo4((dimension-1)*Math.pow(selectiveDispersion,1)/u1),where,'div');
    console.log(devSqrt)
    if (devSqrt) {
        recordtext('довірчий інтервал для середнього квадратичного відхилення, взявши корінь із меж довірчого інтервалу для дисперсіх',where,'p')
    recordElement(roundTo4(Math.sqrt((dimension-1)*Math.pow(selectiveDispersion,1)/u2))+'&#92'+'leq '+'&#92'+'sigma '+'&#92'+'leq '+roundTo4(Math.sqrt((dimension-1)*Math.pow(selectiveDispersion,1)/u1)),where,'div'); 
    }
}    
