<script setup lang="ts">
import { UiPreloader } from "@petr-ptacek/vue-core";

import { shallowRef }  from "#imports";
import { ExampleFrame } from "~/components";

const preloaderVisible = shallowRef(false);
</script>

<template>
  <ExampleFrame class="h-full" title="UiPreloader">
    <div class="flex flex-col gap-2">
      <div>
        <USwitch label="show/hide" v-model="preloaderVisible" />
      </div>

      <div class="p-2 relative">
        <p class="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus dolorum earum exercitationem
                        in magnam, neque rem saepe. Accusamus amet animi dolores doloribus enim fugit harum inventore,
                        nostrum, nulla quis, ratione repudiandae similique unde. Blanditiis dicta dignissimos eaque
                        impedit minima quam suscipit vitae? Commodi cumque eveniet ex id impedit labore, sint.</p>
        <p class="para">Aliquam hic molestiae nostrum sapiente tempora. Ad atque beatae dolor dolorem illum impedit
                        ipsum
                        quaerat ratione repellendus voluptas. Adipisci aspernatur consectetur laborum officiis! Aliquid
                        amet, aspernatur autem beatae cumque fugiat ipsum laboriosam necessitatibus optio quia tenetur
                        ut?
                        A aperiam, aut culpa deserunt ea odio praesentium quos, repellat rerum soluta voluptate.</p>
        <p class="para">Aut deserunt dolorum exercitationem officia quae sapiente ullam veritatis. Blanditiis ex
                        explicabo
                        possimus. Consequatur doloribus earum magni nam nostrum sint temporibus? Assumenda, consectetur
                        delectus deleniti, doloremque et eum excepturi harum maxime minus nemo nihil nisi non quas,
                        quidem
                        saepe similique vero voluptas! Accusamus cumque, enim? Ea illum natus repudiandae
                        voluptates.</p>
        <p class="para">Ad, atque deserunt dignissimos dolorem eaque facere impedit laborum perferendis quas quibusdam
                        reiciendis, ut. Consectetur dolor, ea fugiat hic illo inventore laboriosam magni minima nam
                        numquam provident quaerat qui, quos sit tempora veniam veritatis. Accusantium, at autem
                        consequatur cum debitis ex excepturi exercitationem fugiat magni quidem quisquam, recusandae
                        repellendus voluptate.</p>
        <p class="para">Temporibus, ut, voluptatem. A cumque deleniti eligendi explicabo ipsa minima nihil, ullam
                        voluptate! Aspernatur aut blanditiis commodi cum delectus dolor dolorem ducimus eligendi, eum,
                        facere fuga fugit iste iure maiores minus necessitatibus nemo nobis numquam odit repellendus
                        repudiandae saepe sed vel. Eius fuga nulla optio porro quod vitae voluptatibus voluptatum!</p>
        <p class="para">Culpa odit repellat velit. Ab amet corporis debitis doloremque eum, fugiat id iure natus
                        necessitatibus nemo obcaecati odit quam quo quod reprehenderit sit, vel. Accusamus at, delectus
                        dicta dolor dolore doloribus in inventore itaque laboriosam laudantium molestiae mollitia optio
                        provident quam ratione reprehenderit sequi veritatis. Minus officia qui quod voluptates.</p>
        <UiPreloader :ui="{ message: `text-2xl!`, spinner: `size-18!` }" :visible="preloaderVisible" />
      </div>

    </div>
  </ExampleFrame>
</template>
