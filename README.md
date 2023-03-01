# babydaal commerce

Adapted and stolen liberally from Vercel's [Commerce repo](https://github.com/vercel/commerce). Thanks to the folks there for making such a killer starter e-commerce site.

## Run minimal version locally

> To run a minimal version of Next.js Commerce you can start with the default local provider `@vercel/commerce-local` that has all features disabled (cart, auth) and uses static files for the backend

```bash
pnpm install & pnpm build # run these commands in the root folder of the mono repo
pnpm dev # run this command in the site folder
```

## Considerations

- `packages/commerce` contains all types, helpers and functions to be used as a base to build a new **provider**.
- **Providers** live under `packages`'s root folder and they will extend Next.js Commerce types and functionality (`packages/commerce`).
- We have a **Features API** to ensure feature parity between the UI and the Provider. The UI should update accordingly and no extra code should be bundled. All extra configuration for features will live under `features` in `commerce.config.json` and if needed it can also be accessed programmatically.
- Each **provider** should add its corresponding `next.config.js` and `commerce.config.json` adding specific data related to the provider. For example in the case of BigCommerce, the images CDN and additional API routes.

## Configuration

### Features

Every provider defines the features that it supports under `packages/{provider}/src/commerce.config.json`

#### Features Available

The following features can be enabled or disabled. This means that the UI will remove all code related to the feature.
For example: turning `cart` off will disable Cart capabilities.

- cart
- search
- wishlist
- customerAuth
- customCheckout

#### How to turn Features on and off

> NOTE: The selected provider should support the feature that you are toggling. (This means that you can't turn wishlist on if the provider doesn't support this functionality out of the box)

- Open `site/commerce.config.json`
- You'll see a config file like this:
  ```json
  {
    "features": {
      "wishlist": false,
      "customCheckout": true
    }
  }
  ```
- Turn `wishlist` on by setting `wishlist` to `true`.
- Run the app and the wishlist functionality should be back on.

### How to create a new provider

Follow our docs for [Adding a new Commerce Provider](packages/commerce/new-provider.md).

If you succeeded building a provider, submit a PR with a valid demo and we'll review it asap.

## Contribute

Our commitment to Open Source can be found [here](https://vercel.com/oss).

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install the dependencies: `pnpm install`
4. Build the packages: `pnpm build`
5. Duplicate `site/.env.template` and rename it to `site/.env.local`
6. Add proper store values to `site/.env.local`
7. Run `cd site` & `pnpm dev` to watch for code changes
8. Run `pnpm turbo run build` to check the build after your changes

## Work in progress

We're using Github Projects to keep track of issues in progress and todo's. Here is our [Board](https://github.com/vercel/commerce/projects/1)

People actively working on this project: @okbel, @lfades, @dominiksipowicz, @gbibeaul.
