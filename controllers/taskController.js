const usersSchema = require("../DB/model/usersSchema");

const getAllUsers = async (req, res) => {
  try {
    const result = await usersSchema.find({ email: req.user.email });

    if (result) return res.status(201).json({ data: result[0] });
    else
      return res
        .status(500)
        .json({ message: "Server error occures! User fetching failed!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occures!", error });
  }
};

const getTask = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(usersSchema)
    const result = await usersSchema.find({ email });
    // console.log(result)
    if (await result[0]) return res.status(201).json({ data: result[0] });
    else return res.status(500).json({ message: "Server error occures!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occures!", error });
  }
};

const postTask = async (req, res) => {
  try {
    const { title, desc, priority, status, deadline } = req.body;
    // console.log("REQ BODY: ", req.body)

    const taskInfo = { title, desc, priority, status, deadline };
    const user = await usersSchema.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ message: "User not found!" });

    user.tasks.push(taskInfo);
    const result = await user.save();

    if (result)
      return res.status(201).json({ message: "Task is added successfully!" });
    else return res.status(500).json({ message: "Server error occures!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error occures!", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title, desc, priority, deadline } = req.body;
    console.log("RES BODY PATCH", req.body);
    const result = await usersSchema.updateOne(
      { email: req.user.email, "tasks._id": id },
      {
        $set: {
          "tasks.$.status": status,
          "tasks.$.title": title,
          "tasks.$.desc": desc,
          "tasks.$.priority": priority,
          "tasks.$.deadline": deadline,
        },
      },
      { return: true }
    );

    // console.log(id)

    if (result.acknowledged) {
      const data = await usersSchema.find({
        email: req.user.email,
        "tasks._id": id,
      });
      return res.status(201).json({ data, message: "Task is updated!" });
    } else return res.status(500).json({ message: "Server error occures!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occures!", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID", id);

    const user = await usersSchema.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ message: "User not found!" });

    let userTasks = user.tasks.filter((task) => task._id != id);
    console.log(userTasks.length);
    const result = await usersSchema.updateOne(
      { email: req.user.email, "tasks._id": id },
      { $set: { tasks: userTasks } },
      { return: true }
    );

    if (result.acknowledged) {
      return res.status(201).json({ result, message: "Task is deleted!" });
    } else return res.status(500).json({ message: "Server error occures!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occures!", error });
  }
};

const getTaskbyId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID", id);

    const user = await usersSchema.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ message: "User not found!" });

    let userTasks = user.tasks.filter((task) => task._id == id);

    if (userTasks) {
      return res
        .status(201)
        .json({ result: userTasks[0], message: "Task found!" });
    } else return res.status(500).json({ message: "Task not found! Check Id again!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error occures!", error });
  }
};

module.exports = {
  getAllUsers,
  getTask,
  postTask,
  updateTask,
  deleteTask,
  getTaskbyId,
};
