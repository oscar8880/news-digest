import { checkUrl, showResults, hideResults, toggleLoading, buildResults, displayErrorMessage } from "../../src/client/js/utilities"

// checkUrl
describe("URL validation checker", ()=> {
  test("it should return true if a string is a valid URL", () => {
    const input = "https://www.bbc.co.uk/news"

    const output = true;

    expect(checkUrl(input)).toEqual(output);
  });

  test("it should return false if a string is not a valid URL", () => {
    const input = "mfnjafnkasmdfmaslmd"

    const output = false;

    expect(checkUrl(input)).toEqual(output);
  });
})

// showResults
describe("Shows the results container", ()=> {
  test("Should remove 'hidden' class from results container", ()=> {
    document.body.innerHTML = `
    <div id="results-component" class="results-container hidden">
      <div class="results-title">
          <h2>Results</h2>
      </div>
      <div class="results-item">
          <h3 class="results-subtitle">Summary</h3>
          <p id="summary-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Category</h3>
        <p id="classification-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Sentiment</h3>
        <p id="polarity-data"></p>
        <p id="subjectivity-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Hashtags</h3>
        <ul id="hashtag-list">
        </ul>
      </div>
    </div>
    `;

    const results = document.getElementById('results-component');
    showResults();

    expect(results.classList.contains('hidden')).toEqual(false);
  })
})

// hideResults
describe("Hides the results container", ()=> {
  test("Should add 'hidden' class to results container", ()=> {
    document.body.innerHTML = `
    <div id="results-component" class="results-container hidden">
      <div class="results-title">
          <h2>Results</h2>
      </div>
      <div class="results-item">
          <h3 class="results-subtitle">Summary</h3>
          <p id="summary-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Category</h3>
        <p id="classification-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Sentiment</h3>
        <p id="polarity-data"></p>
        <p id="subjectivity-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Hashtags</h3>
        <ul id="hashtag-list">
        </ul>
      </div>
    </div>
    `;

    const results = document.getElementById('results-component');
    hideResults();

    expect(results.classList.contains('hidden')).toEqual(true);
  })
})

// toggleLoading
describe("Toggles the loading spinner image", ()=> {
  test("Should remove the 'hidden' class from the spinner if it is present", ()=> {
    document.body.innerHTML = `
    <div id="loading-spinner" class="lds-ring hidden"><div></div><div></div><div></div><div></div></div>
    `;

    const loading = document.getElementById('loading-spinner');
    toggleLoading();

    expect(loading.classList.contains('hidden')).toEqual(false);
  })

  test("Should add the 'hidden' class from the spinner if it is not present", ()=> {
    document.body.innerHTML = `
    <div id="loading-spinner" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `;

    const loading = document.getElementById('loading-spinner');
    toggleLoading();

    expect(loading.classList.contains('hidden')).toEqual(true);
  })
})

// buildResults
describe("Builds results element", ()=> {
  test("it should return the expected HTML snippet", () => {
    const input = {
      summary: "test",
      classification: "test",
       hashtags :[
        "#test","#test","#test","#test","#test"
      ],
      polarity : "test",
      subjectivity : "test"
    }

    document.body.innerHTML = `
    <div id="results-component" class="results-container hidden">
      <div class="results-title">
          <h2>Results</h2>
      </div>
      <div class="results-item">
          <h3 class="results-subtitle">Summary</h3>
          <p id="summary-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Category</h3>
        <p id="classification-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Sentiment</h3>
        <p id="polarity-data"></p>
        <p id="subjectivity-data"></p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Hashtags</h3>
        <ul id="hashtag-list">
        </ul>
      </div>
    </div>
    `

    const output = `
    <div id="results-component" class="results-container hidden">
      <div class="results-title">
          <h2>Results</h2>
      </div>
      <div class="results-item">
          <h3 class="results-subtitle">Summary</h3>
          <p id="summary-data">test</p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Category</h3>
        <p id="classification-data">test</p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Sentiment</h3>
        <p id="polarity-data">Polarity: test</p>
        <p id="subjectivity-data">Subjectivity: test</p>
      </div>
      <div class="results-item">
        <h3 class="results-subtitle">Hashtags</h3>
        <ul id="hashtag-list"><li>#test</li><li>#test</li><li>#test</li><li>#test</li><li>#test</li></ul>
      </div>
    </div>
    `
    buildResults(input);

    expect(document.body.innerHTML).toEqual(output);
  });
})

// displayErrorMessage
describe("Creates an error message paragraph", ()=> {
  test("Should return correct HTML snippet", () => {
    document.body.innerHTML = `
    <form id="text-form" onsubmit="" class="hidden">
      <span class="error-span" id="text-error"></span>
      <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100">
      <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
      <input disabled type="submit" id="text-submit" name="text-submit" value="Analyse" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
    </form>
    `
    displayErrorMessage("Error", document.getElementById('text-form'));

    const output = `
    <form id="text-form" onsubmit="" class="hidden">
      <span class="error-span" id="text-error"></span>
      <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100">
      <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
      <input disabled="" type="submit" id="text-submit" name="text-submit" value="Analyse" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
    <p class="error" id="error-message">Error</p></form>
    `
    expect(document.body.innerHTML).toEqual(output);
  });
})