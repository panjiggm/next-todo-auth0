import { table } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

const deleteTodo = async (req, res) => {
  const { user } = await getSession(req);
  const { id } = req.body;

  try {
    const existingRecord = await table.find(id);
    if (!existingRecord || user.sub !== existingRecord.fields.userId) {
      res.statusCode = 404;
      res.json({ msg: "Record not found!" });
    } else {
      const deletedRecords = await table.destroy([id]);
      res.statusCode = 200;
      res.json(deletedRecords);
    }
  } catch (error) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong!" });
  }
};

export default withApiAuthRequired(deleteTodo);
