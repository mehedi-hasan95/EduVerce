"use server";
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

export const onCreateNewGroupSubscription = async (
  groupId: string,
  price: number
) => {
  try {
    const subscription = await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        subscription: {
          create: {
            price,
          },
        },
      },
    });

    if (subscription) {
      return { status: 200, message: "Subscription created" };
    }
  } catch (error) {
    return { status: 500, message: "Internal server error" };
  }
};

export const onActivateSubscription = async (id: string) => {
  try {
    const status = await db.subscription.findUnique({
      where: {
        id,
      },
      select: {
        active: true,
      },
    });
    if (status) {
      if (status.active) {
        return { status: 200, message: "Plan already active" };
      }
      if (!status.active) {
        const currentActive = await db.subscription.findFirst({
          where: {
            active: true,
          },
          select: {
            id: true,
          },
        });
        if (currentActive && currentActive.id) {
          const deactivate = await db.subscription.update({
            where: {
              id: currentActive.id,
            },
            data: {
              active: false,
            },
          });
          if (deactivate) {
            const newActive = await db.subscription.update({
              where: {
                id,
              },
              data: {
                active: true,
              },
            });
            if (newActive) {
              return {
                status: 200,
                message: "New plan activated",
              };
            }
          }
        } else {
          const newActive = await db.subscription.update({
            where: {
              id,
            },
            data: {
              active: true,
            },
          });

          if (newActive) {
            return {
              status: 200,
              message: "New plan activated",
            };
          }
        }
      }
    }
  } catch (error) {
    return { status: 400, message: "Oops something went wrong" };
  }
};
