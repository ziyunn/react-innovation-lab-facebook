//터미널에서 node로 호출

kim = {name:'Kim'};
function hi(){
    console.log('hi, ' + this.name);
}
// hi.call(kim);

//오리지널 함수를 복제하고, 복제한 함수를 사용...
var KimsHi = hi.bind(kim);
KimsHi();