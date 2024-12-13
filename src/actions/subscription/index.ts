import db from "@/lib/db";

export const onGetActiveSubscription = async (groupId: string) => {
  try {
    const subscription = await db.subscription.findFirst({
      where: {
        groupId: groupId,
        active: true,
      },
    });

    if (subscription) {
      return { status: 200, subscription };
    }
  } catch (error) {
    return { status: 404 };
  }
};
