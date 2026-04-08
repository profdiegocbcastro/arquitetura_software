/**
 * Resolver do domínio Chat.
 */
export function createChatResolver({ chatService, instanceName }) {
  return {
    Query: {
      chatMessagesByUser: async (_, { userId }) => {
        return chatService.listMessagesByUser(userId);
      },

      notificationsByUser: async (_, { userId }) => {
        return chatService.listNotificationsByUser(userId);
      },
    },

    Mutation: {
      sendMessageAndNotify: async (_, { fromUserId, toUserId, content }) => {
        const delivery = await chatService.sendMessageAndNotify({
          fromUserId,
          toUserId,
          content,
        });

        return {
          bffInstance: instanceName,
          message: delivery.message,
          notification: delivery.notification,
        };
      },
    },
  };
}
