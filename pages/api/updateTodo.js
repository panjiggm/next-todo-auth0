import { table } from "./utils/Airtable";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const updateTodo = async (req, res) => {
  const { user } = await getSession(req);
  const { id, fields } = req.body;

  try {
    const existingRecord = await table.find(id);
    if (!existingRecord || user.sub !== existingRecord.fields.userId) {
      res.statusCode = 404;
      res.json({ msg: "Record not found!" });
    } else {
      const newFields = { ...fields, userId: user.sub };
      const updatedRecord = await table.update([{ id, fields: newFields }]);
      res.statusCode = 200;
      res.json(updatedRecord);
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong!" });
  }
};

export default withApiAuthRequired(updateTodo);
