import {
  onTextChange, 
  onUrlBlur,
  onUrlChange,
  tabClickHandler,
} from '../../src/client/js/eventHandlers';

// onTextChange
describe("Determines if submit button should be enabled", ()=> {
  test("Should add disabled attribute to submit button if text boxes have no text", ()=> {
    document.body.innerHTML = `
    <form id="text-form" onsubmit="" class="hidden">
      <span class="error-span" id="text-error"></span>
      <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100">
      <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
      <input type="submit" id="text-submit" name="text-submit" value="Analyse" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
    </form>
    `;

    onTextChange()

    const results = document.getElementById('text-submit');

    expect(results.getAttribute('disabled')).toEqual("");
  })

  test("Should remove disabled attribute to submit button if text boxes have some text", ()=> {
    document.body.innerHTML = `
    <form id="text-form" onsubmit="" class="hidden">
      <span class="error-span" id="text-error"></span>
      <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100" value="bla">
      <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
      <input type="submit" id="text-submit" name="text-submit" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
    </form>
    `;

    document.getElementById('title-input').value = "test";
    document.getElementById('article-text').value = "test";

    onTextChange()

    const results = document.getElementById('text-submit');

    expect(results.getAttribute('disabled')).toEqual(null);
  })
})

// onUrlBlur
describe("Determines and shows error message relating to URL", ()=> {
  test("Should enable submit button and display no error when URL is valid", ()=> {
    document.body.innerHTML = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input disabled="" type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `;

    document.getElementById('url-input').value = "https://www.bbc.co.uk/news"


    onUrlBlur()

    const output = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `

    expect(document.body.innerHTML).toEqual(output);
  })

  test("Should disable submit button and display no error when no text is present in input", ()=> {
    document.body.innerHTML = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input disabled type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `;

    document.getElementById('url-input').value = ""


    onUrlBlur()

    const output = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input disabled="" type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `

    expect(document.body.innerHTML).toEqual(output);
  })

  test("Should disable submit button and display an error message when URL is invalid", ()=> {
    document.body.innerHTML = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input disabled type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `;

    document.getElementById('url-input').value = "asasfaf"


    onUrlBlur()

    const output = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error">Invalid URL</span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()" class="error">
      <input disabled="" type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `

    expect(document.body.innerHTML).toEqual(output);
  })
})

// onUrlChange
describe("Determines whether to enable submit button", ()=> {
  test("Should enable submit button when URL is valid", ()=> {
    document.body.innerHTML = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input disabled type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `;

    document.getElementById('url-input').value = "https://www.bbc.co.uk/news"

    onUrlChange();

    const output = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `

    expect(document.body.innerHTML).toEqual(output);
  })

  test("Should disable submit button when URL is invalid", ()=> {
    document.body.innerHTML = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input disabled type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `;

    document.getElementById('url-input').value = "blablabla"

    onUrlChange();

    const output = `
    <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
      <span class="error-span" id="url-error"></span>
      <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
      <input disabled="" type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
    </form>
    `

    expect(document.body.innerHTML).toEqual(output);
  })
})

// tabClickHandler
describe("Toggles form to display URL / text", ()=> {
  test("Should show URL form and change tab visuals when URL tab is clicked", ()=> {
    document.body.innerHTML = `
    <section>
      <div class="content">
        <div class="options-bar">
            <div id="url-tab" class="option-tab" onclick="return Client.tabClickHandler()">URL</div>
            <div id="text-tab" class="option-tab active-tab" onclick="return Client.tabClickHandler()">Paste text</div>
        </div>
          <form id="url-form" class="hidden" onsubmit="return Client.handleUrlSubmit(event)">
              <span class="error-span" id="url-error"></span>
              <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
              <input disabled type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
        </form>
        <form id="text-form" onsubmit="" class="">
            <span class="error-span" id="text-error"></span>
            <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100">
            <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
            <input disabled type="submit" id="text-submit" name="text-submit" value="Analyse" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
        </form>
        <div id="loading-spinner" class="lds-ring hidden"><div></div><div></div><div></div><div></div></div>
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
      </div>
    </section>
    `

    tabClickHandler();

    const output = `
    <section>
      <div class="content">
        <div class="options-bar">
            <div id="url-tab" class="option-tab active-tab" onclick="return Client.tabClickHandler()">URL</div>
            <div id="text-tab" class="option-tab" onclick="return Client.tabClickHandler()">Paste text</div>
        </div>
          <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
              <span class="error-span" id="url-error"></span>
              <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
              <input disabled="" type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
        </form>
        <form id="text-form" onsubmit="" class="hidden">
            <span class="error-span" id="text-error"></span>
            <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100">
            <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
            <input disabled="" type="submit" id="text-submit" name="text-submit" value="Analyse" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
        </form>
        <div id="loading-spinner" class="lds-ring hidden"><div></div><div></div><div></div><div></div></div>
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
      </div>
    </section>
    `;
    expect(document.body.innerHTML).toEqual(output);
  })

  test("Should show text form and change tab visuals when text tab is clicked", ()=> {
    document.body.innerHTML = `
    <section>
      <div class="content">
        <div class="options-bar">
            <div id="url-tab" class="option-tab active-tab" onclick="return Client.tabClickHandler()">URL</div>
            <div id="text-tab" class="option-tab" onclick="return Client.tabClickHandler()">Paste text</div>
        </div>
          <form id="url-form" class="" onsubmit="return Client.handleUrlSubmit(event)">
              <span class="error-span" id="url-error"></span>
              <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
              <input disabled type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
        </form>
        <form id="text-form" onsubmit="" class="hidden">
            <span class="error-span" id="text-error"></span>
            <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100">
            <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
            <input disabled type="submit" id="text-submit" name="text-submit" value="Analyse" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
        </form>
        <div id="loading-spinner" class="lds-ring hidden"><div></div><div></div><div></div><div></div></div>
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
      </div>
    </section>
    `

    tabClickHandler();

    const output = `
    <section>
      <div class="content">
        <div class="options-bar">
            <div id="url-tab" class="option-tab" onclick="return Client.tabClickHandler()">URL</div>
            <div id="text-tab" class="option-tab active-tab" onclick="return Client.tabClickHandler()">Paste text</div>
        </div>
          <form id="url-form" class="hidden" onsubmit="return Client.handleUrlSubmit(event)">
              <span class="error-span" id="url-error"></span>
              <input type="text" id="url-input" name="url-input" value="" placeholder="Enter URL" autofocus="autofocus" onblur="return Client.onUrlBlur()" onchange="return Client.onUrlChange()">
              <input disabled="" type="submit" id="url-submit" name="url-submit" value="Analyse" onclick="return Client.handleUrlSubmit(event)" onsubmit="return Client.handleUrlSubmit(event)">
        </form>
        <form id="text-form" onsubmit="" class="">
            <span class="error-span" id="text-error"></span>
            <input type="text" id="title-input" name="title-input" value="" placeholder="Enter article title" autofocus="autofocus" onblur="" onchange="return Client.onTextChange(event)" maxlength="100">
            <textarea id="article-text" rows="4" cols="50" placeholder="Paste article here" onchange="return Client.onTextChange(event)" maxlength="1000"></textarea>
            <input disabled="" type="submit" id="text-submit" name="text-submit" value="Analyse" onclick="return Client.handleTextSubmit(event)" onsubmit="return Client.handleTextSubmit(event)">
        </form>
        <div id="loading-spinner" class="lds-ring hidden"><div></div><div></div><div></div><div></div></div>
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
      </div>
    </section>
    `;
    expect(document.body.innerHTML).toEqual(output);
  })
})