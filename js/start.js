const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const endPoint = 12
const select= [];


function goResult(){

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
    if(++qIdx === endPoint){
        goResult();
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
