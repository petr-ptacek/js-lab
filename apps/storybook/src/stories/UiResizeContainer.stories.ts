import { UiResizeContainer, UiResizeContainerSection } from "@petr-ptacek/vue-ui";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta: Meta<typeof UiResizeContainer> = {
  title: "Layout/UiResizeContainer",
  component: UiResizeContainer,
};

export default meta;

type Story = StoryObj<typeof UiResizeContainer>;

export const Default: Story = {
  render: () => ({
    components: { UiResizeContainer, UiResizeContainerSection },
    template: `
      <div class="h-[800px]">
        <UiResizeContainer class="rounded-xl">
          <template #alpha>
            <UiResizeContainerSection class="bg-green-600 text-3xl font-mono">
              <div class="w-full h-full flex justify-center items-center">
                Left
              </div>
            </UiResizeContainerSection>
          </template>

          <template #beta>
            <UiResizeContainerSection class="bg-blue-600 text-3xl font-mono">
              <div class="w-full h-full flex justify-center items-center">
                Right
              </div>
            </UiResizeContainerSection>
          </template>
        </UiResizeContainer>
      </div>
    `,
  }),
};
