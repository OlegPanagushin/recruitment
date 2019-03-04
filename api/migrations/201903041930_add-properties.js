// table
const tableProperties = 'properties';
// fields
const fieldLandSurface = 'land_surface';
const fieldNumberOfRooms = 'number_of_rooms';
const fieldNumberOfParkings = 'number_of_parkings';

module.exports.up = async db => {
  console.log(
    `Add fields: ${fieldLandSurface}, ${fieldNumberOfRooms}, ${fieldNumberOfParkings} to ${tableProperties} table`,
  );

  await db.schema.alterTable(tableProperties, table => {
    table.float(fieldLandSurface);
    table.float(fieldNumberOfRooms);
    table.integer(fieldNumberOfParkings);
  });
};

module.exports.down = async db => {
  console.log(
    `Remove fields: ${fieldLandSurface}, ${fieldNumberOfRooms}, ${fieldNumberOfParkings} from ${tableProperties} table`,
  );

  await db.schema.alterTable(tableProperties, table => {
    table.dropColumn(fieldLandSurface);
    table.dropColumn(fieldNumberOfRooms);
    table.dropColumn(fieldNumberOfParkings);
  });
};

module.exports.config = { transaction: true };
