# Group related

---

### Api: onCreateNewGroup(userId, values)

#### values received "{name: "Category name", category: "category type"}"

###### This is a post api.

---

### Api: onGetGroupInfo(groupId). This is findUnique and Get api

#### Here use react-query. The queryKey is "group-info"

---

### Api: onGetUserGroups(userId). This is findUnique and Get api

#### Here use react-query. The queryKey is "group-user-info"

---

### Api: onGetGroupChannels(groupId). This is findMany and Get api

#### Here use react-query. The queryKey is "group-channels"

---

### Api: onGetGroupSubscriptions(groupId). This is findMany and Get api

#### Here use react-query. The queryKey is "group-subscriptions"

---

### Api: onGetAllGroupMembers(groupId). This is findMany and Get api

#### Here use react-query. The queryKey is "group-members"
