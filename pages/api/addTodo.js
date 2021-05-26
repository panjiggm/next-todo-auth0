import { table } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function addTodo(req, res) {
  const { user } = await getSession(req);

  const { description } = req.body;

  try {
    const createdRecords = await table.create([
      { fields: { description, userId: user.sub } },
    ]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong!" });
  }
});
