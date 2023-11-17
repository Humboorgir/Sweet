import mongoose from "mongoose";

export default function mongoConnect() {
  if (!process.env.DATABASE_URL)
    return console.error("No database url was provided. [process.env.DATABASE_URL]");

  return mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Successfully connected to mongodb database");
  });
}
