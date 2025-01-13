import autoprefixer from "autoprefixer";

import cssnano from "cssnano";

import postcssNested from "postcss-nested";

export default {
  syntax: "postcss-scss",

  plugins: [autoprefixer(), cssnano({ preset: "default" }), postcssNested()],
};
