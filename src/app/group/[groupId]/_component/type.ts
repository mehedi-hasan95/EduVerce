export interface IGroupInfo {
  status: number;
  group:
    | {
        id: string;
        name: string;
        category: string;
        thumbnail: string | null;
        description: string | null;
        gallery: string[];
        jsonDescription: string | null;
        htmlDescription: string | null;
        privacy: boolean;
        active: boolean;
        createdAt: Date;
        userId: string;
        icon: string;
      }
    | undefined;
  groupOwner: boolean;
}

export interface IChannels {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  groupId: string | null;
}

export interface IGroups {
  status: number;
  groups:
    | {
        icon: string | null;
        id: string;
        name: string;
      }[]
    | undefined;
}

export interface IUserGroups {
  status: number;
  groups:
    | {
        icon: string | null;
        id: string;
        name: string;
        channel: { id: string }[];
      }[]
    | undefined;
}
