// budgetController.js

const Budget = require('../models/budgetModel');

exports.createBudget = (req, res) => {
  const budget = {
    user_id: req.userId,
    amount: req.body.amount,
    description: req.body.description
  };

  Budget.create(budget, (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Error creating budget' });
    } else {
      res.send(data);
    }
  });
};

exports.getAllBudgets = (req, res) => {
  Budget.findByUserId(req.userId, (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Error retrieving budgets' });
    } else {
      res.send(data);
    }
  });
};

exports.getBudgetById = (req, res) => {
  Budget.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ error: 'Budget not found' });
      } else {
        res.status(500).send({ error: 'Error retrieving budget' });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updateBudget = (req, res) => {
  const budget = {
    amount: req.body.amount,
    description: req.body.description
  };

  Budget.updateById(req.params.id, budget, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ error: 'Budget not found' });
      } else {
        res.status(500).send({ error: 'Error updating budget' });
      }
    } else {
      res.send(data);
    }
  });
};

exports.deleteBudget = (req, res) => {
  Budget.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ error: 'Budget not found' });
      } else {
        res.status(500).send({ error: 'Error deleting budget' });
      }
    } else {
      res.send({ message: 'Budget deleted successfully' });
    }
  });
};
