<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form></coach-form>
    </base-card>
  </section>
</template>
<script>
import CoachForm from "@/pages/coaches/CoachForm.vue";
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {
    BaseCard,
    CoachForm
  }
}
</script>