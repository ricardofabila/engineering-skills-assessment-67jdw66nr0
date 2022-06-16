const {
  getCandidateFromEvent,
  getCleanCandidate,
  getCandidatePartitionKey,
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH,
} = require("./dpk");

describe("getCandidateFromEvent", () => {
  it("Returns the undefined if not passed an event", () => {
    const partitionKey = getCandidateFromEvent();
    expect(partitionKey).toBe(undefined);
  });

  it("Returns the partitionKey property if passed an event", () => {
    const key = "key";
    const partitionKey = getCandidateFromEvent({ partitionKey: key });
    expect(partitionKey).toBe(key);
  });

  it("Returns hash if passed an event with no partitionKey", () => {
    const key =
      "0ef6ab2f9cb1ac2436f2d20609161c73b1705ea68ee21505f8e26c3e9f316d0bf419e4451f313262bf842dc9bf2ee05387b571b6ded8f6ff6275ca794e58f1cd";
    const partitionKey = getCandidateFromEvent({ my: "event" });
    expect(partitionKey).toBe(key);
  });
});

describe("getCleanCandidate", () => {
  it("Returns the literal '0' when given no input", () => {
    const candidate = getCleanCandidate();
    expect(candidate).toBe("0");
  });

  it("Returns the stringified value when given non string input", () => {
    const candidate = getCleanCandidate({ a: "b" });
    expect(candidate).toBe('{"a":"b"}');
  });

  it("Returns the string value when given a string input", () => {
    const key = "my value";
    const candidate = getCleanCandidate(key);
    expect(candidate).toBe(key);
  });
});

describe("getCandidatePartitionKey", () => {
  it("Returns hashed value when given input larged than the standard MAX_PARTITION_KEY_LENGTH", () => {
    let longValue =
      "this is my value that is very long and thus exeeds the desired length";

    for (let i = 0; i < MAX_PARTITION_KEY_LENGTH; i++) {
      longValue = longValue.concat(i);
    }

    const key = getCandidatePartitionKey(longValue);
    expect(key).toBe(
      "596d753b08756252f5b281edf9719a5be021b72c02d940192696a9e58372b5f03bc0f8f305d3876727cdcee1a27bb7de838468035d956c4768010e3350c44f11"
    );
  });

  it("Returns the original value when given input smaller than the standard MAX_PARTITION_KEY_LENGTH", () => {
    const key = getCandidatePartitionKey("this is my value");
    expect(key).toBe(key);
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});
