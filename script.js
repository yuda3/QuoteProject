const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
let count  = 0;
// 名言取得
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        count++;
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //著者がない場合
        if(data.quoteAuthor === ''){
            authorText.innerText = 'UnKnown'
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //ロード完了
        removeLoadingSpinner();
        throw new Error('Oops');
    }catch (error){
        if(count < 10) {
            count++;
            console.log(count);
            await getQuote();
            throw new Error('Break');
        }else {

            alert('Some Thing is Wrong');
        }

    }
}
//Tweet 投稿
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//イベントリスナー
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
showLoadingSpinner();