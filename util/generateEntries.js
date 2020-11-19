const entry = require("../models/entry-manage");
const tag = require("../models/tag-manage");
const Tag = require("../models/Tag");
const Entry = require("../models/Entry");
const faker = require("faker");
const mongoose = require("mongoose");

const config = {
  dbConfig: {
    name: "diary-test",
    port: "27017",
    host: "localhost",
  },
};

const tagData = [
  { tagName: "sports", color: "green", description: "any physical activity" },
  {
    tagName: "table_tennis",
    color: "red",
    description: "table tennis",
    tagGroup: "sports",
  },
  {
    tagName: "movie",
    color: "yellow",
    description: "watched a movie",
    tagGroup: "leisure",
  },
  {
    tagName: "sick",
    color: "purple",
    description: "felt sick that day",
  },
];

let date = new Date("2019-09-01T00:00:00.000Z");
let endDate = new Date("2019-10-01T00:00:00.000Z");

let wakeUpStart = new Date("2019-10-01T06:00:00.000Z");
let wakeUpEnd = new Date("2019-10-01T10:00:00.000Z");
let def = new Date("2019-10-01T00:00:00.000Z");

let wentToSleepStart = new Date("2019-10-01T21:00:00.000Z");
let wentToSleepEnd = new Date("2019-10-01T23:59:00.000Z");

function genRandInt() {
  return Math.floor(Math.random() * 10) + 1;
}

function randomDate(date, start, end) {
  let newDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  let dateInterval = newDate.getTime() - def.getTime();
  let returnDate = new Date();
  returnDate.setTime(date.getTime() + dateInterval);
  return returnDate;
}

async function generateData() {
  try {
    //Create tags in database
    for (let i = 0; i < tagData.length; i++) {
      await tag.createTag(tagData[i]);
    }

    //extract the _id's of generated tags
    let tagIDs = await Tag.find({}).select("_id").lean();

    //Create entries in database
    while (date.getTime() < endDate.getTime()) {
      let data = {
        date,
        notes: faker.lorem.sentence(),
        wokeUp: randomDate(date, wakeUpStart, wakeUpEnd),
        wentToSleep: randomDate(date, wentToSleepStart, wentToSleepEnd),
        energy: genRandInt(),
        happiness: genRandInt(),
        motivation: genRandInt(),
        tags: [
          {
            _id: tagIDs[Math.floor(Math.random() * 4)]._id,
            hours_spent: 2,
          },
        ],
      };
      await entry.createEntry(data);
      date.setDate(date.getDate() + 1);
    }
  } catch (err) {
    console.log(err);
  }
}

const { host, port, name } = config.dbConfig;
const dbUrl = `mongodb://${host}:${port}/${name}`;
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(dbUrl, dbConfig).then(
  async () => {
    await Tag.deleteMany({});
    await Entry.deleteMany({});
    await generateData();
    mongoose.connection.close();
  },
  (err) => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  }
);
