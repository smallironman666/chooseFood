/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const usersCol = app.findCollectionByNameOrId("users");

  const collection = new Collection({
    type: "base",
    name: "foods",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        max: 100,
      },
      {
        name: "owner",
        type: "relation",
        required: true,
        maxSelect: 1,
        cascadeDelete: true,
        collectionId: usersCol.id,
      },
    ],
    indexes: [
      "CREATE INDEX `idx_foods_owner` ON `foods` (`owner`)",
      "CREATE UNIQUE INDEX `idx_foods_owner_name` ON `foods` (`owner`, `name`)",
    ],
    listRule:   "owner = @request.auth.id",
    viewRule:   "owner = @request.auth.id",
    createRule: "@request.auth.id != \"\" && owner = @request.auth.id",
    updateRule: "owner = @request.auth.id",
    deleteRule: "owner = @request.auth.id",
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("foods");
  return app.delete(collection);
});
