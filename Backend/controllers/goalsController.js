const Goals = require("../models").goals;
const sequelize = require("sequelize");
const { Op } = require("sequelize");

async function createGoals(goal, user_id, status, date) {
  return Goals.create({goal,user_id,status,date});
}
async function getAllGoals() {
  return Goals.findAll();
}

async function getAllGoalsByDate(date, year) {
  return Goals.findAll({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "date") =', date),
        sequelize.fn('EXTRACT(YEAR from "date") =', year),
      ],
    },
  });
}

async function updategoal({ id, goal,status }) {
  console.log(id,goal,status);
  return Goals.update(
    { goal: goal ,status: status},
    {
      where: {
        id: id,
      },
    }
  );
}
async function updatestatus({ id, status }) {
  return Goals.update(
    { status: status },
    {
      where: {
        id: id,
      },
    }
  );
}
async function editGoal({ id, goal }) {
  return Goals.update(
    { goal: goal },
    {
      where: {
        id: id,
      },
    }
  );
}

async function getGoalsByEmployeeId(user_id) {
  return Goals.findAll({ where: { user_id } });
}

async function getGoalsByEmployeeIdDate(user_id, month, year) {
  return Goals.findAll({
    where: {
      [Op.and]: [
        { user_id },
        sequelize.fn('EXTRACT(MONTH from "date") =', month),
        sequelize.fn('EXTRACT(YEAR from "date") =', year),
      ],
    },
  });
}
async function deleteGoal(id) {
  return Goals.destroy({
    where: { id: id },
  });
}
module.exports = {
  createGoals,
  getAllGoals,
  updategoal,
  editGoal,
  updatestatus,
  getGoalsByEmployeeId,
  getGoalsByEmployeeIdDate,
  getAllGoalsByDate,
  deleteGoal,
};
