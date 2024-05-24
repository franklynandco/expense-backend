exports.sendNotification = (req, res) => {
    const { userId, message } = req.body;
  
    // Mock implementation of sending a notification
    console.log(`Sending notification to user ${userId}: ${message}`);
    res.status(200).json({ message: 'Notification sent' });
  };
  