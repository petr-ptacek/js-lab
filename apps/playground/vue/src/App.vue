<script setup lang="ts">
import { UiResizeContainer, UiResizeContainerSection } from "@petr-ptacek/vue-ui";
import { shallowRef } from "vue";

const t = shallowRef(500);
</script>

<template>
  <div class="bg-green-200 h-screen w-screen">
    <UiResizeContainer v-model="t">
      <template #alpha>
        <UiResizeContainerSection class="bg-red-400">
          <p class="p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad aspernatur at, aut consectetur
                         debitis
                         delectus eos eveniet expedita fuga hic ipsa ipsum iure magnam magni molestiae, nam neque nulla
                         numquam
                         obcaecati odio omnis perspiciatis quaerat quod, quos rerum sit tempore temporibus unde
                         voluptate!
                         Consectetur quos recusandae repellat vitae. Aliquid autem consequuntur delectus dicta illo
                         illum iusto
                         natus nihil non odit, officiis porro, quo quod repellendus similique veritatis vero. Adipisci
                         doloribus
                         eligendi esse facilis laboriosam non quia repellendus saepe! Ab culpa, cupiditate enim
                         excepturi fuga harum
                         impedit inventore ipsam mollitia nostrum numquam officiis perspiciatis rem repudiandae sint sit
                         sunt
                         voluptate!</p>
          <p class="p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad aspernatur at, aut consectetur
                         debitis
                         delectus eos eveniet expedita fuga hic ipsa ipsum iure magnam magni molestiae, nam neque nulla
                         numquam
                         obcaecati odio omnis perspiciatis quaerat quod, quos rerum sit tempore temporibus unde
                         voluptate!
                         Consectetur quos recusandae repellat vitae. Aliquid autem consequuntur delectus dicta illo
                         illum iusto
                         natus nihil non odit, officiis porro, quo quod repellendus similique veritatis vero. Adipisci
                         doloribus
                         eligendi esse facilis laboriosam non quia repellendus saepe! Ab culpa, cupiditate enim
                         excepturi fuga harum
                         impedit inventore ipsam mollitia nostrum numquam officiis perspiciatis rem repudiandae sint sit
                         sunt
                         voluptate!</p>
          <p class="p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad aspernatur at, aut consectetur
                         debitis
                         delectus eos eveniet expedita fuga hic ipsa ipsum iure magnam magni molestiae, nam neque nulla
                         numquam
                         obcaecati odio omnis perspiciatis quaerat quod, quos rerum sit tempore temporibus unde
                         voluptate!
                         Consectetur quos recusandae repellat vitae. Aliquid autem consequuntur delectus dicta illo
                         illum iusto
                         natus nihil non odit, officiis porro, quo quod repellendus similique veritatis vero. Adipisci
                         doloribus
                         eligendi esse facilis laboriosam non quia repellendus saepe! Ab culpa, cupiditate enim
                         excepturi fuga harum
                         impedit inventore ipsam mollitia nostrum numquam officiis perspiciatis rem repudiandae sint sit
                         sunt
                         voluptate!</p>
          <p class="p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad aspernatur at, aut consectetur
                         debitis
                         delectus eos eveniet expedita fuga hic ipsa ipsum iure magnam magni molestiae, nam neque nulla
                         numquam
                         obcaecati odio omnis perspiciatis quaerat quod, quos rerum sit tempore temporibus unde
                         voluptate!
                         Consectetur quos recusandae repellat vitae. Aliquid autem consequuntur delectus dicta illo
                         illum iusto
                         natus nihil non odit, officiis porro, quo quod repellendus similique veritatis vero. Adipisci
                         doloribus
                         eligendi esse facilis laboriosam non quia repellendus saepe! Ab culpa, cupiditate enim
                         excepturi fuga harum
                         impedit inventore ipsam mollitia nostrum numquam officiis perspiciatis rem repudiandae sint sit
                         sunt
                         voluptate!</p>
        </UiResizeContainerSection>
      </template>
      <template #beta>
        <UiResizeContainerSection class="bg-blue-400">

        </UiResizeContainerSection>
      </template>
    </UiResizeContainer>
  </div>
</template>
