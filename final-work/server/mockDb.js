// Very small in-memory mock DB for dev/testing when MongoDB is unavailable.
// Not persistent. Keys: email and regNo are unique.

const users = [];
let idCounter = 1;

async function findOne(query) {
  // Support queries of the form: { $or: [{ email }, { regNo }] }
  if (query && query.$or && Array.isArray(query.$or)) {
    const found = users.find((u) =>
      query.$or.some((cond) => {
        const key = Object.keys(cond)[0];
        return u[key] === cond[key];
      }),
    );
    return found ? { ...found } : null;
  }

  // Fallback: match direct fields
  const key = Object.keys(query || {})[0];
  if (!key) return null;
  return users.find((u) => u[key] === query[key]) || null;
}

async function create(payload) {
  const newUser = {
    id: idCounter++,
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
  return { ...newUser };
}

module.exports = { findOne, create, __internal: { users } };
