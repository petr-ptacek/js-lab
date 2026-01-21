# withTryCatch

Malá, typově bezpečná utilita pro **zabalení `try / catch` logiky** do přehledného
a dobře testovatelného **Result patternu**.

Cílem je:

- soustředit se **pouze na výsledek `fn`**
- vracet **stabilní strukturu `{ ok, data | error }`**
- oddělit **výpočet** od **side-effect callbacků**

---

## ✨ Vlastnosti

- ✅ žádné `throw` v běžném flow
- ✅ žádné `undefined` peklo
- ✅ silná typová inference
- ✅ fallback jako hodnota **nebo** funkce
- ✅ oddělené callbacky (`onSuccess`, `onError`, `onFinally`)
- ✅ možnost mapovat error (`mapError`)

---

## 📦 Instalace

Žádná 🙂  
Je to čistý util – zkopíruj do projektu nebo do shared utils.

---

## 🔧 API

### `withTryCatch`

```ts
async function withTryCatch<TResult, TError = unknown>(
  options: WithTryCatchOptions<TResult, TError>
): Promise<TryCatchResult<TResult, TError>>
```

## Základní použití

```ts
const result = await withTryCatch<number>({
  fn: async () => {
    if ( Math.random() < 0.5 ) {
      throw new Error("Random error");
    }
    return 100;
  },
});

if ( result.ok ) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Fallback

### Fallback jako hodnota

```ts
const result = await withTryCatch<number | null>({
  fn: async () => {
    throw new Error("Fail");
  },
  fallback: null,
});

if ( result.ok ) {
  // data: number | null
  console.log(result.data);
}
```

### Fallback jako funkce

```ts
const result = await withTryCatch<number>({
  fn: async () => {
    throw new Error("Fail");
  },
  fallback: (error) => {
    console.warn(error);
    return 0;
  },
});
```

## Mapování erroru

```ts
const result = await withTryCatch<number, string>({
  fn: async () => {
    throw new Error("Boom");
  },
  mapError: (e) => e instanceof Error ? e.message : "unknown",
});

if ( !result.ok ) {
  // error: string
  console.log(result.error);
}
```

## Callbacky

- Callbacky jsou side-effects
- neovlivňují výsledek

```ts
await withTryCatch({
  fn: () => 42,
  onSuccess: (data) => {
    console.log("Success:", data);
  },
  onError: (error) => {
    console.error("Error:", error);
  },
  onFinally: () => {
    console.log("Done");
  },
});
```

- Pokud callback throwne `error`, **není zachycen** – to je záměr.
  Utility řeší jen `fn`, ne callbacky.

## Návratový typ

```ts
type TryCatchResult<TResult, TError = unknown> =
  | { ok: true; data: TResult }
  | { ok: false; error: TError };
```

### Použití

```ts
if ( result.ok ) {
  result.data;
} else {
  result.error;
}
```

## 🎯 Filosofie

* `fn` je **jediný zdroj pravdy**

* callbacky jsou **reakce**

* žádné skryté control-flow

* žádná magie

Tohle **není error framework**.
Je to **malý, čitelný primitiv**, který se dobře skládá s UI / services.

