# @sneat/extension-gameboard-contract

The **published TS contract** for the gameboard extension — tokens, wire types, and the
**deterministic fold reducer** (mirroring `backend/eventtimeline`), hand-implemented against
`../typespec/api4gameboard.tsp`. This is the cross-repo boundary the apps and the private
`gameboard` impl consume.

It depends only on foundational/core — never on another `@sneat/extension-*` lib (the CI invariant
in `scripts/check-no-extension-deps.sh` enforces it).

> Scaffold placeholder: the nx lib (`@sneat/extension-gameboard-contract`) with the mirrored TS
> reducer + backend↔frontend parity tests is added by the `gameboard-event-timeline` slice. The Go
> reducer and the TypeSpec are already frozen here.
