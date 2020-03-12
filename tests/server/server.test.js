const app = require('../../src/server/index');
const supertest = require('supertest');
const request = supertest(app);
const regeneratorRuntime = require("regenerator-runtime");

describe("Get request at /", ()=> {
  it("Should successfully respond when a GET request is made to / ", async done => {
    const res = await request.get('/');
  
    expect(res.status).toBe(200);
    done();
  });
})

describe("Get request at /url", ()=> {
  it("Should successfully respond when a GET request is made to /url ", async done => {
    const base = '/url?url=';
    const articleUrl = encodeURIComponent("https://www.bbc.co.uk/news/uk-england-berkshire-51856312");
    const testUrl = base + articleUrl;
    
    const res = await request.get(testUrl);
  
    expect(res.status).toBe(200);
    done();
  });
})

describe("Get request at /text", ()=> {
  it("Should successfully respond when a GET request is made to /text ", async done => {
    const base = '/text?title=';
    const title = encodeURIComponent('Michel Roux: French restaurateur and chef dies aged 79')
    const middle = '&text=';
    const text = encodeURIComponent(`
    French-born chef and restaurateur Michel Roux has died aged 79.
    He passed away on Wednesday night surrounded by his family at home
     in Bray, Berkshire, after battling a long-standing lung condition.
    Roux and his brother Albert made gastronomic history when their 
    London restaurant, La Gavroche, became the first three Michelin-starred
     restaurant in Britain in 1982.
    `)
    const testUrl = base + title + middle + text;

    const res = await request.get(testUrl);

    expect(res.status).toBe(200);
    done();
  });
})