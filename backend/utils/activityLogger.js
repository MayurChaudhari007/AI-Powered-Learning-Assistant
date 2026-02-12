const Activity = require("../models/Activity");

/**
 * Helper function to log user actions to the Activity collection
 * @param {String} userId - ID of the user performing the action
 * @param {String} type - Category: 'document', 'quiz', 'flashcard', 'auth'
 * @param {String} action - Description: 'Uploaded', 'Attempted', 'Generated'
 * @param {String} targetName - The title of the resource (Doc title, Quiz title)
 * @param {String} targetId - (Optional) The MongoDB _id of the resource
 */
const logActivity = async (
  userId,
  type,
  action,
  targetName,
  targetId = null,
) => {
  try {
    // 1. Check for recent duplicate (last 10 seconds)
        const recentDuplicate = await Activity.findOne({
            user: userId,
            action,
            targetId,
            createdAt: { $gte: new Date(Date.now() - 5000) } // 10 seconds ago
        });

        if (recentDuplicate) return; // Skip if it's a duplicate
    // 1. Create the activity entry
    const activity = new Activity({
      user: userId,
      type,
      action,
      targetName,
      targetId,
    });

    // 2. Save to database
    await activity.save();

    // 3. Optional: Keep database lean by limiting total logs per user
    // This finds the user's logs, sorts by newest, and skips the first 50
    const oldLogs = await Activity.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(50);

    if (oldLogs.length > 0) {
      const idsToDelete = oldLogs.map((log) => log._id);
      await Activity.deleteMany({ _id: { $in: idsToDelete } });
    }
  } catch (err) {
    // We console.error but don't 'throw' so that the main app
    // doesn't crash if a log fails
    console.error("⚠️ Activity Logging Failed:", err.message);
  }
};

module.exports = logActivity;
