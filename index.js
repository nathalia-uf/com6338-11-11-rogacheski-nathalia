const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = url => fetch(url).then(res => res.json());

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = tag => str => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = (poem) => {
  console.log(poem)
    const makeStanzaHTML = (stanzaLines) => {
      return `<p>${stanzaLines.join("<br/>")}</p>`
    }
    const stanzas = [[]];
    for (let line of poemJson[0].lines) {
      if (line === "") {
        stanzas.push([]);
      } else {
        stanzas[stanzas.length - 1].push(line);
      }
    }
  return `<h2>${poemJson[0].title}</h2><h3><em>by ${poemJson[0].author}</em></h3>${stanzas.map(makeStanzaHTML).join("")}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
