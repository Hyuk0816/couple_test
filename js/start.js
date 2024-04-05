const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const endPoint = 10
const select= [0,0];


function calResult(){
    var pointArray = [
        {name : 'f', value :0, key:0},
        {name : 's', value :0 , key: 1}
    ]

    for(let i = 0; i < endPoint; i++){
        var target = qnaList[i].a[select[i]];
        for(let j = 0; j<target.type.length; j++){
            for(let k = 0; k < pointArray.length; k++){
                if(target.type[j] == pointArray[k].name){
                    pointArray[k].value +=1;
        }
    }
    }
    }
    // var resultArray = pointArray.sort(function(a,b){
    //     if(a.value < b.value){
    //         return -1;
    //     }
    //     if(a.value > b.value){
    //         return 1;
    //     }
    //     return 0;
    // });
    if(pointArray.find(item => item.name === 'f').value >= 2){
        let resultWord = pointArray.find(item => item.name === 'f');
        return resultWord;
    }
    else{
        let resultWord = pointArray.find(item => item.name === 's');
        return resultWord;
    }
    
    }

function setResult(){
    let result = calResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = resultList[result.key].name;
    console.log(result.value  + " set Result");

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    
    var imgUrl = 'img/image-' + result.key + '.jpg';
    resultImg.src = imgUrl;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = resultList[result.key].desc;

    const resultScore = document.querySelector('.score');
    resultScore.innerHTML = result.value + "개 맞히셨습니다!";

}


function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";

    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
         qna.style.display = "none";
         result.style.display = "block";
        },450)});
        setResult();
}

function addAnswer(answerText ,qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener('click',function() {
        var children = document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++) {
            children[i].disabled = true;
            children[i].WebkitAnimation = "fadeOut 0.5s";
            children[i].animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            select[qIdx] = idx;
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    },false);
}

function goNext(qIdx) {
    if(qIdx === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);

    }
    var status = document.querySelector('.status');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin() {

    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";

    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
         main.style.display = "none";
         qna.style.display = "block";
        },450)
        let qIdx = 0;
        goNext(qIdx);
    },450);
}

