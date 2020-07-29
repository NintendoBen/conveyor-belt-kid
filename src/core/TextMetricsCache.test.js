import { TextMetricsCache } from "./TextMetricsCache";
import { fonts, words } from "./TestData";

// words...
const apple = "apple";
const banana = "banana";
const cat = "cat";
const dog = "dog";

// fonts...
const alpha = "alpha";
const beta = "beta";

// data...
const data = "data";

it("gets undefined from an empty cache", () => {
  const textMetricsCache = new TextMetricsCache();
  const textMetrics = textMetricsCache.getCachedEntry(apple, alpha);

  expect(textMetrics).toBe(undefined);
});

it("gets a cached item from the cache", () => {
  const textMetricsCache = new TextMetricsCache();
  textMetricsCache.setCachedEntry(apple, alpha, data);

  const textMetrics = textMetricsCache.getCachedEntry(apple, alpha);

  expect(textMetrics).toBe(data);
});

it("gets an undefined item from the cache", () => {
  const textMetricsCache = new TextMetricsCache();
  textMetricsCache.setCachedEntry(apple, alpha, data);

  const textMetrics = textMetricsCache.getCachedEntry(banana, alpha);

  expect(textMetrics).toBe(undefined);
});

it("getting an item from the cache moves it to the head of the cache", () => {
  const textMetricsCache = new TextMetricsCache();
  textMetricsCache.setCachedEntry(apple, alpha, "A");
  textMetricsCache.setCachedEntry(banana, alpha, "B");
  textMetricsCache.setCachedEntry(cat, alpha, "C");
  textMetricsCache.setCachedEntry(dog, alpha, "D");

  const textMetrics = textMetricsCache.getCachedEntry(banana, alpha);
  const dump = textMetricsCache.dump();

  expect(dump).toBe("B, D, C, A");
});

it("evicts the last item from the cache", () => {
  const textMetricsCache = new TextMetricsCache();
  textMetricsCache.setCachedEntry(apple, alpha, "A");
  textMetricsCache.setCachedEntry(banana, alpha, "B");
  textMetricsCache.setCachedEntry(cat, alpha, "C");
  textMetricsCache.setCachedEntry(dog, alpha, "D");

  const textMetrics = textMetricsCache.evictEntries(1);
  const dump = textMetricsCache.dump();

  expect(dump).toBe("D, C, B");
});

it("evicts the last 2 items from the cache", () => {
  const textMetricsCache = new TextMetricsCache();
  textMetricsCache.setCachedEntry(apple, alpha, "A");
  textMetricsCache.setCachedEntry(banana, alpha, "B");
  textMetricsCache.setCachedEntry(cat, alpha, "C");
  textMetricsCache.setCachedEntry(dog, alpha, "D");

  const textMetrics = textMetricsCache.evictEntries(2);
  const dump = textMetricsCache.dump();

  expect(dump).toBe("D, C");
});

it("evicts the last 2 items from the cache with separate evict calls", () => {
  const textMetricsCache = new TextMetricsCache();
  textMetricsCache.setCachedEntry(apple, alpha, "A");
  textMetricsCache.setCachedEntry(banana, alpha, "B");
  textMetricsCache.setCachedEntry(cat, alpha, "C");
  textMetricsCache.setCachedEntry(dog, alpha, "D");

  const textMetrics = textMetricsCache.evictEntries(1);
  const textMetrics2 = textMetricsCache.evictEntries(1);

  const dump = textMetricsCache.dump();

  expect(dump).toBe("D, C");
});

it("evicts all the items from the cache", () => {
  const textMetricsCache = new TextMetricsCache();
  textMetricsCache.setCachedEntry(apple, alpha, "A");
  textMetricsCache.setCachedEntry(banana, alpha, "B");
  textMetricsCache.setCachedEntry(cat, alpha, "C");
  textMetricsCache.setCachedEntry(dog, alpha, "D");

  const textMetrics = textMetricsCache.evictEntries(4);

  const dump = textMetricsCache.dump();

  expect(dump).toBe("");
});
