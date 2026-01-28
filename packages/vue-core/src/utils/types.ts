import type { EmitterEvents } from "@petr-ptacek/js-core";

export type VueEmitter<Events extends EmitterEvents> = {
  on: <TType extends keyof Events>(
    type: TType,
    handler: Events[TType],
  ) => () => void;

  once: <TType extends keyof Events>(
    type: TType,
    handler: Events[TType],
  ) => () => void;

  emit: <TType extends keyof Events>(
    type: TType,
    ...args: Parameters<Events[TType]>
  ) => void;

  off: <TType extends keyof Events>(
    type: TType,
    handler?: Events[TType],
  ) => void;
};
