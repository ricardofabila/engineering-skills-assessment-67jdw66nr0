const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;

const getCandidateFromEvent = (event) => {
  if (!event) {
    return;
  }

  if (event?.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const getCleanCandidate = (candidate) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (candidate) {
    if (typeof candidate === "string") {
      return candidate;
    } else {
      return JSON.stringify(candidate);
    }
  }

  return TRIVIAL_PARTITION_KEY;
};

const getCandidatePartitionKey = (candidate) => {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};

const deterministicPartitionKey = (event) => {
  let candidate = getCandidateFromEvent(event);
  candidate = getCleanCandidate(candidate);
  return getCandidatePartitionKey(candidate);
};

module.exports = {
  getCandidateFromEvent,
  getCleanCandidate,
  getCandidatePartitionKey,
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH,
};
