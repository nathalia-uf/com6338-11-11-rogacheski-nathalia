const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = url => fetch(url).then(res => res.json());

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = tag => str => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = (
  poem => {
    poem.author = makeTag('em')(poem.author);
    poem.author = makeTag('h3')(poem.author);
    poem.author = poem.author.replace(/^<h3>(.*?)<\/h3>$/, '<h3><em>by $1</em></h3>');
    return poem;
  },

  poem => {
    // Place each stanza
    poem.lines = poem.lines.join('\n').split(/\n\s*\n/);
    return poem;
  },

  poem => {
    // Place <br>
    poem.lines = poem.lines.map(lines => lines.replace(/\n/g, '<br>'));
    return poem;
  },

  poem => {
    // Return HTML string 
    const titleHTML = makeTag('h2')(poem.title);
    const authorHTML = poem.author;
    const linesHTML = poem.lines.map(lines => makeTag('p')(lines)).join('');
    return `${titleHTML}\n${authorHTML}\n${linesHTML}`;
  }
);

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}