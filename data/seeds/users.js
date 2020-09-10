exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("users").insert([
    { username: "sam" },
    { username: "frodo" },
    { username: "pippin" },
    { username: "merry" },
  ]);
};
