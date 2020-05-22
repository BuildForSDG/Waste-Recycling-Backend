const {
  MONGO_USERNAME = 'team-042',
  MONGO_PASSWORD = 'ieczN9USx2nf-3T',
  MONGO_HOST = 'ds261450.mlab.com',
  MONGO_PORT = 61450,
  MONGO_DATABASE = 'waste-recycling'
} = process.env;

export const MONGO_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD
)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

export const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
