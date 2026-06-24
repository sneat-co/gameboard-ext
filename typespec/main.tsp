import "@typespec/http";
import "./api4gameboard.tsp";

using Http;

/**
 * GameBoard HTTP/JSON API.
 *
 * GameBoard.live is the basketball game-day vertical of the Sneat ecosystem,
 * implemented as a **root/global** extension (NOT space-scoped): a game record
 * lives at `/ext/gameboard/games/{gameID}` (Firestore via dalgo), with the
 * authoritative append-only event log at
 * `/ext/gameboard/games/{gameID}/events/{eventID}`.
 *
 * These TypeSpec files are the **frozen wire contract** between the Go backend
 * (`gameboard/backend`) and the Angular frontend (`@sneat/extension-gameboard-*`).
 * No emitters are configured — the `.tsp` is the source of truth for the wire
 * shape; both sides hand-implement matching types (same convention as
 * `eventus/typespec` and the `sneat-go/typespec` directory).
 *
 * Source spec: backstage `spec/features/sports/gameboard-live` and the
 * `gameboard-live` master plan.
 */
@service(#{ title: "GameBoard API" })
namespace GameBoard;
