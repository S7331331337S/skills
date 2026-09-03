# Shipping MSTRMND

Everything in the repo is build-ready. The commands below are the parts that need
your credentials.

They have to run from your machine because of two separate limits in the
environment this was built in: `api.expo.dev` is blocked at the network layer, so
the `eas` CLI cannot reach it; and while an Expo MCP connector can reach EAS
without that proxy, it has no project-creation tool, so the first `eas init` is
yours either way.

> **Run every command from `apps/mstrmnd/`.** The repository root has its own
> `app.json` with a different EAS project id (it belongs to the `expo/skills`
> project). Running `eas` from the root will target the wrong project.

## 0. Accounts you need

| | Cost | Needed for |
| --- | --- | --- |
| Expo account | free | any EAS build |
| Apple Developer Program | $99/year | TestFlight and the App Store |
| Google Play Developer | $25 once | Play internal testing and production |

Only the Expo account is needed for step 2 — you can get a runnable build on your
own device without paying Apple or Google anything.

## 1. Link the project

```bash
cd apps/mstrmnd
npm install
npx eas-cli@latest login
npx eas-cli@latest init
```

`eas init` creates the project and writes `extra.eas.projectId` into `app.json`.
Commit that change — builds need it.

### Connect the GitHub repo (worth doing)

In the Expo dashboard for the project: **Project settings → GitHub → connect** this
repository, and set the base directory to `apps/mstrmnd`.

This is optional for CLI builds but it unlocks a second path: EAS can then build
straight from a commit on GitHub, with no local checkout and no local credentials.
That path is also what an assistant with the Expo MCP connector can drive for you —
`build_run` takes a build profile, a git ref and a base directory, so once the
project exists and the repo is connected, "build the preview profile from main" is
a single call rather than something you run by hand.

If you want over-the-air updates (push JS changes without a store review):

```bash
npx eas-cli@latest update:configure
```

That adds `updates.url`. `runtimeVersion` is already set to the `appVersion`
policy, so an OTA update only reaches builds with a matching `version`.

## 2. Get it on your phone

```bash
npx eas-cli@latest build --profile preview --platform ios      # or android / all
```

`preview` is internal distribution: iOS installs via an ad-hoc link to registered
devices, Android produces an APK you can just download. This is the fastest way to
hold the real thing, and it needs no Apple/Google paid account for Android.

For iterating with the dev client instead:

```bash
npx eas-cli@latest build --profile development --platform ios
npx expo start --dev-client
```

## 3. Store builds

```bash
npx eas-cli@latest build --profile production --platform all
npx eas-cli@latest submit --profile production --platform ios
npx eas-cli@latest submit --profile production --platform android
```

`production` uses `autoIncrement`, and `eas.json` sets `appVersionSource: "remote"`,
so EAS owns the build numbers — don't bump `ios.buildNumber` or
`android.versionCode` by hand.

## Two things to decide before a public release

**1. The API key lives on the device.** The app calls `api.anthropic.com` directly
with a key the user pastes in. That is the right shape for a personal tool and the
wrong shape for a product: anyone with the binary and device access can extract it,
and on the App Store you'd be shipping a bring-your-own-key app, which Apple
sometimes rejects under 3.1.1 if it reads as an alternate purchase mechanism.

The fix is a thin proxy you control. `Provider` in `src/lib/types.ts` is the only
seam that changes — point `createAnthropicProvider` at your endpoint and hold the
key server-side.

**2. An export-compliance answer has been filled in for you.**
`ios.infoPlist.ITSAppUsesNonExemptEncryption` is set to `false` in `app.json`. That
is the standard, correct declaration for an app whose only cryptography is HTTPS,
and it stops App Store Connect asking on every single upload. It is still a legal
declaration you are making — if you ever add your own encryption, revisit it.

## Store listing

Copy for the submission forms lives in `store/listing.md`.

Screenshots: run the app in a simulator at the required sizes (6.9" and 6.5" for
iOS, phone for Android) and capture the Table, a live room, and a ruling. The
ruling screen is the one that sells it.

## Pre-flight

```bash
npm run typecheck
npm test
npm run export:web        # catches import errors tsc can't
npx expo-doctor@latest
```

**Not yet verified on hardware.** No simulator was available where this was built,
so haptics, the blurred tab bar, and `expo-secure-store` are covered only by
typecheck and the web target. Run the `preview` build and check those three before
you submit anything.
