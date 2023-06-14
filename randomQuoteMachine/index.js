const colors = [
    '#1F2B36', 
    '#2C3E50', 
    '#34495E', 
    '#2C3848', 
    '#3B4D5F', 
    '#2E4053', 
    '#1E2F3F', 
    '#263238', 
    '#212121',
    '#1F2B36', 
    '#2C3E50', 
    '#34495E', 
    '#2C3848', 
    '#3B4D5F', 
    '#2E4053', 
    '#1E2F3F', 
    '#4C566A', 
    '#424242', 
    '#455A64', 
    '#37474F', 
    '#1D1D1D'
];

let allQuotes;

const getQuotes = () => {
    return $.getJSON(
        './data/quotes.json',
        (data) => {
            allQuotes = data;
        }
    );
};

const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * allQuotes.quotes.length);
    return allQuotes.quotes[randomIndex];
    };

const getQuote = () => {
    const { quote, author } = getRandomQuote();

    $('#tweet-quote').attr(
        'href',
        `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(`"${quote}"-${author}`)}`
    );

    $('#facebook-quote').attr(
        'href',
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`"${quote}" - ${author}`)}`
    );

    $('.quote-text').animate(
        { opacity: 0 },
        500,
        function () {
            $(this).animate({ opacity: 1 }, 500);
            $('#text').text(quote);
        }
    );

    $('.quote-author').animate(
        { opacity: 0 },
        500,
        function () {
            $(this).animate({ opacity: 1 }, 500);
            $('#author').text(author);
        }
    );

    const colorAlpha = colors[Math.floor(Math.random() * colors.length)];
    const colorBeta = colors[Math.floor(Math.random() * colors.length)];

    $('body').animate(
        {
            backgroundColor: linear-gradient(colorAlpha, colorBeta),
            color: colorAlpha
        },
        1000
    );

    $('.button').animate(
        { backgroundColor: colorAlpha },
        1000
    );
};

$(document).ready(() => {
    getQuotes().then(getQuote);

    $('#new-quote').on('click', getQuote);
});
