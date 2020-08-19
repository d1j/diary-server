https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

```javascript
describe("getData", function () {
  it("Data should be 101 indices long", async function () {
    var data = await getData(testData);
    expect(data.length).to.equal(101);
  });
});
```
