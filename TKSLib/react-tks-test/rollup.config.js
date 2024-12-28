import alias from '@rollup/plugin-alias';
import path from 'path';

export default {
    resolve: {
        alias: {
          "@Router": path.resolve(__dirname, "src/Router/"),
          "@screen": path.resolve(__dirname, "src/screen/"),
          "@components": path.resolve(__dirname, "src/components/"),
          "@const": path.resolve(__dirname, "src/const/"),
          "@define": path.resolve(__dirname, "src/define/"),
          "@handles": path.resolve(__dirname, "src/handles/"),
          "@myHooks": path.resolve(__dirname, "src/myHooks/"),
          "@TKSQuery": path.resolve(__dirname, "src/TKSQuery/"),
          "@tricks": path.resolve(__dirname, "src/tricks/"),
          "@utils": path.resolve(__dirname, "src/utils/"),
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    }
};