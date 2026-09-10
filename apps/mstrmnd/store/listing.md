# Store listing copy

Paste-ready text for App Store Connect and Google Play Console.

## Name

`MSTRMND` (7 chars — fits both stores)

## Subtitle / short description

- **iOS subtitle** (30 char max): `A board that argues`
- **Android short description** (80 char max):
  `Put a decision to seven AI specialists who disagree, and get a ruling.`

## Description

```
Most AI advice collapses into one agreeable voice.

MSTRMND is a board of specialists that argues. You put a decision to it — raise or
bootstrap, rebuild or patch, fire the client or keep them — and seven members take
it apart, each locked to a single lens.

THE ROOM RUNS IN THREE PHASES

Openings. Every member you seat gives a position from their own angle:
feasibility, execution, demand, risk, ambition, unit economics, positioning.

Crossfire. They answer each other by name — sharpening the strongest point or
taking it apart. This is where the real disagreement surfaces.

The ruling. The Chair doesn't debate. It closes with a call, names the tension
that actually decides the outcome, and gives you three things to do this week.

THE BOARD

The Architect — can it be built, and what breaks first
The Operator — what ships Monday, and who owns it
The Closer — who pays, and what makes them say yes
The Contrarian — the strongest argument against
The Visionary — what this looks like if it works completely
The Quant — the unit economics
The Storyteller — the one line it lives or dies by
The Chair — always seated, closes every room

PICK A TABLE

Ship It, Follow the Money, Big Bet, Launch — or seat the members yourself.

PRIVATE BY DEFAULT

Sessions are stored on your device and nothing is uploaded. Delete them all at any
time from Settings.

BRING YOUR OWN KEY

MSTRMND runs on Claude. Add your own Anthropic API key in Settings and the board
deliberates for real, streaming as it goes. Without a key the app runs a scripted
offline board so you can see exactly how it works first.
```

## Keywords (iOS, 100 char max, comma-separated)

```
decision,advisor,board,strategy,brainstorm,founder,startup,thinking,debate,ai,claude,mastermind
```

## Category

- Primary: **Productivity**
- Secondary: **Business**

## Age rating

4+ / Everyone. No user-generated content is shared, no ads, no tracking.

## Privacy — data collection

Declare **no data collected**, which is accurate as shipped:

- Sessions and settings are stored locally on device only.
- The API key is stored in the device keychain (`expo-secure-store`).
- The only network call is to `api.anthropic.com`, made with the user's own key.
  Note in the privacy questionnaire that prompts the user types are sent to
  Anthropic for processing under the user's own API account.
- No analytics SDK, no advertising identifier, no third-party tracking.

You still need a public privacy policy URL for both stores.

## Support URL

Required by both stores. A GitHub repository page or a simple hosted page is fine.
