# UiContentFrame

`UiContentFrame` je **strukturální UI komponenta** pro vertikální obsah se sekcemi:

- `header`
- `content` (body)
- `footer`

Primárním účelem komponenty je **udržet scroll uvnitř obsahu**, zatímco header a footer zůstávají vizuálně oddělené.

Komponenta **neřeší layout stránky ani výšku viewportu** – očekává, že výšku dostane z aplikační vrstvy.

---

## Co komponenta řeší

- strukturu obsahu typu *header → content → footer*
- izolovaný scroll uvnitř content části
- stabilní chování ve flex layoutech
- jasně definovaný kontrakt pro scroll vs. auto-grow chování

---

## Co komponenta neřeší

- neurčuje výšku stránky ani viewportu
- nepřebírá zodpovědnost za globální layout
- neřeší horizontální layout ani orientaci
- neřeší portály (dropdowny, tooltips apod.)

---

## Základní použití

```vue
<UiContentFrame>
  <template #header>
    Header
  </template>

  <div>
    Content
  </div>

  <template #footer>
    Footer
  </template>
</UiContentFrame>
```

---

## Scroll chování (výchozí)

Výchozí chování:

- `scrollable = true`
- scroll probíhá **uvnitř content části**
- header a footer zůstávají fixní vůči rámci komponenty

```vue
<UiContentFrame>
  <template #header>Header</template>

  <div>
    Long content…
  </div>

  <template #footer>Footer</template>
</UiContentFrame>
```

---

## Výškový kontrakt (zásadní)

Scrollable element musí mít omezenou výšku.  
`UiContentFrame` nevytváří vlastní výšku – očekává, že výška bude propagována shora.

Typický řetězec:

```
viewport / app layout
→ main container (flex-1, min-h-0)
→ page wrapper (h-full)
→ UiContentFrame (height: 100%)
```

---

## Režim bez interního scrollu (`scrollable = false`)

```vue
<UiContentFrame :scrollable="false">
  <template #header>Header</template>

  <div>
    Content that grows…
  </div>

  <template #footer>Footer</template>
</UiContentFrame>
```

### Chování v tomto režimu

- komponenta přepne layoutový kontrakt
- content roste a s ním i celá komponenta
- footer je vždy pod obsahem

---

## Props

### scrollable

```ts
scrollable?: boolean; // default: true
```

| Hodnota | Chování |
|------|--------|
| true | scroll uvnitř content části |
| false | auto-grow layout, scroll delegován parentu |

---

## Slots

| Slot | Popis |
|-----|------|
| header | horní část |
| (default) | hlavní obsah |
| footer | spodní část |

---

## Shrnutí

`UiContentFrame` je bezpečný obsahový rámec:
- drží scroll uvnitř
- neřeší výšku stránky
- má explicitní a predikovatelné chování
