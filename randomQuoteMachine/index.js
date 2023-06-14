const colors = [
    '#16A085',
    '#27AE60',
    '#F39C12',
    '#E74C3C',
    '#9B59B6',
    '#FB6964',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
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
        `https://www.facebook.com/sharer/sharer&quote=${encodeURIComponent(`"${quote}" - ${author}`)}`
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

    const color = colors[Math.floor(Math.random() * colors.length)];

    $('body').animate(
        {
            backgroundColor: color,
            color: color
        },
        1000
    );

    $('.button').animate(
        { backgroundColor: color },
        1000
    );
};

$(document).ready(() => {
    getQuotes().then(getQuote);

    $('#new-quote').on('click', getQuote);
});
