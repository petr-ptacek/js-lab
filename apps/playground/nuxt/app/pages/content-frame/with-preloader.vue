<script setup lang="ts">
import { UiContentFrame, UiPreloader } from "@petr-ptacek/vue-core";

import { ref } from "#imports";
import { ExampleFrame } from "~/components";

const loaderVisible = ref(false);
</script>

<template>
  <ExampleFrame
    title="UiContentFrame"
    description="Example of UiContentFrame with preloader in content overlay slot."
    class="h-full"
  >
    <div class="flex h-full flex-col gap-4">
      <div>
        <USwitch v-model="loaderVisible" label="show/hide loader" />
      </div>

      <div class="flex-1 bg-red-50 min-h-0">
        <UiContentFrame
          :ui="{
            header: 'bg-blue-500 text-white',
            footer: 'bg-green-500 text-white',
          }"
        >
          <template #header>
            <div class="">header</div>
          </template>

          <template #contentOverlay>
            <UiPreloader :visible="loaderVisible" size="md" />
          </template>

          <div class="p-4">
            <p class="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque beatae earum eum,
                            fugit molestiae necessitatibus non praesentium sit ullam. Distinctio eligendi illo maxime,
                            mollitia numquam sed! Atque dolorum earum esse, facilis, harum, incidunt ipsam nisi possimus
                            quis quisquam quod rerum saepe sequi sint vel? Cumque in nemo nulla ut?</p>
            <p class="para">Consequatur, cumque ipsa laudantium maiores minus quaerat. Corporis ipsam laborum, mollitia
                            pariatur provident voluptatem. Aut cumque doloribus, eveniet excepturi id maxime nostrum
                            possimus quasi qui repellat repellendus sit sunt tenetur ullam voluptas. Adipisci amet,
                            commodi
                            in nesciunt nostrum nulla quo quos repellendus veritatis! Accusamus distinctio doloremque,
                            doloribus eum perferendis vero?</p>
            <p class="para">Architecto beatae eveniet explicabo, laudantium modi perferendis quaerat sapiente! Atque
                            consectetur culpa deleniti dignissimos, eveniet laboriosam magni maiores minus nobis
                            obcaecati
                            odio, officia pariatur rerum tempora, veniam. Aliquam aut corporis cumque dicta facilis fuga
                            in
                            ipsa ipsam molestias nam, nobis odio qui quidem, quo repellat saepe sapiente sit ullam
                            voluptatum.</p>
            <p class="para">Amet animi, deserunt dicta facilis fugit inventore ipsum iusto mollitia nam officiis
                            pariatur
                            perspiciatis porro possimus quaerat quam quas quasi quia quibusdam repellat reprehenderit
                            sequi
                            sit tempore vero, vitae voluptatibus? Adipisci, atque dolorem eaque, eius expedita fugit
                            modi
                            nobis perspiciatis possimus similique, soluta sunt ullam? Dicta dolor ipsam quis sunt.</p>
            <p class="para">Ad animi architecto ipsa, neque nesciunt officia perspiciatis temporibus ut voluptate! Autem
                            ducimus expedita ipsa iusto nesciunt non officia rem repellendus. A accusantium aliquam
                            aspernatur cumque debitis deleniti dignissimos distinctio, dolore doloribus ducimus ea
                            error,
                            est fugit illo illum in, ipsa maxime modi obcaecati odit perferendis rerum unde veniam
                            voluptas.</p>
            <p class="para">Aliquid at consectetur cum ducimus fugiat iste laudantium maiores perferendis porro quod!
                            Accusamus accusantium at aut cupiditate delectus error inventore iste, maxime nemo nisi
                            possimus
                            praesentium quas temporibus, vel voluptatem! Aperiam dolore enim sequi? Odio rerum sapiente
                            suscipit voluptate! Animi ducimus eum incidunt ipsam laboriosam laborum molestiae possimus
                            quisquam, reprehenderit.</p>
            <p class="para">Aperiam cupiditate eveniet impedit minima obcaecati praesentium, provident voluptates! Animi
                            aut
                            ea illum nesciunt omnis, pariatur possimus repellendus voluptatibus voluptatum! Dicta dolore
                            eaque ipsam modi molestias officia optio ratione rem suscipit totam. Aliquam dolores, ea eum
                            fuga id illum, itaque maiores nam natus nisi nostrum perferendis quaerat tempore voluptatem
                            voluptatibus?</p>
            <p class="para">Beatae dignissimos eos et fuga, hic itaque iure libero, maxime molestiae nam, nihil
                            perspiciatis
                            placeat quae quasi quidem repellat totam! Aspernatur at, beatae distinctio eaque et ex
                            expedita,
                            illum iusto labore maiores quam ratione, sequi voluptatibus. Dolore error molestiae natus
                            nisi
                            reiciendis rerum soluta. Esse itaque minima possimus sed voluptatem.</p>
            <p class="para">Asperiores consequuntur esse id ipsam numquam? Accusantium facere quod vero? Aliquam amet
                            assumenda aut commodi cumque deleniti doloribus ea eos et eveniet fugit inventore ipsam
                            magnam
                            minima modi natus, nisi non perspiciatis quaerat quibusdam quisquam sed suscipit tempora
                            vero,
                            voluptatem. Distinctio et iste optio sequi velit! Ab adipisci magni temporibus.</p>
            <p class="para">Aperiam facilis quisquam similique veniam. At enim excepturi laborum, quis reiciendis
                            temporibus
                            vel. Accusamus culpa dicta dolore fuga fugit ipsum libero qui rem tempore voluptatibus.
                            Accusamus amet asperiores aspernatur consequatur corporis deserunt ex facere harum in iusto
                            nesciunt nihil pariatur porro quidem, sequi suscipit tempora, tenetur, unde voluptas
                            voluptatem
                            voluptates?</p>
            <p class="para">Ab aperiam blanditiis consequuntur deserunt dolorem doloribus eaque error eveniet,
                            exercitationem hic illum in itaque nostrum obcaecati officia quaerat quas quidem recusandae
                            sapiente similique tempore tenetur voluptas, voluptatum! Accusamus, alias aperiam
                            consectetur
                            distinctio enim error, est facere illum ipsam ipsum labore numquam provident quas qui,
                            quisquam
                            quos rerum sit? Placeat.</p>
            <p class="para">Cupiditate, dolorum hic mollitia officiis quis tempore vero? Cumque dolor dolorem, enim eos
                            facilis id itaque quaerat quas quisquam veritatis. Architecto beatae deserunt explicabo illo
                            modi, molestiae sapiente tenetur. Aliquam, aperiam architecto cum ea enim eveniet expedita
                            fugiat impedit in laboriosam maxime mollitia nisi provident repudiandae sed vel vero
                            vitae?</p>
            <p class="para">Asperiores cumque et quia reiciendis sunt. Amet consequatur ducimus earum eveniet facere
                            itaque
                            maxime odio pariatur, quas quis ratione repellendus rerum tempora, tenetur ullam ut, vel
                            veniam
                            voluptatibus. Architecto, dolor earum iure nobis placeat porro veritatis vitae voluptate?
                            Accusantium beatae cum doloremque eligendi laboriosam molestias possimus praesentium unde
                            vel
                            voluptate?</p>
            <p class="para">Adipisci blanditiis consequuntur cumque necessitatibus nemo repellat! Delectus, dolor iusto
                            quis
                            quod suscipit tempora? Ab aspernatur blanditiis consectetur deserunt dolor dolorem earum
                            explicabo illum nobis nostrum, perferendis possimus repellendus similique temporibus,
                            veritatis
                            voluptas voluptatum. Ea enim est officia perferendis quibusdam! Ab atque deleniti dolores,
                            esse
                            incidunt omnis repellendus sequi suscipit!</p>
            <p class="para">A accusamus ad, architecto beatae commodi dolore earum et facere modi nihil optio quae
                            quibusdam
                            reprehenderit sequi sint ut vero. Ad autem, cupiditate delectus dolorem doloremque doloribus
                            dolorum enim, eos error facilis, inventore rem temporibus vitae voluptatem voluptatum.
                            Deserunt
                            dolor dolorum ducimus, magni nam sunt. Consequatur ea iure labore voluptates!</p>
            <p class="para">A aut inventore libero nobis! Amet consectetur, corporis ducimus error et fugit modi nam
                            nisi
                            odit optio praesentium quas quasi quia quibusdam, quo recusandae rerum sed ut velit
                            voluptate.
                            At dicta ea earum id iusto, libero magnam officia perferendis vero voluptatum. Blanditiis
                            culpa
                            deserunt illo quam quis sed ullam veritatis.</p>
            <p class="para">Autem eaque, ex excepturi impedit iure modi odit officia repudiandae vitae voluptates. A
                            aliquid
                            asperiores ea, illum laudantium odit quas similique suscipit! Ab ea nam nesciunt nihil
                            obcaecati
                            rem repudiandae voluptatem. Atque consectetur culpa debitis delectus dolorem eius esse fugit
                            labore molestiae neque nostrum officia porro quibusdam, totam velit voluptatum.</p>
            <p class="para">Ad consequuntur cum cupiditate debitis, dolore dolorem eos, eveniet illo itaque labore
                            laborum
                            natus necessitatibus odio odit omnis possimus rem, reprehenderit sequi similique tempora
                            unde
                            vitae voluptas voluptate! A atque beatae debitis dignissimos dolores esse ex explicabo illum
                            minima nemo nihil odio quae, quasi quis reprehenderit ullam veniam voluptas voluptates.</p>
            <p class="para">A aliquam aperiam architecto consectetur consequuntur debitis dolor doloribus ea esse est
                            eveniet explicabo ipsam iusto laboriosam nemo nesciunt, non odit officia officiis placeat
                            possimus praesentium quasi recusandae sapiente sed sequi similique sint soluta sunt totam
                            unde
                            voluptate voluptatem voluptates. Dolorem exercitationem id perferendis porro quam sit sunt
                            voluptas voluptates.</p>
            <p class="para">Consequatur dolorem dolores ducimus enim, est eum excepturi facilis ipsum laboriosam libero
                            possimus provident qui sed sint veniam. Ducimus numquam quo voluptatem. Amet, animi at autem
                            consectetur cumque deleniti dignissimos earum facilis illo ipsa iste iure iusto laboriosam
                            natus
                            neque nesciunt non nulla odit quo quod sapiente tempora ullam voluptas?</p>
          </div>

          <template #footer>
            <div class="">
              footer
            </div>
          </template>
        </UiContentFrame>
      </div>
    </div>
  </ExampleFrame>
</template>
