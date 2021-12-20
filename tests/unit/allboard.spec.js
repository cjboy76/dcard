import { shallowMount } from "@vue/test-utils";
import AllBoard from "@/views/AllBoard.vue";

test("display test", () => {
  const wrapper = shallowMount(AllBoard);
  expect(wrapper.text()).toContain("所有看板");
});
