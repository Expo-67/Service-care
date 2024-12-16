import Service from "../models/Service.js";
import Reminder from "../models/Reminder.js";

export const logService = async (req, res) => {
  const service = new Service({
    ...req.body,
    user: req.user._id,
  });

  try {
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getServiceRecords = async (req, res) => {
  try {
    const services = await Service.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.send(services);
  } catch (error) {
    res.status(500).send();
  }
};

export const createReminder = async (req, res) => {
  const reminder = new Reminder({
    ...req.body,
    user: req.user._id,
  });

  try {
    await reminder.save();
    res.status(201).send(reminder);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id }).sort({
      date: 1,
    });
    res.send(reminders);
  } catch (error) {
    res.status(500).send();
  }
};

export const getReports = async (req, res) => {
  try {
    const services = await Service.find({ user: req.user._id });
    const totalCost = services.reduce(
      (sum, service) => sum + (service.cost || 0),
      0
    );
    const serviceCount = services.length;
    res.send({ totalCost, serviceCount });
  } catch (error) {
    res.status(500).send();
  }
};

export const getAiSuggestions = async (req, res) => {
  try {
    const suggestions = [
      "Consider changing your oil every 5,000 miles or 6 months, whichever comes first.",
      "Rotate your tires every 6,000-8,000 miles to ensure even wear.",
      "Check your brake pads and replace them if they're worn down to less than 1/4 inch thick.",
    ];
    res.send({ suggestions });
  } catch (error) {
    res.status(500).send();
  }
};
