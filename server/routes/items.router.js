const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//Get
router.get("/", (req, res) => {
  console.log("GET request made to /items/");
  const sqlText = `SELECT * FROM "items" ORDER By "name" ASC;`;

  pool
    .query(sqlText)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("Error in GET request", err);
      res.sendStatus(500);
    });
});
//post
router.post("/", (req, res) => {
  console.log(req.params);
  const item = req.body;
  console.log("Adding item", item);
  let sqlText = `INSERT INTO "items" ("name", "quantity", "unit")
                    VALUES($1, $2, $3)`;

  if (!item.name || !item.quantity) {
    res.sendStatus(400);
    return;
  }
  pool
    .query(sqlText, [item.name, item.quantity, item.unit])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error adding new item", error);
      res.sendStatus(500);
    });
});

//put
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const sqlText = `UPDATE "items" SET "completed" = 'true' WHERE "id" = $1`;

  pool
    .query(sqlText, [id])
    .then((response) => {
      console.log(`Updated item with id ${id} as purchased`);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
    });
});

//delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sqlText = `DELETE FROM "items" WHERE "id" = $1;`;

  pool
    .query(sqlText, [id])
    .then((result) => {
      console.log("success deleting", result);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in delete request", err);
      res.sendStatus(500);
    });
});
// Reset purchased status for all items
router.put('/reset', (req, res) => {
  const sqlText = `UPDATE "items" SET "completed" = 'false';`;

  pool
      .query(sqlText)
      .then((response) => {
          console.log('All items reset successfully');
          res.sendStatus(204);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
});

// Clear all items from the list
router.delete('/clear', (req, res) => {
  const sqlText = `DELETE FROM "items";`;

  pool
      .query(sqlText)
      .then((result) => {
          console.log('All items deleted successfully');
          res.sendStatus(204);
      })
      .catch((err) => {
          console.log('Error in clear request', err);
          res.sendStatus(500);
      });
});
module.exports = router;
