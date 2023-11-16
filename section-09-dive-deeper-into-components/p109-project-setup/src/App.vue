<template>
  <div>
    <TheHeader></TheHeader>
    <BadgeList></BadgeList>
    <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    ></user-info>
    <course-goals #default="slotProps">
      <h2>{{ slotProps.item }}</h2>
<!--      another-prop is automatically converted to camelCase by Vue-->
      <p>{{ slotProps['anotherProp'] }}</p>
    </course-goals>
  </div>
</template>

<script>
import BadgeList from "@/components/BadgeList.vue";
import TheHeader from "@/components/TheHeader.vue";
import UserInfo from "@/components/UserInfo.vue";
import CourseGoals from "@/components/CourseGoals.vue";

export default {
  components: {
    // TheHeader is shown white because it doesn't have `export default`
    TheHeader,
    BadgeList,
    UserInfo,
    CourseGoals
  },
  data() {
    return {
      activeUser: {
        name: 'Maximilian Schwarzmüller',
        description: 'Site owner and admin',
        role: 'admin',
      },
    };
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
