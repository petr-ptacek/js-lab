# Behaviour

This utility controls **what happens when you try to run a function multiple times** while it is already running.

Think of it like a gatekeeper:
👉 *“Should I run this now, later, or not at all?”*

---

## 🧠 Simple explanation

Imagine you press a button many times:

* Should it ignore extra clicks?
* Should it remember them and run later?
* Or should it stop the old work and only care about the newest click?

That is exactly what the strategies solve.

---

## Strategies

### `"drop"`

👉 *“Ignore new calls if something is already running.”*

* First call → runs
* Next calls → ignored

Use this when:

* You want to prevent spam (e.g. button clicks)
* Only one execution matters

---

### `"queue"`

👉 *“Wait your turn.”*

* First call → runs
* Next calls → wait in line
* Everything runs one by one

Use this when:

* Order matters
* Nothing should be lost

---

### `"replace"`

👉 *“Only the latest call matters.”*

* First call → starts
* New call → replaces it
* Old result is ignored

⚠️ Important:

* Old function is **not stopped**
* Its result is just **ignored**

Use this when:

* You only care about the latest result (e.g. search input)

---

## Comparison

| Strategy | What happens with new calls? | Order guaranteed | Old result used? | Typical use case      |
|----------|------------------------------|------------------|------------------|-----------------------|
| drop     | Ignored                      | ❌                | ✔                | Prevent spam clicks   |
| queue    | Added to queue               | ✔                | ✔                | Sequential operations |
| replace  | Replaces current             | ❌                | ❌ (ignored)      | Search / latest wins  |

---

## Important note

This utility does **not cancel async work**.

It only decides:

* what runs
* and which result is valid

If you need real cancellation → combine with an abort mechanism.

---

## Summary

* `drop` → ignore extra calls
* `queue` → run everything in order
* `replace` → only last call matters
