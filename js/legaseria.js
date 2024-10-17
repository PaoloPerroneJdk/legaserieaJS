// input = document.getElementById("myInput"); Queste due righe recuperano il valore inserito dall'utente in un campo di input con l'ID "myInput" e lo convertono in minuscolo tramite la funzione .toLowerCase(). Questo permette di fare una ricerca non sensibile alle maiuscole/minuscole.

// La funzione searchApi ascolta l'input dell'utente(fa una richiesta HTTP tramite axios)

// Se la richiesta ha successo, i dati della risposta (response.data) vengono passati alla funzione displayResults, insieme al filtro (il testo inserito dall'utente), per gestire la visualizzazione dei risultati

// catch(error => console.error("Error:", error)): Se si verifica un errore durante la richiesta, questo viene catturato e stampato nella console del browser.

//  NOTA BENE => La funzione searchApi ascolta l'input dell'utente, se c'è un testo valido invia una richiesta a un'API per recuperare risultati basati su quella query

function searchApi() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toLowerCase();

  if (filter.trim() !== "") {
    var apiUrl =
      "https://www.legaseriea.it/api/autocomplete?query=" + filter + "&mode=1";
    axios
      .get(apiUrl)
      .then((response) => displayResults(response.data, filter))
      .catch((error) => console.error("Error:", error));
  } else {
    document.getElementById("myUL").innerHTML = "";
  }
}

// La funzione displayResults è responsabile di visualizzare i risultati della ricerca all'interno di una lista (un elemento <ul> in HTML) in base ai dati ricevuti dall'API.

//   Viene creato un nuovo elemento <li> che conterrà una frase che indica i risultati visualizzati per la query cercata       dall'utente, ad esempio: "Risultati per: Juventus".
// Il testo della query viene visualizzato in grassetto impostando la proprietà fontWeight su 'bold'.
// Infine, l'elemento <li> viene aggiunto alla lista <ul>

function displayResults(data, searchString) {
  var ul = document.getElementById("myUL");
  ul.innerHTML = "";

  var searchInfo = document.createElement("li");
  searchInfo.textContent = "Risultati per: " + searchString;
  searchInfo.style.fontWeight = "bold";
  ul.appendChild(searchInfo);

  // Per ogni elemento nell'array, crea un nuovo elemento <li> e un link <a>;

  for (var i = 0; i < data.data.length; i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");

    // encodeURIComponent(data.data[i]) codifica correttamente il valore dei risultati della ricerca (come nomi di squadre o giocatori) per essere utilizzato come parte di un URL

    var filter = encodeURIComponent(data.data[i]);
    // Imposta l'href del link a un URL che punta alla pagina di ricerca del sito, passando come query il risultato di ricerca
    a.href = "https://www.legaseriea.it/it/search?q=" + filter + "&type=*";

    //  Questa riga imposta il testo del link (<a>) per ogni risultato.
    //  data.data[i] rappresenta il singolo risultato della ricerca, estratto dall'array di dati ricevuto dalla chiamata API
    // Il metodo appendChild() in JavaScript viene utilizzato per aggiungere un nodo figlio a un altro nodo genitore. In pratica, consente di inserire un nuovo elemento HTML (o nodo) all'interno di un altro elemento esistente nella struttura del DOM .l'elemento <li>, che ora contiene il link <a>, viene aggiunto alla lista non ordinata (<ul>).
    a.textContent = data.data[i];
    li.appendChild(a);
    ul.appendChild(li);

    if (i === 0) {
      a.addEventListener("click", function () {
        document.getElementById("myInput").value = this.textContent;
      });
    }
  }
}

function clearList() {
  document.getElementById("myUL").innerHTML = "";
  document.getElementById("myInput").value = "";
}
